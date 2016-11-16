//related to num_regulation.ui
var page = sm("do_Page");
var buttonA = deviceone.mm("do_Animation", "BUTTONTOUCHDOWNS", "app");
var jia = ui("do_Button_1");
var jian = ui("do_Button_2");
var num = ui("do_Label_1");
//+
jia.on("touch",function(){
	jia.animate(buttonA);
	if(num.text*1+1>0){
		num.visible = true;
		jian.visible = true;
	}
	num.text = num.text*1+1;
});
//-
jian.on("touch",function(){
	jian.animate(buttonA);
	if(num.text*1-1<=0){
		num.visible=false;
		jian.visible=false;
	}
	num.text = num.text*1-1;
});

//自定义事件，获取传递来的值
page.on("numregulas",function(data){
	if(data>0){
		num.visible = true;
		jian.visible = true;
		num.text=data;
	}else{
		num.visible=false;
		jian.visible=false;
		num.text=0;
	}
});