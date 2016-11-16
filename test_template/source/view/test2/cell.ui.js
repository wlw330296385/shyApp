//related to cell.ui
var root = ui("$");
var page = sm("do_Page");

root.setMapping({
	"index_label.text" : "name",
	"do_CheckBox_1.checked" : "checked",
	"do_CheckBox_1.tag":"tag"
});
var check_label = ui("do_CheckBox_1");
var index_label = ui("index_label");
check_label.on("checkChanged", function(b) {
	var d = {};
	d.checked = b;
	d.index = check_label.tag
	// 点击一行的checkbox，把点中的行数，点中后的状态通过page发送到listview所在的页面
	page.fire("check_change_event", d);
})