//related to login.ui
var root = ui("$");
var page = sm("do_Page");
var app = sm("do_App");
page.on("back", function(data) {
	app.closePage();
})

var back = ui('do_Label_1');
back.on('touch',function(){
	app.closePage();
})

var web = ui('do_WebView_1');

web.loadString('<img src="http://mall.e-shy.com/uploads/editor/image/20161013/08f46d02db8cabf969c387e11e7d1e33.jpg"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/e6e7b7fb711e266e8b5af99854e39849.jpg"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/e5f8bc52e7df480de228267325ee87c2.jpg"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/b863087f0a178026a30fbfa6ca07fadc.jpg"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/00504151f793233fc232a9518082ed80.jpg"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/6fc019c0b4e0534762287d28babeaea9.jpg"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/31de360a5be2e6215832248bc2d36303.jpg"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/9a432dbf9e646b213a4ece13697717c4.jpg"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/30cb87136a62385976596dcebbdc5c55.jpg"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/b8b57ee63945b171d1af59117f64b25a.jpg"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/e73eaeaf63fc91fd1880060b0f61c44b.gif"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/9c2423f3c073fc8cf305c24f0cc2f50b.jpg"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/9bd7a2cf6cbf1b1d9e3eb2c3a43719b5.jpg"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/b4d9e0c302d11d6dda6e0a4a8db9e787.jpg"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/d66345ee297b8827dd759d6a6334a41c.jpg"  width=375 alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161013/aa82565b8f0a091137b02f4fd24b1846.jpg"  width=375 alt="" />')




//
//var progress;
//// 接受本ui文件里webview组件里的html里的js发出的消息
//page.on("progressbar",
//		function(d) {
//			if ("show" == d) {
//				deviceone.print(d + progress);
//				if (progress)
//					progress.visible = true;
//				else
//					progress = ui(root.add("progress_id",
//							"source://view/pb.ui", 0, 0));
//			} else {
//				if (progress) {
//					progress.visible = false;
//				}
//			}
//		});