/**
 * related to barCodeView.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-24
 */
var app = sm("do_App");
var device = sm("do_Device");
var page = sm("do_Page");
var core = require('do/core');
var barcode = ui("do_BarcodeView_1");
page.on("loaded", scan);

var reStar = ui("do_ALayout_3");
reStar.on("touch", scan);
function scan() {
	barcode.start(function(data, e) {
		device.beep();
		var toData = {
				url:data.value,
				title:"扫描结果"
		}
		app.openPage("source://view/web/web.ui",toData);
	})
}

var flash = ui("do_ImageView_1");
var i = 0;
flash.on("touch", function() {
	i++;
	var R = i % 2;
	if (R == 1) {
		flash.source = "source://image/icon/flash_" + R + ".png";
		barcode.flash("on");
	} else if (R == 0) {
		flash.source = "source://image/icon/flash_" + R + ".png";
		barcode.flash("off");
	}
})


ui("do_ALayout_1").on("touch", function() {
	app.closePage();
})