module.exports.getTimeText = function(_time){
	var _month =_time.getMonth() + 1;
	var _day =_time.getDate();
	return _time.getFullYear() + "年" + 
		(_month < 10 ? "0" + _month:_month) + "月" +
		(_day < 10 ? "0" + _day:_day) + "日";
}