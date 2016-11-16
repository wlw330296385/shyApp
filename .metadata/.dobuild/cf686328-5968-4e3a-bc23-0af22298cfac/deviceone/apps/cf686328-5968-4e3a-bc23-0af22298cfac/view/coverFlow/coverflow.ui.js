//related to coverflow.ui
var root = ui("$");
var nf = sm("do_Notification");
var page = sm("do_Page");

var coverf = ui("do_CoverFlowView_1");
var cfdata = mm("do_ListData");

root.on("coverflowb",function(data){
	//index
	coverf.index = data[0];
	
	var data1 = data[1];
	cfdata.addData(data1);
	coverf.bindItems(cfdata);
	coverf.refreshItems();
});
coverf.on("touch",function(index){
	var cell = cfdata.getOne(index);
	root.fire("coverflowbf",cell);
});