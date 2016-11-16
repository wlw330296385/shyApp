/**
 * related to index1.ui
 * 
 * @Author : null
 * @Timestamp : 2016-08-22
 */
var do_ALayout_back=ui("do_ALayout_back")
var do_ALayout_1= ui("do_ALayout_1");
var do_ALayout_2= ui("do_ALayout_2");
var app = sm("do_App");
do_ALayout_back.on("touch",function(){
	app.closePage();
})
do_ALayout_1.on("touch",function(){//combox
		app.openPage({
				"source":"source://view/index.ui",
		        "statusBarState": "transparent"
			})
	  })
do_ALayout_2.on("touch",function(){//piker
		app.openPage({
				"source":"source://view/index2.ui",
		        "statusBarState": "transparent"
			})
	  })	  
	  
	  

	  
	  