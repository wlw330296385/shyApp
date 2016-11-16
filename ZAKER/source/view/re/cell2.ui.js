var rootview, page;
rootview = ui("$");
page = sm("do_Page");

rootview.setMapping({   // 此处的Mapping只能设置在 RootView 上 ;
    "do_imageview_1.source" : "do_imageview_1",
    "label_1.text" : "do_label_1",
    "label_2.text" : "do_label_2",
    "label_3.text" : "do_label_3",
});

