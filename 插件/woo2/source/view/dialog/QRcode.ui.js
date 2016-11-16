/**
 * related to QRcode.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-24
 */
var app,page,storage,core,userInfo,dialog;
storage = sm('do_Storage');
dialog = sm('do_Dialog');
var data = dialog.getData();
data.avatar = data.avatar==0?"source://image/por.png":data.avatar;
var do_ImageView_3 = ui('do_ImageView_3');
do_ImageView_3.source = data.imgUrl;

var do_Label_1 = ui('do_Label_1');
do_Label_1.text = data.username;

data.province = data.province == 'null'?'广东':data.province;
data.city = data.city == 'null'?'深圳':data.city;
var do_Label_2 = ui('do_Label_2');
do_Label_2.text = data.province+' '+data.city;

var do_ImageView_4 = ui('do_ImageView_4');
do_ImageView_4.source = data.avatar;



//分享
var we = sm("do_TencentWX");
//分享到好友
ui('do_ALayout_4').on('touch',function(){
	we.share({
		appId:"wxe5c5274772aa9e8c", 
		scene:"0", 
		type:"0", 
		title:"蓝瘦,香菇,碎不勺,买了车却没钱加油", 
		content:"肿么办?今颠隔壁老宋高高兴兴地说深海油互联网加油站可以免费加油,你为什么说射种话?那我要去看看才得?", 
		url:data.url, 
		image:"source://image/por.png", 
		audio:'', 
		function(data, e){
			nf.toast(data);
		}
	})
});
//分享到朋友圈
ui('do_ALayout_5').on('touch',function(){
	we.share({
		appId:"wxe5c5274772aa9e8c", 
		scene:"1", 
		type:"0", 
		title:"蓝瘦,香菇,碎不勺,买了车却没钱加油", 
		content:"肿么办?今颠隔壁老宋高高兴兴地说深海油互联网加油站可以免费加油,你为什么说射种话?那我要去看看才得?", 
		url:data.url, 
		image:"source://image/por.png", 
		audio:'', 
		function(data, e){
			nf.toast(data);
		}
	})
})