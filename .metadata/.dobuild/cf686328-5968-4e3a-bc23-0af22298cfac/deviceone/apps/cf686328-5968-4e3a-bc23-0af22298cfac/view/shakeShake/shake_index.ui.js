//related to header_index.ui
var rootview = ui("$");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var anim = require("anim");
//添加头部到当前UI
var headerTitle = rootview.add("titleHeader","source://view/header/header_title.ui",0,0);
var headerTitleStyle = ui("titleHeader");
//一.标题样式(显示标题类型)
var hdtype=1;
//二.标题
var hdtitle = "摇一摇";
//三.0.close方式(0.layer||1.ID) 1.传递内容 2.关闭动画 3.(layer层数|ID)
var closeEvent = [0,"传递数据","",1];
//四.0.rightrightImg 1.rightleftImg
var btnImg = ["source://image/rightright.png","source://image/rightleft.png"];
//五.是否开启IOS手势关闭page  0.不开启 1.开启
var handback = 1;

//0.显示按钮(0:文字,1:关闭按钮,2:关闭+文字+右边,3.关闭+文字+右边x2)
//1.标题文字内容
//2.closePage事件参数
//3.图片路径
var condata=[hdtype,hdtitle,closeEvent,btnImg,handback];
headerTitleStyle.fire("headertitle",condata);

//RR事件
var headerRR = ui(headerTitle + ".rightright");
headerRR.on("touch","",300,function(){
	anim.animbtn(headerRR);
	nf.alert("rr");
});

/*
*摇一摇
*/
var animup= mm("do_Animator");
var propsup = {height:0};
var propsup1 = {height:250};
animup.append(400, propsup, "EaseOut");
animup.append(500, propsup1, "EaseIn");

var animdwon= mm("do_Animator");
var propsdwon = {height:0,y:500};
var propsdwon1 = {height:250,y:250};
animdwon.append(400, propsdwon, "EaseOut");
animdwon.append(500, propsdwon1, "EaseIn");

var shaklayup = ui("do_ALayout_3");
var shaklaydown = ui("do_ALayout_4");

var accelerometer = sm("do_AccelerometerSensor");
var audio = sm("do_Audio");
accelerometer.on("shake",function(){
	shaklayup.animate(animup);
	shaklaydown.animate(animdwon,function(){
		nf.alert("哒哒哒");
	});
	
	audio.play("source://image/6930.wav", 0);
});
audio.on("playFinished",function(){
	audio.stop();
})