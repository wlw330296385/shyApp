//related to crop.ui
var page = sm("do_Page");
var app = sm("do_App");
var cropImage = ui("do_ImageCropView_1");
var button1 = ui("do_Button_1");
var button2 = ui("do_Button_2");

page.on("loaded", function() {
	cropImage.source = page.getData();
})

button1.on("touch", function() {
	cropImage.crop(function(d) {
		app.closePage(d);
	})
})
button2.on("touch", function() {
	app.closePage();
})