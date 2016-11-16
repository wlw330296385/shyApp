/**
 * @Author : yjzhen@live.com
 * @Timestamp : 2016-11-03
 */
var CF=require('config');
var nf = sm('do_Notification');
var app=sm('do_App');
var page=sm('do_Page');
var fMenu=[ui('fMenu_0'),ui('fMenu_1'),ui('fMenu_2'),ui('fMenu_3')];
var createUi=ui('fMenu_create');
var scrollPageView=ui('pageView');
//var fMenuT=[ui('fMenu_t_0'),ui('fMenu_t_1'),ui('fMenu_t_2'),ui('fMenu_t_3')];

//点击菜单回调函数
function touchMenu(_ind){
	for(var i=0;i<fMenu.length;i++){
		var _textUi=ui('fMenu_t_'+i);
		var _imgUi=ui('fMenu_img_'+i);
		if(_ind===i){
			_textUi.fontColor='FFC000FF';
			_imgUi.source='source://image/i_menu_h_'+i+'.png';
		}
		else{
			_textUi.fontColor='CCCCCCFF';
			_imgUi.source='source://image/i_menu_'+i+'.png';
		}
	}
	scrollPageView.showView(allPageUi[_ind].id);
}
fMenu.forEach(function(_item,_ind){
	fMenu[_ind].on('touch',function(){
		touchMenu(_ind);
	});
});
createUi.on('touch',function(){
	app.openPage({
		source: "source://view/talkers/talker.ui",
//		statusBarState:"transparent"
	});
});

var allPageUi=[
	{
		id:'page0',
		path:'source://view/index_menu_page/page0.ui'
	},
	{
		id:'historyTalk',
		path:'source://view/index_menu_page/historyTalk.ui'
	},
	{
		id:'page2',
		path:'source://view/index_menu_page/page2.ui'
	},
	{
		id:'page3',
		path:'source://view/index_menu_page/page3.ui'
	},
]
scrollPageView.addViews(allPageUi);
scrollPageView.showView('page0');

page.on('back',function(){
	app.closePage();
});



