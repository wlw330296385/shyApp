//related to banner.ui
var root = ui("$");
var nf = sm("do_Notification");
var addround = ui("do_LinearLayout_1");
var bannerView = ui("do_SlideView_b");
var bannerData = mm("do_ListData");

var albox0 = ui("do_Label_1"),albox1 = ui("do_Label_2"),albox2 = ui("do_Label_3"),
	albox3 = ui("do_Label_4"),albox4 = ui("do_Label_5"),albox5 = ui("do_Label_6");
var alboxcount =[albox0,albox1,albox2,albox3,albox4,albox5]

root.on("bannerSc",function(data){
	bannerData.addData(data);
	bannerView.bindItems(bannerData);
	bannerView.refreshItems();
	var rcount = bannerData.getCount();
	for(var i = 0; i<rcount; i++){
		alboxcount[i].visible = true;
	}
	
	bannerView.on("indexChanged", function(data, e) {
		var index = data;
		for(var i = 0; i<rcount; i++){
			if(data == i){
				alboxcount[i].bgColor = "48A4FFAA";
			}else{
				alboxcount[i].bgColor = "FFFFFFAA";
			}
		}
		//nf.toast(data+":"+i);
	});
});


