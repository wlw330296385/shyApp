/**
 * @Author : 18507717466
 * @Timestamp : 2016-11-04
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function () {
	app.openPage("source://view/index.ui");
});
