/**
 * related to welcome_cell.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-02
 */
var root = ui("$");
var app = sm('do_App');
root.setMapping({
	"bgImage" : "bgImg",
	"root.tag":"index"
});

root.on("dataRefresh",function(){
	root.redraw();
})



