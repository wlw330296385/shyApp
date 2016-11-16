//related to login.ui
var root = ui("$");
var page = sm("do_Page");
var app = sm("do_App");
page.on("back", function(data) {
	app.closePage();
})

var progress;
// 接受本ui文件里webview组件里的html里的js发出的消息
page.on("progressbar",
		function(d) {
			if ("show" == d) {
				deviceone.print(d + progress);
				if (progress)
					progress.visible = true;
				else
					progress = ui(root.add("progress_id",
							"source://view/pb.ui", 0, 0));
			} else {
				if (progress) {
					progress.visible = false;
				}
			}
		});