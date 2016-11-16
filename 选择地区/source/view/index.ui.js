/**
 * @Author : logo_qy@163.com
 * @Timestamp : 2016-08-12
 */
var do_Global =sm("do_Global");
var do_Notification = sm("do_Notification");
var do_ComboBox_sheng = ui("do_ComboBox_sheng")
var do_ComboBox_shi = ui("do_ComboBox_shi")
var do_ComboBox_xian = ui("do_ComboBox_xian")
var listdata1 =mm("do_ListData");
var listdata2 =mm("do_ListData");
var listdata3 =mm("do_ListData");
do_ComboBox_sheng.bindItems(listdata1);
do_ComboBox_shi.bindItems(listdata2);
do_ComboBox_xian.bindItems(listdata3);
var do_Label_sheng =ui("do_Label_sheng");
var do_Label_shi =ui("do_Label_shi");
var do_Label_xian =ui("do_Label_xian");
var do_InitData = sm("do_InitData");
var get = "";
var sheng =[];
var shi = [];
var xian = [];
var sss="";
var app = sm("do_App");
var do_ALayout_back =ui("do_ALayout_back");
    do_ALayout_back.on("touch",function(){
	   app.closePage();
	  })
do_InitData.readFile("initdata://ssx.json", function(data, e){
	data.map(function(v,k){
		sheng.push({"text":v.name})
	})
	listdata1.removeAll();
	listdata1.addData(sheng);
	do_ComboBox_sheng.refreshItems();

	do_ComboBox_sheng.on("selectChanged",function(index){
		var getone = listdata1.getOne(index);//获取点击的省
		shi=[];
	    do_Label_sheng.text=getone.text;
	     data.map(function(v1,k1){
		   if(v1.name==getone.text){
			v1.city.map(function(v2,k2){
				shi.push({"text":v2.name})
				})
		  }
	  })
	  listdata2.removeAll();
	  listdata2.addData(shi);
	  do_ComboBox_shi.refreshItems();
	})//省的点击事件
	
	var getone_shi="";
	do_ComboBox_shi.on("selectChanged",function(index){
		getone_shi =listdata2.getOne(index);
		xian=[];
		do_Label_shi.text=getone_shi.text;
		data.map(function(v,k){
			v.city.map(function(v3,k3){
				if(v3.name==getone_shi.text){
			         v3.area.map(function(v4,k4)
			         {
			        	 xian.push({"text":v4})
			         })
			   }
			})
		})
		listdata3.removeAll();
		listdata3.addData(xian);
		do_ComboBox_xian.refreshItems();
	});
	do_ComboBox_xian.on("selectChanged",function(index){
		do_Label_xian.text = xian[index].text;
		})
	  })
	
	
		


