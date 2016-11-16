//引入组件库
var d1 = require("deviceone");
var do_App = d1.sm("do_App");

do_App.on("loaded", function () {
	//全屏方式打开主界面
	do_App.openPage({
		source:"source://view/start.ui", 
		statusBarState:"transparent",
		animationType: "fade"
			});
});