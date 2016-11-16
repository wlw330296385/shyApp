//related to test1.ui
// 在test1.ui.js里设置js的全局变量，二种方式。
// 1.不要加var前缀的变量定义
key1 = "value1";

// 2. 把全局变量定义在deviceone对象上
deviceone.key2 = {
	"k1" : "v1",
	"k2" : "v2",
	"k3" : "v3",
	"k4" : "v4"
}
var label = ui("do_Label_1");
label.text = "在test1.ui.js里设置js的全局变量\n" + "key1=\"" + key1
		+ "\"\ndeviceone.key2=" + JSON.stringify(deviceone.key2, null, 2) + "\n";