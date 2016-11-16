/**
 * related to popmenu.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-13
 */
var album = sm("do_Album");
var mask = ui('mask');
var app = sm('do_App');
var page = sm('do_Page');
var data = {};
var core = require('do/core');
page.on("loaded", function() {
var	res = page.getData();
	data.img = res; 
})
mask.on('touch',function(){
	data.action = 0;
	app.closePage(data);
})
var takePic = ui('takePic');
var selectPic = ui('selectPic');

takePic.on('touch',function(){
	data.action = 1;
	app.closePage(data);
});

selectPic.on('touch',function(){
	data.action = 2;
	album.select(1, 256, -1,100,true, function(res, e) {
		data.path = res[0];
		app.closePage(data);
	})
})

//返回
page.on('back',function(){
	app.closePage();
});