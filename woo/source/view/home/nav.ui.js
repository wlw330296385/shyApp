/**
 * related to nav.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-06
 */
var root = ui('grid');
//GridView需要一个listdata对象来管理和绑定数据
root.setMapping({"do_GridView_1.items":"nav"});

//点击事件
var notify = sm("do_Notification");
var  gridView= ui('do_GridView_1');
gridView.on("touch", function(data) {
	notify.alert("第" + (data + 1) + "条数据被点中");
})
