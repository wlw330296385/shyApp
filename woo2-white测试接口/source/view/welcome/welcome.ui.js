/**
 * related to welcome.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-02
 */
var root = ui("$"),app = sm('do_App');
var listdata = mm("do_ListData");
var slideview = ui("do_SlideView_1");
var labels = [ui("do_Label_1"),ui('do_Label_2'),ui("do_Label_3"),ui('do_Label_4')];
var bgImgs = [{
	templates:0,
	bgImg:"source://image/welcome1.jpg",
	index:1
},{
	templates:0,
	bgImg:"source://image/welcome2.jpg",
	index:2
},{
	templates:0,
	bgImg:"source://image/welcome3.jpg",
	index:3
},{
	templates:0,
	bgImg:"source://image/welcome4.jpg",
	index:4
}];

listdata.addData(bgImgs);
slideview.bindItems(listdata);
//var isLoaded = false;
//slideview.startLoop(2000);

//root.on("dataRefreshed", function() {
//	if (!isLoaded) {
//		// 轮播图的行数只有1个，所以加一个判断，减少执行次数
//		var d = slideview.tag;
//		listdata.removeAll();
//		listdata.addData(JSON.parse(d));
//		slideview.refreshItems();
//		isLoaded = true;
//	}
//})
//slideview.on("touch", function(index) {
//	sm("do_Notification").alert('你点了第'+index+'张轮播图');
//});
slideview.on("indexChanged",function(data){
	changLabels(data);
});
var changLabels = function(index){
	labels.forEach(function(data,i){
		labels[i].bgColor = "FFFFFFAA";
	})
	labels[index].bgColor = "043879AA";
	if(index == 3){
		ui('do_Button_1').visible = true;
	}else{
		ui('do_Button_1').visible = false;
	}
};
var style=require("do/style");
style.css(ui('do_Button_1'));
ui('do_Button_1').on('touch',function(){
	app.openPage("source://view/index/index.ui",'login');
})
var pagejs = require('do/page');
pagejs.allowExit();	