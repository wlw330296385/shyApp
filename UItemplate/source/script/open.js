var deviceone = require("deviceone");
var app = deviceone.sm("do_App");

var statBarS = "transparent";
var animType = "push_r2l_1";
//浅色背景使用(状态栏字颜色黑);
module.exports.startl = function(source, data, id){
    var option = {source: source};
    if (data) option.data = data;
    option.statusBarFgColor = "black";
    option.statusBarState = statBarS;
    option.animationType = animType;
    if(id) option.id = id;
    app.openPage(option);
};
//深色背景使用(状态栏字颜色白);
module.exports.startd = function(source, data, id){
    var option = {source: source};
    if (data) option.data = data;
    option.statusBarFgColor = "white";
    option.statusBarState = statBarS;
    option.animationType = animType;
    if(id) option.id = id;
    app.openPage(option);
};
