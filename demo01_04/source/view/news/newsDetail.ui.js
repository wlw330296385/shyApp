//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
//声明UI变量
var do_ALayout_root=ui("do_ALayout_root");
var do_ALayout_back = ui("do_ALayout_back");
var do_WebView_news = ui("do_WebView_news");
var do_Label_title = ui("do_Label_title");

//订阅android系统返回键的事件：关闭当前页面
do_Page.on("back", function(){
	do_App.closePage();
});

//关闭当前页面
do_ALayout_back.on("touch", function(){
	do_App.closePage();
});
//页面装载完成后，开始初始化工作
do_Page.on("loaded", function(){
	//读取当前页面的传入参数
	var para=do_Page.getData();
	do_Label_title.text = para.title;
	do_WebView_news.url = para.url;
});

