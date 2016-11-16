(function(mod) {
    if(typeof exports == "object" && typeof module == "object") {
        return mod(require.main.require("../lib/infer"), require.main.require("../lib/tern"), require);
    }
    if(typeof define == "function" && define.amd)
        return define(["tern/lib/infer", "tern/lib/tern"], mod);
    mod(tern, tern);
}(function(infer, tern, require) {
    "use strict";
    function ResolvePath(base, path) {
        if(path[0] == "/") return path;
        var slash = base.lastIndexOf("/"), m;
        if(slash >= 0) path = base.slice(0, slash + 1) + path;
        while(m = /[^\/]*[^\/\.][^\/]*\/\.\.\//.exec(path))
            path = path.slice(0, m.index) + path.slice(m.index + m[0].length);
        return path.replace(/(^|[^\.])\.\//g, "$1");
    }

    function StringEndWith(that, str) {
        if(!that || !str || str.length > that.length) return false;
        return that.substring(that.length - str.length) == str;
    }

    function RelativePath(from, to) {
        if(from[from.length - 1] != "/") from += "/";
        if(to.indexOf(from) == 0) return to.slice(from.length);
        else return to;
    }

    function GetModule(data, name) {
        return data.modules[name] || (data.modules[name] = new infer.AVal);
    }

    function BuildWrappingScope(parent, origin, node) {
        var scope = new infer.Scope(parent);
        scope.originNode = node;
        infer.cx().definitions.deviceone.require.propagate(scope.defProp("require"));
        var module = new infer.Obj(infer.cx().definitions.deviceone.Module.getProp("prototype").getType());
        module.propagate(scope.defProp("module"));
        var exports = new infer.Obj(true, "exports");
        module.origin = exports.origin = origin;
        module.originNode = exports.originNode = scope.originNode;
        exports.propagate(scope.defProp("exports"));
        var moduleExports = scope.exports = module.defProp("exports");
        exports.propagate(moduleExports, 95);
        return scope;
    }

    function ResolveModule(server, name, _parent) {
        server.addFile(name, null, server._node.currentOrigin);
        return GetModule(server._node, name);
    }

    function BuildUIFileIDMap(obj, r) {
        r = r || {};
        if(obj.RootView) {
            r.$ = obj.RootView.type;
            BuildUIFileIDMap(obj.RootView, r);
        }
        if(obj.id) {
            r[obj.id] = obj.type;
        }
        if(obj.views) {
            var i = 0, l = obj.views.length;
            for(; i < l; i++) {
                BuildUIFileIDMap(obj.views[i], r);
            }
        }
        return r;
    }

    /** ******************************************************************************************************************** */
    var DEFINES;
    if(require)
        (function() {
            var fs = require("fs"), module_ = require("module"), path = require("path");
            RelativePath = path.relative;
            ResolveModule = function(server, name, parent) {
                var data = server._node;
                if(data.options.dontLoad == true || data.options.dontLoad && new RegExp(data.options.dontLoad).test(name) || data.options.load && !new RegExp(data.options.load).test(name))
                    return infer.ANull;
                if(data.modules[name]) return data.modules[name];
                var currentModule = {
                    id : parent,
                    paths : module_._nodeModulePaths(path.dirname(parent))
                };
                try {
                    var file = module_._resolveFilename(name, currentModule);
                } catch(e) {
                    return infer.ANull;
                }

                var norm = NormPath(file);
                if(data.modules[norm]) return data.modules[norm];

                if(fs.existsSync(file) && /^(\.js)?$/.test(path.extname(file))) server.addFile(RelativePath(server.options.projectDir, file), null, data.currentOrigin);
                return data.modules[norm] = new infer.AVal;
            };
        })();
    /** ******************************************************************************************************************** */

    function NormPath(name) {
        return name.replace(/\\/g, "/");
    }

    function ResolveProjectPath(server, pth) {
        return ResolvePath(NormPath(server.options.projectDir || "") + "/", NormPath(pth));
    }

    function PreCondenseReach(state) {
        var mods = infer.cx().parent._node.modules;
        var node = state.roots["!node"] = new infer.Obj(null);
        for(var name in mods) {
            var mod = mods[name];
            var id = mod.origin || name;
            var prop = node.defProp(id.replace(/\./g, "`"));
            mod.propagate(prop);
            prop.origin = mod.origin;
        }
    }

    function PostLoadDef(data) {
        var cx = infer.cx(), mods = cx.definitions[data["!name"]]["!node"];
        var data = cx.parent._node;
        if(mods) for(var name in mods.props) {
            var origin = name.replace(/`/g, ".");
            var mod = GetModule(data, origin);
            mod.origin = origin;
            mods.props[name].propagate(mod);
        }
    }

    function FindTypeAt(file, pos, expr, type) {
        var isStringLiteral = expr.node.type === "Literal" && typeof expr.node.value === "string";
        var isRequireArg = !!expr.node.required;
        if(isStringLiteral && isRequireArg) {
            type = Object.create(type);
            var exportedType = expr.node.required.types[0];
            type.origin = exportedType.origin;
            type.originNode = exportedType.originNode;
        }
        return type;
    }

    function MaybeSet(obj, prop, val) {
        if(val != null) obj[prop] = val;
    }

    /** ***************Properties************* */
    function GetObjectProperties(proto) {
        var cx = infer.cx(), locals = cx.definitions.deviceone;
        var objectName = proto.name, index = objectName.indexOf("!ui.");
        if(index == 0) objectName = objectName.substring("!ui.".length, objectName.length);
        objectName = objectName.substring(0, objectName.indexOf('.'));
        return locals["!pp"].hasProp(objectName);
    }

    function GetPropertyType(widgetType, propertyName) {
        if(!(widgetType)) return null;
        var proto = widgetType.proto, propertyType = null;
        while(proto) {
            var objectType = GetObjectProperties(proto);
            if(objectType && objectType.getType) propertyType = objectType.getType().hasProp(propertyName);
            if(propertyType) return propertyType;
            proto = proto.proto;
        }
        return null;
    }

    /** ***************Events************* */
    function GetEventProperties(proto) {
        var cx = infer.cx(), locals = cx.definitions.deviceone;
        var oname = proto.name;
        if(!oname.indexOf("!ui.") || !oname.indexOf("!sm.") || !oname.indexOf("!mm.")) {
            oname = oname.substring(4, oname.length);
        }
        oname = oname.substring(0, oname.indexOf('.'));
        return locals["!ee"].hasProp(oname);
    }

    function Completion(file, query) {
        function getQuote(c) {
            return c === "'" || c === '"' ? c : null;
        }

        if(!query.end) return;

        var wordPos = tern.resolvePos(file, query.end);
        var word = null, completions = [];
        var wrapAsObjs = query.types || query.depths || query.docs || query.urls || query.origins;
        var cx = infer.cx(), overrideType = null;

        function gather(prop, obj, depth, addInfo) {
            if(obj == cx.protos.Object && !word) return;
            if(query.filter !== false && word && (query.caseInsensitive ? prop.toLowerCase() : prop).indexOf(word) !== 0) return;
            for(var i = 0; i < completions.length; ++i) {
                var c = completions[i];
                if((wrapAsObjs ? c.name : c) == prop) return;
            }
            var rec = wrapAsObjs ? {
                name : prop
            } : prop;
            completions.push(rec);

            if(obj && (query.types || query.docs || query.urls || query.origins)) {
                var val = obj.props[prop];
                infer.resetGuessing();
                var type = val.getType();
                rec.guess = infer.didGuess();
                if(query.types) rec.type = overrideType != null ? overrideType : infer.toString(type);
                if(query.docs) MaybeSet(rec, "doc", val.doc || type && type.doc);
                if(query.urls) MaybeSet(rec, "url", val.url || type && type.url);
                if(query.origins) MaybeSet(rec, "origin", val.origin || type && type.origin);
            }
            if(query.depths) rec.depth = depth;
            if(wrapAsObjs && addInfo) addInfo(rec);
        }

        var callExpr = infer.findExpressionAround(file.ast, null, wordPos, file.scope, "CallExpression");
        if(callExpr && callExpr.node.arguments && callExpr.node.arguments.length && callExpr.node.arguments.length > 0) {
            var nodeArg = callExpr.node.arguments[0];
            if(!(nodeArg.start <= wordPos && nodeArg.end >= wordPos)) return;
            if(nodeArg._do_type) {
                var startQuote = getQuote(nodeArg.raw.charAt(0)), endQuote = getQuote(nodeArg.raw.length > 1 ? nodeArg.raw.charAt(nodeArg.raw.length - 1) : null);
                var wordEnd = endQuote != null ? nodeArg.end - 1 : nodeArg.end, wordStart = startQuote != null ? nodeArg.start + 1 : nodeArg.start, word = nodeArg.value.slice(0,
                        nodeArg.value.length - (wordEnd - wordPos));
                if(query.caseInsensitive) word = word.toLowerCase();

                switch(nodeArg._do_type.type) {
                    case "deviceone_pp":
                        var widgetType = nodeArg._do_type.proxy, proto = widgetType.proto, propertyType = null;
                        while(proto) {
                            var objType = GetObjectProperties(proto);
                            if(objType) infer.forAllPropertiesOf(objType, gather);
                            proto = proto.proto;
                        }
                        break;

                    case "deviceone_ee":
                        var widgetType = nodeArg._do_type.proxy, proto = widgetType.proto, propertyType = null;
                        while(proto) {
                            var objType = GetEventProperties(proto);
                            if(objType) infer.forAllPropertiesOf(objType, gather);
                            proto = proto.proto;
                        }
                        break;
                    case "deviceone_ui":
                        var server = cx.parent;
                        var _uimap = server._node.currentIDMap;
                        for(var k in _uimap) {
                            var _t = {};
                            _t.name = k;
                            _t.type = _uimap[k];
                            completions.push(_t);
                        }
                        break;
                    case "deviceone_sm":
                        var types = cx.definitions.deviceone["!sm"];
                        overrideType = "string";
                        infer.forAllPropertiesOf(types, gather);
                        break;
                    case "deviceone_mm":
                        var types = cx.definitions.deviceone["!mm"];
                        overrideType = "string";
                        infer.forAllPropertiesOf(types, gather);
                        break;
                }

                return {
                    start : tern.outputPos(query, file, wordStart),
                    end : tern.outputPos(query, file, wordEnd),
                    isProperty : false,
                    isStringAround : true,
                    startQuote : startQuote,
                    endQuote : endQuote,
                    completions : completions
                }
            }
        }
    }

    /** ******************************************************************************************************************** */

    infer.registerFunction("deviceone_ui", function(_self, args, argNodes) {
        if(!argNodes || !argNodes.length || argNodes[0].type != "Literal" || typeof argNodes[0].value != "string") return infer.ANull;
        var name = argNodes[0].value;
        var cx = infer.cx(), server = cx.parent;
        name = server._node.currentIDMap[name];
        var locals = cx.definitions.deviceone["!ui"], dType = locals.hasProp(name);
        argNodes[0]._do_type = {
            "type" : "deviceone_ui"
        };
        if(dType) return new infer.Obj(dType.getType().getProp("prototype").getType());
        return infer.ANull;
    });

    infer.registerFunction("deviceone_sm", function(_self, args, argNodes) {
        if(!argNodes || !argNodes.length || argNodes[0].type != "Literal" || typeof argNodes[0].value != "string") return infer.ANull;
        var name = argNodes[0].value;
        var cx = infer.cx(), server = cx.parent;
        var locals = cx.definitions.deviceone["!sm"], dType = locals.hasProp(name);
        argNodes[0]._do_type = {
            "type" : "deviceone_sm"
        };
        if(dType) return new infer.Obj(dType.getType().getProp("prototype").getType());
        return infer.ANull;
    });

    infer.registerFunction("deviceone_mm", function(_self, args, argNodes) {
        if(!argNodes || !argNodes.length || argNodes[0].type != "Literal" || typeof argNodes[0].value != "string") return infer.ANull;
        var name = argNodes[0].value;
        var cx = infer.cx(), server = cx.parent;
        var locals = cx.definitions.deviceone["!mm"], dType = locals.hasProp(name);
        argNodes[0]._do_type = {
            "type" : "deviceone_mm"
        };
        if(dType) return new infer.Obj(dType.getType().getProp("prototype").getType());
        return infer.ANull;
    });

    infer.registerFunction("deviceone_ee", function(_self, args, argNodes) {
        if(!argNodes || !argNodes.length || argNodes[0].type != "Literal" || typeof argNodes[0].value != "string") return infer.ANull;
        var proxy = _self.getType();
        argNodes[0]._do_type = {
            "type" : "deviceone_ee",
            "proxy" : proxy
        };
    });

    infer.registerFunction("deviceone_pp", function(_self, args, argNodes) {
        if(!argNodes || !argNodes.length || argNodes[0].type != "Literal" || typeof argNodes[0].value != "string") return infer.ANull;
        var widgetType = _self.getType(), propertyName = argNodes[0].value, propertyType = GetPropertyType(widgetType, propertyName);
        argNodes[0]._do_type = {
            "type" : "deviceone_pp",
            "proxy" : widgetType
        };
        if(propertyType) return propertyType.getType();
        return infer.ANull;
    });

    infer.registerFunction("deviceone_rq", function(_self, _args, argNodes) {
        if(!argNodes || !argNodes.length || argNodes[0].type != "Literal" || typeof argNodes[0].value != "string") return infer.ANull;
        var cx = infer.cx(), server = cx.parent, data = server._node, name = argNodes[0].value;
        if(name == "deviceone") { return new infer.Obj(cx.definitions.deviceone["!$"]); }
        var result;
        if(data.options.modules && data.options.modules.hasOwnProperty(name)) {
            var scope = BuildWrappingScope(cx.topScope, name);
            infer.def.load(data.options.modules[name], scope);
            result = data.modules[name] = scope.exports;
        } else {
            var currentFile = data.currentFile || ResolveProjectPath(server, argNodes[0].sourceFile.name);
            var relative = /^\.{0,2}\//.test(name);
            if(relative) {
                if(!currentFile) return argNodes[0].required || infer.ANull;
                name = ResolvePath(currentFile, name);
            }
            result = ResolveModule(server, name, currentFile);
        }
        return argNodes[0].required = result;
    });

    tern.registerPlugin("deviceone", function(server, options) {

        server._node = {
            modules : Object.create(null),
            options : options || {},
            currentFile : null,
            currentRequires : [],
            currentOrigin : null,
            server : server
        };

        server.on("beforeLoad", function(file) {
            var fs = require("fs");
            if(StringEndWith(file.name, ".ui.js")) {
                var pathui = (server.options.projectDir + "/" + file.name).replace(".ui.js", ".ui");
                if(fs.existsSync(pathui)) {
                    this._node.currentIDMap = BuildUIFileIDMap(JSON.parse(fs.readFileSync(pathui)));
                }
            }
            this._node.currentFile = ResolveProjectPath(server, file.name);
            this._node.currentOrigin = file.name;
            this._node.currentRequires = [];
            file.scope = BuildWrappingScope(file.scope, this._node.currentOrigin, file.ast);
        });

        server.on("afterLoad", function(file) {
            var mod = GetModule(this._node, this._node.currentFile);
            mod.origin = this._node.currentOrigin;
            file.scope.exports.propagate(mod);
            this._node.currentFile = null;
            this._node.currentOrigin = null;
        });

        server.on("reset", function() {
            this._node.modules = Object.create(null);
        });

        return {
            defs : DEFINES,
            passes : {
                completion : Completion,
                preCondenseReach : PreCondenseReach,
                postLoadDef : PostLoadDef,
                typeAt : FindTypeAt
            }

        };
    });
/**}));**/
DEFINES={"mm":{"!type":"deviceone.mm"},"deviceone":{"mm":{"!type":"fn(id: string) -> !custom:deviceone_mm"},"ui":{"!type":"fn(id: string) -> !custom:deviceone_ui"},"sm":{"!type":"fn(id: string) -> !custom:deviceone_sm"}},"ui":{"!type":"deviceone.ui"},"!name":"deviceone","sm":{"!type":"deviceone.sm"},"!define":{"!mm":{"do_HashData":{"!type":"fn()","prototype":{"addOne":{"!type":"fn(key: String, value: String)"},"removeAll":{"!type":"fn()"},"getAll":{"!type":"fn() -> Node"},"getOne":{"!type":"fn(key: String) -> String"},"!proto":"!bc.MM.prototype","addData":{"!type":"fn(data: Node)"},"getCount":{"!type":"fn() -> Number"},"removeData":{"!type":"fn(keys: Node)"},"removeOne":{"!type":"fn(key: String)"},"getData":{"!type":"fn(keys: Node) -> Node"}},"!url":""},"do_ListData":{"!type":"fn()","prototype":{"addOne":{"!type":"fn(data: String, index: Number)"},"removeAll":{"!type":"fn()"},"getRange":{"!type":"fn(fromIndex: Number, toIndex: Number)"},"getOne":{"!type":"fn(index: Number) -> String"},"removeRange":{"!type":"fn(fromIndex: Number, toIndex: Number)"},"!proto":"!bc.MM.prototype","addData":{"!type":"fn(data: Node, index: Node)"},"updateOne":{"!type":"fn(index: Number, data: Node)"},"getCount":{"!type":"fn() -> Number"},"removeData":{"!type":"fn(indexs: Node)"},"getData":{"!type":"fn(indexs: Node)"}},"!url":""},"do_Timer":{"!type":"fn()","prototype":{"delay":{"!type":"Number"},"stop":{"!type":"fn()"},"start":{"!type":"fn()"},"!proto":"!bc.MM.prototype","interval":{"!type":"Number"}},"!url":""},"do_SQLite":{"!type":"fn()","prototype":{"path":{"!type":"String"},"query":{"!effects":["call !1 this=!this"],"!type":"fn(sql: String, f: fn()) -> !this"},"!proto":"!bc.MM.prototype","close":{"!type":"fn() -> Bool"},"executeSync":{"!type":"fn(sql: String) -> Bool"},"execute":{"!effects":["call !1 this=!this"],"!type":"fn(sql: String, f: fn()) -> !this"},"open":{"!type":"fn(path: String) -> Bool"},"sql":{"!type":"String"}},"!url":""},"do_Http":{"!type":"fn()","prototype":{"request":{"!type":"fn()"},"download":{"!type":"fn(path: String) -> Node"},"method":{"!type":"String"},"upload":{"!type":"fn(path: String, name: String) -> Node"},"!proto":"!bc.MM.prototype","body":{"!type":"String"},"contentType":{"!type":"String"},"timeout":{"!type":"Number"},"url":{"!type":"String"}},"!url":""},"do_Animation":{"!type":"fn()","prototype":{"rotate":{"!type":"fn(data: Node, id: String)"},"transfer":{"!type":"fn(data: Node, id: String)"},"alpha":{"!type":"fn(data: Node, id: String)"},"!proto":"!bc.MM.prototype","scale":{"!type":"fn(data: Node, id: String)"},"fillAfter":{"!type":"Boolean"}},"!url":""}},"!pp":{"do_Label":{"maxHeight":{"!type":"Number"},"textAlign":{"!type":"String"},"maxLines":{"!type":"Number"},"fontSize":{"!type":"Number"},"text":{"!type":"String"},"fontStyle":{"!type":"String"},"fontColor":{"!type":"String"},"maxWidth":{"!type":"Number"}},"do_ImageView":{"scale":{"!type":"String"},"source":{"!type":"String"},"radius":{"!type":"Number"},"cacheType":{"!type":"String"},"defaultImage":{"!type":"String"},"enabled":{"!type":"Bool"}},"do_ListData":{},"do_Timer":{"delay":{"!type":"Number"},"interval":{"!type":"Number"}},"do_ProgressBar":{"progress":{"!type":"Number"},"style":{"!type":"String"}},"do_SQLite":{"path":{"!type":"String"},"sql":{"!type":"String"}},"do_Http":{"method":{"!type":"String"},"body":{"!type":"String"},"contentType":{"!type":"String"},"timeout":{"!type":"Number"},"url":{"!type":"String"}},"do_SlideView":{"looping":{"!type":"Bool"},"templates":{"!type":"Node"},"index":{"!type":"Number"}},"do_TextBox":{"hint":{"!type":"String"},"fontSize":{"!type":"Number"},"text":{"!type":"String"},"fontStyle":{"!type":"String"},"fontColor":{"!type":"String"},"maxLength":{"!type":"Number"}},"do_Button":{"fontSize":{"!type":"Number"},"bgImage":{"!type":"String"},"text":{"!type":"String"},"fontStyle":{"!type":"String"},"radius":{"!type":"Number"},"enabled":{"!type":"Bool"},"fontColor":{"!type":"String"}},"do_LinearLayout":{"padding":{"!type":"String"},"bgImageFillType":{"!type":"String"},"bgImage":{"!type":"String"},"enabled":{"!type":"Boolean"},"direction":{"!type":"String"}},"do_WebView":{"isHeaderVisible":{"!type":"Bool"},"zoom":{"!type":"Boolean"},"headerView":{"!type":"String"},"url":{"!type":"String"}},"do_ListView":{"isHeaderVisible":{"!type":"Bool"},"isShowbar":{"!type":"Bool"},"isFooterVisible":{"!type":"Bool"},"templates":{"!type":"Node"},"selectedColor":{"!type":"String"},"footerView":{"!type":"String"},"headerView":{"!type":"String"}},"do_ALayout":{"bgImageFillType":{"!type":"String"},"layoutAlign":{"!type":"String"},"bgImage":{"!type":"String"},"allowGesture":{"!type":"Boolean"},"isStretch":{"!type":"Boolean"},"enabled":{"!type":"Boolean"}},"do_HashData":{},"do_TextField":{"password":{"!type":"Bool"},"hint":{"!type":"String"},"fontSize":{"!type":"Number"},"inputType":{"!type":"String"},"text":{"!type":"String"},"fontStyle":{"!type":"String"},"clearAll":{"!type":"Bool"},"fontColor":{"!type":"String"}},"do_Animation":{"fillAfter":{"!type":"Boolean"}},"do_GridView":{"isShowbar":{"!type":"Bool"},"templates":{"!type":"Node"},"hSpacing":{"!type":"Number"},"vSpacing":{"!type":"Number"},"selectedColor":{"!type":"String"},"numColumns":{"!type":"Number"}},"do_SwitchView":{"checked":{"!type":"Bool"}},"do_ViewShower":{},"do_ScrollView":{"isHeaderVisible":{"!type":"Bool"},"isShowbar":{"!type":"Bool"},"headerView":{"!type":"String"},"direction":{"!type":"String"}}},"!ee":{"do_Timer":{"tick":{}},"do_Button":{"touchDown":{},"touchUp":{},"touch":{}},"do_ImageBrowser":{},"do_WebView":{"loaded":{},"pull":{},"start":{}},"do_ListView":{"pull":{},"longTouch":{},"touch":{},"push":{}},"do_Camera":{},"do_HashData":{},"do_Page":{"loaded":{},"resume":{},"result":{},"back":{},"menu":{},"pause":{}},"do_Animation":{},"do_Network":{"changed":{}},"do_App":{"loaded":{}},"do_DataCache":{},"do_Label":{},"do_ImageView":{"touch":{}},"do_ListData":{},"do_ProgressBar":{},"do_SQLite":{},"do_Http":{"fail":{},"success":{},"progress":{}},"do_SlideView":{"indexChanged":{}},"do_TextBox":{"focusIn":{},"focusOut":{},"textChanged":{}},"do_Global":{"background":{},"launch":{},"foreground":{}},"do_LinearLayout":{"touch":{}},"do_Storage":{},"do_ALayout":{"touchDown":{},"touchUp":{},"swipe":{},"longTouch":{},"touch":{},"pan":{}},"do_Album":{},"do_Device":{},"do_External":{},"do_Notification":{},"do_TextField":{"focusIn":{},"focusOut":{},"textChanged":{}},"do_GridView":{"longTouch":{},"touch":{}},"do_SwitchView":{"changed":{}},"do_ViewShower":{"viewChanged":{}},"do_ScrollView":{"pull":{}}},"!bc":{"MM":{"!type":"fn()","prototype":{"load":{"!effects":["call !1 this=!this"],"!type":"fn(source: String, f: fn()) -> !this"},"setMapping":{"!type":"fn(data: Node)"},"!proto":"!bc.Q.prototype","refreshData":{"!type":"fn()"},"bindData":{"!type":"fn(data: String, mapping: Node)"}},"!url":""},"Q":{"!doc":"","!type":"fn()","prototype":{"set":{"!type":"fn(data: ?) -> !custom:deviceone_pp"},"setMapping":{"!type":"fn(data: ?, mapping: ?) -> !this"},"get":{"!type":"fn(data: [string]) -> !custom:deviceone_pp"},"!proto":"!bc.E.prototype","refreshData":{"!type":"fn() -> !this"},"bindData":{"!type":"fn(data: ?, mapping: ?) -> !this"}},"!url":""},"UI":{"!type":"fn()","prototype":{"margin":{"!type":"String"},"visible":{"!type":"Boolean"},"typeDesc":{"!type":"String"},"setMapping":{"!type":"fn(data: Node)"},"!proto":"!bc.Q.prototype","type":{"!type":"String"},"animate":{"!effects":["call !1 this=!this"],"!type":"fn(animation: String, f: fn()) -> !this"},"remove":{"!type":"fn()"},"redraw":{"!type":"fn()"},"bgColor":{"!type":"String"},"x":{"!type":"Number"},"width":{"!type":"String"},"y":{"!type":"Number"},"id":{"!type":"String"},"tag":{"!type":"String"},"getRect":{"!type":"fn() -> Node"},"bindData":{"!type":"fn(data: String, mapping: Node)"},"height":{"!type":"String"}},"!url":""},"E":{"prototype":{"getType":{"!doc":"","!type":"fn() -> string","!url":""},"fire":{"!effects":["custom deviceone_ee"],"!doc":"","!type":"fn(name: string, data?: ?) -> !this","!url":""},"getAddress":{"!doc":"","!type":"fn() -> string","!url":""},"off":{"!effects":["custom deviceone_ee"],"!doc":"","!type":"fn(name: string) -> !this","!url":""},"on":{"!effects":["custom deviceone_ee","call !3 this=!this"],"!doc":"","!type":"fn(name: string, data: ?, delay: number, f: fn()) -> !this","!url":""}}},"SM":{"!type":"fn()","prototype":{"!proto":"!bc.E.prototype"},"!url":""}},"!$":"deviceone","Node":"?","require":{"!doc":"","!type":"fn(id: string) -> !custom:deviceone_rq","!url":""},"String":"string","Number":"number","!ui":{"do_Label":{"!type":"fn()","prototype":{"maxHeight":{"!type":"Number"},"textAlign":{"!type":"String"},"!proto":"!bc.UI.prototype","maxLines":{"!type":"Number"},"fontSize":{"!type":"Number"},"text":{"!type":"String"},"fontStyle":{"!type":"String"},"fontColor":{"!type":"String"},"maxWidth":{"!type":"Number"}},"!url":""},"do_ImageView":{"!type":"fn()","prototype":{"!proto":"!bc.UI.prototype","scale":{"!type":"String"},"source":{"!type":"String"},"radius":{"!type":"Number"},"cacheType":{"!type":"String"},"defaultImage":{"!type":"String"},"enabled":{"!type":"Bool"}},"!url":""},"do_ProgressBar":{"!type":"fn()","prototype":{"!proto":"!bc.UI.prototype","progress":{"!type":"Number"},"style":{"!type":"String"}},"!url":""},"do_SlideView":{"!type":"fn()","prototype":{"looping":{"!type":"Bool"},"templates":{"!type":"Node"},"!proto":"!bc.UI.prototype","bindItems":{"!type":"fn(data: Node)"},"index":{"!type":"Number"},"refreshItems":{"!type":"fn()"}},"!url":""},"do_TextBox":{"!type":"fn()","prototype":{"hint":{"!type":"String"},"!proto":"!bc.UI.prototype","fontSize":{"!type":"Number"},"text":{"!type":"String"},"fontStyle":{"!type":"String"},"fontColor":{"!type":"String"},"maxLength":{"!type":"Number"}},"!url":""},"do_Button":{"!type":"fn()","prototype":{"!proto":"!bc.UI.prototype","fontSize":{"!type":"Number"},"bgImage":{"!type":"String"},"text":{"!type":"String"},"fontStyle":{"!type":"String"},"radius":{"!type":"Number"},"enabled":{"!type":"Bool"},"fontColor":{"!type":"String"}},"!url":""},"do_LinearLayout":{"!type":"fn()","prototype":{"add":{"!type":"fn(id: String, path: String, target: String)"},"padding":{"!type":"String"},"bgImageFillType":{"!type":"String"},"!proto":"!bc.UI.prototype","bgImage":{"!type":"String"},"enabled":{"!type":"Boolean"},"direction":{"!type":"String"}},"!url":""},"do_WebView":{"!type":"fn()","prototype":{"isHeaderVisible":{"!type":"Bool"},"forward":{"!type":"fn()"},"canForward":{"!type":"fn() -> Boolean"},"!proto":"!bc.UI.prototype","back":{"!type":"fn()"},"zoom":{"!type":"Boolean"},"canBack":{"!type":"fn() -> Boolean"},"headerView":{"!type":"String"},"url":{"!type":"String"},"rebound":{"!type":"fn()"},"reload":{"!type":"fn()"},"stop":{"!type":"fn()"},"loadString":{"!effects":["call !1 this=!this"],"!type":"fn(text: String, f: fn()) -> !this"}},"!url":""},"do_ListView":{"!type":"fn()","prototype":{"rebound":{"!type":"fn()"},"isHeaderVisible":{"!type":"Bool"},"isShowbar":{"!type":"Bool"},"isFooterVisible":{"!type":"Bool"},"templates":{"!type":"Node"},"!proto":"!bc.UI.prototype","bindItems":{"!type":"fn(data: Node)"},"selectedColor":{"!type":"String"},"refreshItems":{"!type":"fn()"},"footerView":{"!type":"String"},"headerView":{"!type":"String"}},"!url":""},"do_ALayout":{"!type":"fn()","prototype":{"add":{"!type":"fn(id: String, path: String, x: String, y: String) -> String"},"bgImageFillType":{"!type":"String"},"layoutAlign":{"!type":"String"},"!proto":"!bc.UI.prototype","bgImage":{"!type":"String"},"allowGesture":{"!type":"Boolean"},"isStretch":{"!type":"Boolean"},"enabled":{"!type":"Boolean"}},"!url":""},"do_TextField":{"!type":"fn()","prototype":{"password":{"!type":"Bool"},"hint":{"!type":"String"},"!proto":"!bc.UI.prototype","fontSize":{"!type":"Number"},"inputType":{"!type":"String"},"text":{"!type":"String"},"fontStyle":{"!type":"String"},"clearAll":{"!type":"Bool"},"fontColor":{"!type":"String"}},"!url":""},"do_GridView":{"!type":"fn()","prototype":{"isShowbar":{"!type":"Bool"},"templates":{"!type":"Node"},"hSpacing":{"!type":"Number"},"!proto":"!bc.UI.prototype","bindItems":{"!type":"fn(data: Node)"},"vSpacing":{"!type":"Number"},"selectedColor":{"!type":"String"},"refreshItems":{"!type":"fn()"},"numColumns":{"!type":"Number"}},"!url":""},"do_SwitchView":{"!type":"fn()","prototype":{"!proto":"!bc.UI.prototype","checked":{"!type":"Bool"}},"!url":""},"do_ViewShower":{"!type":"fn()","prototype":{"removeView":{"!type":"fn(id: String)"},"!proto":"!bc.UI.prototype","showView":{"!type":"fn(id: String, animationType: String, animationTime: Number)"},"addViews":{"!type":"fn(data: Node)"}},"!url":""},"do_ScrollView":{"!type":"fn()","prototype":{"toBegin":{"!type":"fn()"},"rebound":{"!type":"fn()"},"isHeaderVisible":{"!type":"Bool"},"isShowbar":{"!type":"Bool"},"toEnd":{"!type":"fn()"},"!proto":"!bc.UI.prototype","headerView":{"!type":"String"},"direction":{"!type":"String"}},"!url":""}},"!sm":{"do_App":{"!type":"fn()","prototype":{"openPage":{"!effects":["call !8 this=!this"],"!type":"fn(source: String, data: String, animationType: String, isFullScreen: Boolean, keyboardMode: String, scriptType: String, statusBarBgColor: String, statusBarFgColor: String, f: fn()) -> !this"},"!proto":"!bc.SM.prototype","closePage":{"!effects":["call !3 this=!this"],"!type":"fn(data: String, animationType: String, layer: Number, f: fn()) -> !this"},"getAppID":{"!type":"fn() -> String"}},"!url":""},"do_DataCache":{"!type":"fn()","prototype":{"saveData":{"!type":"fn(key: String, value: String) -> Bool"},"!proto":"!bc.SM.prototype","loadData":{"!type":"fn(key: String) -> String"}},"!url":""},"do_Storage":{"!type":"fn()","prototype":{"deleteFile":{"!effects":["call !1 this=!this"],"!type":"fn(path: String, f: fn()) -> !this"},"zip":{"!effects":["call !2 this=!this"],"!type":"fn(source: String, target: String, f: fn()) -> !this"},"getDirs":{"!effects":["call !1 this=!this"],"!type":"fn(path: String, f: fn()) -> !this"},"fileExist":{"!type":"fn(path: String) -> Boolean"},"!proto":"!bc.SM.prototype","unzip":{"!effects":["call !2 this=!this"],"!type":"fn(source: String, target: String, f: fn()) -> !this"},"getFiles":{"!effects":["call !1 this=!this"],"!type":"fn(path: String, f: fn()) -> !this"},"readFile":{"!effects":["call !1 this=!this"],"!type":"fn(path: String, f: fn()) -> !this"},"dirExist":{"!type":"fn(path: String) -> Boolean"},"copy":{"!effects":["call !2 this=!this"],"!type":"fn(source: Node, target: String, f: fn()) -> !this"},"deleteDir":{"!effects":["call !1 this=!this"],"!type":"fn(path: String, f: fn()) -> !this"},"writeFile":{"!effects":["call !2 this=!this"],"!type":"fn(path: String, data: String, f: fn()) -> !this"},"zipFiles":{"!effects":["call !2 this=!this"],"!type":"fn(source: Node, target: String, f: fn()) -> !this"}},"!url":""},"do_ImageBrowser":{"!type":"fn()","prototype":{"show":{"!type":"fn(data: Node, index: Number)"},"!proto":"!bc.SM.prototype"},"!url":""},"do_Camera":{"!type":"fn()","prototype":{"!proto":"!bc.SM.prototype","capture":{"!effects":["call !4 this=!this"],"!type":"fn(width: String, height: String, quality: Number, iscut: Bool, f: fn()) -> !this"}},"!url":""},"do_Album":{"!type":"fn()","prototype":{"select":{"!effects":["call !4 this=!this"],"!type":"fn(maxCount: Number, width: Number, height: Number, quality: Number, f: fn()) -> !this"},"save":{"!effects":["call !5 this=!this"],"!type":"fn(path: String, name: String, width: Number, height: Number, quality: Number, f: fn()) -> !this"},"!proto":"!bc.SM.prototype"},"!url":""},"do_Device":{"!type":"fn()","prototype":{"beep":{"!type":"fn()"},"getInfo":{"!type":"fn(name: String) -> Node"},"getAllAppInfo":{"!type":"fn() -> Node"},"!proto":"!bc.SM.prototype","vibrate":{"!type":"fn(duration: Number)"},"flash":{"!type":"fn(status: String)"}},"!url":""},"do_External":{"!type":"fn()","prototype":{"openURL":{"!type":"fn(url: String)"},"openApp":{"!type":"fn(wakeupid: String, data: Node) -> Bool"},"openFile":{"!type":"fn(path: String) -> Bool"},"!proto":"!bc.SM.prototype","openMail":{"!type":"fn(to: String, subject: String, body: String)"},"openSMS":{"!type":"fn(number: String, body: String)"},"installApp":{"!type":"fn(path: String)"},"openContact":{"!type":"fn()"},"openDial":{"!type":"fn(number: String)"}},"!url":""},"do_Page":{"!type":"fn()","prototype":{"hideKeyboard":{"!type":"fn()"},"!proto":"!bc.SM.prototype","getData":{"!type":"fn() -> String"},"remove":{"!type":"fn(id: )"}},"!url":""},"do_Notification":{"!type":"fn()","prototype":{"confirm":{"!effects":["call !4 this=!this"],"!type":"fn(text: String, title: String, button1text: String, button2text: String, f: fn()) -> !this"},"toast":{"!effects":["call !1 this=!this"],"!type":"fn(text: String, f: fn()) -> !this"},"alert":{"!effects":["call !2 this=!this"],"!type":"fn(text: String, title: String, f: fn()) -> !this"},"!proto":"!bc.SM.prototype"},"!url":""},"do_Global":{"!type":"fn()","prototype":{"getVersion":{"!type":"fn() -> Node"},"getFromPasteboard":{"!type":"fn() -> String"},"exit":{"!type":"fn()"},"setToPasteboard":{"!type":"fn(data: String) -> Boolean"},"install":{"!effects":["call !1 this=!this"],"!type":"fn(src: String, f: fn()) -> !this"},"getTime":{"!type":"fn(format: String) -> String"},"!proto":"!bc.SM.prototype","setMemory":{"!type":"fn(key: String, value: String)"},"getMemory":{"!type":"fn(key: String) -> String"},"getWakeupID":{"!type":"fn() -> String"}},"!url":""},"do_Network":{"!type":"fn()","prototype":{"getOperators":{"!type":"fn() -> String"},"getIP":{"!type":"fn() -> String"},"!proto":"!bc.SM.prototype","getStatus":{"!type":"fn() -> String"}},"!url":""}},"Boolean":"bool","Module":{"!type":"fn()","prototype":{"loaded":{"!doc":"","!type":"bool","!url":""},"parent":{"!doc":"","!type":"+Module","!url":""},"filename":{"!doc":"","!type":"string","!url":""},"children":{"!doc":"","!type":"[+Module]","!url":""},"exports":{"!doc":"","!type":"?","!url":""},"require":{"!doc":"","!type":"require","!url":""},"id":{"!doc":"","!type":"string","!url":""}}}}}}));