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
var hdtitle = "Bluetooth(蓝牙)";
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


//蓝牙
var bluetooth = mm("do_Bluetooth");
var openbt = ui("do_Button_1");
var openbtntxt = ui("do_Label_1");
var conectbt = ui("do_Button_2");
var conectbttxt = ui("do_Label_2");
var writebt = ui("do_Button_3");

var writetxt= "测试蓝牙打印是否正常工作";
//打开蓝牙
openbt.on("touch",function(){
	if(openbt.text == "打开蓝牙"){
		openbt.text = "关闭蓝牙";
		openbtntxt.text = "关闭蓝牙";
		bluetooth.open();
	}else{
		openbt.text = "打开蓝牙";
		openbtntxt.text = "打开蓝牙";
		bluetooth.close();
	}
	
});
bluetooth.on("scan",function(data){
	deviceone.add = data[0].address;
	deviceone.na = data[0].name;
	nf.alert(deviceone.add+":"+deviceone.na);
});
//连接蓝牙

conectbt.on("touch",function(){
	var adds = deviceone.add;
	var nae = deviceone.na;
	//nf.alert(adds+":"+nae);
	bluetooth.connect(adds, nae,function(data){
		conectbttxt.text = data;
	});
});
//打印
writebt.on("touch",function(){
	var adds = deviceone.add;
	nf.alert(writetxt+":"+adds);
	bluetooth.write(writetxt, adds);
});
bluetooth.on("characteristicChanged",function(data){
	nf.alert("特征改变:"+data);
});
bluetooth.on("connectionStateChange",function(data){
	nf.alert("网络状态改变事件:"+data);
});