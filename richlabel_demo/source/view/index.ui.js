/**
 * @Author : and
 * @Timestamp : 2016-06-30
 */
var nf = sm("do_Notification");
var initdata = sm("do_InitData");
var page = sm("do_Page");
var app = sm("do_App");

var close = ui("close");
var scrollview = ui("do_ScrollView_1");
var label = ui("do_RichLabel_1");
var alignment = ui("do_Button_1");
// //返回按钮
//通过linkTouch和回调回来的d来确定richlabel里的自定义点击事件
label.on("linkTouch",function(d){
	nf.alert("自定义事件:"+JSON.stringify(d));
});

close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})



alignment.on("touch", function() {
var htmlCode = '<p>\n\t<strong><strong><b><span style=\"font-size:24px;color:#E53333;line-height:2;\"><img src=\"http:\/\/mall.e-shy.com\/uploads\/editor\/image\/20161021\/43d2233bf98dfdce14653dc41a32afca.png\" alt=\"\" \/><\/span><\/b><\/strong><\/strong>\n<\/p>\n<p>\n\t<strong><strong> <\/strong><\/strong> \n<\/p>\n<span style=\"font-family:\" font-size:12px;\"=\"\"><\/span>';
label.text = '<img src="http://mall.e-shy.com/uploads/editor/image/20161027/7892b589d155f8205f5fc44a01023b6c.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/d79d50003632c6fa96e8d6f8aeaa1c88.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/378e0d82d5117cada98bdb79ec8a0642.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/71b85c57605bd0bd4e4c24876c6b9c87.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/1e791de96e48f7b6722a2dce59d907fd.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/ad408c0ec290c6a3993bd6f6fca90b06.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/91ca091cb29de14f3d0fc677978b9b9d.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/06cb0d518c8dbebcffa3919b6f36e78f.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/9bbec9b8d1b31a9beebcb122053b487c.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/b4036978ccbdbfafd7bf4f0d8e435d02.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/30798b1091ad987e1f7d65346cf76f4c.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/3d500a40463f42e633fc002befef0e69.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/60a1fd89d265e778d1bcfbae93a4cce7.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/ea1e3c666ff27a19879447877cf646c9.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/0f75a5a46e8655c1abac5cff4c0ced95.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/20c94cf93cf4b224e519d1e255a46673.jpg" alt="" /><img src="http://mall.e-shy.com/uploads/editor/image/20161027/f488b68ea292b9b778d3826774363af9.jpg" alt="" />';
		label.redraw();
});

