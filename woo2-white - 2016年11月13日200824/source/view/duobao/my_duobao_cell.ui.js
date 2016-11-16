/**
 * related to my_duobao_cell.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-09
 */
var page,app,core,storage,userInfo;
app = sm('do_App');
core = require('do/core');
ui("$").setMapping({
	"do_Label_18.text":"data.sales_periods",//期数
	"do_Label_1.text":"data.goods_name",//商品名
	"do_ImageView_1.source":"data.image",//图片
	"do_Label_25.text":"data.winner_name",//获奖者姓名
	"do_Label_29.text":"data.winner_id",//获奖用户ID
	"do_Label_31.text":"data.wintime",//获奖时间
	"do_Label_30.text":"data.winno",//幸运号码
	"do_Label_5.text":"data.sales_people_num",//总需
	"do_Label_6.text":"data.mybuycounts",//我本次参与
	"do_ALayout_1.tag":"data.winner_id",//有没有开奖
	"do_Label_15.tag":"data.poitlist.is_buy_score",//用于兑换商品积分
	"do_Label_17.tag":"data.poitlist.is_return_score",//用于抵扣
	"do_Label_16.tag":"data.poitlist.is_next_score",//用于全返
	"do_ImageView_6.tag":"data.iswin",//有没有中奖
	"do_Label_14.text":"data.poitlist.poit",//获得总积分
	//如果没开奖
	"do_Label_19.text":"data.goods_name",
	"do_Label_19.tag":"data.sales_id",//商品ID
	"do_Label_20.text":"data.sales_periods",
	"do_ImageView_5.source":"data.image",
	"do_Label_21.text":"data.surplus",//剩余
	"do_ALayout_12.width":"data.progress",
	"do_Label_22.text":"data.per",
	"do_Label_23.text":"data.mybuycounts",
	"do_LinearLayout_1.tag":"data.nolist",
	"do_ALayout_7.tag":"data.no_num",
})


var winImg = ui('do_ImageView_6');
ui("$").refreshData();
ui('$').on('dataRefreshed',function(){
	if(ui('do_ALayout_1').tag == 0){
		//没开奖
		ui('do_ALayout_1').visible = false;
		ui('do_ALayout_6').visible = false;
		ui('do_ALayout_7').visible = true;
	}else{
		ui('do_ALayout_1').visible = true;		
		//如果开了奖
		ui('do_ALayout_7').visible = false;
		//但是没中奖
		if(winImg.tag == 0){
			ui('do_ALayout_6').visible = true;
			ui('do_Button_4').visible = false;
			winImg.source = "source://image/icon/lose.png";
			
			if(ui('do_Label_15').tag == 1){
				ui('do_ImageView_7').source = "source://image/icon/success.png";
			}else{
				ui('do_ImageView_7').source = "source://image/icon/error.png";
			}
			if(ui('do_Label_17').tag == 1){
				ui('do_ImageView_8').source = "source://image/icon/success.png";			
			}else{
				ui('do_ImageView_8').source = "source://image/icon/error.png";
			}
			if(ui('do_Label_16').tag == 1){
				ui('do_ImageView_9').source = "source://image/icon/success.png";
			}else{
				ui('do_ImageView_9').source = "source://image/icon/error.png";
			}
		}else{			
			//本人中奖
			ui('do_ALayout_6').visible = false;
			winImg.source = "source://image/icon/win.png";
			
		}
	}
	ui('$').redraw();
})

//我的夺宝号
var dialog = sm("do_Dialog");
var dialogData;
//已开奖
ui('do_Button_1').on('touch',function(){
	dialogData = {
			"nolist":JSON.parse(ui('do_LinearLayout_1').tag),
			"title2":"共参与"+ui('do_Label_6').text+",夺宝号码为:",
			"title":"(第"+ui('do_Label_18').text+"期)夺宝信息"
	}
	dialog.open("source://view/dialog/duobao.ui",dialogData,function(data,e){
	
	})
})
//未开奖
ui('do_Button_3').on('touch',function(){
	dialogData = {
			"nolist":JSON.parse(ui('do_LinearLayout_1').tag),
			"title2":"共参与"+ui('do_Label_23').text+",夺宝号码为:",
			"title":"(第"+ui('do_Label_18').text+"期)夺宝信息"
	}
	dialog.open("source://view/dialog/duobao.ui",dialogData,function(data,e){
	
	})
})
//追加
ui('do_Button_2').on('touch',function(){
	app.openPage("source://view/duobao/duobao_goods.ui",ui('do_Label_19').tag);
})

//立即分享
var we = sm("do_TencentWX");
storage = sm('do_Storage');
userInfo = storage.readFileSync('data://userInfo',true);
ui('do_Button_4').on('touch',function(){
	we.share({
		appId:"wx2d2c3284b084cf4c", 
		scene:"1", 
		type:"0", 
		title:"我在深海油夺宝大展身手,快来看看我有没有中奖", 
		content:"万一中奖一定请你吃饭", 
		url:"http://api.e-shy.com/index.php/index/promote/registerWeb.html?r="+userInfo.data.mobile, 
		image:"source://image/por.png", 
		audio:''
	},function(res){
		if(res){			
			core.toast('分享成功');
		}
	})
})