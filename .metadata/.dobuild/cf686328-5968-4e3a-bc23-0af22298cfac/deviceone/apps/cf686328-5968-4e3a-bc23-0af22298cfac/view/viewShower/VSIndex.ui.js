//related to VSIndex.ui
var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
page.on("back", function(){
    if (canBack) {
        global.exit();
    } else {
        nf.toast("再按一次退出");
        canBack = true;
        delay3.start();
    }
});
//切换tab
var main_shower = ui("main_shower");
var imgv0,imgv1,imgv2,imgv3,lb0,lb1,lb2,lb3;
imgv0 = ui("img_0");imgv1 = ui("img_1");imgv2 = ui("img_2");imgv3 = ui("img_3");
lb0 = ui("lb_0");lb1 = ui("lb_1");lb2 = ui("lb_2");lb3 = ui("lb_3");

var ivs = [ imgv0, imgv1, imgv2, imgv3 ];
var labels = [ lb0, lb1, lb2, lb3 ];

main_shower.addViews([ {
	id : "page1",// 页面的标示
	path : "source://view/viewShower/page1.ui"//页面的路径1
}, {
	id : "page2",
	path : "source://view/viewShower/page2.ui"
}, {
	id : "page3",
	path : "source://view/viewShower/page3.ui"
}, {
	id : "page4",
	path : "source://view/viewShower/page4.ui"
} ]);

//初始化先显示第一个页面
main_shower.showView("page1");

var page1 = ui("page1");
var page2 = ui("page2");
var page3 = ui("page3");
var page4 = ui("page4");
page1.on("touch", function() {
	show("page1",300);
});
page2.on("touch", function() {
	show("page2",300);
});
page3.on("touch", function() {
	show("page3",300);
});
page4.on("touch", function() {
	show("page4",300);
});

var pagess = [page1, page2 ,page3 ,page4];

var checkFun = function(index) {
	for (var i = 0; i < pagess.length; i++) {
		if (index == i) { // 表示选中了第几个
			ivs[i].source = "source://image/tab-" + i + "-d" + ".png";
			labels[i].fontColor = "0793dbFF";
		} else {
			ivs[i].source = "source://image/tab-" + i + ".png";
			labels[i].fontColor = "666666FF";
		}
	}
}

pagess.forEach(function(dl,i){
	dl.on("touch", function(data, e) {
		checkFun(i);
	});
});

function show(pageid) {
	main_shower.showView(pageid);
	page.fire(pageid);
}