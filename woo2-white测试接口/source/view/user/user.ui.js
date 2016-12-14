/**
 * related to user.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-03
 */
var app, page, notify,storage,core,userInfo,global,shareImgUrl,shareUrl,kess,token;
global = sm('do_Global');
notify = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");
storage = sm('do_Storage');
core = require('do/core');
kess = require('kess');
var external = sm("do_External");
var userInfo;
var userTel;
var addOilCard = ui('do_ALayout_69');
addOilCard.on('touch',function(){
	if(userInfo.data.id_verify == 0 ){
		core.toast("请先绑定身份证");
		return false;
	}
	app.openPage('source://view/user/addOilCard.ui','addOilCard');
})
//身份证认证
var addIdentityCard = ui('do_ALayout_73');
addIdentityCard.on('touch',function(){
	if(userInfo.data.id_verify != 0 ){
		app.openPage('source://view/user/addIdentityCarded.ui','addIdentityCarded');
	}else{
		app.openPage('source://view/user/addIdentityCard.ui','addIdentityCard');	
	}
	
})
//二维码
var dialog = sm('do_Dialog');
//生成个人二维码
var http2 = mm('do_Http');
http2.method = "post";
http2.on('success',function(result){
	if(result.code == 0){
		core.toast(result.message);
	}
})
http2.on('fail',function(result){
	core.toast(result.message);
})
//分享个人二维码

ui('do_ALayout_88').on('touch',function(){

	var shareData  = {
			'shareUrl':"http://api.e-shy.com/index.php/index/promote/registerWeb.html?r="+userTel,
			'shareImgUrl':"http://api.e-shy.com/uploads/r/"+userTel+'-qr.png'
	}
	dialog.open("source://view/dialog/share.ui",shareData,true);
})
//绑定数据
page.on("getData",function(){
	userInfo = storage.readFileSync('data://userInfo',true);
	if(userInfo.code != 1){
		app.openPage("source://view/login/login1.ui");
		return false;
	}
	userTel = userInfo.data.mobile;
	token = kess.lockIt(userInfo.data.id);
	http2.url = "http://api.e-shy.com/index.php/index/share/qrcode/token/"+token;
	http2.request();
	ui('do_Label_5').text = userInfo.data.username;
	if(userInfo.data.avatar == 0){
		ui('do_ImageView_2').source = "source://image/por.png";//头像
	}else{
		ui('do_ImageView_2').source = userInfo.data.avatar;
	}	
	shareUrl = "http://api.e-shy.com/index.php/index/promote/registerWeb.html?r="+userInfo.data.mobile;
	ui('do_Label_20').text = userInfo.data.oil_score;//油卡积分
	ui('do_Label_22').text = userInfo.data.score;//购物积分
	ui('do_Label_24').text = userInfo.data.commission;//推广积分
	ui('do_Label_26').text = userInfo.data.royalty;//提成
	ui('do_Label_4').text = userInfo.data.level_name;//等级
})

//重新登录后拉下刷新绑定数据
ui('do_ScrollView_6').on('pull',function(data){
	  if(data.state==2)
	    {
		  page.fire('getData');
	       this.rebound();
	    }
})

ui('do_ALayout_74').on('touch',function(){
	core.alert('抱歉,该功能正在开放当中');
})
ui('do_ALayout_77').on('touch',function(){
	external.openDial("400-960-3998");
});

//注销登录
ui('do_ALayout_89').on('touch',function(){
	var confirmData = {
			"title":"提示",
			"content":"确认注销并且重新登录?",
			"btn1":"取消",
			"btn2":"确定"
	};
	dialog.open("source://view/dialog/confirm.ui",confirmData,function(dialogData,e){
		var outData = {
				"code":0
		}
		if (dialogData == 1){
			storage.writeFile("data://userInfo",outData,true,function(boo){
				if(boo){
					core.toast('注销成功');
					app.openPage("source://view/login/login1.ui");
				}else{
					core.toast('注销失败');
				}
			})				
		}
	})
})

//更新信息
page.on('resume',function(){
	var info = page.getData();
	if(info == 'login'){
		page.fire('getData');
	}
})
//添加银行卡
ui('do_ALayout_75').on('touch',function(){
	if(userInfo.code == 1){
		app.openPage("source://view/user/addBankcard.ui");
	}else{
		app.openPage("source://view/login/login1.ui");
		return false;
	}
	
})
//添加地址
ui('do_ALayout_90').on('touch',function(){
	if(userInfo.code == 1){
		app.openPage("source://view/user/addAddress.ui");
	}else{
		app.openPage("source://view/login/login1.ui");
		return false;
	}
})

//我的夺宝
//ui('do_ALayout_91').on('touch',function(){
//	if(userInfo.code == 1){
//		app.openPage("source://view/duobao/my_duobao.ui");
//	}else{
//		app.openPage("source://view/login/login1.ui");
//		return false;
//	}
//})