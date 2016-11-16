//related to test1.ui
var label = ui("do_Label_1");
// 在test2.ui.js里查询在test1.ui.js里创建的数据库表
// 根据memory_db_id1这个标示来获取已经创建好的sqlite对象
var sqlite_app = mm("do_SQLite", "memory_db_id1", "page");
// 创建查询SQL语句
var stu_query = "select * from stu_table";
// 同步执行一个查询语句
var result = sqlite_app.querySync(stu_query);
label.text = "在test2.ui.js里查询在test1.ui.js里创建的内存数据库表的第三条记录\n"
		+ JSON.stringify(result[2], null, 2)