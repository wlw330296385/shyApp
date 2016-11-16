//related to index.ui
var app = sm("do_App");
var page = sm("do_Page");
var dialog = sm("do_Dialog");
var storage = sm("do_Storage");
var initdata = sm("do_InitData");
// //返回按钮
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})

// 简单窗口
var data1;
var button1 = ui("do_Button_1");
button1.on("touch", function() {
	if (!data1) {
		// 初始化简单输入窗口的数据
		data1 = {
			title : "窗口标题",
			hint : "输入的提示文字"
		}
	}
	// 打开这个窗口的时候把data1数据传递到pop_input.ui
	dialog.open("source://view/pop_input.ui", data1, function(data, e) {
		// 接受pop_input.ui关闭窗口时传递过来的数据并保存到data1
		if (data)
			data1.text = data;
	})
})

// 利用dialog模拟一个多选
var data2;
var button2 = ui("do_Button_2");
var json_path = "initdata://cars.json";// 本地缓存的数据
button2.on("touch", function() {
	if (!data2) {
		if (initdata.fileExist(json_path)) {
			data2 = initdata.readFileSync(json_path);
		}
	}
	// 打开这个窗口的时候把data1数据传递到cars/index.ui
	dialog.open("source://view/cars/index.ui", data2, function(data, e) {
		// 接受cars/index.ui关闭窗口时传递过来的数据并保存到data2
		if (data)
			data2 = data;
	})
})