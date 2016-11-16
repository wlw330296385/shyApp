/**
 * 显示晒记录（左右两条）
 * 
 * @Author : 
 * @Timestamp : 2016-09-16
 */

var root = ui("$");
root.setMapping({
	"m_imgPic1.source": "r1.pic",
	"m_lbrCont1.text": "r1.FF_CONT",
	"m_imgPhoto1.source": "r1.photo",
	"m_lbrNick1.text": "r1.F_NICKNAME",
	"m_lbrClickCnt1.text": "r1.F_CLICK_CNT",
	"m_lbrRepCnt1.text": "r1.F_REPLY_CNT",
	
	"m_layRight.visible": "rv",
	"m_imgPic2.source": "r2.pic",
	"m_lbrCont2.text": "r2.FF_CONT",
	"m_imgPhoto2.source": "r2.photo",
	"m_lbrNick2.text": "r2.F_NICKNAME",
	"m_lbrClickCnt2.text": "r2.F_CLICK_CNT",
	"m_lbrRepCnt2.text": "r2.F_REPLY_CNT",
});
