/**
 * related to duobao_good_des_3.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-04
 */
var root,app,page,core,dataCache,data,listData,listView;

core = require('do/core');
root = ui('$');
page = sm('do_Page');
app = sm('do_App');
dataCache = sm('do_DataCache');
listData = mm('do_ListData');
listView = ui('do_ListView_1');
listView.bindItems(listData);
page.on('getGoodsId',function(id){
	core.p(id,'JOIN_ID')
	data = dataCache.loadData("duobaoJoinrecord"+id);
	listData.removeAll();
	listData.addData(data);
	listView.refreshItems();
	core.p(data,'duobaoJoinrecord');
})

listView.refreshItems();