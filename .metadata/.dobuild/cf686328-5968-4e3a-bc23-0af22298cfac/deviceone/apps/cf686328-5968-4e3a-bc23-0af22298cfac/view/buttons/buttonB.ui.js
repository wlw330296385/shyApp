//related to buttonBig.ui
var page = sm("do_Page");
var nf = sm("do_Notification");
var root = ui("$");

//animateyes
var animtabyes= mm("do_Animator");
var propstabyes = {alpha:0.6};
var propstabyes1 = {alpha:1};
animtabyes.append(200, propstabyes, "EaseOut");
animtabyes.append(100, propstabyes1, "EaseOut");

var bback = ui("btn_backs");
var bigbtn = ui("do_Button_b");
//touch事件
bigbtn.on("touch",function(){
	bigbtn.animate(animtabyes);
});

root.on("buttonbb",function(data){
	root.visible = data.isShow;
	bigbtn.text = data.ftxt;
	bigbtn.fontSize = data.fsize;
	bigbtn.fontColor = data.fcolor;
	bigbtn.bgColor = data.bcolor;
	bigbtn.width = data.bwidth;
	bigbtn.height = data.bheight;
	bback.width = (data.bwidth) + 20;
	bback.height = data.bheight + 20;
	
	bigbtn.redraw();
	bback.redraw();
	
});
