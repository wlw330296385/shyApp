/**
 * related to index_item.ui
 * 
 * @Author : yjzhen@live.com
 * @Timestamp : 2016-11-11
 */

var rootPage=ui('$');
var page=sm('do_Page');
var tagBox=ui('tagBox');

rootPage.setMapping({
    'talkTitle.text':'title',
    'coverImg.source':'cover',
    'userHead.source':'user.head',
    'userTitle.text':'user.name',
    'userIntro.text':'user.intro',
    'tagBox.tag':'talkTag'
});

page.on('loaded',function(){
    var _hashData=mm('do_HashData');
    var _tagData=JSON.parse(tagBox.tag);
    var _id='';
    _hashData.addData(_tagData);
    for(var _key in _tagData){
        _id=_key+'_id';
        tagBox.add(_id,'source://view/index/tag.ui','right');
        ui(_id).bindData(_hashData);
        ui(_id).setMapping({
            'tagText.text':_key
        });
         ui(_id).refreshData();
    }
});

