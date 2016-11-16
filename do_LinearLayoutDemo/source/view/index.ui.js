/*******************************************************************************
 * Author :
 * 
 * @Author Timestamp :
 * @Timestamp
 ******************************************************************************/
var nf = sm("do_Notification");
var add = ui("addLinearLayout");
var linearlayout = ui("do_LinearLayout_1");
var i = 0;
add.on("touch", function() {
	// 插入到“第二个组件”下
	// add函数返回是新加ui的地址，
	// add 的参数1是表示加进来的ui在index.ui里的唯一标示，必须和index.ui其他view的id不一样
	var newui = linearlayout.add("added_ui_id" + i, "source://view/test.ui",
			"do_Button_1");
	// ui("added_ui_id" + i)===ui(newui)

	// label是新加进去来的ui文件里的一个子view,可以通过这种方式获取到子view的对象
	var label = ui(newui + ".do_Label_1");
	label.text = "我是add进来的" + i;

	newui = ui("added_ui_id" + i);
	newui.width = newui.width + 10 * i;
	i++;
});