/**
 * related to index.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-02
 */
var app,page,core,listData,do_ListView_1;
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
listData = mm('do_ListData');
do_ListView_1 = ui('do_ListView_1');
var data = [];
data[0] = {};
data[0].template = 1;
data[0].imgUrl = "source://image/duobao_banner.jpg";
data[1] = {};
data[1].template = 0;
data[1].cellData = {
	goods_img:"source://image/car.jpg",
	goods_name:"夺宝商品名",
	price:989,
	progress:Math.floor(Math.random()*150),
	join_num:Math.floor(Math.random()*100),
	need_num:300,
	least_num:Math.floor(Math.random()*300)
};
data[2] = {};
data[2].template = 0;
data[2].cellData ={
	goods_img:"source://image/car.jpg",
	goods_name:"夺宝商品名",
	price:9991,
	progress:Math.floor(Math.random()*150),
	join_num:Math.floor(Math.random()*100),
	need_num:300,
	least_num:Math.floor(Math.random()*300)
};
data[3] = {};
data[3].template = 0;
data[3].cellData ={
	goods_img:"source://image/car.jpg",
	goods_name:"夺宝商品名data[2]",
	price:222,
	progress:Math.floor(Math.random()*150),
	join_num:Math.floor(Math.random()*100),
	need_num:300,
	least_num:Math.floor(Math.random()*300)
};
data[4] = {};
data[4].template = 0;
data[4].cellData ={
	goods_img:"source://image/car.jpg",
	goods_name:"夺宝商品名",
	price:119,
	progress:Math.floor(Math.random()*150),
	join_num:Math.floor(Math.random()*100),
	need_num:300,
	least_num:Math.floor(Math.random()*300)
};
data[5] = {};
data[5].template = 0;
data[5].cellData ={
	goods_img:"source://image/car.jpg",
	goods_name:"夺宝商品名",
	price:229,
	progress:Math.floor(Math.random()*150),
	join_num:Math.floor(Math.random()*100),
	need_num:300,
	least_num:Math.floor(Math.random()*300)
};

listData.addData(data);
//listData.refreshData();
do_ListView_1.bindItems(listData);
do_ListView_1.refreshItems();
