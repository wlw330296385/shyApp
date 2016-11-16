/**
 * related to addOilCard.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-13
 */
var app, page, notify,core,driving_licence_path,type = 1,auto_type = 1,storage,algorithm,token,kess;
notify = sm("do_Notification");
storage = sm("do_Storage");
app = sm("do_App");
page = sm("do_Page");
core = require('do/core');
kess = require('kess');
algorithm = sm('do_Algorithm');
ui('do_ALayout_5').on("touch", function() {
	app.closePage()
});
var userInfo = storage.readFileSync('data://userInfo',true);
if(userInfo.code == 1){
token = kess.lockIt(userInfo.data.id);
}else{
	core.toast("请先登录");
}
//选择车型
var combobox = ui('do_ComboBox_1');
//combobox.items = '小车,大车';
combobox.on('selectChanged',function(data,e){
	auto_type = data+1;
})
//选中
var do_Label_13 = ui('do_Label_13');
var do_Label_14 = ui('do_Label_14');
var SG = ui('do_ALayout_3');
var CNPC = ui('do_ALayout_4');
var cardType = 0;
SG.on('touch',function(){
	do_Label_13.visible = true;
	do_Label_14.visible = false;
	this.border = 'e8380dFF,2,20';
	CNPC.border = 'D3D3D3FF,2,20';
	type = 2;
});

CNPC.on('touch',function(){
	do_Label_14.visible = true;
	do_Label_13.visible = false;
	this.border = 'e8380dFF,2,20';
	SG.border = 'D3D3D3FF,2,20';
	type = 1;
});

//上传照片
var camera = sm('do_Camera');
var album = sm("do_Album");
var img = ui('do_ImageView_4');
img.on("touch", function() {
	app.openPage({
		source:'source://view/common/popmenu.ui',
		data:1
		});
})

var do_ProgressBar_1 = ui('do_ProgressBar_1');
var http = mm('do_Http');
http.method = "POST";
http.on("fail", function(data) {
	do_Button_1.enabled = true;
	do_ProgressBar_1.visible = false;
	core.alert(data.msg, 'fail');
});
http.on("progress", function(data) {
	do_Button_1.enabled = false;
	do_ProgressBar_1.visible = true;
    do_ProgressBar_1.progress = data.currentSize * 100 / data.totalSize;
});


var http2 = mm('do_Http');
http2.method = "POST";
http2.on("fail", function(data) {
	do_Button_1.enabled = true;
	do_ProgressBar_1.visible = false;
	core.alert(data.msg, 'fail');
});
http2.on("progress", function(data) {
	do_Button_1.enabled = false;
	do_ProgressBar_1.visible = true;
    do_ProgressBar_1.progress = data.currentSize * 100 / data.totalSize;
});

//上传照片
page.on("result", function(data) {
	if(data.action == 0 && (data.path == null || data.path == undefined || data.path =='')){
		return false;
	}	
	if (data.path && data.img == 1){
		img.source = data.path;
		http.url = "http://api.e-shy.com/index.php/index/File_upload/uploadImage/token/"+token;
		http.contentType = "application/x-www-form-urlencoded"; 
		http.upload(data.path,'oilcard');
        http.on('success',function(result){
        	do_Button_1.enabled = true;
        	do_ProgressBar_1.visible = false;
        	if(result.code == 1){
        		driving_licence_path = result.filePath;
        		core.alert(result.msg,'照片上传成功');
        	}else{
        		core.alert(result.msg,'上传失败');
        	}
        	
        });
	}		
	if(data.action == 1 ){
		camera.capture(256, -1, 100, true, function(imgUrl) {
	        img.source = imgUrl;
	        http2.contentType = "application/x-www-form-urlencoded"; 
	        http2.url = "http://api.e-shy.com/index.php/index/File_upload/uploadImage/token/"+token;
	        http2.upload(imgUrl,'oilcard');
	        http2.on('success',function(result){
	        	do_Button_1.enabled = true;
	        	do_ProgressBar_1.visible = false;
	        	if(result.code == 1){
	        		driving_licence_path = result.filePath;
	        		core.alert(result.msg,'照片上传成功')
	        	}else{
	        		core.alert(result.msg,'上传失败')
	        	}
	        });
		})
	}
});

//发送数据
var do_Button_1 = ui('do_Button_1');
var http3 = mm('do_Http');
http3.method = "POST";

http3.on("fail", function(data) {
	do_Button_1.enabled = true;
	do_ProgressBar_1.visible = false;
	core.alert(data.msg, '添加失败');
});
http3.on("progress", function(data) {
	do_Button_1.enabled = false;
	do_ProgressBar_1.visible = true;
    do_ProgressBar_1.progress = data.currentSize * 100 / data.totalSize;
});

do_Button_1.on('touch',function(){
	if(driving_licence_path == null || driving_licence_path ==undefined){
		core.alert('未上传行驶证照片,请等待上传成功','温馨提示');
		return false;
	}
	if(ui('do_TextField_1').text == null||ui('do_TextField_1').text == '' || ui('do_TextField_1').text == undefined){
		core.alert('真实姓名不能为空','温馨提示');
		return false;
	}
	if(ui('do_TextField_2').text == null ||ui('do_TextField_2').text == ''|| ui('do_TextField_2').text == undefined){
		core.alert('油卡号码不能为空','温馨提示');
		return false;
	}
	if(ui('do_TextField_3').text == null ||ui('do_TextField_3').text == '' || ui('do_TextField_3').text == undefined){
		core.alert('驾驶证号不能为空','温馨提示');
		return false;
	}
	
	http3.url = "http://api.e-shy.com/index.php/index/Oilcard/addCard/token/"+token;
	http3.contentType = "application/json";	
	http3.body = {
		"real_name":ui('do_TextField_1').text,
		"card_no":ui('do_TextField_2').text,
		"type":type,
		"driving_licence_no":ui('do_TextField_3').text,
		"auto_type":auto_type,
		"driving_licence_path" : driving_licence_path
	}
	http3.on('success',function(result){
		do_Button_1.enabled = true;
     	do_ProgressBar_1.visible = false;
     	if(result.code == 1){
     		storage.writeFile("data://userInfo",result,true,function(boo){
				if(boo){
					core.alert(result.msg,'提交成功,请重新登录',function(){
//					app.openPage("source://view/login/login.ui");
						app.closePage();
					})
					}
     			})
     	}else if(result.code == -1){
     		core.alert(result.msg,'温馨提示',function(){
         		app.openPage('source://view/login/login.ui');
         		});
     	}else{
     		core.alert(result.msg,'失败');
     	}
     });
	http3.request();
});

//返回
page.on('back',function(){
	app.closePage();
});

//隐藏键盘
var root = ui('$');
root.on('touch',function(){
	page.hideKeyboard();
})
