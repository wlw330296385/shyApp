//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Notification = sm("do_Notification");
var do_DateTimePicker=sm("do_DateTimePicker");
//引入自定义的js库
var tools = require("tools");
//声明UI变量
var do_ALayout_root=ui("do_ALayout_root");
var do_ALayout_back = ui("do_ALayout_back");
var do_ALayout_submit = ui("do_ALayout_submit");
var do_Label_title = ui("do_Label_title");
var do_TextField_title = ui("do_TextField_title");
var do_Label_content = ui("do_Label_content");
var do_TextBox_content = ui("do_TextBox_content");
var do_ALayout_type = ui("do_ALayout_type");
var do_Label_type = ui("do_Label_type");
var do_ALayout_createTime = ui("do_ALayout_createTime");
var do_Label_createTime = ui("do_Label_createTime");

//定义变量
var feedbackTime;
var feedbackType;

//在do_ALayout_root上动态添加子视图(该视图初始化的脚本会将自身先隐藏)
do_ALayout_root.add("selectType", "source://view/feedback/selectType.ui", 0, 0);
var selectType = ui("selectType");

//订阅android系统返回键的事件：关闭当前页面
do_Page.on("back", function(){
	do_App.closePage();
});

//关闭当前页面
do_ALayout_back.on("touch", function(){
	do_App.closePage();
});

//提交反馈信息
do_ALayout_submit.on("touch", function(){
	if (do_TextField_title.text.length <= 0){
		do_Notification.toast("标题不允许空");
		return;
	}
	if (do_TextBox_content.text.length <= 0){
		do_Notification.toast("内容不允许空");
		return;
	}
	if (feedbackTime == null){
		do_Notification.toast("反馈时间不允许空");
		return;
	}
	if (feedbackType == null){
		do_Notification.toast("反馈类型不允许空");
		return;
	}
	
	//此处是提交到服务端的代码，把数据提交到云端
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/json"; // Content-Type
	http.url = "http://mock.deviceone.net/demo01/feedback.ashx"; // 请求的 URL
	http.body = JSON.stringify({title:do_TextField_title.text, 
		content:do_TextBox_content.text,
		createTime:tools.getTimeText(feedbackTime),
		feedType:feedbackType}); // 传入参数
	http.on("success", function(data) {
		do_Notification.alert("提交反馈成功！", "提示信息", function() {
			do_App.closePage();
		});
	});
	http.on("fail", function(data) {
		do_Notification.toast(data);	
	});
	http.request();
});

//输入标题的动画效果
do_Label_title.visible= false;
do_TextField_title.on("textChanged", function(){
	if (do_TextField_title.text.length > 0 && 
			!do_Label_title.visible){
		do_Label_title.show("slide_b2t", 300);	
	}
	else{
		if (do_TextField_title.text.length <= 0){
			do_Label_title.visible= false;
		}		
	}
});

//输入内容的动画效果
do_Label_content.visible= false;
do_TextBox_content.on("textChanged", function(){
	if (do_TextBox_content.text.length > 0 && 
			!do_Label_content.visible){
		do_Label_content.show("slide_b2t", 300);	
	}
	else{
		if (do_TextBox_content.text.length <= 0){
			do_Label_content.visible= false;
		}		
	}
});

//选择类型
do_ALayout_type.on("touch", function(data, e) {
	selectType.show("fade", 200);
	//隐藏当前的软键盘
	do_Page.hideKeyboard();
});

//在当前页面下订阅TypeChanged自定义消息
do_Page.on("TypeChanged", function(data){
	do_Label_type.text=data;
	feedbackType = data;
});

//修改结束时间
do_ALayout_createTime.on("touch", function(){
	do_DateTimePicker.show({
		type:1, //只显示日期
		data:feedbackTime.getTime(), 
		title:"设置反馈日期"},
		function(data, e){
			if (data.flag==1){
				feedbackTime.setTime(data.time);
				do_Label_createTime.text=tools.getTimeText(feedbackTime);
			}
		}
	);
	//隐藏当前的软键盘
	do_Page.hideKeyboard();
});

//页面装载完成后，开始初始化工作
do_Page.on("loaded", function(){
	feedbackType="问题反馈";
	do_Label_type.text=feedbackType;
	feedbackTime=new Date();
	do_Label_createTime.text=tools.getTimeText(feedbackTime);
});

