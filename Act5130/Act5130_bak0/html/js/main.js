// ����ҳ���л�
$('.content-tab').on('click', function () {
    var idx = $(this).index();
    // if(idx==1){
    //     $('.content-tabs .login-box').hide();
    // }else{
    //     $('.content-tabs .login-box').show();
    // }
    if (idx == 1 && OUT.login.isLogin === false) {
        console.log('ҳ���л�');
        return OUT.login.doLogin();
    }
    if (OUT.role.checkBind()) {
        return;
    }
    if (idx == 1) {
        OUT.user.getGroupList();
        $('.schedule-nav-list').eq(0).addClass('on').siblings('.schedule-nav-list').removeClass('on');
        $('.integral-content').eq(0).show().siblings('.integral-content').hide();
    }
    $(this).addClass('on').siblings('.content-tab').removeClass('on');
    $('.cont-box').eq((idx - 1)).show().siblings('.cont-box').hide();
    swiperVideo();
    playerFun();
});

// ��Χ������̭�����Ծ�����ҳ���л�
$('.schedule-nav-list').on('click', function () {
    var idx = $(this).index();
    if (idx == 1) {
        // ������̭��ҳ��
        // showTips('��δ����');
        // return;
    } else if (idx == 2) {
        OUT.user.getByWeekMG();
    } else if (idx == 0) {
        OUT.user.getGroupList();
    }
    $(this).addClass('on').siblings('.schedule-nav-list').removeClass('on');
    $('.integral-content').eq((idx)).show().siblings('.integral-content').hide();
});

// ��̭���л�
$('.finalis-tab').on('click', function () {
    var idx = $(this).index();
    $(this).addClass('on').siblings('.finalis-tab').removeClass('on');
    $('.finalis-cont').eq((idx)).show().siblings('.finalis-cont').hide();
})

$('#sel1').on('change', function () {
    // qq/wx�����л�
    var idx = $(this).val();
    OUT.user.selectArea = idx;
    OUT.user.getGroupList();
});

$('#sel2').on('change', function () {
    // �����л�
    var idx = $(this).val();
    OUT.user.selectMatchGroup = idx;
    OUT.user.changeSelect();
    // ��ת��ָ������λ��
    var eTop = getElTop('matchGroup_' + OUT.user.selectMatchGroup);
    goHeight(eTop - 150)
});

$('#sel3').on('change', function () {
    // �������л�
    var idx = $(this).val();
    OUT.user.selectArea = idx;
    OUT.user.getByWeekMG();
});

$('#sel4').on('change', function () {
    var idx = $(this).val();
    OUT.user.selectMatchGroup = idx;
    OUT.user.getByWeekMG();
});

$('#sel5').on('change', function () {
    var idx = $(this).val();
    OUT.user.weekNo = idx;
    var eTop = getElTop("matchDetailWeek_" + OUT.user.weekNo);
    goHeight(eTop - 150);
});


// �󶨸�ҳ�水ť
$('.btn-back').on('click', function () {
    closeSubPage();
});
$('.legion-table li a').on('click', function () {
    // openSubPage(1,'matchlist');
});
// $('.cont-box3 .swiper-slide').on('click', function() {
//     // openSubPage('114902','video');
//     swiperVideo();
// });
$('.btn-txt').on('click', function () {
    // openSubPage('img');
});

$('.btn-exrecord').on('click', function () {
    // openSubPage('exrecord');
});

// �򿪸�ҳ��
function openSubPage(data, type) {
    type = type || 'img';
    $('html, body').css({'overflow': 'hidden'});
    $('.sub-page').css({'display': 'none'});
    // $('.sub-page-'+n).css({ 'display': '' })
    $('.sub-page-' + type).css({'display': ''})
    $('.sub-wrapper').addClass('open');
    if (type == 'img') {
        fillNews.detail({
            gameID: 65,
            id: data,
            type: 'iTag',
            source: 'client_circle_detail', // V4ϵͳ�������ϱ�����ҪȥGICP��̨�ֶ�����
            newsType: 'news',
            wrap: '#img-body', // ģ�崦����������������
            tpl: document.querySelector('#tpl').innerHTML, // ģ���ַ���
            relWrap: '.rel', // ����Ƽ�������
            relTpl: '<p><a href="{url}"><img src="{sIMG}">{sTitle} {sCreated}</a></p>', // ����Ƽ���dom�ṹģ��
            callback: function (obj) {
                console.log(obj);
                player.pause();
                document.title='�����Ŷ�-��������-�ٷ���վ-��Ѷ��Ϸ';
            }
        });
    }
}

function closeSubPage() {
    $('html, body').css({'overflow': ''});
    $('.sub-wrapper').removeClass('open');
}


// $('.btn-dialog-share').on('click', function() {
//     TGDialogS('dialog-share-mask');
// });


// ҳ��ˢ��ʱ����swiper
function swiperVideo() {
    // ��Ѷ�ֲ�ͼ
    var mySwiper = new Swiper('.swiper-container', {
        // loop:true,
        observer: true,
        resistanceRatio: 0,
        observeParents: true,//swiper��Ԫ�ر仯ʱ����
        observeSlideChildren: true,//swiper��Ԫ�ر仯ʱ����
        preventClicks: false,//Ĭ��true
        preventClicksPropagation: false,
        // autoplay: {
        //     delay:3000,
        //     disableOnInteraction: false,
        // },
        // pagination: {
        //     el: '.swiper-pagination',
        // },
        on: {
            slideChangeTransitionEnd: function () {
            },
        }
    })
}

