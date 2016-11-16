/**
 * related to user.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-03
 */

var app, page, notify,storage,core,userInfo,global;
global = sm('do_Global');
notify = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");
storage = sm('do_Storage');
core = require('do/core');
var external = sm("do_External");
var userInfo;
var addOilCard = ui('do_ALayout_69');

addOilCard.on('touch',function(){
	app.openPage('source://view/user/addOilCard.ui','addOilCard');
})

var addIdentityCard = ui('do_ALayout_73');
addIdentityCard.on('touch',function(){
	if(userInfo.data.id_verify == 0 ){
		app.openPage('source://view/user/addIdentityCard.ui','addIdentityCard');
	}else{
		app.openPage('source://view/user/addIdentityCarded.ui','addIdentityCarded');
	}
	
})

//绑定数据
page.on("getData",function(){
	userInfo = storage.readFileSync('data://userInfo');
	ui('do_Label_5').text = userInfo.data.referer_name;
	ui('do_ImageView_2').source = userInfo.data.avatar;
})
page.fire('getData');
ui('do_ALayout_74').on('touch',function(){
	core.alert('抱歉,现在还不能提现');
})
ui('do_ALayout_77').on('touch',function(){
	external.openDial("400-960-3998");
})
//退出程序
var pagejs = require('do/page');
pagejs.allowExit();	