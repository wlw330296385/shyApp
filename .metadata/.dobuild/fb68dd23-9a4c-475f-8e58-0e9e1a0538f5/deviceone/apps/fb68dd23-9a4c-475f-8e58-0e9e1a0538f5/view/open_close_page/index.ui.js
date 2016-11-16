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
	close_me();
})
page.on("back", function(data) {
	close_me();
})

var label = ui("do_Label_2");
// 从index.ui.js传递过来的数据通过getData获取值，可直接返回json对象
var data = page.getData();
label.text = "从index.ui.js传递过来的数据通过getData获取值，可直接返回json对象 \n"
		+ JSON.stringify(data, null, 2);// 格式化

function close_me() {
	// 关闭自身，把数据传递回下一层page
	app.closePage("我是从open_close_page/index.ui关闭的时候传递过来的数据");
}