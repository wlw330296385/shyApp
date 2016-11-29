/**
 * related to addAddress.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-07
 */
var core = require("do/core");
var do_ComboBox_sheng = ui("do_ComboBox_1")
var do_ComboBox_shi = ui("do_ComboBox_2")
var do_ComboBox_xian = ui("do_ComboBox_3")
var listdata1 =mm("do_ListData");
var listdata2 =mm("do_ListData");
var listdata3 =mm("do_ListData");
var do_InitData = sm("do_InitData");
var province = '北京',city,county,userInfo;
var sheng =[],shi = [],xian = [];
var app = sm("do_App");
var page = sm('do_Page');
var storage = sm('do_Storage');
var kess = require('kess');
var token;
var algorithm = sm("do_Algorithm");
do_ComboBox_sheng.bindItems(listdata1);
do_ComboBox_shi.bindItems(listdata2);
do_ComboBox_xian.bindItems(listdata3);
userInfo = storage.readFileSync("data://userInfo",true);
	if(userInfo.code == 1){
		token = kess.lockIt(userInfo.data.id);
	}else{
		core.toast("请先登录");
	}
do_InitData.readFile("initdata://ssx.json", function(data, e){
	data.map(function(v,k){
		sheng.push({"text":v.name})
	})
	listdata1.removeAll();
	listdata1.addData(sheng);
	do_ComboBox_sheng.refreshItems();

	do_ComboBox_sheng.on("selectChanged",function(index){
		var getone = listdata1.getOne(index);//获取点击的省
		shi=[];
		province=getone.text;
	     data.map(function(v1,k1){
		   if(v1.name==getone.text){
			v1.city.map(function(v2,k2){
				shi.push({"text":v2.name})
				})
		  }
	  })
	  listdata2.removeAll();
	  listdata2.addData(shi);
	  do_ComboBox_shi.refreshItems();
	})//省的点击事件
	
	var getone_shi="";
	do_ComboBox_shi.on("selectChanged",function(index){
		getone_shi =listdata2.getOne(index);
		xian=[];
		city = getone_shi.text;
		data.map(function(v,k){
			v.city.map(function(v3,k3){
				if(v3.name==getone_shi.text){
			         v3.area.map(function(v4,k4)
			         {
			        	 xian.push({"text":v4})
			         })
			   }
			})
		})
		listdata3.removeAll();
		listdata3.addData(xian);
		do_ComboBox_xian.refreshItems();
	});
	do_ComboBox_xian.on("selectChanged",function(index){
		county = xian[index].text;
		})
})

//数据交互
var http = mm('do_Http');
http.method = "POST";
http.contentType = "application/json";
http.url = "http://testapi.e-shy.com/index.php/index/Panicbuy/addAddress/token/"+token;
http.on('success',function(result){
	core.p(result,'addaddress');
	if(result.code == 1){
		core.alert(result.msg,'恭喜',function(){
			app.closePage();
		});
	}else{
		core.toast(result.msg);
	}
});
http.on('fail',function(result){
	core.toast(result.message);
})

ui('do_Button_1').on('touch','',3000,function(){
	
	if(city =='' || county == ''){
		core.alert("省份/城市/区县未选择");
		return false;
	}
	if(ui('do_TextField_1').text == ''){
		core.alert('详细地址不能为空');
		ui('do_TextField_1').setFocus();
		return false;
	}
	if(ui('do_TextField_3').text == ''){
		core.alert('收件人不能为空');
		ui('do_TextField_3').setFocus();
		return false;
	}
	if(ui('do_TextField_8').text == ''){
		core.alert('联系电话不能为空');
		ui('do_TextField_8').setFocus();
		return false;
	}
	if(province== ''|| city== '' || county == ''){
		core.alert('未正确选择地址');
		return false;
	}
	http.body = {
			"province":province,
			'city':city,
			'county':county,
			'address':ui('do_TextField_1').text,
			'consigee':ui('do_TextField_3').text,
			'postcode':ui('do_TextField_5').text,
			'mobile':ui('do_TextField_8').text,
			'id':0
	}
	http.request();
	
})
//键盘
var scrollView = ui('scrollView');
ui('$').on('touch',function(){
	page.hideKeyboard();
})
ui('do_TextField_8').on('focusIn',function(){
	keyBoardTo(200)
})
function keyBoardTo(offset){
	scrollView.scrollTo({'offset':offset});
}
//安卓返回键
page.on('back',function(){
	app.closePage();
})
ui('do_ALayout_2').on('touch',function(){
	app.closePage();
})

