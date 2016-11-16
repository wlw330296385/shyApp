//related to loading_roundtxt.ui
var page = sm("do_Page");
var nf = sm("do_Notification");
var root = ui("$");

//面板显示
var animPanelShow = mm("do_Animator");
var propsPS = {y:10,alpha:1};
animPanelShow.append(300,propsPS,"EaseOut");
//面板隐藏
var animPanelHide = mm("do_Animator");
var propsPH = {y:30,alpha:0};
animPanelHide.append(300,propsPH,"EaseOut");

var loadingbox = ui("do_ALayout_1");
var loadingback = ui("laodingrxback");
var loadingtxt = ui("do_Label_1");
root.on("loadingrxa",function(data){
	loadingback.tag = data[0];
	loadingtxt.text = data[1];
	if(loadingback.tag == 1){
		loadingback.visible = true;
		loadingbox.animate(animPanelShow);
	}else{
		loadingbox.animate(animPanelHide,function(){
			loadingback.visible = false;
		});
	}
});
