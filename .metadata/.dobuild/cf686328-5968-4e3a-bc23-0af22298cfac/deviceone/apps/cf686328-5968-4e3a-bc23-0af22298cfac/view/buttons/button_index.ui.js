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
var hdtitle = "button(按钮)";
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
 * button
 */
var buttonb = rootview.add("bbutton","source://view/buttons/buttonB.ui",0,200);
var buttonbd = ui("bbutton");
//0:默认true(true,false)1:文字 2:字体大小3:文字颜色  4:背景颜色 5:按钮宽 6:按钮高
var btnf = {isShow:true,ftxt:"哈哈哈",fsize:40,fcolor:"FF6600FF",bcolor:"EABB19FF",bwidth:730,bheight:120};
buttonbd.fire("buttonbb",btnf);
var btntc = ui(buttonb + ".do_Button_b");
btntc.on("touch","",300,function(){
	nf.alert("按钮touch事件");
});

//button2 line
var buttonb2 = rootview.add("bbutton2","source://view/buttons/buttonB_outLine.ui",100,400);
var buttonbd2 = ui("bbutton2");
var btnf2 = {ftxt:"look like",fsize:40,bwidth:500,bheight:120};
buttonbd2.fire("buttonbb",btnf2);