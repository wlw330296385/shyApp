var page = sm("do_Page");
var root = ui("$");
var nf = sm("do_Notification");
//animateyes open位置
var animyes= mm("do_Animator");
var propsyes = {width:160};
var propsyes1 = {x:85,width:78};
animyes.append(200, propsyes, "EaseIn");
animyes.append(150, propsyes1, "EaseIn");
//animateyes close位置
var animno= mm("do_Animator");
var propsno = {x:8,width:160};
var propsno1 = {width:78};
animno.append(200, propsno, "EaseIn");
animno.append(150, propsno1, "EaseIn");
//animategreen 绿色
var animcoloryes= mm("do_Animator");
var propscoloryes = {bgColor:"4CD964ff"};
animcoloryes.append(350, propscoloryes, "EaseIn");
//animategray 灰色
var animcolorno= mm("do_Animator");
var propscolorno = {bgColor:"E0E0E0FF"};
animcolorno.append(350, propscolorno, "EaseIn");
//switch切换开关
var swbox = ui("switch_box");
var swbg = ui("switch_bg");
var swbtn = ui("switch_btn");
swbox.tag = 0;
swbox.on("touch",function(){
	if(swbg.bgColor == "E0E0E0FF"){
		swbox.tag = 1;
		swbtn.animate(animyes,function(){
			swbtn.text = "ON";
		});
		swbg.animate(animcoloryes,function(){
			swbtn.fontColor = "4CD964ff";
			swbg.bgColor = "4CD964ff";
		});
		
	}else{
		swbox.tag = 0;
		swbtn.animate(animno,function(){
			swbtn.text = "OFF";
		});
		swbg.animate(animcolorno,function(){
			swbtn.fontColor = "888888ff";
			swbg.bgColor = "E0E0E0FF";
		});
	}
	page.fire("switchtag",swbox.tag);
});

root.on("switchzt",function(data){
	swbox.tag = data;
	if(swbox.tag==0){
		swbtn.text = "OFF";
		swbtn.x =5; swbtn.redraw();
		swbtn.fontColor = "888888ff";
		swbg.bgColor = "E0E0E0FF";
	}else{
		swbtn.text = "ON";
		swbtn.x =85; swbtn.redraw();
		swbtn.fontColor = "4CD964ff";
		swbg.bgColor = "4CD964ff";
	}
});