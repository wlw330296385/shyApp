/**
 * @Author : childyu
 * @Timestamp : 2016-08-24
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");
var global = d1.sm("do_Global");
var nf = d1.sm("do_Notification");


app.on("loaded", function () {
	app.openPage("source://view/index.ui");
});


//实例化JPush组件
var jpush = d1.sm("do_JPush")

//订阅JPush的事件
jpush.on("didConnect",function(data,e){
	var Type = typeof(data);
	d1.print(" 返回值类型：" + Type + " 返回值：" + JSON.stringify(data) + " 错误信息：" + JSON.stringify(e) , "didConnect 事件 ");
})
jpush.on("didLogin",function(data,e){
	var Type = typeof(data);
	d1.print(" 返回值类型：" + Type + " 返回值：" + JSON.stringify(data) + " 错误信息：" + JSON.stringify(e) , "didLogin 事件 ");
})
jpush.on("didClose",function(data,e){
	var Type = typeof(data);
	d1.print(" 返回值类型：" + Type + " 返回值：" + JSON.stringify(data) + " 错误信息：" + JSON.stringify(e) , "didClose 事件 ");
})
jpush.on("message",function(date,e) {
	//应用运行在前台时，收到推送消息会触发该事件
	app.openPage("source://view/2.ui");
})
jpush.on("customMessage",function(date,e) {
	//应用运行在前台时，收到自定义推送消息会触发该事件
	app.openPage("source://view/3.ui");
})
jpush.on("messageClicked",function(date,e) {
	//应用运行在前台时，收到推送消息会触发该事件
	app.openPage("source://view/1.ui");
})

global.on("launch",function(date,e) {
	//应用被不同情况启动时，data.type值不相同，此时使用被推送唤醒的情况
	//应用退出时，收到推送消息会触发该事件	
//	if (data.type == "notification")
//	{
//		app.openPage("source://view/0.ui");
//	}
})
