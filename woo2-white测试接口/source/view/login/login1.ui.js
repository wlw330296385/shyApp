/**
 * related to login1.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-29
 */
var app,page,core,storage,http;
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
storage = sm('do_Storage');
page.on('loaded',function(){
	ui('do_TextField_1').on('focusOut',function(){
		if(this.text == ''){
			core.toast("用户名不能为空");
		}
	})
	ui('do_TextField_2').on('focusOut',function(){
		if(this.text == ''){
			core.toast("密码不能为空");
		}
	})
})

//通讯
http = mm('do_Http');
http.method = "post";
http.contentType = "application/json";
http.on('success',function(result){
	if(result.code == 1){
		core.p(result)
		storage.writeFile('data://userInfo',result,true,function(res){	
			if(res){
				core.toast('登陆成功');
				app.closePage();
			}else{
					core.toast('存储失败，请检查手机权限');
				return false;
			}											
		})
	}else{
		core.toast(result.msg);
	}
})
http.on('fail',function(result){
	core.toast(result.message);
	core.p(result)
})
http.url = "http://192.168.0.240:8099/index.php/index/user/login";
ui('do_Button_1').on('touch',function(){
	http.body = {
			"username":ui('do_TextField_1').text,
			'password':ui('do_TextField_2').text
	}
	core.p(http.body);
	http.request();
})

//注册
ui('do_Button_3').on('touch',function(){
	app.openPage('source://view/reg/reg0.ui');
})
//忘记密码
ui('do_Button_2').on('touch',function(){
	app.openPage('source://view/reg/forget0.ui');
})
//返回
ui('do_ALayout_2').on('touch',function(){
	app.closePage();
})

//隐藏键盘
ui('$').on('touch',function(){
	page.hideKeyboard();
})