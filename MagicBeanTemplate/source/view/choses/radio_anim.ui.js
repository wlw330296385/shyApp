//related to radio_anim.ui
var page = sm("do_Page");
var root = ui("$");
var nf = sm("do_Notification");
var animradioshow = mm("do_Animation");
animradioshow.fillAfter = true;
animradioshow.scale({
	duration : 360,
	scaleFromX : 2,
    scaleFromY : 2,
    curve : "EaseOut",
    scaleToX : 1,
    scaleToY : 1,
    pivotX : 0.5,
    pivotY : 0.5
},"idsc");
animradioshow.alpha({
    duration : 360,
    curve : "EaseOut",
    alphaFrom : 0,
    alphaTo : 1
}, "idal");

var radiobox = ui("radio_box");
var radiobg = ui("radio_bg");
var radiopoint = ui("radio_point");

//radiobox.on("touch",function(){
//	if(radiobox.tag == 0){
//		radiobg.bgColor = "00CC33FF";
//		radiopoint.animate(animradioshow);
//		radiopoint.bgColor = "00CC33ff";
//	}
//});

root.on("radioget",function(data){
	radiobox.tag = data;
	if(radiobox.tag == 1){
		radiobg.bgColor = "00CC33FF";
		radiopoint.animate(animradioshow);
		radiopoint.bgColor = "00CC33ff";
	}else{
		radiobg.bgColor = "D0D0D0FF";
		radiopoint.bgColor = "00CC3300";
	}
});