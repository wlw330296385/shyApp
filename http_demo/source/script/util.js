var d1 = require("deviceone");
// 声明

module.exports.init = init;
module.exports.getResponseData = getResponseData;
module.exports.printJSON = printJSON;

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
}

function getResponseData(data) {
	var d = {};
	var obj = JSON.parse(data.data);
	d["status"] = "返回status:" + data.status;
	d["request_header"] = "返回request的header:\n" + printJSON(obj.request.header);
	d["request_parameters"] = "返回request的parameters:\n"
			+ printJSON(obj.request.parameters);
	d["request_body"] = "返回request的body:\n" + printJSON(obj.request.body);
	d["response_header"] = "返回response的header:\n"
			+ printJSON(obj.response.header);
	d["response_data"] = "返回response的data:\n" + printJSON(obj.response.data);
	return d;
}
function printJSON(obj) {
	if (typeof obj == "string")
		return obj;
	var a = "";
	for ( var x in obj) {
		a = a + x + "=" + obj[x] + "\n";
	}
	return a;
}