//related to index.ui
//定义2个全局变量
deviceone.checked = "source://image/checked.png";
deviceone.unchecked = "source://image/unchecked.png";

var storage = sm("do_Storage");
var page = sm("do_Page");
var dialog = sm("do_Dialog");
var listdata = mm("do_ListData");
var listview = ui("listview");

// 通过dilaog的getData方法获取到从index.ui传递过来的数据
// 并赋值给组件的属性
var data = dialog.getData();
listdata.addData(data);
listview.bindItems(listdata);
listview.refreshItems();

// 自定义一个myorder事件，接受从cell传递过来的数据
page.on("myorder", function(d) {
	// 更新第index行的数据
	var cell_data = listdata.getOne(d.index);
	cell_data.checked = d.checked;
	cell_data.count = d.count;
	// 再更新listdata
	listdata.updateOne(d.index, cell_data);
})

var cancel_button = ui("do_Button_2");
cancel_button.on("touch", function() {
	dialog.close();
})
var ok_button = ui("do_Button_3");
ok_button.on("touch", function() {
	// 只有点确定按钮的时候，再把多选的内容传递回index.ui
	dialog.close(listdata.getRange(0));
})