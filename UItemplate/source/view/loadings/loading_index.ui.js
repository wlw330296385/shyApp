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
var hdtype = 1;
//二.标题
var hdtitle = "loading加载";
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
 * loadinground
 */
var loadingblack = rootview.add("blackloading","source://view/loadings/loading_round.ui",0,300);
var lbss = ui("blackloading");
/**
 * loadingrect
 */
var loadingrect= rootview.add("rectloading","source://view/loadings/loading_rect.ui",0,600);
var rectss = ui("rectloading");
/**
 * switch
 */
var switchtxt = rootview.add("txtswitch","source://view/switch/switch_text.ui",100,900);
var switchtxtS = ui("txtswitch");
var swtxt = [1,"off","on"]; //0:开关状态  1:关闭状态文字 2:开启状态文字

switchtxtS.on("switchtag",function(data){
	//nf.alert(data);
	var lbsstxt = [data,"加载文字"];
	lbss.fire("loadingrxa",lbsstxt);
	var rectsstxt = [data,"正在打开微信"];
	rectss.fire("loadingrect",rectsstxt);
});
switchtxtS.fire("switchzt",swtxt);