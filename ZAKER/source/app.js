/*******************************************************************************
 * Author :
 * 
 * @Author Timestamp :
 * @Timestamp
 ******************************************************************************/
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function() {
	this.openPage("source://view/index.ui");
});

var initdata = d1.sm("do_InitData");
app.on("loaded", function() {
	initdata.copy([ "initdata://ding.json", "initdata://hua_2.json",
			"initdata://hua.json", "initdata://re.json",
			"initdata://wan_2.json", "initdata://wan_3.json",
			"initdata://wan_4.json", "initdata://wan_5.json",
			"initdata://wan.json" ], "data://", function() {
		app.openPage("source://view/index.ui");
	})
});
