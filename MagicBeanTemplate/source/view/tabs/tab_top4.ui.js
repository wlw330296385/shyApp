//related to tab_top3.ui
var nf = sm("do_Notification");
var page = sm("do_Page");
var tabbox = ui("tabtopbox");
var btnList = [ui("do_btntype1"),ui("do_btntype2"),ui("do_btntype3"),ui("do_btntype4")];
tabbox.tag = 0;
//animateyes
var animtabyes= mm("do_Animator");
var propstabyes = {bgColor:"0278feff"};
animtabyes.append(200, propstabyes, "EaseIn");
//animateno
var animtabno= mm("do_Animator");
var propstabno = {bgColor:"ffffffff"};
animtabno.append(200, propstabno, "EaseIn");

btnList.forEach(function(dc,i){
	dc.on("touch","",300, function(datac, e) {
		paytouch(i);
	});
});

var paytouch = function(index){
	for(var i=0;i<btnList.length;i++){
		if(i!=index){
			btnList[i].fontColor = "0278feff";
			btnList[i].animate(animtabno);
			
		}else{
			btnList[i].fontColor = "FFFFFFFF";
			btnList[i].animate(animtabyes);
			tabbox.tag = btnList[i].tag;
		}
	}
	page.fire("tabtop4",tabbox.tag);
};