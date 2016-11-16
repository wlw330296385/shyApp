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
var device = sm("do_Device");
var external = sm("do_External");
var userInfo,http,appVer,device;
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

//APP更新
var deviceInfo = device.getInfo();
var app_type = 1;
var dialog = sm("do_Dialog");
var data = {
		"btn1":"取消",
		"btn2":"立即更新",
		"title":"更新提示",
		"content":"我还安徽大家肯定会奥哈拉肯定会卡多喝水按客户给撒旦法;返回索拉卡姐夫哥萨克拉ai;dh爱活动aoli;dh阿呆啊我我和我我好ID号ihaodhaoiha;sal;hal;h爱U盾咖妃打得过爱高度改不掉个阿奴老公的唉古达UI爱UI高度爱国的au 爱好高端就爱国端扫牛的很奥迪啊u偶爱U盾哈都好ID奥迪[Oahu熊爱华的欧年后奥迪哥矮冬瓜唉怪U盾怪盖挂碍 矮冬瓜我唉u爱爱时给大哥嗲 IAO都会到货一个到电话奥迪和奥迪和奥迪哥奥迪哥奥迪哥熬奥迪哥矮冬瓜爱国道德搞得跟矮冬瓜熬到的a;odg矮冬瓜奥迪哥奥迪高度大活动啊哈倒杀我等哈怪谁奥飞的发糕if啊搜if爱疯爱爱话费爱搜害臊发偶偶复赛哦胸啊爱哦啊哦ihasio[hfaio[fh奥if好iq-pou俺婆婆啊我今儿阿婆圣诞节阿婆安排的空间外婆'就阿婆的就"
}
page.on('loaded',function(){
	appVer = global.getVersion();
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
		dialog.open("source://view/dialog/appUpdate.ui",false,function(dialogData,e){
			if (dialogData == 2){
					external.openURL(result.data.app_path);
			}
		})
		if(result.code ==1 && result.data.force_install ==1){
			external.openURL(result.data.app_path);
		}
	}
})
http.on('fail',function(msg){
	core.alert(msg.message);
	core.p(msg);
})
//退出程序
page.on('back',function(){
	core.alert("双击两次退出程序");
	return false;
})
var pagejs = require('do/page');
pagejs.allowExit();	
