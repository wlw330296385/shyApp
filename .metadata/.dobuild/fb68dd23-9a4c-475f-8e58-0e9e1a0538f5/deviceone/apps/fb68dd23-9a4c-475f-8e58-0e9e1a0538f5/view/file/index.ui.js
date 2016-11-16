/*******************************************************************************
 * Author :
 * 
 * @Author Timestamp :
 * @Timestamp
 ******************************************************************************/
var page = sm("do_Page");
var close = ui("close");
var app = sm("do_App");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})

var label = ui("do_Label_2");
// 在file/index.ui.js里读取file1和file2获取值
var storage = sm("do_Storage");
var content = {};
// 同步读文件
content.key1 = storage.readFileSync("data://file1");
// 异步读文件
storage.readFile("data://file2", function(data, e) {
	content.key2_k3 = data["k3"];
	label.text = "在file/index.ui.js里读取file1和file2获取值\n"
			+ JSON.stringify(content, null, 2);// 格式化
})
