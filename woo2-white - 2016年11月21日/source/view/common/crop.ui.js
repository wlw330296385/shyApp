/**
 * related to crop.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-13
 */
var page = sm("do_Page");
var app = sm("do_App");
var cropImage = ui("do_ImageCropView_1");
var button1 = ui("do_Button_1");
var button2 = ui("do_Button_2");
var core = require('do/core');
var data = {};
cropImage.cropArea = '750, 430';
page.on("loaded", function() {
	data = page.getData()
	cropImage.source = data.path;
})

button1.on("touch", function() {
	cropImage.crop(function(d) {
		data.path = d;
		data.action = 2;
		core.p(data);
		app.closePage(data);
	})
})
button2.on("touch", function() {
	data.action = 0;
	app.closePage(data);
})












//返回
page.on('back',function(){
	app.closePage();
});