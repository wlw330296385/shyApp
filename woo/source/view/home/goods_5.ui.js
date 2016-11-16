/**
 * related to goods_5.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-07
 */
var root = ui('$');
root.setMapping({
	'do_ImageView_1.source':'goodsPic:0.goodsPic',
	'do_ImageView_1.tag':'goodsPic:0.tag',
	'do_ImageView_2.source':'goodsPic:1.goodsPic',
	'do_ImageView_2.tag':'goodsPic:1.tag',
	'do_ImageView_3.source':'goodsPic:2.goodsPic',
	'do_ImageView_3.tag':'goodsPic:2.tag',
	
})

var data = mm('do_HashData');
var d = {};
d.goodsPic = [{
	'goodsPic':'source://image/1-3.jpg',
	'tag':'url'},{
	'goodsPic':'source://image/1-3.jpg',
	'tag':'url'},{
	'goodsPic':'source://image/1-3.jpg',
	'tag':'url'}];
data.addData(d);
root.bindData(data);
root.refreshData();