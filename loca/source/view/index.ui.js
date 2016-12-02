/**
 * @Author : deviceone
 * @Timestamp : 2016-10-26
 */
var nf = sm("do_Notification");
var btn_hello2 = ui("btn_hello");
var lo = sm("do_LocalNotification");
var btn_hello1 = ui("do_Button_1");
btn_hello2.on("touch", function() {
	nf.toast({text:"安卓不能居中",y:120});
});


btn_hello1.on("touch", function() {
	lo.removeNotify(); //数组不为空，移除数组里notifyId，数组为空移除所有通知，移除后通知不再触发
	
});

ui('do_TextField_1').on('focusOut',function(){
	nf.toast({text:"focusOut不停地被触发",y:320});
})

ui('do_TextField_2').on('focusOut',function(){
	nf.toast({text:"focusOut不停地被触发",y:220});
})

ui('do_TextField_3').on('focusOut',function(){
	nf.toast({text:"focusOut不停地被触发",y:420});
})

ui('do_TextField_4').on('focusOut',function(){
	nf.toast({text:"focusOut不停地被触发",y:520});
})


ui('do_TextField_5').on('focusOut',function(){
	nf.toast({text:"focusOut不停地被触发",y:620});
})

ui('do_TextField_6').on('focusOut',function(){
	nf.toast({text:"focusOut不停地被触发",y:720});
})