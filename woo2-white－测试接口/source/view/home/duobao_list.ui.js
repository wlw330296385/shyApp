/**
 * related to duobao_list.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-12-01
 */
var app,page,core,listData,do_ListView_1,http,p=1,type=3,storage,kess,token;
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
kess = require('kess');
token = kess.lockIt(0);
listData = mm('do_ListData');
do_ListView_1 = ui('do_ListView_1');
http = mm('do_Http');
var data = [];
do_ListView_1.on('pull',function(data){
	if(data.state==2){
		p = 1;
		listData.removeAll();
		do_ListView_1.refreshItems();
		do_ListView_1.rebound();
		getData();
	}
})

do_ListView_1.on('push',function(data){
	if(data.state==2){
		p++;
		getData();
		do_ListView_1.refreshItems();
		do_ListView_1.rebound();
	}
})

http.url = "http://192.168.0.240:8099/index.php/index/panicbuy/index/token/"+token;
http.method ="POST";
http.contentType = "application/json";
http.on('success',function(result){
	if (result.code >0) {
		data = result.data;
		core.p(data);
		listData.addData(data);
		do_ListView_1.bindItems(listData);
		do_ListView_1.refreshItems();
	}else{
		core.toast(result.msg)
	}
	
});
http.on('fail',function(result){
	core.toast(result.message)
	core.p(result);;
})
function getData(){
	http.body ={
			p:p,
			type:type
	}
	http.request();
}
var buttons = [ui('do_Button_1'),ui('do_Button_2'),ui('do_Button_3'),ui('do_Button_4')];
//按钮事件
buttons.forEach(function(me,i){
	me.on('touch',function(data,e){
		changeStatus(i)
		type = i+3;
		listData.removeAll();
		listData.addData(data);
		listData.refreshData();
		do_ListView_1.refreshItems();
		getData();
	})
})


function changeStatus(index){
	for(var i = 0;i<buttons.length;i++){
		buttons[i].bgColor = "FFFFFFFF";
		buttons[i].enabled = true;
		buttons[i].fontColor = '000000FF';
	} 
	buttons[index].bgColor='FF0000FF';;
	buttons[index].enabled = false;
	buttons[index].fontColor = 'FFFFFFFF';
}
getData();
listData.addData(data);
do_ListView_1.bindItems(listData);
do_ListView_1.refreshItems();
