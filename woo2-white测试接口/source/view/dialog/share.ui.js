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
core.p(data)
http.method = "post";
http.url = data.shareImgUrl;
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
		appId:"wx8dd7bbe6f61a0bcd", 
		scene:"0", 
		type:"0", 
		title:"买了车却没钱加油怎么办?来深海油免费加油吧!", 
		content:"肿么办?今颠隔壁老宋高高兴兴地说深海油互联网加油站可以免费加油,你为什么说射种话?那我要去看看才得?", 
		url:data.shareUrl, 
		image:"source://image/por.png", 
		audio:''		
	},function(res){	
		core.p(res,'share')
		if(res){
			core.toast('分享成功');ia
		}
	})
});
//分享到朋友圈
ui('do_ALayout_2').on('touch',function(){
	we.share({
		appId:"wx8dd7bbe6f61a0bcd", 
		scene:"1", 
		type:"0", 
		title:"买了车却没钱加油怎么办?来深海油免费加油吧!", 
		content:"肿么办?今颠隔壁老宋高高兴兴地说深海油互联网加油站可以免费加油,你为什么说射种话?那我要去看看才得?", 
		url:data.shareUrl, 
		image:"source://image/por.png", 
		audio:''
	},function(res){
		core.p(res,'share')
		if(res){			
			core.toast('分享成功');
		}
	})
})

