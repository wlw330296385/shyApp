var app, page, nf;
nf = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");
/*********************************************************/

var main_shower, action_1, action_2, action_3, img_1, img_2, img_3;

main_shower = ui("main_shower");

action_1 = ui("action_1");
action_2 = ui("action_2");
action_3 = ui("action_3");

img_1 = ui("img_1");
img_2 = ui("img_2");
img_3 = ui("img_3");

main_shower.addViews([
    {id : "p1", path : "source://view/index/1.ui"},
    {id : "p2", path : "source://view/index/2.ui"},
    {id : "p3", path : "source://view/index/3.ui"}
]);

img_1.target = "p1";
img_2.target = "p2";
img_3.target = "p3";

action_1.img = img_1;
action_2.img = img_2;
action_3.img = img_3;

/*********************************************************/
(function(slide, ae0, ae1, ae2) {
    ae0.img.source0 = "source://image/10.png";
    ae0.img.source1 = "source://image/11.png";
    ae1.img.source0 = "source://image/20.png";
    ae1.img.source1 = "source://image/21.png";
    ae2.img.source0 = "source://image/30.png";
    ae2.img.source1 = "source://image/31.png";
    
    ae0.on("touch", function() {
        ae1.img.source = ae1.img.source0;
        ae2.img.source = ae2.img.source0;
        this.img.source = this.img.source1;
        slide.showView(this.img.target, "push_r2l");
    });
    
    ae1.on("touch", function() {
        ae0.img.source = ae0.img.source0;
        ae2.img.source = ae2.img.source0;
        this.img.source = this.img.source1;
        slide.showView(this.img.target, "push_r2l");
    });
    
    ae2.on("touch", function() {
        ae0.img.source = ae0.img.source0;
        ae1.img.source = ae1.img.source0;
        this.img.source = this.img.source1;
        slide.showView(this.img.target, "push_r2l");
    });
})(main_shower, action_1, action_2, action_3);

page.on("loaded", function() {
    main_shower.showView("p1");
});

/*********************************************************/
