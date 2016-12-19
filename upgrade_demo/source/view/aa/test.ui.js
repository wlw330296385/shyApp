/*******************************************************************************
 * Author :and TimeStamp :2015-10-26
 ******************************************************************************/
var nf = sm("do_Notification");
var app = sm("do_App");
var storage = sm("do_Storage");
// //
var page = sm("do_Page");
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})
// //
var button = ui("do_Button_1");
button.on("touch", function() {
	upgrade();
});

function upgrade() {
	// 获取当前应用的版本号
	var current_version = storage.readFileSync("data://version.txt");
	// 获取服务端最新的版本号,并下载升级
	// 因为没有搭建一个真正的升级服务，所以先注释这一行且直接调用update方法
	// getLatestVersion(current_version);
	update("1.0", "initdata://initdata.zip");

}

// 从服务器上获取最新的版本号
function getLatestVersion(ver) {
	var http = mm("do_Http");
	http.method = "GET";
	http.url = "http://www.xxxx.com/getLatestVersion?current=" + ver;

	http.on("success", function(d) {
		// 服务端判断最新的版本不等于当前的版本就会返回一个最新版本和下载地址，否则返回空
		if (d) {
			// 开始下载最新zip
			download(d);
		} else
			nf.alert("当前版本已经是最新版本");
	});
	http.request();
}

// 从服务器上获取最新的升级包
function download(d) {
	var http = mm("do_Http");
	var zip = "data://update.zip";
	http.method = "POST";
	// d.downlaodURL是zip的下载url，d.version是最新的版本号
	http.url = d.downloadURL;

	http.on("success", function(d) {
		update(d.version, zip);
	});
	http.download(zip);
}
// 解压，然后覆盖旧的文件，然后更新本地版本号
function update(ver, zip) {
	storage.unzip(zip, "data://initdata", function(data) {
		// 这里可以拷贝文件，也可以拷贝目录
		app.update([ "data://initdata/test.ui", "data://initdata/test.ui.js" ],
				"source://view/aa", function() {
					nf.alert("????");
					storage.writeFile("data://version.txt", "1.1",function(){
						app.closePage();
					});
			});
	})
}