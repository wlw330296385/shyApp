/*******************************************************************************
 * Author :
 * 
 * @Author Timestamp :
 * @Timestamp
 ******************************************************************************/
var d1 = require("deviceone");
var app = d1.sm("do_App");
var initdata = d1.sm("do_InitData");
app.on("loaded", function() {
	initdata.copy([ "initdata://update.zip", "initdata://version.txt" ],
			"data://", function() {
				app.openPage({
					source : "source://view/index.ui",
					statusBarState : "transparent"
				});
			})
});
