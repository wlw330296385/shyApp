/**
 * related to basket.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-03
 */
var app,page,storage,lists;
app = sm('do_App');
page = sm('do_Page');
storage = sm('do_Storage');
var listview = ui('do_ListView_1');
var listData = mm('do_ListData');
page.on("loaded",function(){
	listview.bindItems(listData);
	lists = storage.readFileSync('data://listData');
	listData.addData(lists);
	listview.refreshItems();
})


