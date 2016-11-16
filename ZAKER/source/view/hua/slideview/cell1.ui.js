var rootview, page;
rootview = ui("$");
page = sm("do_Page");

rootview.setMapping({   // 此处的Mapping只能设置在 RootView 上 ;
    "touxiang.source" : "touxiang",
    "do_imageview_1.source" : "do_imageview_1",
    "look.source" : "look",
    "say.source" : "say",
    "dianzan.source" : "dianzan",
    "name.text" : "name",
    "when.text" : "when",
    "how.text" : "how",
    "do_label_4.text" : "do_label_4",
    "look_.text" : "look_",
    "say_.text" : "say_",
    "dianzan_.text" : "dianzan_"
});
 