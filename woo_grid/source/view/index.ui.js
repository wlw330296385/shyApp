/**
 * @Author : 18507717466
 * @Timestamp : 2016-10-06
 */
var nf = sm("do_Notification");
var root = ('$');
var do_GridView_1 = ui('do_GridView_1');
var data = [];
data[0] = {};
data[0].templates =0;
data[0].nav = [{
	"gridImage" : 'source://image/charge.gif',
	"tag" : 'source://view/charge/charge.ui',
	"gridText":'充值中心'
},{
	"gridImage" : 'source://image/car.gif',
	"tag" : 'source://view/charge/car.ui',
	"gridText":'品质汽车'
},{
	"gridImage" : 'source://image/insurance.gif',
	"tag" : 'source://view/charge/insurance.ui',
	"gridText":'保险服务'
},{
	"gridImage" : 'source://image/jewelry.gif',
	"tag" : 'source://view/charge/jewelry.ui',
	"gridText":'珠宝首饰'
},{
	"gridImage" : 'source://image/user_mall.gif',
	"tag" : 'source://view/charge/user_mall.ui',
	"gridText":'用户商城'
},{
	"gridImage" : 'source://image/score_mall.gif',
	"tag" : 'source://view/charge/score_mall.ui',
	"gridText":'积分商城'
},{
	"gridImage" : 'source://image/termination.gif',
	"tag" : 'source://view/charge/termination.ui',
	"gridText":'限时抢购'
},{
	"gridImage" : 'source://image/all.gif',
	"tag" : 'source://view/charge/all.ui',
	"gridText":'全部'
}]; 
//root.addData(data);
root.setMapping({'do_GridView_1.items':'nav'});