/*******************************************************************************
 * Author :and TimeStamp :2015-10-26
 ******************************************************************************/
var nf = sm("do_Notification");
// //
var page = sm("do_Page");
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})
// //

var listview = ui("listview");
var listdata = mm("do_ListData");

listdata.addData([ {
	"index" : "1",
	"name" : "do_Global.set/getMemory"
}, {
	"index" : "2",
	"name" : "JavaScript全局变量"
}, {
	"index" : "3",
	"name" : "do_Storage文件读写"
}, {
	"index" : "4",
	"name" : "do_DataCache"
}, {
	"index" : "5",
	"name" : "do_SQLite读取数据库"
}, {
	"index" : "6",
	"name" : "page打开关闭传递数据"
} ]);
listview.bindItems(listdata);

var root = ui("$");
var app = sm("do_App");
listview.on("touch", function(index) {
	switch (index) {
	case 0:
		test_memory();
		break;
	case 1:
		test_global_var();
		break;
	case 2:
		test_file();
		break;
	case 3:
		test_datacache();
		break;
	case 4:
		test_sqlite();
		break;
	case 5:
		test_open_close_page();
		break;
	}
});
var global = sm("do_Global");
function test_memory() {
	// 在index.ui.js里设置值，可以设置为任何json对象，函数对象例外。
	global.setMemory("key1", 1);
	global.setMemory("key2", "value1");
	global.setMemory("key3", [ "a", "b", "c" ]);
	global.setMemory("key4", {
		"k1" : "v1",
		"k2" : "v2",
		"k3" : "v3",
		"k4" : "v4"
	});
	app.openPage({
		source : "source://view/memory/index.ui",
		statusBarState : "transparent"
	});
}

function test_global_var() {
	app.openPage({
		source : "source://view/global_var/index.ui",
		statusBarState : "transparent"
	});
}
var storage = sm("do_Storage");
function test_file() {
	// 在index.ui.js里写文件file1和file2,可以直接写json对象
	var key1 = "value1";
	storage.writeFile("data://file1", key1, function(data, e) {
		// 回调到这里才真正把内容写完，如果在执行到这里之前去读文件有可能读不到数据
	})
	var key2 = {
		"k1" : "v1",
		"k2" : "v2",
		"k3" : "v3",
		"k4" : "v4"
	};
	storage.writeFile("data://file2", key2, function(data, e) {
		// 回调到这里才真正把内容写完，如果在执行到这里之前去读文件有可能读不到数据
	})
	app.openPage({
		source : "source://view/file/index.ui",
		statusBarState : "transparent"
	});
}
var datacache = sm("do_DataCache");
function test_datacache() {
	// 在index.ui.js里设置值，可以设置为任何json对象，函数对象例外。
	var key1 = "value1";
	datacache.saveData("key1", key1);
	var key2 = {
		"k1" : "v1",
		"k2" : "v2",
		"k3" : "v3",
		"k4" : "v4"
	};
	datacache.saveData("key2", key2);
	app.openPage({
		source : "source://view/datacache/index.ui",
		statusBarState : "transparent"
	});
}
// 创建一个app作用域的sqlite对象，第二个参数是这个对象的标示，第三个参数标示作用域是app
var sqlite_app = mm("do_SQLite", "sqlite_app_id1", "app")
function test_sqlite() {
	// 在index.ui.js里利用这个对象创建一个数据库test.db
	sqlite_app.open("data://test.db");
	var stu_table = "drop table if exists stu_table"
	// 同步执行一个SQL语句
	sqlite_app.executeSync(stu_table);
	// 创建表SQL语句
	stu_table = "create table stu_table(_id integer primary key autoincrement,sname text,snumber text)";
	// 同步执行一个SQL语句
	sqlite_app.executeSync(stu_table);
	var stu_sql = "insert into stu_table(sname,snumber) values('xiaoming','01005');"
			+ "insert into stu_table(sname,snumber) values('xiaohong','01006');"
			+ "insert into stu_table(sname,snumber) values('xiaoliu','01007')";
	// 异步执行一个SQL语句
	sqlite_app.execute(stu_sql, function(data, e) {
		// 回调到这里才真正把数据插入完，如果在执行到这里之前去查询数据有可能读不到数据
		deviceone.print("insert finished!")
	})

	app.openPage({
		source : "source://view/sqlite/index.ui",
		statusBarState : "transparent"
	});
}
function test_open_close_page() {
	// 在index.ui.js里openPage页面open_close_page/index.ui,传递数据
	var d = {
		"k1" : "v1",
		"k2" : "v2",
		"k3" : "v3",
		"k4" : "v4"
	};
	app.openPage({
		source : "source://view/open_close_page/index.ui",
		data : d,
		statusBarState : "transparent"
	});
}
// 接受页面open_close_page/index.ui 关闭的时候传递回来的数据
page.on("result", function(data) {
	if (data)
		nf.alert(JSON.stringify(data, null, 2));
})