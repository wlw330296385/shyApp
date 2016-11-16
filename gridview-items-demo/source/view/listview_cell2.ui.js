/**
 * related to listview_cell2.ui
 * 
 * @Author : and
 * @Timestamp : 2016-09-27
 */
var root = ui("$");
root.setMapping({
	"do_GridView_1.items" : "icons_data",
	"do_GridView_1.tag" : "group_index"
})

var page = sm("do_Page");
var nf = sm("do_Notification");
var gridview = ui("do_GridView_1");
gridview.on("touch", function() {
	// gridview的longtouch要起作用，需要订阅touch事件
})
gridview.on("longTouch", function(index) {
	nf.confirm("是否删除选中图标", "警告", "确定", "取消", function(data, e) {
		if (data == 1) {
			page.fire("deleteIcon", {
				"group_index" : gridview.tag,
				"index" : index
			});
		}
	})
})