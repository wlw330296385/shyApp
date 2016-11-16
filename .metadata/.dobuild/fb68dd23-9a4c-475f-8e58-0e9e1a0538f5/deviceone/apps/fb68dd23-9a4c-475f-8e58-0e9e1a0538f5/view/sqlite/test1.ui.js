//related to test1.ui
var label = ui("do_Label_1");
// 创建一个page作用域的sqlite对象，唯一的id标示是memory_db_id1
var sqlite_app = mm("do_SQLite", "memory_db_id1", "page");
// 在test1.ui.js里利用这个对象创建一个内存数据库,这个名字必须写死是:memory:
sqlite_app.open(":memory:");
// 创建表SQL语句
var stu_table = "drop table if exists stu_table;"
// 内存数据库执行速度快，可以尝试都用同步
// 同步执行一个SQL语句
sqlite_app.executeSync(stu_table);
stu_table = "create table stu_table(_id integer primary key autoincrement,sname text,snumber text)";
// 同步执行一个SQL语句
sqlite_app.executeSync(stu_table);
var stu_sql = "insert into stu_table(sname,snumber) values('laoming','1');"
		+ "insert into stu_table(sname,snumber) values('laohong','2');"
		+ "insert into stu_table(sname,snumber) values('laoliu','3')";
// 同步执行一个SQL语句
sqlite_app.executeSync(stu_sql);
label.text = "在test1.ui.js里创建一个page作用域的内存数据库，创建表stu_table并插入3条数据" + "\n";