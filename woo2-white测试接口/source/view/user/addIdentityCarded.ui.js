/**
 * related to addIdentityCarded.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-16
 */

var do_ImageView_1 = ui('do_ImageView_1');
var app = sm('do_App');
do_ImageView_1.on('touch',function(){
	app.closePage();
})

//返回
page.on('back',function(){
	app.closePage();
});