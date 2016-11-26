/**
 * related to winning_cell.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-08
 */

var app,page,core;
core = require("do/core");
app = sm('do_App');

ui('$').setMapping({
	"do_ImageView_1.source":"data.image",
	"do_Label_3.text":"data.goods_name",
	"do_Label_5.text":"data.winner_name",
	"do_Label_7.text":"data.winner_id",
	"do_Label_2.text":"data.winno",
	"do_Label_11.text":"data.wintime",
	"do_Label_9.text":"data.sales_periods"
})