/**
 * New DeviceOne File
 */
var d1 = require("deviceone");//需要加载deviceone的核心js库
//加密
module.exports.lockIt = lockIt;
//module.exports.keyIt = keyIt;


var key1 = ['k','l','f','r','t','z','d','n','v','c','w','q','s','a','i','p','e','g','o','x','b','m','y','j'];
var myDate = new Date();
function lockIt(num){	
	var m = 1000000000001+Number(num);
	var min = myDate.getMinutes();
	var min1,min2;
	if(min >= 10){	
		min = min.toString();	
		min1 = min.substr(0,1);
		min2 = min.substr(1,1);
	}else{
		min1 = 0;
		min2 = min;
	}
	return key1[myDate.getHours()]+key1[min1]+key1[min2]+m;
}