/*******************************************************************************
 * Author : But Timestamp : 2015-07-25
 * 
 ******************************************************************************/
// 根据sm的类型获取单实例对象
var nf = sm("do_Notification");
////
var page = sm("do_Page");
var app = sm("do_App");
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})
// //
// 根据ui的id来获取ui对象
var gridview = ui("gridview");
var add_button = ui("add_button");
var del_button = ui("del_button");

// GridView需要一个listdata对象来管理和绑定数据
var gridData = mm("do_ListData");
// bindItems方法建立GridView对象和ListData对象的绑定关系
gridview.bindItems(gridData);
// 在index.ui文件中设置grdiview的tempslates属性是source://view/cell.ui
// 在index.ui文件中设置grdiview的numberColumns属性是5，表示3列，这里ios和android有点差别，ios这个值不会起作用，真正起作用的是cell的宽度，ios会自动适配最佳列数
// 在index.ui文件中设置grdiview的selectColor属性是80808055，点中一个cell底色会变化

// 先初始化8条数据
for (var i = 0; i < 8; i++) {
	addOneRandomData();
}
// gridview对应的listdata发生变化后，通过refreshItems来刷新数据
gridview.refreshItems();

add_button.on("touch", function(data, e) {
	addOneRandomData();
	gridview.refreshItems();

});

del_button.on("touch", function(data, e) {
	// 删除最后一条数据
	gridData.removeData([ gridData.getCount() - 1 ]);
	gridview.refreshItems();

});
// 订阅GridView的touch点击事件
gridview.on("touch", function(data) {
	nf.alert("第" + (data + 1) + "条数据被点中");
})
// 订阅GridView的longTouch长按事件;
gridview.on("longTouch", function(data) {
	nf.alert("第" + (data + 1) + "条数据被长按");
});

// 随机增加一条数据
function addOneRandomData() {
	var random = Math.floor(Math.random() * 14);
	var source = "source://image/" + (random + 1) + ".png";
	var label = "天气" + (random + 1);
	gridData.addOne({
		"imagesource" : source,
		"imagelabel" : label
	});
}