//引入相关的组件库
var app = sm("do_App");
var global = sm("do_Global");
var device = sm("do_Device");
//引入当前视图中的相关UI控件
var do_ImageView_content = ui("do_ImageView_content");
var do_Label_welcome = ui("do_Label_welcome");
 
//定义一个2秒的动画过程：缩放比例1-》1.2，图片位置：(0,0)-》(-75, -133)
var img_anima = mm("do_Animation");
img_anima.fillAfter = true;
img_anima.scale({
    delay: 0,
    duration: 2000,
    curve: "Linear",
    autoReverse: false,
    scaleFromX: 1,
    scaleFromY: 1,
    scaleToX: 1.2,
    scaleToY: 1.2
}, "start1");
img_anima.transfer({
    delay: 0,
    duration: 2000,
    curve: "Linear",
    autoReverse: false,
    fromX: 0,
    fromY: 0,
    toX: -75,
    toY: -133
}, "start2");
//在定义一个1.8秒的动画过程：文字翻转
var label_anima = mm("do_Animation");
label_anima.fillAfter = true;
label_anima.rotate({
    delay: 0,
    duration: 1800,
    curve: "EaseIn",
    repeatCount:1,
    autoReverse: false,
    fromDegree: 0,
    toDegree: 360
}, "start3");

//启动动画，并在第1个动画结束后打开新的页面：main.ui
do_ImageView_content.animate(img_anima, function(){
	app.openPage({
		source:"source://view/index.ui", 
		statusBarState:"transparent",
		animationType: "fade"		
	});
});
do_Label_welcome.animate(label_anima);