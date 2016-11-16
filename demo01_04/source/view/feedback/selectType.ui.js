//声明UI变量
var do_Page = sm("do_Page");
var do_ALayout_root = ui("do_ALayout_root");
var do_Picker_types = ui("do_Picker_types");

//初始时要隐藏
do_ALayout_root.visible = false;
//点击其它区域，则隐藏关闭当前View
do_ALayout_root.on("touch", function(){
	do_ALayout_root.visible = false;
});

//绑定数据
var listdata = mm("do_ListData");
listdata.addData([ 
"问题反馈",
"修改建议",
"项目合作",
"其它留言"
]);
do_Picker_types.bindItems(listdata);
//默认选择第1条记录
do_Picker_types.index=0;


//类型值变化
do_Picker_types.on("selectChanged", function(index) {
	//在当前页面下发送TypeChanged自定义消息
	do_Page.fire("TypeChanged", listdata.getOne(index));	
});
