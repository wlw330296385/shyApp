/**
 * related to goods_4.ui
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
	'goodsPic':'source://image/2-1.jpg',
	'tag':'url'},{
	'goodsPic':'source://image/1-2.jpg',
	'tag':'url'},{
	'goodsPic':'source://image/1-2.jpg',
	'tag':'url'}];
data.addData(d);
root.bindData(data);


//点击事件
var notify = sm('do_Notification');
var do_ImageView_1 = ui('do_ImageView_1')
do_ImageView_1.on('touch',function(){
	notify.alert("话费充值");
});

ui('do_ImageView_2').on('touch',function(){
	notify.alert("中石化充值");
});

ui('do_ImageView_3').on('touch',function(){
	notify.alert("中石油充值");
});

root.refreshData();