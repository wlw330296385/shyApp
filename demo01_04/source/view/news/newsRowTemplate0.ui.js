//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_root=ui("do_ALayout_root");
var do_ImageView_icon=ui("do_ImageView_icon");
var do_Label_title=ui("do_Label_title");
var do_Label_desc=ui("do_Label_desc");

//设置数据绑定的映射关系
root.setMapping({
	"do_Label_title.text":"title",
	"do_Label_desc.text":"desc",
	"do_ImageView_icon.source":"image"
});

