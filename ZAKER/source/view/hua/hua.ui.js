var app,page,nf;
nf=sm("do_Notification");
app=sm("do_App");
page=sm("do_Page");
/***********************************************************/
//获取segmentview，绑定listdata
var do_segmentview_1 = ui("do_segmentview_1");
var segment_listdata = mm("do_ListData");
do_segmentview_1.bindItems(segment_listdata);
//获取slideview，绑定listdata
var do_slideview_1 = ui("do_slideview_1");
var slide_listdata = mm("do_ListData");
do_slideview_1.bindItems(slide_listdata);
/***********************************************************/
//segmentview绑定数据
segment_listdata.addData([
	{template: 0,name: "精选", fontColor : "FB474BFF", lb:true},
    {template: 0,name: "发现", fontColor : "C0C0C0FF", lb:false},
    {template: 0,name: "关注", fontColor : "C0C0C0FF", lb:false}
]);
do_segmentview_1.refreshItems();
/***********************************************************/
//滑动时改变字体颜色的方法
var changecolor = function(index){
    segment_listdata.removeAll();
    if (index == 0) {
        segment_listdata.addData([
        	{template: 0,name: "精选", fontColor : "FB474BFF", lb:true},
            {template: 0,name: "发现", fontColor : "C0C0C0FF", lb:false},
            {template: 0,name: "关注", fontColor : "C0C0C0FF", lb:false}
        ]);
    }else if(index==1){
        segment_listdata.addData([
        	{template: 0,name: "精选", fontColor : "C0C0C0FF", lb:false},
            {template: 0,name: "发现", fontColor : "FB474BFF", lb:true},
            {template: 0,name: "关注", fontColor : "C0C0C0FF", lb:false}
        ]);
    }else if(index==2){
        segment_listdata.addData([
        	{template: 0,name: "精选", fontColor : "C0C0C0FF", lb:false},
            {template: 0,name: "发现", fontColor : "C0C0C0FF", lb:false},
            {template: 0,name: "关注", fontColor : "FB474BFF", lb:true}
        ]);
    }
 	do_segmentview_1.refreshItems();
}
/***********************************************************/
//当segmentview的index变化时,读取
do_segmentview_1.on("indexChanged", function(index){
    do_slideview_1.set({index: index});
    do_slideview_1.refreshItems({});
    changecolor(index);
});
/***********************************************************/
//slideview绑定数据
slide_listdata.addData([ 
	{template: 0},
    {template: 1},
    {template: 2}
]);
do_slideview_1.refreshItems();
/***********************************************************/
//当slideview的index变化时,读取
do_slideview_1.on("indexChanged", function(index){
    do_segmentview_1.set({index: index});
    changecolor(index);
 });
 
var me=ui("me");
var me_=ui("me_");


me.on("touchDown",function(data, e){
    me_.source = "source://image/hua/me_ed.png"
    me.bgColor = "FC7878FF";
});
me.on("touch",function(data, e){
    me_.source = "source://image/hua/me.png"
    me.bgColor = "00000000";
    app.openPage({source:"source://view/me.ui", data:"", animationType:"", isFullScreen:false, keyboardMode:"default", scriptType:""}, function(data, e){});
});
