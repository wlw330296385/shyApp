/**
 * related to duobao_goods.ui
 * @Author : 18507717466
 * @Timestamp : 2016-11-04
 */
var app,page,core,do_LinearLayout_1,scrollview1,global,root,kess,token,userInfo;
root = ui('$');
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
global = sm('do_Global');
do_LinearLayout_1 = ui('do_LinearLayout_1');
scrollview1 = ui('do_ScrollView_1');
var hashData = mm('do_HashData');
var dataCache = sm('do_DataCache');
var storage = sm('do_Storage');	
ui('do_Button_4').on('touch',function(){
	app.closePage();
})

//不允许购买
ui('do_Button_3').enabled = false;
//加减
var subtract = ui("do_Button_2");
var plus = ui("do_Button_1");
var total = 1;
page.on('loaded',function(){
	ui('do_Label_15').text = total;
})
plus.on('touch',function(){
	total++;
	if(total >= ui('do_Label_9').text){
		total = ui('do_Label_9').text;
	}
	ui('do_Label_15').text = total;
	countLv(total);
})

subtract.on('touch',function(){
	total--;
	if(total == 0)
		total = 1;
	ui('do_Label_15').text = total;
	countLv(total);
})

//下拉刷新
scrollview1.on("pull",function(data){
	if(data.state==2)
	{
		core.toast("下拉刷新");
		scrollview1.rebound();
		http.request();
	}
})

//获取数据
var http = mm('do_Http');
http.method = "POST";
http.contentType = "application/json";
var des = "暂无商品详情";
var desData;
var param = '暂无商品参数';
http.on('success',function(result){
	if(result.code == 1){
		core.p(result,'goods');
		ui('do_Label_2').text = result.data.goods_name;//商品名
		ui('do_Label_3').text = result.data.goods_title == 0 ? '' : result.data.goods_title;//商品标题
		ui('do_ImageView_1').source = result.data.goods_image;//商品图片
		ui('do_Label_6').text = result.data.goods_sales_price;//商品价格
		ui('do_Label_8').text = result.data.pay_num;//参与人数
		ui('do_Label_14').text = result.data.total_num;//总需
		ui('do_Label_9').text = result.data.uppernum;//剩余人数
		ui('do_Label_10').text = result.data.per;//占比
		ui('do_ALayout_7').width = result.data.progress;//进度条
		countLv(1);
		desData = {
			id:	result.data.id
		};
		des = result.data.desc;
		goods_id = result.data.id;
		hashData.addData(desData);
		goods_des_ui.refreshData();
		dataCache.saveData('duobaoName'+result.data.id,result.data.goods_name);
		dataCache.saveData('duobaoPrice'+result.data.id,result.data.goods_sales_price);
		dataCache.saveData('duobaoImg'+result.data.id,result.data.goods_image);
		dataCache.saveData('duobaoDes'+result.data.id,des);
		dataCache.saveData('duobaoParams'+result.data.id,result.data.params);
		dataCache.saveData('duobaoTitle'+result.data.id,result.data.goods_title == 0 ? '' : result.data.goods_title);
		dataCache.saveData('duobaoParam'+result.data.id,param);	
		dataCache.saveData('duobaoJoinrecord'+result.data.id,result.data.joinrecord);
		page.fire("getGoodsId",result.data.id);
		ui('do_Button_3').enabled = true;
	}else{
		core.toast(result.msg);
		return false;
	}
});
http.on('fail',function(msg){
	core.toast(msg);
})
var goods_des = do_LinearLayout_1.add({
		id:"goods_des",
		path:"source://view/duobao/duobao_goods_des.ui",
		target:"do_ALayout_10",
	});

//购买
var storage = sm('do_Storage');
var httpIsGoPay = mm('do_Http');
httpIsGoPay.method = "POST";
httpIsGoPay.contentType = "application/json";
ui('do_Button_3').on('touch',function(){
	httpIsGoPay.body = {
			"id":goods_id,
			"num":total
	}
	httpIsGoPay.url = "http://api.e-shy.com/index.php/index/panicbuy/isGoPay/token/"+token;
	httpIsGoPay.request()
})
//判断是否在苹果->购买
var device = sm('do_Device');
var deviceInfo = device.getInfo();
var external = sm('do_External');
httpIsGoPay.on('success',function(result){
	if(result.code == 1){
		if(deviceInfo.OS=="android"){
			app.openPage("source://view/duobao/create_order.ui",{'goods_id':goods_id,'num':total});
		}else{
			if(userInfo.code == 1){
				external.openURL("http://api.e-shy.com/index.php/index/panicbuy/payOrderWap?UserId="+userInfo.data.id+"&num="+total+"&goods_id="+goods_id);
			}else{
				app.openPage("source://view/login/login1.ui");
			}
		}
	}else{
		core.alert(result.msg);
	}
})

httpIsGoPay.on('fail',function(result){
	core.p(result);
	core.alert("网络错误");
})
//读取用户信息
var goods_id = 1;
var goods_des_ui = ui(goods_des);
page.on('loaded',function(){
	goods_id = page.getData();
	goods_des_ui.bindData(hashData);
	kess = require('kess');
	token = kess.lockIt(0);
	core.p(token,'1')
	http.url = "http://api.e-shy.com/index.php/index/panicbuy/panicbuy_item/token/"+token;
	http.body = {
		id:goods_id
	}
	http.request();
	userInfo = storage.readFileSync('data://userInfo',true);
	ui('do_ALayout_7').redraw();
})
page.on('resume',function(){
	userInfo = storage.readFileSync('data://userInfo',true);
})
//计算几率
function countLv(num){
	var lv = num/ui('do_Label_14').text;
	ui('do_Label_16').text = '获得几率'+(lv*100).toFixed(4)+'%';
}
ui('do_ALayout_7').redraw();
var style=require("do/style");
style.css([ui('do_Button_1'),ui('do_Button_2'),ui('do_Button_3'),ui('do_Button_4')]);
//安卓返回键
page.on('back',function(){
	app.closePage();
})