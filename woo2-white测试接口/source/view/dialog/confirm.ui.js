/**
 * related to confirm.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-27
 */

var page = sm("do_Page");
var dialog = sm("do_Dialog");

var data = dialog.getData();

var title_label = ui("do_Label_1");
title_label.text = data.title?data.title:"提示";

var do_Label_2 = ui("do_Label_2");
do_Label_2.text = data.content;

var cancel_button = ui("do_Button_1");
cancel_button.text = data.btn1?data.btn1:'取消';
cancel_button.on("touch", function() {
	dialog.close(0);
})
var ok_button = ui("do_Button_2");
ok_button.text = data.btn2?data.btn2:"确定";
ok_button.on("touch", function() {
	//只有点确定按钮的时候，再把输入的内容传递回index.ui
	dialog.close(1);
})