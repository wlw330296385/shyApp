/**
 * related to share.ui
 * 
 * @Author : marxch
 * @Timestamp : 2016-08-28
 */
var do_Page = sm("do_Page");
var WX = sm("do_TencentWX");
var QQ = sm("do_TencentQQ");
var do_Global = sm("do_Global");
var do_Storage = sm("do_Storage");
var do_InitData = sm("do_InitData");
var do_Notification = sm("do_Notification");
var do_UMengAnalytics = sm("do_UMengAnalytics");

var sharebg = ui("sharebg");
var shareBox = ui("shareBox");
var do_Button_Back = ui("do_Button_Back");
var do_ShareBox = ui("do_ShareBox");
//下载图片用
var do_Http = mm("do_Http");
do_Http.timeout = 3000;
do_Http.contentType = "application/json";
do_Http.on("success", function(data) {
	shareParam.img = "data://shareImage.png";
});
//安装有哪些分享APP
var listdata = mm("do_ListData");
do_ShareBox.bindItems(listdata);
do_ShareBox.rebound();
if(WX.isWXAppInstalled()){//微信已经安装
	listdata.addData([
	    {"title":"微信朋友圈","img":"source://image/share/pengyouquan.png","type":"WXPYQ","imgBgColor":"5DBA2BFF","bgColor":"5DBA2BFF","border":"5DBA2BFF,1,[60,60,60,60]"},
	    {"title":"微信好友","img":"source://image/share/weixin.png","type":"WXHY","imgBgColor":"5DBA2BFF","bgColor":"5DBA2BFF","border":"5DBA2BFF,1,[60,60,60,60]"}]);
}
listdata.addData([
    {"title":"QQ好友","img":"source://image/share/QQ.png","type":"QQHY","imgBgColor":"00A8FFFF","bgColor":"00A8FFFF","border":"00A8FFFF,1,[60,60,60,60]"},
    {"title":"QQ空间","img":"source://image/share/Qzone.png","type":"QQKJ","imgBgColor":"00A8FFFF","bgColor":"00A8FFFF","border":"00A8FFFF,1,[60,60,60,60]"}]);
do_ShareBox.refreshItems();
//遮罩显示
var animMaskShow = mm("do_Animator");
var propsMS = {bgColor:"000000AA"};
animMaskShow.append(200,propsMS,"EaseOut");
//面板显示
var animPanelShow = mm("do_Animator");
var propsPS = {y:870};
animPanelShow.append(200,propsPS,"EaseOut");
//遮罩隐藏
var animMaskHide = mm("do_Animator");
var propsMH = {bgColor:"00000000"};
animMaskHide.append(200,propsMH,"EaseIn");
//面板隐藏
var animPanelHide = mm("do_Animator");
var propsPH = {y:1334};
animPanelHide.append(200,propsPH,"EaseIn");
var shareParam = null;
do_Page.on("openShare",function(data){
	shareParam = data;
	if(!shareParam.img){
		do_InitData.copy([ "initdata://logo.png" ],
				"data://", function() {
			shareParam.img = "data://logo.png";
		});
	}else if(shareParam.img.indexOf('http://')>=0){//如果有图片，并且是http://路径，那么下载
		var shareParamFile = "data://" + shareParam.img.substr(shareParam.img.lastIndexOf('/'));
		deviceone.print(shareParamFile,'shareParamFile');
		if(do_Storage.fileExist(shareParamFile)){
			shareParam.img = shareParamFile;
		}else{
			do_Http.url = shareParam.img;
			do_Http.download(shareParamFile);
		}
	}
	//deviceone.print(JSON.stringify(data));
	do_Page.off("back");
	do_Page.on("back",function(){//双击退出
		close();
	});
	sharebg.visible = true;
	sharebg.animate(animMaskShow);
	shareBox.animate(animPanelShow);
});
function close(){
	do_Page.off("back");
	do_Page.fire("closeShare",null);
	shareBox.animate(animPanelHide);
	sharebg.animate(animMaskHide,function(){
		sharebg.visible = false;
	});
}
do_Button_Back.on("touch",function(){
	close();
});
//遮罩事件
sharebg.on("touch","",300,function(){
	close();
});
//订阅GridView的touch点击事件
do_ShareBox.on("touch", function(data) {
	close();
	if(do_Global.getMemory("netWorkStatus") == 'NONE'){
		do_Notification.toast("没有网络");
		return;
	}
	var type = listdata.getOne(data).type;
	switch(type){
		case "WXPYQ":
			WXPYQ();
			break;
		case "WXHY":
			WXHY();
			break;
		case "QQHY":
			QQHY();
			break;
		case "QQKJ":
			QQKJ();
			break;
	}
});
//scene : 0：分享到微信好友；1：分享到微信朋友圈
//type : 0：默认，图文分享；1：纯图分享，只支持本地图片；2：音乐分享
function WXPYQ(){
	//这里要有等待窗
	WX.share({appId:"", scene:"1", type:"0", title:shareParam.title, content:shareParam.content, url:shareParam.url, image:shareParam.img}, function(data, e){
		if(data){
			do_Notification.toast("分享成功");
			do_UMengAnalytics.eventLog( "shareSuccess", {"msg":"分享成功"} );
		}else{
			do_Notification.toast("分享失败");
			do_UMengAnalytics.eventLog( "shareFailure", {"msg":"分享失败"} );
		}
	});
}
function WXHY(){
	WX.share({appId:"", scene:"0", type:"0", title:shareParam.title, content:shareParam.content, url:shareParam.url, image:shareParam.img}, function(data, e){
		if(data){
			do_Notification.toast("分享成功");
			do_UMengAnalytics.eventLog( "shareSuccess", {"msg":"分享成功"} );
		}else{
			do_Notification.toast("分享失败");
			do_UMengAnalytics.eventLog( "shareFailure", {"msg":"分享失败"} );
		}
	});
}
//0：默认，图文分享；1：纯图分享，只支持本地图；2：音乐分享；3：应用分享
function QQHY(){
	QQ.shareToQQ("", 0, shareParam.title, shareParam.url, shareParam.img,shareParam.content, function(data, e) {
		if(data){
			do_Notification.toast("分享成功");
			do_UMengAnalytics.eventLog( "shareSuccess", {"msg":"分享成功"} );
		}else{
			do_Notification.toast("分享失败");
			do_UMengAnalytics.eventLog( "shareFailure", {"msg":"分享失败"} );
		}
    });
}
function QQKJ(){
	QQ.shareToQzone("",0,shareParam.title,shareParam.url,shareParam.img,shareParam.content, function(data, e) {
		if(data){
			do_Notification.toast("分享成功");
			do_UMengAnalytics.eventLog( "shareSuccess", {"msg":"分享成功"} );
		}else{
			do_Notification.toast("分享失败");
			do_UMengAnalytics.eventLog( "shareFailure", {"msg":"分享失败"} );
		}
    });
}