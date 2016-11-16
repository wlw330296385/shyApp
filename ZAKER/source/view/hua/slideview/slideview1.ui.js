/**********************************************************************************************************/
var app = sm("do_App");
var storage = sm("do_Storage");
var listview = ui("do_listview_1");
var listdata = mm("do_ListData");

listview.bindItems(listdata);// 建立ListView 与 ListData 的行数据关系;

storage.readFile("data://hua.json", function(data){// 读取文件
    listdata.addData(data); // 给ListData添加数据
    listview.refreshItems(); // 刷新ListView 行数据;
});

listview.on("touch",function(data, e){
	app.openPage({source:"source://view/hua/hua_de_2.ui", data:data, animationType:"", isFullScreen:false, keyboardMode:"default", scriptType:""}, function(data, e){});
});

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