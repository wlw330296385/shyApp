/**
 * related to goods_5.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-12-01
 */
var app,page,core,storage,userInfo;
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
storage = sm('do_Storage');
userInfo = storage.readFileSync("data://userInfo",true);
//中石化
ui('do_Button_3').on('touch',function(){
	if(userInfo.code == 1){
		app.openPage('source://view/charge/webCharge.ui','2');
	}else{
		app.openPage("source://view/login/login1.ui");
	}
})
//中石化
ui('do_Button_2').on('touch',function(){
	if(userInfo.code == 1){
		app.openPage('source://view/charge/webCharge.ui','1');
	}else{
		app.openPage("source://view/login/login1.ui");
	}
})
//夺宝
ui('do_Button_1').on('touch',function(){
//	page.fire('toDB');
	core.alert('商城正在建设中');
})
//移动话费充值
ui('do_Button_6').on('touch',function(){
	if(userInfo.code == 1){
		app.openPage('source://view/charge/webCharge.ui','3');
	}else{
		app.openPage("source://view/login/login1.ui");
	}
})

//联通话费充值
ui('do_Button_5').on('touch',function(){
	if(userInfo.code == 1){
		app.openPage('source://view/charge/webCharge.ui','4');
	}else{
		app.openPage("source://view/login/login1.ui");
	}
})
//电信充值
ui('do_Button_4').on('touch',function(){
	if(userInfo.code == 1){
		app.openPage('source://view/charge/webCharge.ui','5');
	}else{
		app.openPage("source://view/login/login1.ui");
	}
})
//套餐充值
ui('do_Button_7').on('touch',function(){
	if(userInfo.code == 1){
		app.openPage('source://view/charge/webCharge.ui','6');
	}else{
		app.openPage("source://view/login/login1.ui");
	}
})

//保险
ui('do_Button_8').on('touch',function(){
	core.alert('功能正在建设中');
})
var style=require("do/style");
style.css([ui('do_Button_1'),ui('do_Button_2'),ui('do_Button_3'),ui('do_Button_4'),ui('do_Button_5'),ui('do_Button_6'),ui('do_Button_7'),ui('do_Button_8')]);

page.on('result',function(){
	userInfo = storage.readFileSync("data://userInfo",true);
})


