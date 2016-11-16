/**
 * related to slideview.ui
 * 
 * @Author : and
 * @Timestamp : 2016-09-13
 */
var root = ui("$");
root.setMapping({
	"do_SlideView_1.tag" : "s_tag"
})
var listdata = mm("do_ListData");
var slideview = ui("do_SlideView_1");
var label = ui("do_Label_1");

slideview.bindItems(listdata);
var isLoaded = false;
slideview.startLoop(2000);

root.on("dataRefreshed", function() {
	if (!isLoaded) {
		// 轮播图的行数只有1个，所以加一个判断，减少执行次数
		var d = slideview.tag;
		listdata.removeAll();
		listdata.addData(JSON.parse(d));
		slideview.refreshItems();
		isLoaded = true;
	
	}
})
slideview.on("touch", function(index) {
	sm("do_Notification").alert(JSON.stringify(index))
});
slideview.on("indexChanged",function(data){
	label.text = (data+1)+"/3";
});