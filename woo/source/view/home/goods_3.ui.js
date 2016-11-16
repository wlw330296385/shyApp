/**
 * related to goods_3.ui
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
})

var data = mm('do_HashData');
var d = {};
d.goodsPic = [{
	'goodsPic':'source://image/2-1.jpg',
	'tag':'url'},{
	'goodsPic':'source://image/2-1.jpg',
	'tag':'url'}];
data.addData(d);
root.bindData(data);
root.refreshData();
//点击事件
var notify = sm('do_Notification');
ui('do_ImageView_2').on('touch',function(data){
	notify.alert("你点了第" + (data + 2) + "张图片,将进入汽车服务");
});

ui('do_ImageView_1').on('touch',function(data){
	notify.alert("你点了第" + (data + 1) + "张图片,将进入保险服务");
})