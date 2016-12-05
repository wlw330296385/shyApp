/**
 * related to create_order.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-07
 */
var app,page,core,goods_id,dataCache,kess,global,token,algorithm,storage,userInfo;
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
dataCache = sm('do_DataCache');
kess = require('kess');
//algorithm = sm('do_Algorithm');
storage = sm('do_Storage');
userInfo = storage.readFileSync("data://userInfo",true);
if(userInfo.code == 1){
	token = kess.lockIt(userInfo.data.id);
}else{
	app.openPage("source://view/login/login1.ui");
}
var img,name,price,num,title,getPageData,data,sales_id;
getPageData = page.getData();
goods_id = getPageData.goods_id;
num = getPageData.num;
title = dataCache.loadData('duobaoTitle'+goods_id);
img = dataCache.loadData('duobaoImg'+goods_id);
name = dataCache.loadData('duobaoName'+goods_id);
price = dataCache.loadData('duobaoPrice'+goods_id);
ui('do_Label_7').text = 'x '+num;
ui('do_Label_6').text = price;
ui('do_Label_3').text = name;
ui('do_Label_4').text = title;
ui('do_ImageView_1').source = img;

var addr,score,isAddr = true;
//绑定地址
var listData = mm('do_ListData');
address = ui('do_ComboBox_1');
address.on('selectChanged',function(index){
	var one = listData.getOne(index);
	address_id = one.id;
})
ui('do_ALayout_9').on('touch',function(){
	if(!isAddr){
		app.openPage('source://view/user/addAddress.ui');
	}
})
//选择积分
var scoreAct = false;
var return_score_tmp;//积分全返
var buy_score_tmp;//可用于换购商品的积分
var next_score_tmp;//抵扣全返
var total;//总金额;
(function(a6,a7,a8){
	a6.on('touch',function(){
		a6.border = "E8380DFF,1,0";
		a7.border = "E3E3E3FF,1,0";
		a8.border = "E3E3E3FF,1,0";
		ui('do_Label_28').visible = true;
		ui('do_Label_29').visible = false;
		ui('do_Label_30').visible = false;
		buy_score = buy_score_tmp;
		point = (price*num).toFixed(0);
		return_score = 0;
		next_score = 0;	
		ui('do_Label_24').text =(price*num).toFixed(0)+ '积分';
		ui('do_Label_27').text = (price*num).toFixed(2)+'元';
		scoreAct = true;
		total = (price*num).toFixed(2);
	});
	a7.on('touch',function(){
		a7.border = "E8380DFF,1,0";
		a6.border = "E3E3E3FF,1,0";
		a8.border = "E3E3E3FF,1,0";
		ui('do_Label_28').visible = false;
		ui('do_Label_29').visible = true;
		ui('do_Label_30').visible = false;
		buy_score = 0;
		return_score = return_score_tmp;
		point = (price*num).toFixed(0);
		next_score = 0;	
		ui('do_Label_24').text =(price*num).toFixed(0)+ '积分';
		ui('do_Label_27').text = (price*num).toFixed(2)+'元';
		total = (price*num).toFixed(2);
		scoreAct = true;
	});
	a8.on('touch',function(){
		a8.border = "E8380DFF,1,0";
		a7.border = "E3E3E3FF,1,0";
		a6.border = "E3E3E3FF,1,0";
		ui('do_Label_28').visible = false;
		ui('do_Label_29').visible = false;
		ui('do_Label_30').visible = true;		
			if(next_score_tmp>=(price*num)){
				ui('do_Label_24').text = '0积分';
				total = (price*num*0.6).toFixed(2);
				if(total<1) total = 1;
				ui('do_Label_27').text = total+'元';			
				buy_score = 0;
				return_score = 0;
				next_score = next_score_tmp;	
				point = 0;
				scoreAct = true;
			}else{
				ui('do_Label_24').text = (price*num)+'积分';
				total = (price*num).toFixed(2);
				ui('do_Label_27').text = total+'元';				
				core.alert('可用积分不足,无法抵扣,请选择其他积分使用方式或者重新选择数量');
				scoreAct = false;
			}			
	});
})(ui('do_ALayout_6'),ui('do_ALayout_7'),ui('do_ALayout_8'))

