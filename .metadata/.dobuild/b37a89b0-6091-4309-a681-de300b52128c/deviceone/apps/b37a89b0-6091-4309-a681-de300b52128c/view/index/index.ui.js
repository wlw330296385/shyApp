/*******************************************************************************
 * @ ������: do_SegmentView do_SlideView
 * 
 */
//首页底部按钮
var navs = [ui('nav_1'),ui('nav_2'),ui('nav_3'),ui('nav_4')];
var labels = [ui('lb_1'),ui('lb_2'),ui('lb_3'),ui('lb_4')];
var icons = [ui('do_ImageView_1'),ui('do_ImageView_2'),ui('do_ImageView_3'),ui('do_ImageView_4')]
var debug = require('deviceone');
var nf = sm("do_Notification");
var app = sm('do_App');
var page = sm('do_Page');
var storage = sm('do_Storage');
var global = sm('do_Global');
var core = require('do/core');
var userInfo;
var checkNav = function(index){
	for(var i = 0;i<labels.length;i++){
		labels[i].fontColor = "666666FF";
		icons[i].source = "source://image/menu"+i+'-2.png';
	}	
		labels[index].fontColor = "043879FF";
		icons[index].source = "source://image/menu"+index+'-1.png';
	
};
var pages = [{id:'home',path:'source://view/home/index.ui'},
             {id:'sea',path:'source://view/sea/sea.ui'},
             {id:'basket',path:'source://view/basket/basket.ui'},
             {id:'user',path:'source://view/user/user.ui'}
             ];
var viewShower = ui('viewShower1');
viewShower.addViews(pages);
viewShower.showView('home');
navs.forEach(function(me,i){
	me.on('touch',function(data,e){
		checkNav(i);
		viewShower.showView(pages[i].id);
	})
})

//切换page事件
viewShower.on('viewChanged',function(viewID,e){
	if(viewID == 'user'|| viewID == 'basket'){
		userInfo = storage.readFileSync('data://userInfo');
		global.setMemory("userInfo",userInfo.data);
		if(userInfo.code!=1){
			app.openPage("source://view/login/login.ui",'login');
			return false;
		}
	}
})

app.on('loaded',function(){
	app.closePageToID('','','index');
})

//退出程序
var pagejs = require('do/page');
pagejs.allowExit();	
