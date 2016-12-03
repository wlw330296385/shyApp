/**
 * related to list_cell.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-02
 */
var root = ui("$");
var core,app,page,storage,goods_id;
app = sm('do_App');
root.setMapping({
	"do_ImageView_1.source":'data.image',//商品图片
	"do_Label_1.text":'data.goods_name',//商品名
	"do_Label_4.text":"data.sales_price",//抢购价
	"do_ALayout_4.width":'data.progress',//进度
	"do_Label_11.text":"data.per",
	"do_Label_6.text":"data.buycounts",//已参与
	"do_Label_8.text":"data.sales_people_num",//总需
	"do_Label_10.text":"data.surplus",//剩余
	"tag":"data.id"
})

//root.refreshData();
root.on("dataRefreshed",function(){
	goods_id = this.tag;
	root.redraw();
})
root.redraw();

var style=require("do/style");
style.css(ui('do_Button_1'));
ui('do_Button_1').on('touch',function(){
	app.openPage("source://view/duobao/duobao_goods.ui",goods_id,'slide_r2l');
})
