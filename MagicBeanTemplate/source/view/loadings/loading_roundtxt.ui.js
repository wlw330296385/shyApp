//related to loading_roundtxt.ui
var page = sm("do_Page");
var nf = sm("do_Notification");
var animloadingshow = mm("do_Animation");
animloadingshow.fillAfter = true;
animloadingshow.scale({
	duration : 260,
	scaleFromX : 0,
    scaleFromY : 0,
    curve : "EaseInOut",
    scaleToX : 1,
    scaleToY : 1,
    pivotX : 0.5,
    pivotY : 0.5
},"idsc");
animloadingshow.alpha({
    duration : 260,
    curve : "EaseInOut",
    alphaFrom : 0,
    alphaTo : 1
}, "idal");
//
var animloadinghide = mm("do_Animation");
animloadinghide.fillAfter = true;
animloadinghide.scale({
	duration : 260,
	scaleFromX : 1,
    scaleFromY : 1,
    curve : "EaseInOut",
    scaleToX : 0,
    scaleToY : 0,
    pivotX : 0.5,
    pivotY : 0.5
},"idsc");
animloadinghide.alpha({
    duration : 260,
    curve : "EaseInOut",
    alphaFrom : 1,
    alphaTo : 0
}, "idal");


var loadingbox = ui("do_ALayout_1");
var loadingback = ui("laodingrxback");

page.on("loadingrxa",function(data){
	loadingback.tag = data;
	if(loadingback.tag == "1"){
		loadingback.visible = true;
		loadingbox.animate(animloadingshow);
	}else{
		loadingbox.animate(animloadinghide,function(){
			loadingback.visible = false;
		});
	}
});
