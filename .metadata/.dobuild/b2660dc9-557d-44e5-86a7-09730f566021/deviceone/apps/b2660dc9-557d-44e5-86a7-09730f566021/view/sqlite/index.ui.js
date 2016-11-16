/*******************************************************************************
 * Author :
 * 
 * @Author Timestamp :
 * @Timestamp
 ******************************************************************************/
var page = sm("do_Page");
var close = ui("close");
var app = sm("do_App");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})

var root = ui("$");
root.add("id1", "source://view/sqlite/test1.ui", 0, 450);
root.add("id2", "source://view/sqlite/test2.ui", 0, 750);

var label = ui("do_Label_2");
// 根据"sqlite_app_id1"这个id获取一个app作用域的sqlite对象，第二个参数是这个对象的标示，第三个参数标示作用域是app
var sqlite_app = mm("do_SQLite", "sqlite_app_id1", "app")
// 在sqlite/index.ui.js里利用这个对象查询test.db，因为这个对象已经打开了数据库，所以不需要再open了
// 创建查询SQL语句
var stu_query = "select * from stu_table";
// 同步执行一个查询语句
var result = sqlite_app.querySync(stu_query);
label.text = "在sqlite/index.ui.js里利用这个对象查询test.db里的stu_table表的第二条数据\n"
		+ JSON.stringify(result[1], null, 2);