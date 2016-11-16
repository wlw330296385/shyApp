/***********************************************************************************************************
 * @Author : nanyuantingfeng  
 **********************************************************************************************************/
var app, page, nf;
nf = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");
page.on("back", function(){ app.closePage() });
var action_back=ui("action_back");
action_back.on("touchDown", function(){ 
    action_back.bgColor = "FC7878FF";
});
action_back.on("touch", function(){ 
    app.closePage();
});
var storage = sm("do_Storage");
/**********************************************************************************************************/


var listview = ui("do_listview_1");
var listdata = mm("do_ListData");

listview.bindItems(listdata);// 建立listview与 ListData 的行数据关系;

var i = page.getData({});
listview.bindItems(listdata);// 建立ListView 与 ListData 的行数据关系;

storage.readFile("data://re.json", function(data){// 读取文件
   
    var dd = [];
    dd.push(data[i]);
    listdata.addData(dd); // 给ListData添加数据
    listview.refreshItems(); // 刷新ListView 行数据;
});

/**********************************************************************************************************/

var me=ui("me");
var me_=ui("me_");
var point=ui("point");
var point_=ui("point_");

me.on("touchDown",function(data, e){
    me_.source = "source://image/re/me_ed.png"
    me.bgColor = "FC7878FF";
});
me.on("touch",function(data, e){
    me_.source = "source://image/re/me.png"
    me.bgColor = "00000000";
    app.openPage({source:"source://view/me.ui", data:"", animationType:"", isFullScreen:false, keyboardMode:"default", scriptType:""}, function(data, e){});
});

point.on("touchDown",function(data, e){
    point_.source = "source://image/re/point_ed.png"
    point.bgColor = "FC7878FF";
});
point.on("touch",function(data, e){
    point_.source = "source://image/re/point.png"
    point.bgColor = "00000000";
//    app.openPage({source:"source://view/point.ui", data:"", animationType:"", isFullScreen:false, keyboardMode:"default", scriptType:""}, function(data, e){});
});


/**********************************************************************************************************/
