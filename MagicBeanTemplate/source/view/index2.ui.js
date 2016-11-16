/**********************************************
 * Author : @Author
 * Timestamp : @Timestamp
 **********************************************/
var nf = sm("do_Notification");
var rootview = ui("$");
var page = sm("do_Page");
var app = sm("do_App");
var closebtnAim = deviceone.mm("do_Animation", "CLOSEBTNDWON", "app"); //关闭按钮动画

//add emptyheader.ui
var headerEmpty = rootview.add("emptyHeader","source://view/header/header_title_leftright.ui",0,0); //add header ui文件
var headerEmptyTitle = ui(headerEmpty + ".header_title"); //实例化 emptyui的 label
headerEmptyTitle.text = "修改标题2";

var headerClose = ui(headerEmpty + ".do_ALayout_close"); //实例化 headerclose按钮
headerClose.on("touch","",300,function(){
	headerClose.animate(closebtnAim,function(){
		app.closePage();
	});
});

var switchboxtxt = rootview.add("boxtxtswitch","source://view/switch/switch_text.ui",100,400); //add header ui文件
var switchbox = ui(switchboxtxt + ".switch_box");
//switchtag事件获取状态
page.on("switchtag",function(data){
	nf.alert(data);
});

var switchboxep = rootview.add("boxepswitch","source://view/switch/switch_ep.ui",300,400); //add header ui文件
var switchboxep = ui(switchboxep + ".switch_box");
//switcheptag事件获取状态
page.on("switcheptag",function(data){
	nf.alert(data);
});

var loadingrt = rootview.add("rtloading","source://view/loadings/loading_roundtxt.ui",200,240);
page.on("loaded",function(){
	page.fire("loadingrx",true);
})
