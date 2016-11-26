/**
 * related to addIdentityCard.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-13
 */
//上传照片
//var camera = sm('do_Camera');
var album = sm("do_Album");
var storage = sm('do_Storage');
var app = sm('do_App');
var page = sm('do_Page');
var img2 = ui('do_ImageView_2');
var img3 = ui('do_ImageView_3');
var core = require('do/core');
var device = sm("do_Device");
var deviceInfo = device.getInfo();
var storage = sm('do_Storage');
var imgUr2,imgUrl3,algorithm,kess,token;
kess = require('kess');
// algorithm = sm('do_Algorithm');
ui('do_ALayout_2').on("touch", function() {
	app.closePage();
});
img2.on("touch", function() {
	app.openPage({
		source:'source://view/common/popmenu.ui',
		data:'1'
		});
})
img3.on("touch", function() {
	app.openPage({
		source:'source://view/common/popmenu.ui',
		data:'2'
		});
})

var userInfo = storage.readFileSync('data://userInfo',true);
if(userInfo.code == 1){
	token = kess.lockIt(userInfo.data.id);
}else{
	core.toast("请先登录");
}
//数据传递
var http = mm('do_Http');
var do_ProgressBar_1 = ui('do_ProgressBar_1');
var pro_path,con_path;//正反面路径
http.method = "POST";
http.contentType = "application/json"; 
http.on("fail", function(data) {
	do_Button_1.enabled = true;
	do_ProgressBar_1.visible = false;
	core.p(data,'http失败信息');
	core.alert(data.message, data.status);
});

http.on("progress", function(data) {
	do_Button_1.enabled = false;
	do_ProgressBar_1.visible = true;
    do_ProgressBar_1.progress = data.currentSize * 100 / data.totalSize;
});

var do_Button_1 = ui('do_Button_1');
do_Button_1.on('touch',function(){
	if(ui('do_TextField_2').text == ''){
		core.alert('用户名不能为空','温馨提示');
		return false;
	}
	if(ui('do_TextField_3').text == ''){
		core.alert('身份证号不能为空','温馨提示');
		return false;
	}
	if (pro_path == '' || pro_path == null ||pro_path == undefined) {
		core.alert('身份证正面未上传成功','温馨提示');
		return false;
	}
	if (con_path == '' || con_path == null ||con_path == undefined) {
		core.alert('身份证反面未上传成功','温馨提示');
		return false;
	}
	http.contentType = "application/json"; 
	http.url = "http://api.e-shy.com/index.php/index/Identity_card/IdentityCard/token/"+token; 
	postData = {
			"real_name":ui('do_TextField_2').text,
			"idno":ui('do_TextField_3').text,
			"pro_path":pro_path,
			"con_path":con_path,
			"device":deviceInfo.OS
	}
	http.body = postData;
	http.request();
	http.on("success", function(result) {
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
			});
		}else if(result.code == -1){
			core.alert(result.msg,'温馨提示',function(){
			    app.openPage("source://view/login/login.ui");			
				});
		}else{
			core.alert(result.msg,'提交失败');
		}
	    
	});
	
	})

	
	//拍照
var camera = sm("do_Camera");
var album = sm('do_Album');
var http2 = mm('do_Http');
http2.method = "POST";
http2.on("fail", function(data) {
	do_Button_1.enabled = true;
	do_ProgressBar_1.visible = false;
	 core.alert(data.msg, '照片上传失败,请检查网络');
});
http2.contentType = "application/x-www-form-urlencoded"; 
http2.on("progress", function(data) {
	do_Button_1.enabled = false;
	do_ProgressBar_1.visible = true;
    do_ProgressBar_1.progress = data.currentSize * 100 / data.totalSize;
});
http2.url = "http://api.e-shy.com/index.php/index/File_upload/uploadImage/token/"+token;
//http2.url = "http://192.168.0.240:8099/index.php/index/File_upload/uploadImage/token/"+token;
//反面http
var http3 = mm('do_Http');
http3.method = "POST";
http3.on("fail", function(data) {
	do_Button_1.enabled = true;
	do_ProgressBar_1.visible = false;
	core.alert(data.msg, '反面照片上传失败,请检查网络');
});
http3.contentType = "application/x-www-form-urlencoded"; 
http3.on("progress", function(data) {
	do_Button_1.enabled = false;
	do_ProgressBar_1.visible = true;
    do_ProgressBar_1.progress = data.currentSize * 100 / data.totalSize;
});
http3.url = "http://api.e-shy.com/index.php/index/File_upload/uploadImage/token/"+token;
page.on("result", function(data) {
	if(data.action == 0 && (data.path == null || data.path == undefined || data.path =='')){
		return false;
	}
	if (data.path && data.img == 1 && data.action==2){
		img2.source = data.path;		
		http2.upload(data.path, 'idcard');
		http2.on("success", function(result) {
			do_Button_1.enabled = true;
			do_ProgressBar_1.visible = false;
			if (result.code == 1) {
				pro_path = result.filePath;
				core.alert(result.msg,'身份证正面相册选择');
			}else{
				core.alert(result.msg,'提醒');	
			}		    
		});
	}
	if (data.path && data.img == 2 && data.action==2){
		img3.source = data.path;
		http3.upload(data.path, 'idcard');
		http3.on("success", function(result) {
			do_ProgressBar_1.visible = false;
			do_Button_1.enabled = true;
			if(result.code == 1){
				con_path = result.filePath;
				core.alert(result.msg,'身份证反面相册选择');
			}else{
				core.alert(result.msg,'提醒');	
			}
			
		});
	}
	
	if(data.action == 1 && data.img == 1){
		camera.capture(768, -1, 100, true, function(imgUrl) {
	        img2.source = imgUrl;			
	        http2.upload(imgUrl, 'idcard');
			http2.on("success", function(result) {
				do_ProgressBar_1.visible = false;
				do_Button_1.enabled = true;
				if(result.code == 1){
					pro_path = result.filePath;
					core.alert(result.msg,'身份证正面上传');	
				}else{
					core.alert(result.msg,'提醒');	
				}
						    
			});
		})
	}
	
	
	if(data.action == 1 && data.img == 2){
		camera.capture(768, -1, 100, true, function(imgUrl) {
	        img3.source = imgUrl;
	        http3.upload(imgUrl, 'idcard');
			http3.on("success", function(result) {
				do_Button_1.enabled = true;
				do_ProgressBar_1.visible = false;
				if(result.code == 1){
					con_path = result.filePath;
					core.alert(result.msg,'身份证反面上传');
				}else{
					core.alert(result.msg,'提醒');	
				}
				
			});
		})
	}

})
//返回
page.on('back',function(){
	app.closePage();
});
//隐藏键盘
var root = ui('$');
root.on('touch',function(){
	page.hideKeyboard();
})