/*******************************************************************************
 * @ ������: do_SegmentView do_SlideView
 * 
 */
//首页底部按钮
var navs = [ui('nav_1'),ui('nav_2'),ui('nav_3'),ui('nav_4')];
var labels = [ui('lb_1'),ui('lb_2'),ui('lb_3'),ui('lb_4')];
var icons = [ui('do_ImageView_1'),ui('do_ImageView_2'),ui('do_ImageView_3'),ui('do_ImageView_4')];
var nf = sm("do_Notification");
var app = sm('do_App');
var page = sm('do_Page');
var storage = sm('do_Storage');
var global = sm('do_Global');
var core = require('do/core');
var device = sm("do_Device");
var external = sm("do_External");
var userInfo,http,appVer;
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
             {id:'basket',path:'source://view/basket/index.ui'},
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
		userInfo = storage.readFileSync('data://userInfo',true);
		global.setMemory("userInfo",userInfo.data);
		if(userInfo.code!=1){
			app.openPage("source://view/login/login.ui",'login');
			return false;
		}
	}
})

//APP更新
var deviceInfo = device.getInfo();
var app_type = 1;
var dialog = sm("do_Dialog");
var data = {
		"btn1":"取消",
		"btn2":"立即更新",
		"title":"更新提示",
		"content":""
}
page.on('loaded',function(){
	appVer = global.getVersion();
	core.p(appVer);
	if(deviceInfo.OS=="android"){
		app_type = 1;
		global.setMemory("equipment", 1);
	}else{
		app_type = 2;
		global.setMemory("equipment", 2);
	}
	
	//尝试打开自带浏览器	
	http.body = {
		"app_version":appVer.ver,
		"app_type":app_type
	};
	http.request();
})
http = mm('do_Http');
http.method = "POST";
http.url = 'http://api.e-shy.com/index/app/update';
var resultData = {
		code:0
	};
http.on('success',function(result){
	resultData = result;
	//	弹出更新提示
	if(result.code ==1 && result.data.force_install == 0){
		data.content = result.data.app_desc;
		dialog.open("source://view/dialog/appUpdate.ui",data,false,function(dialogData,e){
			if (dialogData == 2){
					external.openURL(result.data.app_path);
			}
		})	
	}if(result.code ==1 && result.data.force_install ==1){
			external.openURL(result.data.app_path);
		}
})
http.on('fail',function(msg){
	core.alert(msg.message);
	core.p(msg);
})

var pagejs = require('do/page');
pagejs.allowExit();	
