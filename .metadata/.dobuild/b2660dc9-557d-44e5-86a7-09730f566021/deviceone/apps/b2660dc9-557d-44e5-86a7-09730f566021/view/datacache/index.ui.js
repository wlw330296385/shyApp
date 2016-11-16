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
// 在datacache/index.ui.js里获取值，可直接返回json对象
var datacache = sm("do_DataCache");
var content = {};
content.key1 = datacache.loadData("key1");
content.key2_3 = datacache.loadData("key2")["k3"];

label.text = "datacache/index.ui.js里获取值，可直接返回json对象 \n"
		+ JSON.stringify(content, null, 2);// 格式化
