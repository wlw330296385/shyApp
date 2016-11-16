//---------------------------------------------------------------
//提供Date类的常用扩展函数
//version: 1.0.0
//---------------------------------------------------------------

//---------------------------------------------------------------
/**
 * 格式化输出字符串
 * @param _format 指定的转换格式，默认为:yyyy-MM-dd
 */
Date.prototype.format = function (_format) { 
	_format=_format||"yyyy-MM-dd";
	var o = { 
		"M{1,2}": this.getMonth() + 1, 
		"d{1,2}": this.getDate(), 
		"h{1,2}": this.getHours(), 
		"m{1,2}": this.getMinutes(), 
		"s{1,2}": this.getSeconds(), 
		"q{1,2}": Math.floor((this.getMonth() + 3) / 3), 
		"S": this.getMilliseconds() 
	} 
	if (/(y{2,4})/.test(_format)) { 
		_format = _format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); 
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(_format)) {
			_format = _format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)); 
		}
	}
	return _format; 
}

