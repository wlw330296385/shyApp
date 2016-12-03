/**
 * related to rec.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-12-02
 */
var page = sm("do_Page");
var dialog = sm("do_Dialog");
var core = require('do/core');
var data = dialog.getData();

core.p(data,'rec');

ui('do_Label_1').text = data.username+"注册会员成功";

ui('do_Label_3').text = data.hb1+" 元";

ui('do_Label_5').text ="下一个红包 "+ data.hb2+" 元"