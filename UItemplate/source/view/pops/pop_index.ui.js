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
var hdtype=3;
//二.标题
var hdtitle = "POP-actionSheet";
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
 * 底部弹出
 */
var popbottom = rootview.add("bottompop", "source://view/pops/popImg.ui", 0, 0);
var popbottomf = ui("bottompop");
var popbtn = ui("do_Button_1");
popbtn.on("touch",function(){
	popbottomf.fire("popbottomSJ",true);
});
popbottomf.on("popbottomf",function(data){
	switch(parseInt(data)){
	case 0:
		nf.alert("点击相机");
		break;
	case 1:
		nf.alert("点击相册");
		break;
	}
});

/*
 * 底部文本输入
 */
var popinput = rootview.add("inputpop", "source://view/pops/pop_input.ui", 0, 0);
var popinputf = ui("inputpop");
var popinputbtn = ui("do_Button_2");
var piother = {istext:0,psw:true,hint:"提示内容呗!!",text:"哈哈哈哈",title:"输入弹出标题"}
popinputbtn.on("touch",function(){
	popinputf.fire("popinputon",piother);
});
popinputf.on("popinputfi",function(data){
	nf.alert(data);
	page.hideKeyboard();
});