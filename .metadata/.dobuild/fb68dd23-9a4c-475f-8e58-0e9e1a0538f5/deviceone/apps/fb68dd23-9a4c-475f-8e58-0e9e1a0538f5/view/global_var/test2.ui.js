//related to test1.ui
var label = ui("do_Label_1");
// 在test2.ui.js里获取js的全局变量，二种方式。

var content = {};
content.key1 = key1;
content.key2_k3 = deviceone.key2["k3"];
label.text = "在test2.ui.js里获取js的全局变量\n" + JSON.stringify(content, null, 2)