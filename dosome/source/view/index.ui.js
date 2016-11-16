/**
 * @Author : 18507717466
 * @Timestamp : 2016-10-02
 */
var nf = sm("do_Notification");
var btn_hello = ui("btn_hello");

btn_hello.on("touch", function() {
	nf.alert("Hello World !!!!!");
});

