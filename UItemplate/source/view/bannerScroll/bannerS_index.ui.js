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
var hdtitle = "banner(轮播图)";
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
 * 因为slideview目前无法直接通过index操作切换过渡.组件支持后增加!
 * banner轮播( 高度300px ) .默认设置最多6个圆点. 需要增加在banner.ui中增加 圆点数量
 */
var bannerScroll = rootview.add("crollbanner","source://view/bannerScroll/banner.ui",0,148);
var bannerScrollf = ui("crollbanner");
var bimgs=[{"template" : 0,"imgs":"http://www.dcloud.io/hellomui/images/muwu.jpg","path":"123132"},
           {"template" : 0,"imgs":"http://www.dcloud.io/hellomui/images/cbd.jpg","path":"43243234"},
           {"template" : 0,"imgs":"http://www.dcloud.io/hellomui/images/yuantiao.jpg","path":"65456456"}
           ];
bannerScrollf.fire("bannerSc",bimgs);