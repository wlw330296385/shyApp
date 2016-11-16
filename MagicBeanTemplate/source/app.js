/**********************************************
 * Author : @Author
 * Timestamp : @Timestamp
 **********************************************/
var deviceone = require("deviceone");
var app = deviceone.sm("do_App");

//关闭按钮动画
var closebtnAim = deviceone.mm("do_Animation", "CLOSEBTNDWON", "app");
closebtnAim.fillAfter = true;
closebtnAim.alpha({
    delay: 0,
    duration: 150,
    curve: "Linear",
    alphaFrom: 1,
    alphaTo: 0.2
});
//Alpha效果
var buttonA = deviceone.mm("do_Animation", "BUTTONTOUCHDOWNS", "app");
buttonA.alpha({
    delay: 0,
    duration: 150,
    curve: "EaseInOut",
    repeatCount: "",
    autoReverse: true,
    fillAfter: false,
    alphaFrom: 1,
    alphaTo: .5
});

app.on("loaded", function () {
	this.openPage({
    	source : "source://view/index.ui",
    	statusBarState : "transparent",
    	statusBarFgColor : "black",
    	id:"pageIndex"
    });
});