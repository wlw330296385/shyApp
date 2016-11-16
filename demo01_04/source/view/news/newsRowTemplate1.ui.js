//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_DataCache = sm("do_DataCache");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_SlideView_news=ui("do_SlideView_news");
//定义do_SlideView_news的数据model
var listdataNews = mm("do_ListData");

//设置数据绑定的映射关系
root.setMapping({
	"do_ALayout_root.tag":"type_id"
});
//给do_SlideView_news绑定数据
do_SlideView_news.bindItems(listdataNews);

//订阅每次绑定数据后的事件
root.on("dataRefreshed", function(){
	//先尝试加载本地数据
	var data= do_DataCache.loadData("newsShow");
	if (data != null && data.length > 0){
		listdataNews.removeAll();
		listdataNews.addData(data);
		//do_SlideView_news刷新显示
		do_SlideView_news.refreshItems();
	}
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/json"; // Content-Type
	http.url = "http://mock.deviceone.net/demo01/newsShow.ashx"; // 请求的 URL
	http.on("success", function(data) {
		listdataNews.removeAll();
		listdataNews.addData(data);
		//do_SlideView_news刷新显示
		do_SlideView_news.refreshItems();
	    //每次刷新的数据，都在本地缓存起来，以便下次打开应用时即时离线状态下也能显示新闻列表，提高用户体验
	    do_DataCache.saveData("newsShow", data);
	});
	http.on("fail", function(data) {
		//do_Notification.toast(data);
		do_Notification.toast("网络故障"); //比具体的错误提示更容易懂
	});
	http.request();
});
