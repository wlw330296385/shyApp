/**
 * related to goods_3.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-07
 */
var root = ui('$');
var page,app,core,storage,userInfo,dialog;
page = sm('do_Page');
app = sm('do_App');
core = require('do/core');
storage = sm('do_Storage');
dialog = sm('do_Dialog');
userInfo = storage.readFileSync("data://userInfo",true);
root.setMapping({
	'do_ImageView_1.source':'goodsPic:0.goodsPic',
	'do_ImageView_1.tag':'goodsPic:0.tag',
	'do_ImageView_2.source':'goodsPic:1.goodsPic',
	'do_ImageView_2.tag':'goodsPic:1.tag',
})

var data = mm('do_HashData');
var d = {};
d.goodsPic = [{
	'goodsPic':'source://image/SG.png',
	'tag':'url'},{
	'goodsPic':'source://image/CNPC.png',
	'tag':'url'}];
data.addData(d);
root.bindData(data);
root.refreshData();
//点击事件
var notify = sm('do_Notification');
ui('do_ALayout_2').on('touch',function(data){
	if(userInfo.data.code == 1){
		app.openPage('source://view/charge/webCharge.ui','1');//中石油
	}else{
		var confirmData = {
				"title":"提示",
				"content":"需要登录过才能进行油卡充值,马上登录?",
				"btn1":"取消",
				"btn2":"确定"
		};
		dialog.open("source://view/dialog/confirm.ui",confirmData,function(dialogData,e){
			var outData = {
					"code":0
			}
			if (dialogData == 1){					
				core.toast('进行登陆');
				app.openPage("source://view/login/login.ui");			
			}
		})
	}
	
});

ui('do_ALayout_3').on('touch',function(data){
	app.openPage('source://view/charge/webCharge.ui','2');//中石化
})