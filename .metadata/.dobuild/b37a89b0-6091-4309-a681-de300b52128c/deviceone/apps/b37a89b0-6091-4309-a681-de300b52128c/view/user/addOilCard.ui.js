/**
 * related to addOilCard.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-13
 */
var app, page, notify,core,driving_licence_path,type = 1,auto_type = 1,storage;
notify = sm("do_Notification");
storage = sm("do_Storage");
app = sm("do_App");
page = sm("do_Page");
core = require('do/core');
page.on("back", function() {
	app.closePage()
});
ui('do_ALayout_5').on("touch", function() {
	app.closePage()
});
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
	type = 1;
});

CNPC.on('touch',function(){
	do_Label_14.visible = true;
	do_Label_13.visible = false;
	this.border = 'e8380dFF,2,20';
	SG.border = 'D3D3D3FF,2,20';
	type = 2;
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
var http = mm('do_Http');
var do_ProgressBar_1 = ui('do_ProgressBar_1');
http.method = "POST";

http.on("fail", function(data) {
	do_ProgressBar_1.visible = false;
	core.alert(data.msg, 'fail');
});
http.on("progress", function(data) {
	do_ProgressBar_1.visible = true;
    do_ProgressBar_1.progress = data.currentSize * 100 / data.totalSize;
});


page.on("result", function(data) {
	core.p(data,'result');
	if (data.path && data.img == 1){
		img.source = data.path;
		http.url = "http://192.168.1.167:8099/index.php/index/File_upload/uploadImage";
		http.contentType = "application/x-www-form-urlencoded"; 
		http.upload(data.path,'oilcard');
        http.on('success',function(result){
        	do_ProgressBar_1.visible = false;
        	driving_licence_path = result.filePath;
        	core.p(driving_licence_path);
        	core.alert(result.msg,'照片上传成功')
        });
	}	
	if(data.action == 0 && (data.path == null || data.path == undefined || data.path =='')){
		return false;
	}		
	if(data.action == 1 ){
		camera.capture(256, -1, 100, true, function(imgUrl) {
	        img.source = imgUrl;
	        http.contentType = "application/x-www-form-urlencoded"; 
	        http.url = "http://192.168.1.167:8099/index.php/index/File_upload/uploadImage";
	        http.upload(imgUrl,'oilcard');
	        http.on('success',function(result){
	        	do_ProgressBar_1.visible = false;
	        	driving_licence_path = result.filePath;
	        	core.p(result);
	        	core.p(driving_licence_path);
	        	core.alert(result.msg,'上传成功')
	        });
		})
	}
	if (data.action == 2 && data.img == 1 && (!data.path || data.path== undefined)) {
		album.select(1, 256, -1,100,true, function(res, e) {
			data.path = res[0];
			core.p(data,'相册');
			img.source = res[0];
//			app.openPage("source://view/common/crop.ui", data);
		})
	}
})

//发送数据
var do_Button_1 = ui('do_Button_1');
var http2 = mm('do_Http');
http2.method = "POST";

http2.on("fail", function(data) {
	do_ProgressBar_1.visible = false;
	core.alert(data.msg, '上传失败');
});
http2.on("progress", function(data) {
	do_ProgressBar_1.visible = true;
    do_ProgressBar_1.progress = data.currentSize * 100 / data.totalSize;
});

do_Button_1.on('touch',function(){
	if(driving_licence_path == null || driving_licence_path ==undefined){
		core.alert('未上传驾驶证','温馨提示');
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
		core.alert('驾驶证号','温馨提示');
		return false;
	}
	http2.url = "http://192.168.1.167:8099/index.php/index/Oilcard/addCard";
	http2.contentType = "application/json";
	var userInfo = storage.readFileSync('data://userInfo');
	http2.setRequestHeader("Cookie", "PHPSESSID=" + userInfo.data.session_id);
	http2.body = {
		"real_name":ui('do_TextField_1').text,
		"card_no":ui('do_TextField_2').text,
		"type":type,
		"driving_licence_no":ui('do_TextField_3').text,
		"auto_type":auto_type,
		"driving_licence_path" : driving_licence_path
	}
	http2.on('success',function(result){
     	do_ProgressBar_1.visible = false;
     	if(result.code == 1){
     		core.alert(result.msg,'成功',function(){
     		app.closePage(); 
     		});
     	}else{
     		core.alert(result.msg,'失败');
     	}
     });
	http2.request();
})
