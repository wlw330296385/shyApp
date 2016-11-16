//related to index.ui
var app = sm("do_App");
var page = sm("do_Page");
var util = require("util");
var nf = sm("do_Notification");
var storage = sm("do_Storage");

util.init("close");

ui("do_ALayout_4").add("response_id", "source://view/template.ui", 12, 154);
var hashdata = mm("do_HashData");
ui("response_id").bindData(hashdata);

var host = page.getData();
function init_http() {
	var http = mm("do_Http");
	http.url = "http://" + host + "/testdownload";
	http.setRequestHeader("test1", "value1");
	http.setRequestHeader("test2", "value2");

	http.on(
			"result",
			function(data) {
				storage.readFile("data://1.txt", function(obj, e) {
					deviceone.print(JSON.stringify(obj));
					var d = {};
					d["request_header"] = "返回request的header:\n"
							+ util.printJSON(obj.request.header);
					d["request_parameters"] = "返回request的parameters:\n"
							+ util.printJSON(obj.request.parameters);
					d["request_body"] = "返回request的body:\n"
							+ util.printJSON(obj.request.body);
					d["response_header"] = "返回response的header:\n"
							+ util.printJSON(obj.response.header);
					d["response_data"] = "返回response的data:\n"
							+ util.printJSON(obj.response.data);
					hashdata.addData(d);
					ui("response_id").refreshData();
				})
			}).on("fail", function(data) {
		nf.alert(JSON.stringify(data));
	})
	return http;
}
function init_test1() {
	var http = init_http();
	http.method = "GET";
	var button = ui("test1");
	button.on("touch", function() {
		http.download("data://1.txt");
	})
}
init_test1();

function init_test2() {
	var http = init_http();
	http.method = "POST";
	http.contentType = "application/x-www-form-urlencoded";
	http.body = "name=and&race=NightElf&性别=男";
	var button = ui("test2");
	button.on("touch", function() {
		http.download("data://1.txt");
	})
}
init_test2();

function init_test3() {
	var button = ui("test3");
	button.on("touch", function() {
		nf.alert("do nothing")
	})
}
init_test3();