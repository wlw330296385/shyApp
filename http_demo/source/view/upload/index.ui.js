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
	http.method = "POST";
	http.url = "http://" + host + "/testupload";
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
function init_test1() {
	var http = init_http();
	http.contentType = "multipart/form-data";
	var button = ui("test1");
	button.on("touch", function() {
		http.upload("source://view/upload/index.ui");
	})
}
init_test1();

function init_test2() {
	var http = init_http();
	http.contentType = "multipart/form-data";
	var button = ui("test2");
	button.on("touch", function() {
		http.upload("source://image/close.png");
	})
}
init_test2();

function init_test3() {
	var http = init_http();
	http.contentType = "multipart/form-data";
	var button = ui("test3");
	button.on("touch", function() {
		http.upload("source://view/upload/index.ui","test");
	})
}
init_test3();