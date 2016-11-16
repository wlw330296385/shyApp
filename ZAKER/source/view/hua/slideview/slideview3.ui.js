var nf = sm("do_Notification");
var app = sm("do_App");
var me=ui("me");
 
me.on("touch",function(data, e){
    app.openPage({source:"source://view/me.ui", data:"", animationType:"", isFullScreen:false, keyboardMode:"default", scriptType:""}, function(data, e){});
});