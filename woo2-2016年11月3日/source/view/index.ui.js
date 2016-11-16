/**
 * related to index.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-02
 */
//我也防止穿透
var welcome = ui('welcome');
var notify = sm("do_Notification");
var app = sm('do_App');
var page = sm('do_Page');
var storage = sm('do_Storage');
var core = require('do/core');
var global = sm("do_Global");
var userInfo;
page.on("loaded",function(){
	//设备信息
	userInfo = storage.readFileSync("data://userInfo",true);
	if(userInfo.code == 0){
		app.openPage({ 
        	source : "source://view/login/login.ui",
        	id:'login'});
	}
	if(userInfo.code == 1){
		app.openPage({ 
        	source : "source://view/index/index.ui",
        	id:'index'});
	}else{
		app.openPage({ 
        	source : "source://view/welcome/welcome.ui",
        	id:'index'});
	}
});

//退出程序
var pagejs = require('do/page');
pagejs.allowExit();	