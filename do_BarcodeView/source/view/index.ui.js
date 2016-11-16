//related to view0.ui
var app = sm("do_App");
var device = sm("do_Device");
var page = sm("do_Page");
var nf = sm("do_Notification");
page.on("back", function(data) {
	app.closePage();
})
var back = ui("do_ImageView_1");
back.on("touch", function() {
	app.closePage();
})

var barcode = ui("do_BarcodeView_1");
page.on("loaded", scan);

var reStar = ui("do_ALayout_1");
reStar.on("touch", scan);
function scan() {
	barcode.start(function(data, e) {
		device.beep();
		var result = JSON.stringify(data);
		nf.alert(result, "扫描结果")
	})
}
var flash = ui("do_ImageView_2");
var i = 0;
flash.on("touch", function() {
	i = i + 1;
	var R = i % 2;
	if (R == 1) {
		flash.source = "source://image/flash_" + R + ".png";
		barcode.flash("on");
	} else if (R == 0) {
		flash.source = "source://image/flash_" + R + ".png";
		barcode.flash("off");
	}
})
