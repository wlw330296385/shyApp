/**
 * New DeviceOne File
 */
var deviceone = require("deviceone");
var root = deviceone.ui("$");
var page = deviceone.sm("do_Page");
var app = deviceone.sm("do_App");
var nf = deviceone.sm("do_Notification");

//按下动画
module.exports.animbtn = function(animid){
	var animbtn = deviceone.mm("do_Animator");
	var propsbtn = {alpha:0.2};
	var propsbtn1 = {alpha:1};
	animbtn.append(100, propsbtn);
	animbtn.append(200, propsbtn1);
	animid.animate(animbtn);
}
//按下动画1
module.exports.animbtn1 = function(animid){
	var animbtn = deviceone.mm("do_Animator");
	var propsbtn = {alpha:0.5};
	var propsbtn1 = {alpha:1};
	animbtn.append(100, propsbtn);
	animbtn.append(200, propsbtn1);
	animid.animate(animbtn);
}