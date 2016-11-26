/**
 * related to duobao_goods_des.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-04
 */
var app, page, core,duobaoGoods_id;
core = require("do/core");
app = sm("do_App");
page = sm("do_Page");
var root = ui('$')

root.setMapping({
	"tag":'id'
})

root.on('dataRefreshed',function(){
	duobaoGoods_id = root.tag;
//	core.p(duobaoGoods_id,'duobaoGoods_id');
//	textContent = dataCache.loadData('duobaoDes'+result.data.id);
//	core.p(textContent);	
})

/**
 * var root = viewshower.getView(name);
   ui(root).tag =name;
 * ui(root).fire("xxxx","yyy");
 */
/*********************************************************/

var main_shower, action_1, action_3, img_1, img_2, nav_1,nav_2,nav_3;

main_shower = ui("do_ViewShower_1");

action_1 = ui("do_Label_4");
//action_2 = ui("do_Label_7");
action_3 = ui("do_Label_8");

nav_1 = ui('do_ALayout_4');
//nav_2 = ui('do_ALayout_5');
nav_3 = ui('do_ALayout_6');
main_shower.addViews([
    {id : "p1", path : "source://view/web/good_des.ui"},
//	{id : "p1", path : "source://view/duobao/duobao_good_des_1.ui"},
//    {id : "p2", path : "source://view/duobao/duobao_good_des_2.ui"},
    {id : "p3", path : "source://view/duobao/duobao_good_des_3.ui"}
]);

img_1 = "e60044FF"
img_2 = "FFFFFFFF";

action_1.bgColor = img_1;
//action_2.bgColor = img_2;
action_3.bgColor = img_2;

/*********************************************************/
(function(slide, ae0, ae2) {

	nav_1.on("touch", function() {
        ae0.bgColor = img_1;
//        ae1.bgColor = img_2;
        ae2.bgColor = img_2;
        slide.showView('p1', "fade");
    });
//    
//	nav_2.on("touch", function() {
//    	 ae0.bgColor = img_2;
//         ae1.bgColor = img_1;
//         ae2.bgColor = img_2;
//        slide.showView('p2', "fade");
//    });
    
	nav_3.on("touch", function() {
    	 ae0.bgColor = img_2;
//         ae1.bgColor = img_2;
         ae2.bgColor = img_1;
        slide.showView('p3', "fade");
    });
})(main_shower, action_1, action_3);

main_shower.showView("p1","fade");
/*********************************************************/

main_shower.on('viewChanged',function(){
	page.fire("getGoodsId",duobaoGoods_id);
})
