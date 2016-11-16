//---------------------------------------------------------------
//提供日期时间相关的工具类方法
//version: 1.0.0
//---------------------------------------------------------------
var core=require("do/core");

//---------------------------------------------------------------
// 格式化时间
module.exports.format = function(_time, _format){	
	//if (typeof(_time))
};


//时间日期格式转换1466697600000转换为2016-06-24
Date.prototype.format = function (format) { 
	var o = { 
		"M+": this.getMonth() + 1, 
		"d+": this.getDate(), 
		"h+": this.getHours(), 
		"m+": this.getMinutes(), 
		"s+": this.getSeconds(), 
		"q+": Math.floor((this.getMonth() + 3) / 3), 
		"S": this.getMilliseconds() 
	} 
	if (/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); 
	} 
	for (var k in o) { 
		if (new RegExp("(" + k + ")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)); 
		} 
	} 
	return format; 
}
module.exports.getSmpFormatDateByLong = function(l){
	var date = new Date(l); 
	return date.format("yyyy-MM-dd");
}
