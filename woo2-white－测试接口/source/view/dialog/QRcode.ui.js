/**
 * related to QRcode.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-24
 */
var app,page,core,userInfo,dialog;
dialog = sm('do_Dialog');
core = require('do/core');
var data = dialog.getData();
data.avatar = data.avatar==0?"source://image/por.png":data.avatar;
var do_ImageView_3 = ui('do_ImageView_3');
do_ImageView_3.source = data.imgUrl;
var do_Label_1 = ui('do_Label_1');
do_Label_1.text = data.username;

data.province = data.province == null?'未填写':data.province;
data.city = data.city == null?'未填写':data.city;
var do_Label_2 = ui('do_Label_2');
do_Label_2.text = data.province+' '+data.city;

var do_ImageView_4 = ui('do_ImageView_4');
do_ImageView_4.source = data.avatar;

var do_Album = sm('do_Album');
ui('do_ALayout_3').on('longTouch',function(){
	do_Album.save(data.imgUrl,Math.random(10000,99999)+".jpg", function(data, e) {
		if(data){
			core.toast('二维码保存成功');
		}else{
			core.toast('二维码保存失败');
		}
        
    })
})
//分享
var we = sm("do_TencentWX");
//分享到好友
ui('do_ALayout_4').on('touch',function(){
	we.share({
		appId:"wx2d2c3284b084cf4c", 
		scene:"0", 
		type:"0", 
		title:"蓝瘦,香菇,碎不勺,买了车却没钱加油", 
		content:"肿么办?今颠隔壁老宋高高兴兴地说深海油互联网加油站可以免费加油,你为什么说射种话?那我要去看看才得?", 
		url:data.url, 
		image:"source://image/por.png", 
		audio:''		
	},function(res){		
		if(res){
			core.toast('分享成功');
		}
	})
});
//分享到朋友圈
ui('do_ALayout_5').on('touch',function(){
	we.share({
		appId:"wx2d2c3284b084cf4c", 
		scene:"1", 
		type:"0", 
		title:"蓝瘦,香菇,碎不勺,买了车却没钱加油,还好深海油互联网加油站可以免费加油", 
		content:"肿么办?今颠隔壁老宋高高兴兴地说深海油互联网加油站可以免费加油,你为什么说射种话?那我要去看看才得?", 
		url:data.url, 
		image:"source://image/por.png", 
		audio:''
	},function(res){
		if(res){			
			core.toast('分享成功');
		}
	})
})

//分享到QQ
var qq = sm('do_TencentQQ');
ui('do_ALayout_1').on('touch',function(){
	qq.shareToQQ({
		appId:"1104684313",
		type:0,
		title:"深海油互联网加油站QQ应用分享",
		url:data.url,
		image:"data://por.png",
		summary:'蓝瘦,香菇,碎不勺,买了车却没钱加油,还好深海油互联网加油站可以免费加油',
		audio:"",
		appName:"深海油互联网加油站",
	},function(data) {
		if(data){
			core.toast('分享成功');
		}
	});

})