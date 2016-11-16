var app,page,storage,core,http,userInfo,bankID=1,listData;
app = sm('do_App');
page = sm('do_Page');
storage = sm('do_Storage');
core = require('do/core');
http = mm('do_Http');
listData = mm('do_ListData');
ui('$').on('touch',function(){
	page.hideKeyboard();
})

var do_TextField_1 = ui('do_TextField_1'),
do_TextField_2 = ui('do_TextField_2'),
do_TextField_3 = ui('do_TextField_3'),
do_TextField_9 = ui('do_TextField_9'),
do_ComboBox_1 = ui('do_ComboBox_2');

userInfo = storage.readFileSync('data://userInfo',true);
http.url = "http://api.e-shy.com/index.php/index/Bankcard/addBankCard";
//http.url = "http://192.168.1.167:8099/index.php/index/Bankcard/addBankCard"
http.setRequestHeader("Cookie","PHPSESSID=" + userInfo.data.session_id);
http.contentType = "application/json"; 
http.method = "POST";
http.on('success',function(result){
	if(result.code == 1){
		core.alert(result.msg,'成功',function(){
			app.closePage();
		})
	}else{
		core.toast(result.msg)
	}
});

http.on('fail',function(result){
	core.toast(result.message);
	core.p(result);
})
ui('do_Button_2').on('touch','',3000,function(){
	if(do_TextField_1.text == ''){
		core.alert('开户城市不能为空');
		return false;
	}
	if(do_TextField_2.text == ''){
		core.alert('开户银行不能为空');
		return false;
	}
	if(do_TextField_3.text == ''){
		core.alert('姓名不能为空');
		return false;
	}
	if(do_TextField_9.text == ''){
		core.alert('银行卡号不能为空');
		return false;
	}
	http.body = {
			"account" : do_TextField_9.text,
			"open_bank" : do_TextField_2.text,
			"name" : do_TextField_3.text,
			"city" : do_TextField_1.text,
			"bank_id" : bankID
	}
	
	http.request();
})


var http2,banks;
http2 = mm('do_Http');
http2.url = "http://192.168.1.167:8099/index.php/index/Bankcard/getBanks";
http2.contentType = "application/json";
http2.method = "POST";
http2.on('success',function(result){
	if(result.code == 1){
		banks = result.data;
		listData.addData(banks);
		do_ComboBox_1.bindItems(listData);
	}
})
page.on('loaded',function(data){
	http2.request();	
})

do_ComboBox_1.on('selectChanged',function(data){
	var one = listData.getOne(data);
	bankID = one.id;
})


ui('do_ALayout_2').on('touch',function(){
	app.closePage()
});

page.on('back',function(){
	app.closePage()
})