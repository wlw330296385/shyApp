/**
 * related to reg2.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-29
 */
var app,page,core;
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');

page.on('loaded',function(){
	ui('do_TextField_1').on('focusOut',function(){
		if(this.text == ''){
			core.toast('密码不能为空')
		}
	})
	
	ui('do_TextField_2').on('focusOut',function(){
		if(this.text != ui('do_TextField_1').text){
			core.toast('两次密码不一致')
		}
	})
})

ui('do_Button_1').on('touch',function(){
	if(ui('do_TextField_1').text == ''){
		core.toast('密码不能为空');
		return false;
	}
	if(ui('do_TextField_2').text != ui('do_TextField_1').text){		
		core.toast('两次密码不一致')
		return false;
	}
	var data = {
			"password":ui('do_TextField_1').text,
			"password2":ui('do_TextField_2').text
	};
	page.fire('step2',data);
})
