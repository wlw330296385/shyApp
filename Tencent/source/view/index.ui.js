/**********************************************
 * Author : @Author
 * Timestamp : @Timestamp
 **********************************************/

var ext = require("ext");
var app = sm("do_App");
var nf = sm("do_Notification");
var we = sm("do_TencentWX");
//appId为微信公众平台申请的appId。
var button1 = ui("button1");
button1.on("touch",function(data, e){
	we.login({appId:"wxba6c0c3cf39df3eb"}, function(data, e){
		nf.alert("login");
		nf.alert(data);
		//返回的数据code为0表示用户同意，为-2表示用户取消，为-4表示用户拒绝授权
		log(JSON.stringify(data));
	});
});
//用软件生成一次性的付款数据填到对应的partnerId，prepayId，package，nonceStr，timeStamp，sign上可进行付款测试
var button2 = ui("button2");
button2.on("touch",function(data, e){
we.pay({appId:"wxba6c0c3cf39df3eb", partnerId:"1245331002", prepayId:"wx201507131839000ef4c664c80583333716", package:"Sign=WXPay", nonceStr:"e7a0ac723159df05cb1edaa7683e1a53", timeStamp:"1436783943", sign:"65DCF55F12B35C2081A29F513297F2A0"}, function(data, e){
	nf.alert({text:data, title:"支付返回结果"}, function(data, e){});
//返回的数据0表示支付完成,-1表示错误,-2表示用户取消
});
});
//分享后返回成功或者失败，表示分享的结果成功或失败
var button3 = ui("button3");
button3.on("touch",function(data, e){
we.share({appId:"wxba6c0c3cf39df3eb", scene:"0", type:"0", title:"share test", content:"hello world", url:"http://www.deviceone.net", image:"data://1.jpg", audio:"http://staff2.ustc.edu.cn/~wdw/softdown/index.asp/0042515_05.ANDY.mp3"}, function(data, e){
	nf.alert({text:data, title:"分享返回结果"}, function(data, e){});
});
});

var button4 = ui("button4");
button4.on("touch",function(data, e){
we.share({appId:"wxba6c0c3cf39df3eb", scene:"1", type:"0", title:"share test", content:"hello world", url:"http://www.deviceone.net", image:"data://1.jpg", audio:"http://staff2.ustc.edu.cn/~wdw/softdown/index.asp/0042515_05.ANDY.mp3"}, function(data, e){
	nf.alert({text:data, title:"分享返回结果"}, function(data, e){});
});
});

var button5= ui("button5");
button5.on("touch",function(data, e){
we.share({appId:"wxba6c0c3cf39df3eb", scene:"0", type:"1", title:"share test", content:"hello world", url:"http://www.deviceone.net", image:"data://1.jpg", audio:"http://staff2.ustc.edu.cn/~wdw/softdown/index.asp/0042515_05.ANDY.mp3"}, function(data, e){
	nf.alert({text:data, title:"分享返回结果"}, function(data, e){});
});
});

var button6 = ui("button6");
button6.on("touch",function(data, e){
we.share({appId:"wxba6c0c3cf39df3eb", scene:"1", type:"1", title:"share test", content:"hello world", url:"http://www.deviceone.net", image:"data://1.jpg", audio:"http://staff2.ustc.edu.cn/~wdw/softdown/index.asp/0042515_05.ANDY.mp3"}, function(data, e){
	nf.alert({text:data, title:"分享返回结果"}, function(data, e){});
});
});

var button7 = ui("button7");
button7.on("touch",function(data, e){
we.share({appId:"wxba6c0c3cf39df3eb", scene:"0", type:"2", title:"share test", content:"hello world", url:"http://www.deviceone.net", image:"data://1.jpg", audio:"http://staff2.ustc.edu.cn/~wdw/softdown/index.asp/0042515_05.ANDY.mp3"}, function(data, e){
	nf.alert({text:data, title:"分享返回结果"}, function(data, e){});
});
});

var button8 = ui("button8");
button8.on("touch",function(data, e){
we.share({appId:"wxba6c0c3cf39df3eb", scene:"1", type:"2", title:"share test", content:"hello world", url:"http://www.deviceone.net", image:"data://1.jpg", audio:"http://staff2.ustc.edu.cn/~wdw/softdown/index.asp/0042515_05.ANDY.mp3"}, function(data, e){
	nf.alert({text:data, title:"分享返回结果"}, function(data, e){});
});
});