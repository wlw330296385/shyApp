//related to loading_roundtxt.ui
var page = sm("do_Page");
var nf = sm("do_Notification");
var root = ui("$");

//遮罩显示
var animMaskShow = mm("do_Animator");
var propsMS = {bgColor:"00000044"};
animMaskShow.append(300,propsMS,"EaseOut");
//面板显示
var animPanelShow = mm("do_Animator");
var propsPS = {y:280,alpha:1};
animPanelShow.append(300,propsPS,"EaseOut");
//遮罩隐藏
var animMaskHide = mm("do_Animator");
var propsMH = {bgColor:"00000000"};
animMaskHide.append(300,propsMH,"EaseOut");
//面板隐藏
var animPanelHide = mm("do_Animator");
var propsPH = {y:400,alpha:0};
animPanelHide.append(300,propsPH,"EaseOut");

var textfeid = ui("do_TextField_1");
var popimgbox = ui("do_ALayout_1");
var popimgback = ui("laodingrxback");
var popimgtitle = ui("do_Label_title");
root.on("popinputon",function(data){
	textfeid.setFocus(true);
	if(data.istext==0){
		textfeid.text = "";
	}else{
		textfeid.text = data.text;
	}
	popimgtitle.text = data.title;
	textfeid.hint = data.hint;
	textfeid.password = data.psw;
	
	popimgback.visible = true;
	popimgback.animate(animMaskShow);
	popimgbox.animate(animPanelShow);
});

popimgback.on("touch","",300,function(){
	
});
var btncanel = ui("do_Button_1");
btncanel.on("touch","",300,function(){
	popimgbox.animate(animPanelHide);
	popimgback.animate(animMaskHide,function(){
		popimgback.visible = false;
	});
	textfeid.setFocus(false);
});
var btnyes = ui("do_Button_2");
btnyes.on("touch","",300,function(){
	popimgbox.animate(animPanelHide);
	popimgback.animate(animMaskHide,function(){
		popimgback.visible = false;
	});
	textfeid.setFocus(false);
	root.fire("popinputfi",textfeid.text);
});
