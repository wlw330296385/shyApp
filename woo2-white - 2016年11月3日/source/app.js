/**
 * @Author : 18507717466
 * @Timestamp : 2016-10-01
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");
var global = d1.sm("do_Global");
var core = require('do/core');
var storage = d1.sm('do_Storage');
var userInfo;
app.on("loaded", function () {
	//设备信息
	userInfo = storage.readFileSync("data://userInfo",true);
	if(userInfo.code == 0){
		app.openPage({ 
        	source : "source://view/login/login.ui",
        	id:'login'});
	}else if(userInfo.code == 1){
		app.openPage({ 
        	source : "source://view/index/index.ui",
        	id:'index'});
	}else{
		app.openPage({ 
        	source : "source://view/welcome/welcome.ui",
        	id:'index'});
	}
});


//消息推送
//实例化JPush组件
var jpush = d1.sm("do_JPush");

//订阅JPush的事件
jpush.on("didConnect",function(data1,e){
//已连接
//	var Type = typeof(data);
//	d1.print(" 返回值类型：" + Type + " 返回值：" + JSON.stringify(data) + " didConnect：" + JSON.stringify(e) , "didConnect 事件 ");
})
jpush.on("didLogin",function(data2,e){
//	返回登陆成功后的RegistrationID
//	var Type = typeof(data);
//	d1.print(" 返回值类型：" + Type + " 返回值：" + JSON.stringify(data) + " didClose：" + JSON.stringify(e) , "didLogin 事件 ");
})
jpush.on("didClose",function(data3,e){
//	未连接
//	var Type = typeof(data);
//	d1.print(" 返回值类型：" + Type + " 返回值：" + JSON.stringify(data) + " didClose：" + JSON.stringify(e) , "didClose 事件 ");
})
jpush.on("message",function(data4,e) {
	core.p(data4,'data4');
//	("应用运行在前时，收到推送消息会触发该事件");
})
jpush.on("customMessage",function(data5,e) {
	core.p(data5,'data5');
//	("应用运行在前台时，收到自定义推送消息会触发该事件");
})
jpush.on("messageClicked",function(data6,e) {
	core.p(data6,"data6");
	var extra = JSON.parse(data6.extra);
	var webData = {"url":extra.url,"title":extra.title};
	app.openPage("source://view/web/web.ui",JSON.stringify(extra));
})

global.on("launch",function(date,e) {
	//应用被不同情况启动时，data.type值不相同，此时使用被推送唤醒的情况
	//应用退出时，收到推送消息会触发该事件	
//	if (data.type == "notification")
//	{
//		app.openPage("source://view/0.ui");
//	}
})