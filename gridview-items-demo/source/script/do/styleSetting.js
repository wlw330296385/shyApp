var core=require("do/core");
module.exports.options ={
    dOption:{
		
    },
    //定义动感效果的按钮
    dynamicButton:{
	    touch:function(){
	    	//do nothing
	    },
    	touchDown: function(){
    		var _anim_button_down_style = core.mm("do_Animation");
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
    }
};