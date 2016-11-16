/*******************************************************************************
 * Author :
 * 
 * @Author Timestamp :
 * @Timestamp
 ******************************************************************************/
var page = sm("do_Page");
var close = ui("close");
var app = sm("do_App");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})

var root = ui("$");
root.add("id1","source://view/global_var/test1.ui",0,150);
root.add("id2","source://view/global_var/test2.ui",0,650);