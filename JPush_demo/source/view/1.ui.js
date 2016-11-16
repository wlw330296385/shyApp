/***********************************************************************************************************
 * @Author : child
 **********************************************************************************************************/
var app, page, nf, global;
nf = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");
global = sm("do_Global");

page.on("back", function(){ app.closePage() });
ui("action_back").on("touch", function(){ app.closePage() });

