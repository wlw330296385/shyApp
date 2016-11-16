/**********************************************************************************************************/
var app = sm("do_App");
var storage = sm("do_Storage");
var listview = ui("do_listview_1");
var listdata = mm("do_ListData");

listview.bindItems(listdata);// 建立ListView 与 ListData 的行数据关系;

storage.readFile("data://re.json", function(data){// 读取文件
    listdata.addData(data); // 给ListData添加数据
    listview.refreshItems(); // 刷新ListView 行数据;
});

listview.on("touch",function(data, e){
	app.openPage({source:"source://view/re/re_de.ui", data:data, animationType:"", isFullScreen:false, keyboardMode:"default", scriptType:""}, function(data, e){});
});

/**********************************************************************************************************/

var nf = sm("do_Notification");
var app = sm("do_App");
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


listview.on("pull", function(data) {
    /**
     * @此事件将会多次执行.
     * @state == 0 : pull动作开始
     * @state == 1 : pull动作持续中
     * @state == 2 : pull动作结束
     */
    if (data.state !== 2) return;
    this.rebound();
});
listview.on("push", function(data) {
    /**
     * @此事件将会多次执行.
     * @state == 0 : pull动作开始
     * @state == 1 : pull动作持续中
     * @state == 2 : pull动作结束
     */
    if (data.state !== 2) return;
    this.rebound();
});