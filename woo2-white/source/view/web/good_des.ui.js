/**
 * related to good_des.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-12
 */
var root,app,page,core,dataCache,duobaoGoods_id,textContent;
root = ui('$');
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
dataCache = sm('do_DataCache');
root.setMapping({
	"tag":'id'
})

page.on('getGoodsId',function(id){
	duobaoGoods_id = id;
	core.p(duobaoGoods_id,'进入了des_web');
	textContent = dataCache.loadData('duobaoDes'+id);	
	ui('web').loadString(textContent);
	core.p(textContent,'des_web');
	
})
root.redraw();