/**
 * related to duobao.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-10
 */

var app,page,core,listView,dialog,listData;
dialog = sm('do_Dialog');
core = require('do/core');
var data = dialog.getData();
core.p(data,'dialogdata');
ui('do_Label_1').text = data.title;
ui('do_Label_2').text = data.title2;
listView = ui('do_ListView_1');
listData = mm('do_ListData');
listView.bindItems(listData);
listData.addData(data.nolist);
listView.refreshItems();


ui("do_Button_1").on("touch", function() {
	dialog.close(1);
})