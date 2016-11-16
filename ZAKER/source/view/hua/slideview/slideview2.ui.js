/**********************************************************************************************************/
var app = sm("do_App");
var storage = sm("do_Storage");
var listview = ui("do_listview_1");
var listdata = mm("do_ListData");

listview.bindItems(listdata);// 建立ListView 与 ListData 的行数据关系;

storage.readFile("data://hua_2.json", function(data){// 读取文件
    listdata.addData(data); // 给ListData添加数据
    listview.refreshItems(); // 刷新ListView 行数据;
});

listview.on("touch",function(data, e){
	app.openPage({source:"source://view/hua/hua_de.ui", data:data, animationType:"", isFullScreen:false, keyboardMode:"default", scriptType:""}, function(data, e){});
});