//related to probar_anim.ui
var root = ui("$");

var procon = ui("do_ImageView_1");
var protxt = ui("do_Label_1");
root.on("probarsimg",function(data){
	var getwidth = data*7;
	procon.width = getwidth;
	procon.redraw();
	protxt.text = data+"%";
	root.fire("probarsfimg",getwidth);
});

