//---------------------------------------------------------------
//双向绑定
//这个不是真正的双向绑定，ui变化不会自动触发数据变化，反过来数据变化也不能自动触发ui的变化。
//只是提供了setData和getData方法来模拟。但是也很大的减少了多ui和数据的反复交互存取
//version: 1.0.0
//---------------------------------------------------------------
var core = require("do/core");
var d1 = require("deviceone");

var cached = {};

/**
 * 定义一个绑定的映射关系
 * 
 * @param root:当前ui的根节点，通常就是ui("$")
 * @param mapping:多ui的多属性和数据键的映射关系
 * @returns 返回一个唯一标示
 */
module.exports.define = function(root, mapping) {
	var binding_id = core.getUUID();
	cached[binding_id] = {
		"root" : root.getAddress(),
		"mapping" : mapping
	};
	return binding_id;
};

/**
 * 给ui的属性设置数据
 * 
 * @param binding_id:定义的绑定关系的唯一标示
 * @param data:设置的真实数据，是一个JsonObject
 */
module.exports.setData = function(binding_id, data) {
	var bind = cached[binding_id];
	bind.data = data;// 这个值保持下来
	for ( var m in bind.mapping) {
		var ms = m.split(".");
		var prop;
		if (ms.length == 1) {
			prop = ms[0];
			var d = {};
			d[prop] = data[bind.mapping[m]];
			d1.ui(bind.root).set(d);
		} else {
			prop = ms[1];
			var d = {};
			d[prop] = data[bind.mapping[m]];
			d1.ui(bind.root + "." + ms[0]).set(d);
		}
	}
};

/**
 * 获取当前所有ui属性的值
 * 
 * @param binding_id:定义的绑定关系的唯一标示
 * @returns 返回修改后的属性的值，是一个json object
 */
module.exports.getData = function(binding_id) {
	var bind = cached[binding_id];
	for ( var m in bind.mapping) {
		var ms = m.split(".");
		var prop;
		if (!bind.data)
			bind.data = {};
		if (ms.length == 1) {
			prop = ms[0];
			bind.data[bind.mapping[m]] = d1.ui(bind.root).get(prop);
		} else {
			prop = ms[1];
			bind.data[bind.mapping[m]] = d1.ui(bind.root + "." + ms[0]).get(
					prop);
		}
	}
	return bind.data;
};