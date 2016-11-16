//related to login.ui
var page = sm("do_Page");
var app = sm("do_App");
var anim = require("anim");
var nf = sm("do_Notification");
var buttonA = mm("do_Animation", "BUTTONTOUCHDOWNS", "app");
var closebtn = ui("do_ALayout_close");
closebtn.on("touch","",300,function(){
	anim.animbtn(closebtn);
	app.closePage();
});
page.supportPanClosePage();


var textf1 = ui("do_TextField_1");
var textf2 = ui("do_TextField_2");

var logbg = ui("loginbg");
logbg.on("touch",function(){
	textf1.setFocus(false);
	textf2.setFocus(false);
	page.hideKeyboard();
});

//登录按下状态
var animLogYes = mm("do_Animator");
var propsLY = {width:120,x:240,bgColor:"A6EBFFFF"};
animLogYes.append(360,propsLY,"EaseOut");
//恢复状态
var animLogB = mm("do_Animator");
var propsB = {width:580,x:10,bgColor:"3BD1FFFF"};
animLogB.append(360,propsB,"EaseOut");

var lsuccess = 1; //状态

var logbtn = ui("do_Button_1");
var probar1=ui("do_ProgressBar_1");
logbtn.on("touch",function(){
	logbtn.animate(buttonA);
	if(textf1.text == ""&&textf2.text==""){
		nf.toast("输入账号|密码");
		textf1.setFocus(true);
	}else if(textf1.text == ""){
		nf.toast("输入账号");
		textf1.setFocus(true);
	}else if(textf2.text==""){
		nf.toast("输入密码");
		
		textf2.setFocus(true);
	}else{
		if(lsuccess==1){
			logbtn.animate(animLogYes);
			logbtn.text = "";
			logbtn.enabled = false;
			probar1.visible = true;
			textf1.enabled = false;
			textf2.enabled = false;
		}else{
			logbtn.animate(animLogB);
			logbtn.text = "登录";
			logbtn.enabled = true;
			probar1.visible = false;
			nf.toast("输入错误信息或者网络问题");
			textf1.enabled = true;
			textf2.enabled = true;
		}
	}
	page.hideKeyboard();
});