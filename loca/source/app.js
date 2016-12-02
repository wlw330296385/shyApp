/**
 * @Author : deviceone
 * @Timestamp : 2016-10-26
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");
var global = d1.sm("do_Global");
var storage = d1.sm('do_Storage');
var do_LocalNotification = d1.sm('do_LocalNotification');
var userInfo,token;
var contentText = "您的积分已经更新,重新登录进入用户中心可以看到,赶快[点我登录]吧!";
var contentTitle = "积分更新提示";
var extra = {"isLogin":0};
do_LocalNotification.addNotify("2016-11-20 11:29:59", "loginPerOneDay", contentText, contentTitle, extra, "Day");
app.on("loaded", function () {
	app.openPage("source://view/index.ui");
});

global.on("launch",function(data,e) {

})