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
var device = sm("do_Device");
var global = sm("do_Global");
var deviceInfo = device.getInfo();
var userInfo;
//欢迎动画
welcome.on('touch',function(){
	
})

//关闭动画

var animation = mm('do_Animation');
animation.fillAfter = true;
animation.scale({
	delay:2500,
    duration : 600,
    scaleFromX : 1,
    scaleFromY : 1,
    scaleToX : 1.5,
    scaleToY : 1.5,
    pivotX : 0.5,
    pivotY : 0.5
},'id1');
animation.alpha({
	delay:2500,
    duration : 600,
    alphaFrom : 1,
    alphaTo : 0
}, "id2");

//动画结束打开登陆页面
//page.on("loaded",function(){
//    welcome.animate(animation,function(){
//    	storage.readFile('data://userInfo',function(readData, e) {
//			if(readData.code == 1)	{
//				app.openPage({ 
//	            	source : "source://view/index/index.ui",
//	            	id:'index'});
//			}else{
//				app.openPage({ 
//	            	source : "source://view/login/login.ui",
//	            	id:'login'});
//			}
//		})
//            
//    })
//})



page.on("loaded",function(){
	//设备信息
//	core.p(deviceInfo);
	if(deviceInfo.OS=="android"){
		global.setMemory("equipment", 0);
	}else{
		global.setMemory("equipment", 1);
	}
	welcome.animate(animation,function(){
    	userInfo = storage.readFileSync("data://userInfo");
			if(userInfo.code == 1)	{
				app.openPage({ 
	            	source : "source://view/index/index.ui",
	            	id:'index'});
			}else{
				app.openPage({ 
	            	source : "source://view/login/login.ui",
	            	id:'login'});
			}
});

});

//退出程序
var pagejs = require('do/page');
pagejs.allowExit();	