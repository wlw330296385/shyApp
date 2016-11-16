/**********************************************************************************************************/
var app = sm("do_App");
var storage = sm("do_Storage");
var listview = ui("do_listview_1");
var listdata = mm("do_ListData");

listview.bindItems(listdata);// 建立ListView 与 ListData 的行数据关系;

storage.readFile("data://wan_4.json", function(data){// 读取文件
    listdata.addData(data); // 给ListData添加数据
    listview.refreshItems(); // 刷新ListView 行数据;
});
var nf = sm("do_Notification");
listview.on("touch", function(index) {
    nf.alert(listdata.getOne(index), "touch");
});