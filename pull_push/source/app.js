/**
 * @Author : 
 * @Timestamp : 2016-09-03
 */

var g_deviceone = require("deviceone");
var g_app = g_deviceone.sm("do_App");
var g_global = g_deviceone.sm("do_Global");

//全局变量初始化
g_global.setMemory("logintime", new Date());

g_app.on("loaded", function() {
	g_app.openPage("source://view/discoverfm/discv_main.ui");
});
