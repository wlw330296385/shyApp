/**********************************************
 * v1.0.1 deviceone自定义组件模版（头部，按钮，加减数量，加载，底部弹出，开关（文字／无文字），选项卡（2-4）, radio）全部带动画效果 
 * app.js中有必须代码
 * 注意：当前需从组件商店中新增：do_Animator
 * 不定时新增更新自定义组件
 * 可复用，通过add的方式增加到所需要的ui中，数据交互通过 自定义事件，fire传递。模版中只使用个别方法，根据个人需求去修改，论坛有相关例子（具体打开模版组件js文件）
 * 修改一些数据交互的方式（不要局限于例子中的代码）
 **********************************************/
var nf = sm("do_Notification");
var rootview = ui("$");
var page = sm("do_Page");
var app = sm("do_App");
var closebtnAim = deviceone.mm("do_Animation", "CLOSEBTNDWON", "app"); //关闭按钮动画
var buttonA = deviceone.mm("do_Animation", "BUTTONTOUCHDOWNS", "app");
//add emptyheader.ui
var headerEmpty = rootview.add("emptyHeader","source://view/header/header_title_leftright.ui",0,0); //add header ui文件
var headerEmptyTitle = ui(headerEmpty + ".header_title"); //实例化 emptyui的 label
headerEmptyTitle.text = "修改标题home";


var headerClose = ui(headerEmpty + ".do_ALayout_close"); //实例化 headerclose按钮
//－－－－－－headerclose关闭事件
headerClose.on("touch","",300,function(){
	headerClose.animate(closebtnAim,function(){
		app.closePage();
	});
});
//－－－－－－headerright按钮事件
var headerright = ui(headerEmpty + ".do_ALayout_right"); //实例化 rightimgbtn按钮
headerright.on("touch","",300,function(){
	headerright.animate(buttonA,function(){
		page.fire("popbottomSJ",true); //打开pop
	});
});

//－－－－－－文字开关
var switchboxtxt = rootview.add("boxtxtswitch","source://view/switch/switch_text.ui",50,400);
var switch_r1 = ui("boxtxtswitch");
switch_r1.fire("switchzt","1");
//将switch实例化。
var switchtags = ui(switchboxtxt + ".switch_box");
//nf.alert(switchtags.tag);//显示tag的值


var switchboxtxt1 = rootview.add("boxtxtswitch1","source://view/switch/switch_text.ui",50,300);
var switch_r2 = ui("boxtxtswitch1");
switch_r2.fire("switchzt","0");

//－－－－－－没有文字开关
var switchboxep = rootview.add("boxepswitch","source://view/switch/switch_ep.ui",300,400); 
var switchboxept = ui("boxepswitch");
switchboxept.fire("switchepzt","1");
//switcheptag事件获取状态
page.on("switcheptag",function(data){
	page.fire("loadingrxa",data); //显示隐藏loadingrt
});

//－－－－－－bigbtn
var buttonbig = rootview.add("bigbtn","source://view/buttons/buttonBig.ui",0,500); 
btnbig = ui(buttonbig + ".do_Button_big");
btnbig.bgColor = "007affff"; //修改按钮背景颜色


//－－－－－－add tab top
var tabtop = rootview.add("toptab","source://view/tabs/tab_top4.ui",0,650); 
tabtopnum = ui(tabtop + ".tab3num");
//nf.alert(tabtopnum.tag);
//获取tabtop的tag
page.on("tabtop4",function(data){
	//nf.alert(data);
});

var loadingrt = rootview.add("rtloading","source://view/loadings/loading_roundtxt.ui",200,240);

var numregula = rootview.add("regulanum","source://view/inputs/num_regulation.ui",100,800);

var radioani = rootview.add("aniradio","source://view/choses/radio_anim.ui",450,800);
var radioani2 = rootview.add("aniradio2","source://view/choses/radio_anim.ui",450,900);
var radioani_f1 = ui("aniradio");var radioani_f2 = ui("aniradio2");
radioani_f1.fire("radioget",1);// 默认 第一个选中
//简单模拟radio切换
radioani_f1.on("touch",function(){
	radioani_f1.fire("radioget",1);
	radioani_f2.fire("radioget",0);
});
radioani_f2.on("touch",function(){
	radioani_f1.fire("radioget",0);
	radioani_f2.fire("radioget",1);
});

//－－－－－－pops up
var popbottom = rootview.add("btmpop","source://view/pops/popbottom.ui",0,0);

//open index2.ui
var dobtn1 = ui("do_Button_1");
dobtn1.on("touch",function(){
	dobtn1.animate(buttonA);
	app.openPage({
		animationType :"slide_r2l_1",
    	source : "source://view/index2.ui",
    	statusBarState : "transparent",
    	statusBarFgColor : "black",
    	id:"page22"
    });
});

//loaded加载事件
page.on("loaded",function(){
	var tts = 1;
	page.fire("loadingrxa",tts);//loading 默认状态
	page.fire("numregulas",tts); //num_regulation 默认数量
});
