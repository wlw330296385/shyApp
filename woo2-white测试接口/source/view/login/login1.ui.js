/**
 * related to login1.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-29
 */
var app,page,nf,storage,http;
app = sm('do_App');
page = sm('do_Page');
nf = sm('do_Notification');
storage = sm('do_Storage');
page.on('loaded',function(){
	ui('do_TextField_1').on('focusOut',function(){
		if(this.text == ''){
			nf.toast("用户名不能为空");
		}
	})
	ui('do_TextField_2').on('focusOut',function(){
		if(this.text == ''){
			nf.toast("密码不能为空");
		}
	})
})

//通讯
http = mm('do_Http');
http.method = "post";
http.contentType = "application/json";
http.on('success',function(result){
	if(result.code == 1){
		var jpush = sm('do_JPush');
		jpush.setAlias(result.data.mobile);
		storage.writeFile('data://userInfo',result,true,function(res){	
			if(res){
				nf.toast('登陆成功');
				app.closePage({data:'login',animationType:'slide_t2b',layer:1});
			}else{
					nf.toast('存储失败，请检查手机权限');
				return false;
			}											
		})
	}else{
		nf.toast(result.msg);
	}
})
http.on('fail',function(result){
	nf.toast(result.message);
})
http.url = "http://api.e-shy.com/index.php/index/user/login";
ui('do_Button_1').on('touch',function(){
	if(this.text == ''){
		nf.toast("用户名不能为空");
		return false;
	}
	if(this.text == ''){
		nf.toast("密码不能为空");
		return false;
	}
	http.body = {
			"username":ui('do_TextField_1').text,
			'password':ui('do_TextField_2').text
	}
	http.request();
})

//注册
ui('do_Button_3').on('touch',function(){
	app.openPage({source:'source://view/reg/reg0.ui',animationType:'push_t2b'});
})
//忘记密码
ui('do_Button_2').on('touch',function(){
	app.openPage({source:'source://view/reg/forget0.ui',animationType:'push_t2b'});
})
//返回
ui('do_ALayout_2').on('touch',function(){
	app.closePage();
})
page.on('back',function(){
	app.closePage();
})
var style=require("do/style");
style.css([ui('do_Button_1'),ui('do_Button_2'),ui('do_Button_3')]);
//隐藏键盘
ui('$').on('touch',function(){
	page.hideKeyboard();
})