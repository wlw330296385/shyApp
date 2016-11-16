/*******************************************************************************
 * @ ������: do_SegmentView do_SlideView
 * 
 */

var app = sm("do_App");
var page = sm("do_Page");

ui("action_back").on("touch", function(data, e) {
    app.closePage();
});

var segmentview = ui("do_segmentview");
var segmentdata = mm("do_ListData");

segmentview.bindItems(segmentdata);

var slideview = ui("do_slideview");
var slidedata = mm("do_ListData");

slideview.bindItems(slidedata);

var adddata = [
        { name : "header0", fontColor : "FF0000FF" ,web:"http://www.deviceone.net/charge/index.html"}, { name : "header1" ,web:"http://study.deviceone.net/"}, { name : "header2" }, { name : "header3" }, { name : "header4" },
];

segmentdata.addData(adddata);
segmentview.refreshItems();

slidedata.addData(adddata);
slideview.refreshItems();

segmentview.on("indexChanged", function(index) {
    slideview.index = index;
});

slideview.on("indexChanged", function(index) {

    segmentview.index = index;

    adddata.forEach(function(v, k) {
        if (k == index) v.fontColor = "FF0000FF";
        else v.fontColor = "000000FF";
    });

    segmentdata.removeAll();
    segmentdata.addData(adddata);
    segmentview.refreshItems();
});


ui('do_ALayout_3').on('touch',function(){
	app.openPage("source://view/openWebview.ui","http://study.deviceone.net/");
})