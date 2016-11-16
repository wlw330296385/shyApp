/**
 * @Author : and
 * @Timestamp : 2016-09-27
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function() {
	app.openPage({
		"source" : "source://view/index.ui",
		"animationType" : "slide_r2l_1",
		"statusBarState" : "transparent"
	});
});