//获取信息
var http = mm('do_Http');
http.url = "http://api.e-shy.com/index.php/index/panicbuy/order/token/"+token;
http.method = "POST";
http.contentType = "application/json";
http.on('success',function(result){
	core.p(result,'seccess');
	if(result.code == -1){
		core.toast(result.msg);
		return false;
	}else{
		if(result.data.addr == 0){
			core.alert('请先点击收件人信息添加收货地址','提示');
			isAddr = false;
		}else{
			isAddr = true;
			addr = result.data.addr;
			listData.addData(addr);
			address.bindItems(listData);
			address.refreshItems();
//			sales_id = result.data.curgoods.sales_id;
			buy_score_tmp = result.data.salesscore.buy_score_tmp;//购物积分
			return_score_tmp = result.data.salesscore.return_score_tmp;//全返
			next_score_tmp = result.data.salesscore.next_score_tmp;//抵扣
			ui('do_Label_28').text = '可用积分:'+buy_score_tmp;
			ui('do_Label_29').text = '可用积分:'+return_score_tmp;
			ui('do_Label_30').text = '可用积分:'+next_score_tmp;
		}
	}	
})

http.on('fail',function(result){
	core.p(result);
	core.toast(result.message);
})
http.body = {
		num:num,
		id:goods_id
	};
core.p(http.body,'http.body');
http.request();
//更新地址
page.on('result',function(){
	http.request();
})
//积分相关
ui('do_Label_24').text = (price*num).toFixed(0)+'积分';
ui('do_Label_27').text = (price*num).toFixed(0)+'元';
//提交订单
var buy_score,return_score,next_score,point,address_id = 0,
postscript,sales_num,sales_total_price;
//var http2 = mm('do_Http');
//http2.url = "http://api.e-shy.com/index.php/index/panicbuy/order_create";
//http2.method = "POST";
//http2.contentType = "application/json";
//http2.on('seccess',function(result){
//	core.alert(result);
//	core.p(result,'提交成功')
//});
//http2.on('fail',function(result){
//	core.p(result,'fail2')
//	core.toast(result.message);
//})
ui('do_Button_1').on('touch','',3000,function(){
	if(address_id == 0){
		core.alert("收货地址不存在");
		return false;
	}
	if(scoreAct == false){
		core.alert("未选择积分使用类型");
		return false;
	}
	postscript = ui('do_TextBox_1').text==''?0:ui('do_TextBox_1').text;
	var payUrl = "http://api.e-shy.com/index.php/index/panicbuy/order_create";
	payUrls = payUrl+'?userId='+userInfo.data.id+'&token='+token+'&address_id='+address_id+'&postscript='+postscript+"&sales_id="+goods_id+"&sales_num="+num+"&sales_total_price="+total+"&buy_score="+buy_score+"&return_score="+return_score+"&next_score="+next_score+"&point="+point;
//	http2.body = {
//		"address_id":address_id,
//		"postscript":ui('do_TextBox_1').text,
//		"sales_id":sales_id,
//		"sales_num":num,
//		"sales_total_price":(price*num).toFixed(2),
//		"buy_score":buy_score,
//		"return_score":return_score,
//		"next_score":next_score,
//		"point":point
//	}
//	http2.request();
	var webData = {
			"title":"夺宝支付",
			"url":payUrls
	}
//	core.alert(payUrls,'提交地址',function(){
		app.openPage("source://view/web/web.ui",webData);
//	})
	
})
ui('do_Button_2').on('touch',function(){
	app.closePage();
})
ui('$').on('touch',function(){
	page.hideKeyboard();
})
var style=require("do/style");
style.css([ui('do_Button_1'),ui('do_Button_2')]);

//安卓返回键
page.on('back',function(){
	app.closePage();
})