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
global.on("launch",function(data,e) {
	jpush.setIconBadgeNumber(0);
		app.openPage({ 
	    	source : "source://view/index/index.ui",
	    	id:"index",
//	    	animationType:"fade"
		});
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

