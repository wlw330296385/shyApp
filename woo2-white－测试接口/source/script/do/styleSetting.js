var core=require("do/core");
var d1=require("deviceone");
module.exports.options ={
    dOption:{
		
    },
    //定义动感效果的按钮
    dynamicButton:{
	    touch:function(){
	    	//do nothing
	    },
    	touchDown: function(){
    		var _anim_button_down_style = d1.mm("do_Animation");
    		_anim_button_down_style.alpha({
    		  delay: 0,
    		  duration: 300,
    		  curve: "Linear",
    		  repeatCount: "",
    		  autoReverse: true,
    		  alphaFrom: 1,
    		  alphaTo: 0.5
    		}); 
    		_anim_button_down_style.scale({
    		  delay: 0,
    		  duration: 300,
    		  curve: "Linear",
    		  repeatCount: "",
    		  autoReverse: true,
    		  scaleFromX: 1,
    		  scaleFromY: 1,
    		  scaleToX: 0.9,
    		  scaleToY: 0.9,
    		  pivotX: 0.5,
    		  pivotY: 0.5
    		});
    		this.animate(_anim_button_down_style);
    	}
    },
  //定义导航功能行的点击效果
    navigatorCell:{
	    touch:function(){
	    	//do nothing
	    },
    	touchDown: function(){
    		var _anim_button_down_style = d1.mm("do_Animation");
    		_anim_button_down_style.fillAfter=true;
    		_anim_button_down_style.alpha({
    		  delay: 0,
    		  duration: 300,
    		  curve: "Linear",
    		  repeatCount: "",
    		  autoReverse: true,
    		  alphaFrom: 1,
    		  alphaTo: 0.5
    		}); 
    		this.animate(_anim_button_down_style);
    	}
    }
};