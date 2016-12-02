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
var do_LocalNotification = d1.sm('do_LocalNotification');
var userInfo,token;
var contentText = "您的积分已经更新,重新登录进入用户中心可以看到,赶快[点我登录]吧!";
var contentTitle = "积分更新提示";
var extra = {"isLogin":0};
do_LocalNotification.addNotify("2016-11-14 00:40:59", "loginPerOneDay", contentText, contentTitle, extra, "Day");

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
//	if (data.type == "localNotification")
//	{	do_LocalNotification.removeNotify();
//		app.openPage("source://view/login/login1.ui");
//	}else{
//		if(userInfo.code == 0){
//			app.openPage({ 
//	        	source : "source://view/login/login1.ui",
//	        	id:'login'});
//		}else if(userInfo.code == 1){
//			app.openPage({ 
//	        	source : "source://view/index/index.ui",
//	        	id:'index'});
//		}else{
//			app.openPage({ 
//	        	source : "source://view/welcome/welcome.ui",
//	        	id:'index'});
//		}	
//	}
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