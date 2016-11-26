/*******************************************************************************
 * @ ������: do_SegmentView do_SlideView
 * 
 */

var app = sm("do_App");
var page = sm("do_Page");
var segmentview = ui("do_segmentview");
var segmentdata = mm("do_ListData");

segmentview.bindItems(segmentdata);

var slideview = ui("do_slideview");
var slidedata = mm("do_ListData");

slideview.bindItems(slidedata);

var adddata = [
        { name : "全部订单", fontColor : "FF0000FF",status:-1}, 
        { name : "待付款" ,status:1},
        { name : "已完成" ,status:2},
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


//获取数据
