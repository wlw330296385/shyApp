/**
 * @Author : 18507717466
 * @Timestamp : 2016-10-09
 */
var do_Global = sm("do_Global");
var nf = sm("do_Notification");
var btn_hello = ui("btn_hello");
var http = require('do/http');
btn_hello.on("touch", function() {
	http.ajax('',{
		contentType:'application/json',
		responseEncoding:"utf-8",
		useMockData:true,
		type:'POST',
		parent:"needWaitting",
		success:function(data){
			do_Global.setMemory("accessToken", _result.data.accessToken);
		}
	})
});

