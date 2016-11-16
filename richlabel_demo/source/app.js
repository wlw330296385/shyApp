/**
 * @Author : and
 * @Timestamp : 2016-06-30
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function () {
	app.openPage({
		source : "source://view/index.ui",
		statusBarState : "transparent"
	});
});
