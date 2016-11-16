/**
 * @Author : 18507717466
 * @Timestamp : 2016-11-11
 */
var nf = sm("do_Notification");
var btn_hello = ui("btn_hello");

btn_hello.on("touch", function() {
	nf.toast('改变宽度');
	
	changeWidth()
});

var data = {"code":1,"msg":"success:\u8bfb\u53d6\u593a\u5b9d\u8be6\u7ec6\u9875\u9762\u6570\u636e\u6210\u529f","data":{"id":112,"goods_name":"2016\u6b3e \u6377\u8c79XJ L  2.0T  \u4e24\u9a71\u5178\u96c5\u5546\u52a1\u7248","goods_title":0,"goods_image":"http:\/\/mall.e-shy.com\/uploads\/auto\/20161109\/c78ba92b881666475685715b15aedcca.jpg","goods_sales_price":892,"pay_num":0,"uppernum":999,"total_num":999,"per":"0%","progress":0,"desc":"'<p>\n\t<strong><strong><b><span style=\"font-size:24px;color:#E53333;line-height:2;\"><img src=\"http:\/\/mall.e-shy.com\/uploads\/editor\/image\/20161021\/43d2233bf98dfdce14653dc41a32afca.png\" alt=\"\" \/><\/span><\/b><\/strong><\/strong>\n<\/p>\n<p>\n\t<strong><strong> <\/strong><\/strong> \n<\/p>\n<span style=\"font-family:\" font-size:12px;\"=\"\"><\/span>'","params":0,"param":"'<img src=\"http:\/\/mall.e-shy.com\/uploads\/editor\/image\/20161021\/0dfcfd5aeae057854711355cf9e98766.png\" alt=\"\" \/>'","joinrecord":[]}}
var jsonData = JSON.parse(data);

var listData = mm("do_ListData");


function changeWidth(){
	ui('$').setMapping({
		"do_ALayout_2.width":750
	})
	ui('$').redraw();
	nf.alert("已经改变了?");
}