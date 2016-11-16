/**
 * @Author : childyu
 * @Timestamp : 2016-08-24
 */
var nf = sm("do_Notification");
var jpush = sm("do_JPush");

var btn_get = ui("get");
var btn_set = ui("set");
var btn_getRID = ui("getRID");
var btn_stop = ui("stop");
var btn_resume = ui("resume");

btn_get.on("touch", function() {
	var num = jpush.getIconBadgeNumber();
	nf.alert(num,"getIconBadgeNumber");
});

btn_set.on("touch", function() {
	jpush.setIconBadgeNumber({quantity:20});
	nf.alert("setIconBadgeNumber = 20");
});

//获取RegistrationID，用于个推
btn_getRID.on("touch", function() {
	var RID = jpush.getRegistrationID();
	nf.alert(RID,"getRegistrationID");
});

btn_stop.on("touch", function() {
	jpush.stopPush();
	nf.alert("stopPush");
});

btn_resume.on("touch", function() {
	jpush.resumePush();
	nf.alert("resumePush");
});
