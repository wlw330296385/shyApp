/**
 * @Author : 18507717466
 * @Timestamp : 2016-10-31
 */
var nf = sm("do_Notification");
var btn_hello = ui("btn_hello");
var deviceone = require('deviceone');
var target_0 = sm("do_TencentQQ");
var Token,Expires,OpenId;
     
var AppID = "1104684313";
var Img = "http://h.hiphotos.baidu.com/zhidao/pic/item/d4628535e5dde7118791079ca6efce1b9d16611c.jpg";
var Url = "http://www.deviceone.net/";
var Audio = "http://staff2.ustc.edu.cn/~wdw/softdown/index.asp/0042515_05.ANDY.mp3 ";
var Img;
var init = sm("do_InitData");
init.copyFile("initdata://image/0.png", "data://QQ/0.png", function(data, e) {
	deviceone.print(123);
	Img = "data://QQ/0.png";
	deviceone.print(456);
})

btn_hello.on("touch", function() {
	target_0.shareToQQ({
		appId:AppID, 
		type:0, 
		title:"hello", 
		url:Url, 
		image:Img, 
		summary:"share test", 
		audio:Audio, 
		appName:"DeviceOne"
	},function(data, e) {
		var Type = typeof(data);
		deviceone.print(" 返回值类型：" + Type + " 返回值：" + JSON.stringify(data) + " 错误信息：" + JSON.stringify(e) ,'111');
	})
});