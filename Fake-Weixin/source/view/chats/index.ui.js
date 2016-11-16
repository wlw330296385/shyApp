//related to index.ui
var storage = sm("do_Storage");
var listdata = mm("do_ListData");
var listview = ui("listview");
var json_path = "initdata://chats/chat.json";// 本地缓存的数据
var initdata = sm("do_InitData");

if (initdata.fileExist(json_path)) {
	initdata.readFile(json_path, function(data, e) {
		// deviceone.print(JSON.stringify(data));
		listdata.addData(data);
		listview.bindItems(listdata);
		listview.refreshItems();
	})
}
var main = ui("chats_main");
var page = sm("do_Page");
page.on("loaded", function() {
	// 这个页面加载完显示出来后触发这个事件
	// 我们可以在这个事件里去获取最新的网络数据，来更新listview和initdata/chats/chat.json
});
var menu;
var add_button = ui("add_imageview");
add_button.on("touch", function() {
	if (menu) {// 如果已经add过，就只是让这个view显示，而不是add一个新的
		if (menu.visible == false)
			menu.visible = true;
	} else {
		main.add("menu_id", "source://view/chats/chat_add_menu.ui");
		menu = ui("menu_id");
	}
});
