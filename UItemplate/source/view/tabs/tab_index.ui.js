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
var hdtitle = "tab(顶部选项卡)";
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

/**
 * tab4
 */
var tabst = rootview.add("sttab","source://view/tabs/tab_top4.ui",0,148);
var tabstss = ui("sttab");
var tabpos = 1;
var tabtxt = ["00","01","02","03"];
var tabfire = [tabpos,tabtxt];//0:tab位置 1:文字内容
var btnsa1 = ui("do_Button_1"),btnsa2 = ui("do_Button_2"),btnsa3 = ui("do_Button_3");

tabstss.on("tabtop4",function(data){
	btnsa1.text = "四个tab"+"index="+data ;
});
tabstss.fire("tabtopb4",tabfire);

/**
 * tab3
 */
var tabst3 = rootview.add("sttab3","source://view/tabs/tab_top3.ui",0,348);
var tabstss3 = ui("sttab3");
tabstss3.on("tabtop3",function(data){
	btnsa2.text = "三个tab"+"index="+data ;
});
tabstss3.fire("tabtopb3",tabfire);
/**
 * tab2
 */
var tabst2 = rootview.add("sttab2","source://view/tabs/tab_top2.ui",0,548);
var tabstss2 = ui("sttab2");
tabstss2.on("tabtop2",function(data){
	btnsa3.text = "两个tab"+"index="+data ;
});
tabstss2.fire("tabtopb2",tabfire);