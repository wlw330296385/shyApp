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
// 在memory/index.ui.js里获取值，可直接返回json对象
var global = sm("do_Global");
var content = {};
content.key1 = global.getMemory("key1");
content.key2 = global.getMemory("key2");
content.key3_2 = global.getMemory("key3")[1];
content.key4_k3 = global.getMemory("key4");

label.text = "在memory/index.ui.js里获取值，可直接返回json对象 \n"
		+ JSON.stringify(content, null, 2);// 格式化