var player;

function playerFun() {
    // $('.swiper-slide .btn-play').hide();
    // TGDialogS('dialog-video');
    player = new Txplayer({
        containerId: 'video-container', //id
        vid: 'f3234lp6wdb',
        width: '100%',
        height: '100%',
        autoplay: false,
        poster: '',
    });
}

$('.dia-close').on('click', function () {
    $('.video-container').empty();
    closeDialog();
})

function onReachBottom(params, callFn) {
    if (!params.container || !params.content) {
        console.error('ȱʧ��Ҫ�Ĳ���');
        return;
    }

    var $container = params.container,
        $content = params.content,
        distance = params.distance || 30;

    $container.on('scroll', function () {
        var awayBtm = $content.height() - $container.scrollTop() - $container.height();
        if (awayBtm <= distance) {
            callFn && callFn()
        }
    });
}

/* ���ò�� */
onReachBottom({
    "container": $('.legion-list-box'),
    /* �������� */
    "content": $('.legion-ul'),
    /* ���ݶ��� */
    "distance": 100 /* �����¼����룬Ĭ��30px */
}, function () {
    /* ����ص����� */
    //getUserList.get();
});


// ���������б�

fillNews.list({
    gameID: 65,
    type: 'iTag',
    newsType: 'news',
    id: '114902,114903',
    // pager:{
    // 	wrap:'#pager',
    // 	type:'click', // laypage | click | scroll Ĭ����laypage��ҳ | ������ظ��� | �������ظ���
    // 	scrollDistance:0, // typeΪscrollʱ��wrapԪ�صĶ���������Ļ�ײ��Ĵ�������,Ĭ��Ϊ0,�˴�ʹ��500�Ǳ�����ʾ
    // 	// scrollContainer:window, // typeΪscrollʱ�򣬼���ĸ�Ԫ�ع�����Ĭ����window
    // },
    pageSize: 10000, // ÿһҳ��������
    source: 'client_circle_detail', //�����ϱ��õģ�������ҳ������pc�����ƶ�����gicp�����������ƶ�������web_m ��PC������ web_pc
    detailURL: 'news', // ���ŵ�����ҳ�����ں������?newsid=XXX
    tpl:
        '<a class="btn-txt" href="javascript:void(0)" title="����" onclick="openSubPage({iNewsId}),PTTSendClick(\'btn\',\'txt1\',\'����\')"><div class="img-box"><img src="{sCoverMap.One}" alt=""></div><div class="txt-box"><p class="titl">{sTitle}</p><p class="txt"  style="opacity:0" id="content-{iNewsId}"></p></div></a>'
    // function(json){
    //     console.log(json.iNewsId,this);
    //     if(json.iNewsId==='114902'){
    //       return '<a class="btn-txt" href="javascript:void(0)" title="����" onclick="openSubPage({iNewsId}),PTTSendClick(\'btn\',\'txt1\',\'����\')"><div class="img-box"><img src="{sCoverMap.One}" alt=""></div><div class="txt-box"><p class="titl">{sTitle}</p><p class="txt"  style="opacity:0" id="content-{iNewsId}"></p></div></a>'
    //     }
    //   }
    , // ģ���ַ�����
    wrap: '#txt-list', //����ȥ������
    callback: function (result) {
        console.log(result)
        // �����Ļص�
        var dataNews = [];
        for (var i = 0; i < result.msg.result.length; i++) {
            dataNews.push(result.msg.result[i].iNewsId)
        }
        setTimeout(function () {
            initContent(dataNews)
        }, 100);
        document.title='�����Ŷ�-��������-�ٷ���վ-��Ѷ��Ϸ';
    }
});

// ����
var initContent = function (dataNews) {
    dataNews.map(function (val) {
        fillNews.detail({
            gameID: 65,
            id: val,
            type: 'iTag',
            pageSize: 10000, // ÿһҳ��������
            source: 'client_circle_detail',
            newsType: 'news',
            wrap: '#content-' + val, // ģ�崦����������������
            tpl: '{sContent}', // ģ���ַ���
            relWrap: '.rel', // ����Ƽ�������
            relTpl: '<p><a href="{url}"><img src="{sIMG}">{sTitle} {sCreated}</a></p>', // ����Ƽ���dom�ṹģ��
            callback: function (obj) {
                setTimeout(function () {
                    clearContentTags(val)
                }, 100);
                document.title='�����Ŷ�-��������-�ٷ���վ-��Ѷ��Ϸ';
            }
        });
    })
}
var clearContentTags = function (val) {
    var t = setInterval(function () {
        if (document.getElementById('content-' + val).innerText.length > 0) {
            clearInterval(t);
            document.getElementById('content-' + val).innerHTML = document.getElementById('content-' + val).innerText
            $(document.getElementById('content-' + val)).css({opacity: '1'});
        }
    }, 30)
}
