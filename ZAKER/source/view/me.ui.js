var app, page, nf;
nf = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");

page.on("back", function(){ app.closePage() });
ui("action_back").on("touch", function(){ app.closePage() });


var alayout_1=ui("do_alayout_1");
var alayout_2=ui("do_alayout_2");
var alayout_3=ui("do_alayout_3");
var alayout_4=ui("do_alayout_4");
var alayout_5=ui("do_alayout_5");
var alayout_6=ui("do_alayout_6");
var alayout_7=ui("do_alayout_7");
var alayout_8=ui("do_alayout_8");
var alayout_9=ui("do_alayout_9");

alayout_1.on("touch",function(data, e){
    nf.alert("好友分享");
});
alayout_2.on("touch",function(data, e){
    nf.alert("我的消息");
});
alayout_3.on("touch",function(data, e){
    nf.alert("话题通知");
});
alayout_4.on("touch",function(data, e){
    nf.alert("我的玩乐");
});
alayout_5.on("touch",function(data, e){
    nf.alert("推送资讯");
});
alayout_6.on("touch",function(data, e){
    nf.alert("积分活动");
});
alayout_7.on("touch",function(data, e){
    nf.alert("我的收藏");
});
alayout_8.on("touch",function(data, e){
    nf.alert("离线下载");
});
alayout_9.on("touch",function(data, e){
    nf.alert("更多设置");
});