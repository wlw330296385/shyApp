/**********************************************
 * Author : @Author
 * Timestamp : @Timestamp
 **********************************************/
var deviceone = require("deviceone");
var app = deviceone.sm("do_App");

app.on("loaded", function () {
    this.openPage({
    	source : "source://view/index.ui",
    	statusBarState : "transparent",
    	statusBarFgColor : "black",
    });
});

//Alpha效果
var buttonA = deviceone.mm("do_Animation", "BUTTONTOUCHDOWNS", "app");
buttonA.alpha({
    delay: 0,
    duration: 100,
    curve: "Linear",
    repeatCount: "",
    autoReverse: true,
    fillAfter: false,
    alphaFrom: 1,
    alphaTo: .4
});