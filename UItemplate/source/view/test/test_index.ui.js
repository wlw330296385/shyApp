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
var hdtitle = "测试";
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



////////手势
var laybox = ui("do_ALayout_1");
var gestruet = ui("do_GestureView_1");
var labes = ui("do_Label_1");

//记录手指按下的xy位置
gestruet.on("touchDown",function(datad){
	deviceone.xx = datad.x;
	deviceone.yy = datad.y;
});
	gestruet.on("move",function(data,e){
		var moveposx = laybox.x;
		var moveposy = laybox.y;
		var figx = deviceone.xx;
		var figy = deviceone.yy;
		
		//实际移动
		laybox.x = data.x+moveposx-figx;
		laybox.y = data.y+moveposy-figy;
		
		//文字显示手指按下位置
		labes.text = figx+":"+figy;
		
		//设定移动的范围
		if(laybox.y<148){
			laybox.y = 148;
			laybox.redraw();
		}
		laybox.redraw();
	});


//复位
var btn11 = ui("do_Button_1");
btn11.on("touch",function(){
	laybox.x = 50;
	laybox.y = 300;
	laybox.redraw();
});


/*
 * 传感器
 */
var accelerometer = sm("do_AccelerometerSensor");
var lab2 = ui("do_Label_2");
var imgsa = ui("do_ImageView_1");
accelerometer.on("shake",function(){
	nf.toast("摇起来了");
});
accelerometer.on("change",function(data){
	//lab2.text = data;
	//var x = parseFloat(data.x).toFixed(2);
	//var y = parseFloat(data.y).toFixed(2);
	var x = data.x;
	var y = data.y;
	
	imgsa.x = parseFloat(-60-+(x*20)).toFixed(2);
	imgsa.y = parseFloat(860+-(y*20)).toFixed(2);
	imgsa.redraw();
	lab2.text = imgsa.x+":"+imgsa.y;
});