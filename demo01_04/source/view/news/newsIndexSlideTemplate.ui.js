//引入组件库
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_Notification = sm("do_Notification");
var do_DataCache = sm("do_DataCache");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_root=ui("do_ALayout_root");
var do_ListView_news=ui("do_ListView_news");
var do_ALayout_main=ui("do_ALayout_main");
//定义do_ListView_news的数据model
var listdataNews = mm("do_ListData");
//在do_ALayout_root上动态添加子视图(用于等待数据装载的过程)
do_ALayout_root.add("loadingUI", "source://view/loadingUI.ui", 0, 0);
var loadingUI = ui("loadingUI");
//定义变量
var type_id;
var type_name;
var pageNum=0;

//设置数据绑定的映射关系
root.setMapping({
	"do_ALayout_root.tag":"id",
	"do_ALayout_main.tag":"name"
});

//初始化隐藏遮盖
loadingUI.visible = false;

//给do_ListView_news绑定数据
do_ListView_news.bindItems(listdataNews);
//刷新数据
function refreshAllData(){
	pageNum=0;
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/json"; // Content-Type
	http.url = "http://mock.deviceone.net/demo01/newsList.ashx"; // 请求的 URL
	http.body = JSON.stringify({id:type_id, page:pageNum}); // 传入新闻类型ID和页码的参数
	http.on("success", function(data) {
		//恢复do_ListView_news的headerview和footerview状态
		do_ListView_news.rebound();
		listdataNews.removeAll();
		//只有“热点”新闻，才需要显示推荐栏
		if (type_id== "redian"){
			listdataNews.addOne({"template":1, "type_id":type_id});
		}		
		listdataNews.addData(data);
		//do_ListView_news刷新显示
	    do_ListView_news.refreshItems();
	    //每次刷新的数据，都在本地缓存起来，以便下次打开应用时即时离线状态下也能显示新闻列表，提高用户体验
	    do_DataCache.saveData(type_id, data);
	    //去掉遮盖
	    loadingUI.visible = false;		
	});
	http.on("fail", function(data) {
		//去掉遮盖
		loadingUI.visible = false;
	    //恢复do_ListView_news的headerview和footerview
		do_ListView_news.rebound();
		//do_Notification.toast(data);
		do_Notification.toast("网络故障"); //比具体的错误提示更容易懂
	});
	http.request();
}
//刷新数据
function getNextPageData(){
	pageNum++;
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/json"; // Content-Type
	http.url = "http://mock.deviceone.net/demo01/newsList.ashx"; // 请求的 URL
	http.body = JSON.stringify({id:type_id, page:pageNum}); // 传入新闻类型ID和页码的参数
	http.on("success", function(data) {
		//恢复do_ListView_news的headerview和footerview
		do_ListView_news.rebound();
		listdataNews.addData(data);
		//do_ListView_news刷新显示
	    do_ListView_news.refreshItems();
	});
	http.on("fail", function(data) {
		//恢复do_ListView_news的headerview和footerview
		do_ListView_news.rebound();
		//do_Notification.toast(data);
		do_Notification.toast("网络故障"); //比具体的错误提示更容易懂
	});
	http.request();
}
//订阅每次绑定数据后的事件
root.on("dataRefreshed", function(){
	type_id= do_ALayout_root.tag;
	type_name= do_ALayout_main.tag;	
	
	//先尝试加载本地数据
	var data= do_DataCache.loadData(type_id);
	if (data != null && data.length > 0){
		listdataNews.removeAll();
		//只有“热点”新闻，才需要显示推荐栏
		if (type_id== "redian"){
			listdataNews.addOne({"template":1, "type_id":type_id});
		}
		listdataNews.addData(data);
		//do_ListView_news刷新显示
	    do_ListView_news.refreshItems();
	}
	else{
		loadingUI.visible = true;		
	}
	//更新远程最新数据
	refreshAllData();
});

//下拉列表，刷新数据
do_ListView_news.on("pull", function(data){
	//其中state=0：表示开始下拉headerview，；state=1：表示下拉headerview超过headerview的高度，触发一次这个事件；state=2：下拉超过一定值，触发state=1事件后，松手会触发一次这个事件，数据加载完后需要调用rebound方法让header复位
	if (data.state == 2){
		refreshAllData();
	}
});

//上拉列表，翻页数据
do_ListView_news.on("push", function(data){
	//其中state=0：表示开始上推headerview，；state=1：表示上推headerview超过headerview的高度，触发一次这个事件；state=2：上推超过一定值，触发state=1事件后，松手会触发一次这个事件，数据加载完后需要调用rebound方法让header复位
	if (data.state == 2){		
		getNextPageData();
	}
});

//点击一条新闻
do_ListView_news.on("touch", function(data){
	var onNews=listdataNews.getOne(data);
	do_App.openPage({
		source:"source://view/news/newsDetail.ui", 
		animationType:"push_r2l", //动画效果：从右向左推出
		statusBarState:"transparent",
		data:JSON.stringify({title:onNews.title, url:onNews.url}) //传递页面之间的参数
	});
});