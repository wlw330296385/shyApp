//related to cell.ui
var root = ui("$");
var page = sm("do_Page");

root.setMapping({
	"index_label.text" : "name",
	"do_CheckBox_1.checked" : "checked"
});
var check_label = ui("do_CheckBox_1");
var index_label = ui("index_label");
check_label.on("checkChanged", function(b) {
	var d = {};
	d.checked = b;
	d.index = index_label.text - 1
	page.fire("check_change_event", d);
	change_bgcolor();
})

root.on("dataRefreshed", function() {
	// 当数据更新到这个view之后才会触发，这个时候根据checked值，修改背景色
	// 这个事件在listview上下滑动的时候会执行多次，所以尽量不要在这个函数里加太多操作，否则会卡顿
	change_bgcolor();
})

function change_bgcolor() {
	if (check_label.checked)
		index_label.bgColor = "FF0000FF";
	else
		index_label.bgColor = "FF000000";
}