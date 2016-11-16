/**
 * related to index2.ui
 * 
 * @Author : logo_qy@163.com
 * @Timestamp : 2016-08-13
 */
var do_Notification = sm("do_Notification");
var do_ALayout_back = ui("do_ALayout_back");
var app = sm("do_App");
var do_Picker_sheng = ui("do_Picker_sheng");
var do_Picker_shi = ui("do_Picker_shi");
var do_Picker_xian = ui("do_Picker_xian");
var listdata1 = mm("do_ListData");
var listdata2 = mm("do_ListData");
var listdata3 = mm("do_ListData");
do_Picker_sheng.bindItems(listdata1);
do_Picker_shi.bindItems(listdata2);
do_Picker_xian.bindItems(listdata3);
var do_Label_1 = ui("do_Label_1");
var do_Label_2 = ui("do_Label_2");
var do_Label_3 = ui("do_Label_3");
var do_InitData = sm("do_InitData");
	do_ALayout_back.on("touch",function(){
	  app.closePage();
	})
	var sheng=[];
	var shi=[];
	var xian=[];
do_InitData.readFile("initdata://ssx.json", function(data, e){
	sheng=[];
	data.map(function(v,k){
		sheng.push(v.name)//[河北],[北京],
	    })
		listdata1.removeAll();
		listdata1.addData(sheng)
		do_Picker_sheng.refreshItems();
	  do_Picker_sheng.on("selectChanged",function(index){
		 shi =[];
		do_Label_1.text = sheng[index];
			var get1 =listdata1.getOne(index)
				data.map(function(v,k){
					if(get1==v.name){
					v.city.map(function(v1,k1){
						shi.push(v1.name)
					})
				}
			})
			listdata2.removeAll();
			listdata2.addData(shi)
			do_Picker_shi.index=0;
			do_Picker_shi.refreshItems();	
		})
		do_Picker_shi.on("selectChanged",function(index){
			getone_shi =listdata2.getOne(index);
			do_Label_2.text = shi[index];
	    	xian=[];
			data.map(function(v,k){
				v.city.map(function(v3,k3){
					if(v3.name==getone_shi){
					   	 //do_Notification.alert(1)
	                  v3.area.map(function(v4,k4){
	                	  xian.push(v4)
	                  })
				   }
				})
			})
			listdata3.removeAll();
			listdata3.addData(xian);
			do_Picker_xian.index=0;
			do_Picker_xian.refreshItems();
	});
			do_Picker_xian.on("selectChanged",function(index){
			do_Label_3.text=xian[index];
			})
	
});

