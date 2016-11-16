var d1 = require("deviceone");
// 声明

module.exports.init = init;

var app = d1.sm("do_App");
var page = d1.sm("do_Page");

function init(ui_id) {
	var close = d1.ui(ui_id);
	close.on("touch", function() {
		app.closePage();
	})
	page.on("back", function(data) {
		app.closePage();
	})
	var main = d1.ui("$");
	main.on("touch", function() {
		page.hideKeyboard();
	})
}
