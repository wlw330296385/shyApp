/**
 * @Author : logo_qy@163.com
 * @Timestamp : 2016-08-12
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function () {
			app.openPage({
				"source":"source://view/index1.ui",
		        "statusBarState": "transparent"
			});
});
