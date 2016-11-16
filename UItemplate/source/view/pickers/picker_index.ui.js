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
var hdtype=2;
//二.标题
var hdtitle = "picker(选择)";
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

/*
 * add picker1
 */
var picker1 = rootview.add("1picker","source://view/pickers/picker1.ui",0,0);
var picker1r = ui("1picker");
//RR事件
var ptitle={"title":"选择地区","ppos":deviceone.ppos}
var pdata=["北京","内蒙古","新疆","西藏"];
var pcount = [ptitle,pdata];
var headerRR = ui(headerTitle + ".rightright");
picker1r.on("picker1f",function(data){
	deviceone.ppos = data[0];
	nf.alert(data);
});
headerRR.on("touch","",300,function(){
	anim.animbtn(headerRR);
	picker1r.fire("picker1",pcount);
});

/*
 * add picker3
 */
var picker3 = rootview.add("3picker","source://view/pickers/picker3.ui",0,0);
var picker3r = ui("3picker");
var titleppos3={"title":"选择时间","ppos3":deviceone.ppos3}
var p3data1=["中国","美国"];
var p3data2=["内蒙古自治区","河北省"];
var p3data3=["锡林浩特","多伦"];
var pcount3 = [titleppos3,p3data1,p3data2,p3data3];

var btn1 = ui("do_Button_1");
picker3r.on("picker3f",function(data){
	deviceone.ppos = data[0];
	nf.alert(data);
});
btn1.on("touch",function(){
	anim.animbtn(btn1);
	picker3r.fire("picker3",pcount3);
});