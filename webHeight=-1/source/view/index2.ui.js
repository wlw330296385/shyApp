/**
 * related to index2.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-15
 */
var page = sm('do_Page');
var do_LinearLayout_1 = ui('do_LinearLayout_1');
do_LinearLayout_1.add({
		id:"goods_des",
		path:"source://view/index.ui",
		target:"do_ALayout_1",
	});

page.fire('getWebContent');