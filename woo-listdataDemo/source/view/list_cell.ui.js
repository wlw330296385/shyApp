/**
 * related to list_cell.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-02
 */
var root = ui("$");
var core,app,page,storage;
root.setMapping({
	"do_ImageView_1.source":'cellData.goods_img',//商品图片
	"do_Label_1.text":'cellData.goods_name',//商品名
	"do_Label_4.text":"cellData.price",//抢购价
	"do_ALayout_4.width":'cellData.progress',//进度
	"do_Label_6.text":"cellData.join_num",//已参与
	"do_Label_8.text":"cellData.need_num",//总需
	"do_Label_10.text":"cellData.least_num",//剩余
})
core = require("do/core");

root.refreshData();

core.toast('如果是安卓机,进度条都不出来')