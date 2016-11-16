//related to tab_top3.ui
var nf = sm("do_Notification");
var page = sm("do_Page");
var root = ui("$");
var tabbox = ui("tabtopbox");
var tabtn1 = ui("do_btntype1"),tabtn2 = ui("do_btntype2"), tabtn3 = ui("do_btntype3");
var btnList = [ui("do_btntype1"),ui("do_btntype2"),ui("do_btntype3")];
tabbox.tag;
//animateyes
var animtabyes= mm("do_Animator");
var propstabyes = {bgColor:"0278feff"};
animtabyes.append(200, propstabyes, "EaseIn");
//animateno
var animtabno= mm("do_Animator");
var propstabno = {bgColor:"ffffff00"};
animtabno.append(200, propstabno, "EaseIn");

root.fire("tabtop",tabbox.tag);
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
	root.fire("tabtop3",tabbox.tag);
};
root.on("tabtopb3",function(data){
	tabbox.tag = data[0];
	
	//默认tab位置
	for(var i=0;i<btnList.length;i++){
		btnList[i].text = data[1][i]; //tab文字
		if(i!=tabbox.tag){
			btnList[i].fontColor = "0278feff";
			btnList[i].animate(animtabno);
		}else{
			btnList[i].fontColor = "FFFFFFFF";
			btnList[i].animate(animtabyes);
			tabbox.tag = btnList[i].tag;
		}
	}
	root.fire("tabtop3",tabbox.tag);
});
