// /**********************************************************************************************************/
// var storage = sm("do_Storage");
// var listview = ui("do_listview_1");
// var listdata = mm("do_ListData");

// listview.bindItems(listdata);// 建立ListView 与 ListData 的行数据关系;

// listdata.addData([{"template":0}]); // 给ListData添加数据
// listview.refreshItems({}); // 刷新ListView 行数据;

// storage.readFile("data://ding.json", function(data){// 读取文件
//     listdata.addData(data); // 给ListData添加数据
//     listview.refreshItems(); // 刷新ListView 行数据;
// });


/**********************************************************************************************************/

var nf = sm("do_Notification");
var app = sm("do_App");
var me=ui("me");
var me_=ui("me_");
var jia=ui("jia");
var jia_=ui("jia_");

me.on("touchDown",function(data, e){
    me_.source = "source://image/ding/me_ed.png"
    me.bgColor = "FC7878FF";
});
me.on("touch",function(data, e){
    me_.source = "source://image/ding/me.png"
    me.bgColor = "00000000";
    app.openPage({source:"source://view/me.ui", data:"", animationType:"", isFullScreen:false, keyboardMode:"default", scriptType:""}, function(data, e){});
});

jia.on("touchDown",function(data, e){
    jia_.source = "source://image/ding/add_ed.png"
    jia.bgColor = "FC7878FF";
});
jia.on("touch",function(data, e){
    jia_.source = "source://image/ding/add.png"
    jia.bgColor = "00000000";
//    app.openPage({source:"source://view/add.ui", data:"", animationType:"", isFullScreen:false, keyboardMode:"default", scriptType:""}, function(data, e){});
});


/**********************************************************************************************************/

var listdata = mm("do_ListData");
var slideview = ui("slideview_1");
slideview.bindItems(listdata);

listdata.addData([
	{template:0},
	{template:1},
	{template:2},
	{template:3}
]);
slideview.refreshItems({});

/**********************************************************************************************************/
var page = sm("do_Page");
var i=1,y=0;
var timer01 = mm("do_Timer");
timer01.delay = 0;
timer01.interval = 100;

var DURATION01 = 0;

timer01.on("tick", function(){
    if(DURATION01 >= 30){
        DURATION01 = 0;
        slideview.index=i%4;
        i++;
    }
    DURATION01++;
});
timer01.start();
/**********************************************************************************************************/
var storage = sm("do_Storage");
var grid_view1, listdata;
grid_view1 = ui("grid_view");
listdata = mm("do_ListData");
grid_view1.bindItems(listdata);

 storage.readFile("data://ding.json", function(data){// 读取文件
     listdata.addData(data); // 给ListData添加数据
     grid_view1.refreshItems(); // 刷新ListView 行数据;
 });
 /**********************************************************************************************************/

 var do_scrollview_1=ui("do_scrollview_1");
 do_scrollview_1.toBegin();
 

