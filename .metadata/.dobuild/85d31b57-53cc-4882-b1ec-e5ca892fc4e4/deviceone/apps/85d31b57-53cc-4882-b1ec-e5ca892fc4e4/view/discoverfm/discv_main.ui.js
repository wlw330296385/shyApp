/**
 * “发现”主页面
 * 
 * @Author : 
 * @Timestamp : 2016-09-07
 */

var g_deviceone = require("deviceone");
var g_notify = sm("do_Notification");
var g_global = sm("do_Global");
var g_app = sm("do_App");
var g_page = sm("do_Page");

//列表框及绑定数据
var m_lstDiscover = ui("m_lstDiscover");
var m_lstDiscoverData = mm("do_ListData");
m_lstDiscover.bindItems(m_lstDiscoverData);

var m_fromRow = -1;
doReloadFromTop();


//设置下拉刷新回调
m_lstDiscover.on("pull", function(data){
	if (data.state == 2) {
//		doReloadFromTop();
		this.rebound();	//复位“正在加载”的状态
	}
});


//设置上拉刷新回调
m_lstDiscover.on("push", function(data){
	if (data.state == 2) {
		doLoadNextMsgs();
		m_lstDiscover.rebound();	//复位“加载更多”的状态
	}
});


//listview滚动，产生工具条总是留在上面的效果。实际上是动态产生一个相同的工具条
var m_layDynTool = null;
m_lstDiscover.on("scroll", function(data){
	if (data.firstVisiblePosition >= 1) {
		//最上面的图片已经被滚掉，则此动态产生工具条恩宠在上面
		if (m_layDynTool == null) {
			g_deviceone.print("动态产生");
			m_layDynTool = ui("m_layRoot").add("dynToolbar", "source://view/discoverfm/discv_tpl_toolbar.ui", 0, 88);
		}else{
			ui(m_layDynTool).visible = true;
		}
	}
	else {
		//图片露出，则删除掉该工具条
		if (m_layDynTool != null&&ui(m_layDynTool).visible) {
			g_deviceone.print("隐藏");
			ui(m_layDynTool).visible=false;
		}
	}
});


/**
 * 重新从头开始载入
 */
function doReloadFromTop()
{
	m_lstDiscoverData.removeAll();
	
	//前两个item固定：一个是图片，一个是工具条
	m_lstDiscoverData.addOne({template:1});
	m_lstDiscoverData.addOne({template:2});

	//取列表: 载入的行号(-1,-2,...)
	m_fromRow = -1;
	doLoadNextMsgs();
}


/**
 * 获取下一批数据。
 */
function doLoadNextMsgs()
{
	var line = {};			//一行分左右两列
	for (var i=0; i<10; i++) {
		var rec = {pic:"source://image/discv_logo.jpg", photo:"source://image/icon64_clock.png", FF_CONT:"Helloworld", F_NICKNAME:"昵称", F_CLICK_CNT:i, F_REPLY_CNT:i*10};
		if ((i%2) == 0) {
			line.r1 = rec;
		}
		else {
			line.r2 = rec;
			line.rv = true;
			line.template = 0;
			m_lstDiscoverData.addOne(line);
			g_deviceone.print("add: "+JSON.stringify(line));
			line = {};
		}
	}
	
	//可能正好只有左半个
	if (line.r1 != null) {
		line.rv = false;
		line.template = 0;
		m_lstDiscoverData.addOne(line);
	}
		
	//数据更新后，必须刷新显示
	m_lstDiscover.refreshItems();
}
