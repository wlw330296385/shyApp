//引入组件库
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_App = sm("do_App");
var do_Page = sm("do_Page");
//声明UI变量
var do_ALayout_root=ui("do_ALayout_root");
var do_ALayout_b0=ui("do_ALayout_b0");
var do_ALayout_b1=ui("do_ALayout_b1");
var do_ALayout_b2=ui("do_ALayout_b2");
var do_ALayout_b3=ui("do_ALayout_b3");
var do_ImageView_b0=ui("do_ImageView_b0");
var do_ImageView_b1=ui("do_ImageView_b1");
var do_ImageView_b2=ui("do_ImageView_b2");
var do_ImageView_b3=ui("do_ImageView_b3");
var do_Label_b0=ui("do_Label_b0");
var do_Label_b1=ui("do_Label_b1");
var do_Label_b2=ui("do_Label_b2");
var do_Label_b3=ui("do_Label_b3");
var do_ViewShower_main=ui("do_ViewShower_main");

//定义每个按钮的touch事件
do_ALayout_b0.on("touch", function(){
	do_ImageView_b0.source = "source://image/s0.png";
	do_ImageView_b1.source = "source://image/d1.png";
	do_ImageView_b2.source = "source://image/d2.png";
	do_ImageView_b3.source = "source://image/d3.png";
	do_Label_b0.fontColor = "008C00FF";
	do_Label_b1.fontColor = "000000FF";
	do_Label_b2.fontColor = "000000FF";
	do_Label_b3.fontColor = "000000FF";
	do_ViewShower_main.showView("news");
});
do_ALayout_b1.on("touch", function(){
	do_ImageView_b0.source = "source://image/d0.png";
	do_ImageView_b1.source = "source://image/s1.png";
	do_ImageView_b2.source = "source://image/d2.png";
	do_ImageView_b3.source = "source://image/d3.png";
	do_Label_b0.fontColor = "000000FF";
	do_Label_b1.fontColor = "008C00FF";
	do_Label_b2.fontColor = "000000FF";
	do_Label_b3.fontColor = "000000FF";
	do_ViewShower_main.showView("contact");
});
do_ALayout_b2.on("touch", function(){
	do_ImageView_b0.source = "source://image/d0.png";
	do_ImageView_b1.source = "source://image/d1.png";
	do_ImageView_b2.source = "source://image/s2.png";
	do_ImageView_b3.source = "source://image/d3.png";
	do_Label_b0.fontColor = "000000FF";
	do_Label_b1.fontColor = "000000FF";
	do_Label_b2.fontColor = "008C00FF";
	do_Label_b3.fontColor = "000000FF";
	do_ViewShower_main.showView("find");
});
do_ALayout_b3.on("touch", function(){
	do_App.openPage({
		source:"source://view/feedback/main.ui", 
		statusBarState:"transparent",
		animationType: "push_r2l"
			});
});

//当前页面下，订阅android系统返回键的事件：3秒内连续点击两次退出应用
var canBack = false;
var delay3 = mm("do_Timer");
delay3.delay = 3000;
delay3.on("tick", function(){
	delay3.stop();
    canBack = false;
}); 
do_Page.on("back", function(){
    if (canBack) {
    	do_Global.exit();
    } else {
    	do_Notification.toast("再次点击退出应用");
        canBack = true;
        delay3.start();
    }
});

//绑定ViewShower的3个子页面
var viewShower_data = [ 
	{
		"id" : "news",
		"path" : "source://view/news/main.ui"
	}, 
	{
		"id" : "contact",
		"path" : "source://view/contact/main.ui"
	}, 
	{
		"id" : "find",
		"path" : "source://view/find/main.ui"
	}
];
do_ViewShower_main.addViews(viewShower_data);
//默认显示第1个页面
do_ViewShower_main.showView("news");