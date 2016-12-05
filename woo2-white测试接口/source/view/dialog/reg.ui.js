/**
 * related to reg.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-12-02
 */
var storage,userInfo;
storage = sm('do_Storage');
userInfo = storage.readFileSync('data://userInfo',true);
ui('do_Label_1').text = userInfo.data.id;