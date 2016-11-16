//related to buttonBig.ui
var buttonA = deviceone.mm("do_Animation", "BUTTONTOUCHDOWNS", "app");
var bigbtn = ui("do_Button_big");
bigbtn.on("touch",function(){
	bigbtn.animate(buttonA);
});