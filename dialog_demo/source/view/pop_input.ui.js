//related to loading_roundtxt.ui
var page = sm("do_Page");
var nf = sm("do_Notification");
var dialog = sm("do_Dialog");

//通过dilaog的getData方法获取到从index.ui传递过来的数据
//并赋值给组件的属性
var data = dialog.getData();

var title_label = ui("do_Label_title");
title_label.text = data.title;

var textfield = ui("do_TextField_1");
textfield.hint = data.hint;
textfield.text = data.text;

var cancel_button = ui("do_Button_1");
cancel_button.on("touch", function() {
	dialog.close();
})
var ok_button = ui("do_Button_2");
ok_button.on("touch", function() {
	//只有点确定按钮的时候，再把输入的内容传递回index.ui
	dialog.close(textfield.text);
})