/**
 * related to banner.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-04
 */
var root = ui('$');
//var open = require("open");
//var app = sm("do_App");
var bimgs=[{"template" : 1,"imgs":"source:\\image\banner1.jpg","path":"123132"},
           {"template" : 1,"imgs":"source:\\image\banner3.jpg","path":"43243234"},
           {"template" : 1,"imgs":"source:\\image\banner4.jpg","path":"65456456"}
           ];
var data = mm("do_ListData");
data.addDate(bimgs);
root.setMapping({
	"do_ALayout_1.tag":"path",
	"banner_img.source" : "imgs"
});
var nf = sm("do_Notification");
var bgimg = ui("banner_img");
bgimg.on("touch",function(){
	var getpath = bgimg.tag;
	open.startl(getpath);
});