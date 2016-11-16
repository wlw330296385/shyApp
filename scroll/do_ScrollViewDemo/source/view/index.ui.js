/*******************************************************************************
 * Author : But Timestamp : 2015-07-31
 ******************************************************************************/
//根据button的id获取button对象
var totop = ui("toTop");
var tobottom = ui("toEnd");
var toleft = ui("toLeft");
var toright = ui("toRight");

//根据scrollview的id获取scrollview对象
var scrollview1 = ui("do_ScrollView_1");
var scrollview2 = ui("do_ScrollView_2");

//设置scrollview的属性，它的属性都是设计器属性，只能通过ui文件里设置，不能通过代码设置

//direction	scrollview1设置vertical表示纵向布局，scrollview2设置为horizontal,表示横向布局
//headerView,只有纵向才支持这个属性，下拉的时候露出表头，scrollview1没有设置这个值，使用缺省的表头样式
//isHeaderVisible, scrollview1设置这个值为true，表示显示headerview
//isShowbar,scrollview1和scrollview2都设置了这个值为true，表示滚动时露出滚动条

totop.on("touch", function(data, e) {
	//通过调用函数让scrollview滚动到最头部
	scrollview1.toBegin();
});
tobottom.on("touch", function(data, e) {
	//通过调用函数让scrollview滚动到最底部
	scrollview1.toEnd();
});
toleft.on("touch", function(data, e) {
	//通过调用函数让scrollview滚动到最左部
	scrollview2.toBegin();
});
toright.on("touch", function(data, e) {
	//通过调用函数让scrollview滚动到最右部
	scrollview2.toEnd();
});
var refreshCount = 0;
scrollview1.on("pull",function(data){
	//下拉scrollview，露出headview，开始刷新数据
	if(data.state==2)//缺省headview只需要监控状态2
	{
		//每刷新一次计数加1
		ui("refreshLabel").text="Refresh Count="+refreshCount++;
		scrollview1.rebound();//刷新后恢复headview状态
	}
});
scrollview1.on("scroll",function(data){
	deviceone.print("scroll:"+data);
	if(data<200){
		totop.visible = false;
		tobottom.visible = true;
	}
		
	else
	{
		totop.visible = true;
		tobottom.visible = false;
	}
});