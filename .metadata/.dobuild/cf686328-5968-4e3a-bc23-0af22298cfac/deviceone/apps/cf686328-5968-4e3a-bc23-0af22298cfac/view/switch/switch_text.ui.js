var page = sm("do_Page");
var root = ui("$");
var nf = sm("do_Notification");
//animateyes open位置
var animyes= mm("do_Animator");
var propsyes1 = {x:66};
animyes.append(150, propsyes1, "EaseIn");
//animateyes close位置
var animno= mm("do_Animator");
var propsno = {x:8};
animno.append(150, propsno, "EaseIn");
//animategreen 绿色
var animcoloryes= mm("do_Animator");
var propscoloryes = {bgColor:"4CD964ff"};
animcoloryes.append(150, propscoloryes, "EaseIn");
//animategray 灰色
var animcolorno= mm("do_Animator");
var propscolorno = {bgColor:"E0E0E0FF"};
animcolorno.append(150, propscolorno, "EaseIn");
//switch切换开关
var swbox = ui("switch_box");
var swbg = ui("switch_bg");
var swbtn = ui("switch_btn");

root.on("switchzt",function(data){
	swbox.tag = data[0];
	root.fire("switchtag",swbox.tag);//fire
	if(swbox.tag==0){
		swbtn.text = data[1];
		swbtn.x =8; swbtn.redraw();
		swbtn.fontColor = "888888ff";
		swbg.bgColor = "E0E0E0FF";
	}else{
		swbtn.text = data[2];
		swbtn.x =66; swbtn.redraw();
		swbtn.fontColor = "4CD964ff";
		swbg.bgColor = "4CD964ff";
	}
	
	//按下事件
	swbox.on("touch",function(){
		if(swbg.bgColor == "E0E0E0FF"){
			swbox.tag = 1;
			swbtn.animate(animyes,function(){
				swbtn.text = data[2];
			});
			swbg.animate(animcoloryes,function(){
				swbtn.fontColor = "4CD964ff";
				swbg.bgColor = "4CD964ff";
			});
			
		}else{
			swbox.tag = 0;
			swbtn.animate(animno,function(){
				swbtn.text = data[1];
			});
			swbg.animate(animcolorno,function(){
				swbtn.fontColor = "888888ff";
				swbg.bgColor = "E0E0E0FF";
			});
		}
		root.fire("switchtag",swbox.tag);
	});
});