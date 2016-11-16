//related to banner_cell.ui
var root = ui("$");
var open = require("open");
var app = sm("do_App");
root.setMapping({
	"imgbfs.tag":"path",
	"do_ImageView_img.source" : "imgs"
});
var nf = sm("do_Notification");
var bgimg = ui("imgbfs");
bgimg.on("touch",function(){
	var getpath = bgimg.tag;
	open.startl(getpath);
});