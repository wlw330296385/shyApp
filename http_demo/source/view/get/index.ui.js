//related to index.ui
var app = sm("do_App");
var page = sm("do_Page");
var util = require("util");
var nf = sm("do_Notification");

util.init("close");

ui("do_ALayout_4").add("response_id", "source://view/template.ui", 12, 154);
var hashdata = mm("do_HashData");
ui("response_id").bindData(hashdata);

var host = page.getData();
function init_http() {
	var http = mm("do_Http");
	http.method = "GET";
	http.url = "http://" + host + "/testget?a=x&b=2";
	http.setRequestHeader("test1", "value1");
	http.setRequestHeader("test2", "value2");
	http.on("result", function(data) {
		deviceone.print(JSON.stringify(data));
		var response = util.getResponseData(data);
		hashdata.addData(response);
		ui("response_id").refreshData();
	}).on("fail", function(data) {
		nf.alert(JSON.stringify(data));
	})
	return http;
}
var http = init_http();

var button1 = ui("test");
button1.on("touch", function() {
	http.request();
})