//引入组件库
var do_App = sm("do_App");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_root=ui("do_ALayout_root");
var do_ImageView_news=ui("do_ImageView_news");
var do_Label_title=ui("do_Label_title");

//设置数据绑定的映射关系
root.setMapping({
	"do_ImageView_news.source":"image",
	"do_Label_title.text":"title",
	"do_ALayout_root.tag":"url"
});

//点击查看当前新闻的详细内容
do_ALayout_root.on("touch", function(){
	var _newsID = do_ALayout_root.tag;
	do_App.openPage({
		source:"source://view/news/newsDetail.ui", 
		animationType:"push_r2l", //动画效果：从右向左推出
		statusBarState:"transparent",
		data:JSON.stringify({title:do_Label_title.text, url:_newsID}) //传递页面之间的参数
	});
});