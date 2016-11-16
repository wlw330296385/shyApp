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
var hdtitle = "ExpandableListView";
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

//数据
var storage = sm("do_Storage");

var explist = ui("do_ExpandableListView_1");
var expData1 = mm("do_ListData");
var expData2 = mm("do_ListData");
var data1 = [
             {"gtxt":"G1"},
             {"gtxt":"G2"},
             {"gtxt":"G3"},
             {"gtxt":"G4"},
             {"gtxt":"G5"}
            ];
var data2 = [
             [{"ctitle":"标1","cbtitle":"副标1"},{"ctitle":"标11","cbtitle":"副标11"},{"ctitle":"标111","cbtitle":"副标111"}],
             [{"ctitle":"标2","cbtitle":"副标2"},{"ctitle":"标22","cbtitle":"副标22"},{"ctitle":"标222","cbtitle":"副标222"}],
             [{"ctitle":"标3","cbtitle":"副标3"},{"ctitle":"标11","cbtitle":"副标11"},{"ctitle":"标111","cbtitle":"副标111"}],
             [{"ctitle":"标4","cbtitle":"副标4"},{"ctitle":"标11","cbtitle":"副标11"},{"ctitle":"标111","cbtitle":"副标111"}],
             [{"ctitle":"标5","cbtitle":"副标5"},{"ctitle":"标11","cbtitle":"副标11"},{"ctitle":"标111","cbtitle":"副标111"}]
             ];
expData1.addData(data1);
expData2.addData(data2);
explist.bindItems(expData1,expData2);

