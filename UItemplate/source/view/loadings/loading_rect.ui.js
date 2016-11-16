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
//滚动条
var animloadingleft = mm("do_Animation");
animloadingleft.fillAfter = false;
animloadingleft.transfer({
	duration : 1600,
	fromX : -120,
	fromY : 0,
	repeatCount:-1,
    toX : 580,
    toY : 0
},"lleft");
var loadingLimg = ui("do_ImageView_1");
loadingLimg.animate(animloadingleft);

var loadingbox = ui("do_ALayout_2");
var loadingback = ui("laodingrxback");
var loadingtxt = ui("do_Label_2");
root.on("loadingrect",function(data){
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
