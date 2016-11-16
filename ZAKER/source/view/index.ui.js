/**********************************************
 * Author : @Author
 * Timestamp : @Timestamp
 **********************************************/
var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var canBack = false;

page.on("back", function(){
    if (canBack) {
        global.exit();
    } else {
        nf.toast("再按一次退出");
        canBack = true;
        delay3.start();
    }
});

var delay3 = mm("do_Timer");
delay3.delay = 2000;
delay3.interval = 2000;
delay3.on("tick", function(){
    this.stop();
    canBack = false;
});
/***********************************************/
//主页面切换
var image_1 = ui("image_1");
var image_11 = ui("image_11");
var image_2 = ui("image_2");
var image_22 = ui("image_22");
var image_3 = ui("image_3");
var image_33 = ui("image_33");
var image_4 = ui("image_4");
var image_44 = ui("image_44");
var vs_shower0 = ui("vs_shower0");
vs_shower0.addViews([
    {id : "ding", path : "source://view/ding/ding.ui"},
    {id : "re", path : "source://view/re/re.ui"},
    {id : "wan", path : "source://view/wan/wan.ui"},
    {id : "hua", path : "source://view/hua/hua.ui"}
]);
image_1.on("touch",function(data, e){
    vs_shower0.showView("ding", "fade");
    image_11.source = "source://image/index/1.jpg"
    image_22.source = "source://image/index/22.jpg";
    image_33.source = "source://image/index/33.jpg";
    image_44.source = "source://image/index/44.jpg";
});
image_2.on("touch",function(data, e){
    vs_shower0.showView("re", "fade");
    image_11.source = "source://image/index/11.jpg"
    image_22.source = "source://image/index/2.jpg";
    image_33.source = "source://image/index/33.jpg";
    image_44.source = "source://image/index/44.jpg";
});
image_3.on("touch",function(data, e){
    vs_shower0.showView("wan", "fade");
    image_11.source = "source://image/index/11.jpg"
    image_22.source = "source://image/index/22.jpg";
    image_33.source = "source://image/index/3.jpg";
    image_44.source = "source://image/index/44.jpg";
});
image_4.on("touch",function(data, e){
    vs_shower0.showView("hua", "fade");
    image_11.source = "source://image/index/11.jpg"
    image_22.source = "source://image/index/22.jpg";
    image_33.source = "source://image/index/33.jpg";
    image_44.source = "source://image/index/4.jpg";
});
page.on("loaded", function(){
    vs_shower0.showView("ding");
});
/***********************************************/
