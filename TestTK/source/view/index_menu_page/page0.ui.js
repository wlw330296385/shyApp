/**
 * related to page0.ui
 * 
 * @Author : yjzhen@live.com
 * @Timestamp : 2016-11-11
 */
var page=sm('do_Page');
var listData=mm('do_ListData');
var talkList=ui('talkList');

var _tempData=[
    {	
        title:'标题1',
        talkTag:{
            lng:'粤语',
            vip:'VIP1',
            member:'456人玩过',
        },
        cover:'source://image/ind_image.jpg',
        user:{
            head:'source://image/c.jpg',
            name:'马甲1',
            intro:'马甲1:XX资深会员，终身会员。拥有老司机、老干部头衔。撩得一手好妹。'
        }
    },
    {
        title:'标题2',
        talkTag:{
            lng:'粤语',
            vip:'VIP2',
            member:'456人玩过',
        },
        cover:'source://image/ind_image.jpg',
        user:{
            head:'source://image/c.jpg',
            name:'马甲2',
            intro:'马甲2:XX资深会员，终身会员。拥有老司机、老干部头衔。撩得一手好妹。'
        }
    },
    {
        title:'标题3',
        talkTag:{
            lng:'粤语',
            vip:'VIP3',
            member:'456人玩过',
        },
        cover:'source://image/ind_image.jpg',
        user:{
            head:'source://image/c.jpg',
            name:'马甲3',
            intro:'马甲3:XX资深会员，终身会员。拥有老司机、老干部头衔。撩得一手好妹。'
        }
    },
    {
        title:'标题4',
        talkTag:{
            lng:'粤语',
            vip:'VIP4',
            member:'456人玩过',
        },
        cover:'source://image/ind_image.jpg',
        user:{
            head:'source://image/c.jpg',
            name:'马甲4',
            intro:'马甲4:XX资深会员，终身会员。拥有老司机、老干部头衔。撩得一手好妹。'
        }
    },
    {
        title:'标题5',
        talkTag:{
            lng:'粤语',
            vip:'VIP5',
            member:'456人玩过',
        },
        cover:'source://image/ind_image.jpg',
        user:{
            head:'source://image/c.jpg',
            name:'马甲5',
            intro:'马甲5:XX资深会员，终身会员。拥有老司机、老干部头衔。撩得一手好妹。'
        }
    },
    
];
_tempData[0].template = 0;
_tempData[1].template = 0;
_tempData[2].template = 0;
_tempData[3].template = 0;
_tempData[4].template = 0;
listData.addData(_tempData);
talkList.bindItems(listData);
talkList.refreshItems();