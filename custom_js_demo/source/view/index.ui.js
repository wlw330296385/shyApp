/*******************************************************************************
 * Author : @Author 
 * Timestamp : @Timestamp
 ******************************************************************************/
var nf = sm("do_Notification");
var util = require("util");//加载source/script/util.js模块
var ui_util = require("ui/util");//加载source/script/ui/util.js模块
//返回按钮
ui_util.init("close");

//
var encodeButton = ui("do_Button_1");
var decodeButton = ui("do_Button_2");
var srcTextBox = ui("do_TextBox_1");
var destTextBox = ui("do_TextBox_2");

encodeButton.on("touch", function() {
	var src = srcTextBox.text;
	var dest = util.encode(src);
	destTextBox.text = dest;
})

decodeButton.on("touch", function() {
	var src = destTextBox.text;
	var dest = util.decode(src);
	srcTextBox.text = dest;
})