/**
 * related to share.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-21
 */
var app,page,core,dialog,album,http;
dialog = sm('do_Dialog');
core = require('do/core');
album = sm('do_Album');
http = mm('do_Http');

var data = dialog.getData();
http.method = "post";
http.url = data.shareImgUrl;
core.p(data)
ui('do_ImageView_1').source = data.shareImgUrl;
//保存图片到本地
ui('do_Button_1').on('touch',function(){
	http.download("data://shy-share.png");
})
http.on('success',function(){
	album.save("data://shy-share.png",'shy-share.png',function(data, e) {
	    core.toast("保存成功");
		})
})
http.on('fail',function(msg){
	core.p(msg)
	core.toast(msg.message);
})
//分享
var we = sm("do_TencentWX");
//分享到好友
ui('do_ALayout_3').on('touch',function(){
	we.share({
		appId:"wx2d2c3284b084cf4c", 
		scene:"0", 
		type:"0", 
		title:"买了车却没钱加油怎么办?来深海油免费加油吧!", 
		content:"肿么办?今颠隔壁老宋高高兴兴地说深海油互联网加油站可以免费加油,你为什么说射种话?那我要去看看才得?", 
		url:data.shareUrl, 
		image:"source://image/por.png", 
		audio:''		
	},function(res){		
		if(res){
			core.toast('分享成功');
		}
	})
});
//分享到朋友圈
ui('do_ALayout_2').on('touch',function(){
	we.share({
		appId:"wx2d2c3284b084cf4c", 
		scene:"1", 
		type:"0", 
		title:"买了车却没钱加油怎么办?来深海油免费加油吧!", 
		content:"肿么办?今颠隔壁老宋高高兴兴地说深海油互联网加油站可以免费加油,你为什么说射种话?那我要去看看才得?", 
		url:data.shareUrl, 
		image:"source://image/por.png", 
		audio:''
	},function(res){
		if(res){			
			core.toast('分享成功');
		}
	})
})

//分享到QQ
//var qq = sm('do_TencentQQ');
//ui('do_ALayout_1').on('touch',function(){
//	qq.shareToQQ({
//		appId:"1104684313",
//		type:0,
//		title:"深海油互联网加油站QQ应用分享",
//		url:data.shareUrl,
//		image:"data://por.png",
//		summary:'买了车却没钱加油怎么办?来深海油免费加油吧!',
//		audio:"",
//		appName:"深海油互联网加油站",
//	},function(data) {
//		if(data){
//			core.toast('分享成功');
//		}
//	});
//})

