/**
 * related to oilCharge.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-19
 */

var page,app,core;
page = sm('do_Page');
app = sm('do_App');
core = require('do/core');
var type = 1;
var total_amount = 0;
var cnpc = ui('do_ALayout_4');
var sg = ui('do_ALayout_3');
sg.on('touch',function(){
	sgFn();
});
cnpc.on('touch',function(){
	cnpcFn();
});

ui('do_ALayout_5').on('touch',function(){
	defualtColor()
	this.border = "E8380DFF,2,15";
	total_amount = 100;
})

ui('do_ALayout_6').on('touch',function(){
	defualtColor()
	this.border = "E8380DFF,2,15";
	total_amount = 200;
})

ui('do_ALayout_13').on('touch',function(){
	defualtColor()
	this.border = "E8380DFF,2,15";
	total_amount = 300;
})
ui('do_ALayout_14').on('touch',function(){
	defualtColor()
	this.border = "E8380DFF,2,15";
	total_amount = 500;
})
ui('do_ALayout_16').on('touch',function(){
	defualtColor()
	this.border = "E8380DFF,2,15";
	total_amount = 1000;
})
function defualtColor(){
	ui('do_ALayout_5').border = "004098FF,2,15";
	ui('do_ALayout_6').border = "004098FF,2,15";
	ui('do_ALayout_13').border = "004098FF,2,15";
	ui('do_ALayout_14').border = "004098FF,2,15";
	ui('do_ALayout_16').border = "004098FF,2,15";
}
function sgFn(){
	type = 1;
	cnpc.border = "E3E3E3FF,2,10";
	ui('do_Label_9').visible = false;
	sg.border = "E8380DFF,2,10";
	ui('do_Label_6').visible = true;
}
function cnpcFn(){
	type = 2;
	sg.border = "E3E3E3FF,2,10";
	ui('do_Label_6').visible = false;
	cnpc.border = "E8380DFF,2,10";
	ui('do_Label_9').visible = true;
}

//数据传递
var cardNo_t = ui('do_TextField_1');
var sbm = ui('do_Button_2');

sbm.on('touch',function(){
	var cardNo = cardNo_t.text;
	app.openPage({
		source: "source://view/charge/webCharge.ui",
		data:cardNo
		});
});

//初始化
page.on('loaded',function(){
	type = page.getData();
	if (type == 1) {
		sgFn();
	}else if(type == 2){
		cnpcFn();
	}else{
		type = 3;
	}
})
ui('do_ALayout_1').on('touch',function(){
	app.closePage();
})



