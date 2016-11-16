//related to badgeround.ui
var root = ui("$");
var anim = require("anim");
var conbgbox = ui("do_ALayout_1");
conbgbox.on("touch",function(){
	//空白事件，防止点击穿透底层
});
//遮罩显示
var animMaskShow = mm("do_Animator");
var propsMS = {bgColor:"00000044"};
animMaskShow.append(320,propsMS,"EaseOut");
//面板显示
var animPanelShow = mm("do_Animator");
var propsPS = {y:934,alpha:1};
animPanelShow.append(320,propsPS,"EaseOut");
//遮罩隐藏
var animMaskHide = mm("do_Animator");
var propsMH = {bgColor:"00000000"};
animMaskHide.append(320,propsMH,"EaseOut");
//面板隐藏
var animPanelHide = mm("do_Animator");
var propsPH = {y:1334,alpha:0.8};
animPanelHide.append(320,propsPH,"EaseOut");

var page = sm("do_Page");
var paneler = ui("do_ALayout_1");

//自定义事件---打开
root.on("popbottomSJ",function(data){
	bgmask.visible = data;
	bgmask.animate(animMaskShow);
	paneler.animate(animPanelShow);
});
//遮罩事件
var bgmask = ui("maskbg");
bgmask.on("touch","",300,function(){
	bgmask.animate(animMaskHide,function(){
		bgmask.visible = false;
	});
	paneler.animate(animPanelHide);
});
//取消事件
var canel = ui("do_Button_canel");
canel.on("touch","",300,function(){
	anim.animbtn1(canel);
	bgmask.animate(animMaskHide,function(){
		bgmask.visible = false;
	});
	paneler.animate(animPanelHide);
	
});

//拍照
var btncamera = ui("do_Button_1");
btncamera.on("touch","",300,function(){
	anim.animbtn1(btncamera);
	root.fire("popbottomf",0);
});
//拍照
var btnAlbum = ui("do_Button_2");
btnAlbum.on("touch","",300,function(){
	anim.animbtn1(btnAlbum);
	root.fire("popbottomf",1);
});