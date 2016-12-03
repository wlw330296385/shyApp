/**
 * @Author : 18507717466
 * @Timestamp : 2016-10-01
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");
var global = d1.sm("do_Global");
var core = require('do/core');
var kess = require('kess');
var storage = d1.sm('do_Storage');
var userInfo;
var jpush = d1.sm("do_JPush");
var dialog = d1.sm('do_Dialog');
//订阅JPush的事件
jpush.on("didConnect",function(data1,e){
//已连接
//	var Type = typeof(data);
	})
jpush.on("didLogin",function(data2,e){
//	返回登陆成功后的RegistrationID
//	var Type = typeof(data);
	})
jpush.on("didClose",function(data3,e){
//	未连接
//	var Type = typeof(data);
	})
jpush.on("message",function(data4,e) {
	core.p(data4,'data4');
})
jpush.on("customMessage",function(data5,e) {
	core.p(data5,'data5');
})
jpush.on("messageClicked",function(data6,e) {
	jpush.setIconBadgeNumber(0);
	var extra = JSON.parse(data6.extra);
	core.p(extra,'extra');
	if(extra.act == 'web'){
		var webData = {"url":extra.url,"title":extra.title};
		app.openPage("source://view/web/web.ui",JSON.stringify(webData));
	}
	if(extra.act == 'rec'){
		dialog.open("source://view/dialog/rec.ui",extra);
	}
})

global.on("launch",function(data,e) {
	jpush.setIconBadgeNumber(0);
	userInfo = storage.readFileSync("data://userInfo",true);	
	if(userInfo == ''){
		app.openPage({ 
	    	source : "source://view/welcome/welcome.ui",
	    	id:'welcome'
		});
	}else{
		app.openPage({ 
	    	source : "source://view/index/index.ui",
	    	id:'index'
		});
	}
})