// ����ҳ���л�
$('.content-tab').on('click',function(){
    var idx=$(this).index();
    // if(idx==1){
    //     $('.content-tabs .login-box').hide();
    // }else{
    //     $('.content-tabs .login-box').show();
    // }
    $(this).addClass('on').siblings('.content-tab').removeClass('on');
    $('.cont-box').eq((idx-1)).show().siblings('.cont-box').hide();
    swiperVideo();
})

// ��Χ������̭�����Ծ�����ҳ���л�
$('.schedule-nav-list').on('click',function(){
    var idx=$(this).index();
    $(this).addClass('on').siblings('.schedule-nav-list').removeClass('on');
    $('.integral-content').eq((idx)).show().siblings('.integral-content').hide();
})



// �󶨸�ҳ�水ť
$('.btn-back').on('click', function() {
    closeSubPage();
    player.pause();
});
$('.legion-table li a').on('click', function() {
    openSubPage(1,'matchlist');
});
// $('.cont-box3 .swiper-slide').on('click', function() {
//     // openSubPage('114902','video');
//     swiperVideo();
// });
$('.btn-txt').on('click', function() {
    // openSubPage('img');
});

$('.btn-exrecord').on('click', function() {
    // openSubPage('exrecord');
});



function getParam(_name,_url){
 
    if(new RegExp("http:").test(_url)){
     return RegExp.$2;
    }else{
     return null;
    }
   }
   
//    var resurl='http://portal.gcable.cn/download?userID=1882010xxxx&nickname=wwwqqq&userGDID=1234555&avatarImg=http://www.xxxxxx'
//    console.log(resurl.match("http:")) ; // wwwqqq

// �򿪸�ҳ��
function openSubPage(data,type) {
    type=type||'img';
    $('html, body').css({ 'overflow': 'hidden' });
    $('.sub-page').css({ 'display': 'none' });
    // $('.sub-page-'+n).css({ 'display': '' })
    $('.sub-page-'+type).css({ 'display': '' })
    $('.sub-wrapper').addClass('open');
    if(type=='img'){
        fillNews.detail({
            gameID: 65,
            id:data,
            type:'iTag',
            source:'client_circle_detail', // V4ϵͳ�������ϱ�����ҪȥGICP��̨�ֶ�����
            newsType:'news',
            wrap:'#img-body', // ģ�崦����������������
            tpl:document.querySelector('#tpl').innerHTML, // ģ���ַ���
            relWrap:'.rel', // ����Ƽ�������?
            relTpl:'<p><a href="{url}"><img src="{sIMG}">{sTitle} {sCreated}</a></p>', // ����Ƽ���dom�ṹģ��
            callback:function(obj){
                console.log(obj);
                console.log($("#img-body img").length)
                var imgs=[];
                $("#img-body img").each(function(){
                    imgs.push($(this).attr("src").replace("https:",""))
                    $(this).attr("src",$(this).attr("src").replaceAll("(http:)|(https:)",""))
                    $(this).attr("src",$(this).attr("data-src").replaceAll("(http:)|(https:)",""))
                })
                
                document.title='�����Ŷ�-��������-�ٷ���վ-��Ѷ��Ϸ';
            }
        });
    }
}

function closeSubPage() {
    $('html, body').css({ 'overflow': '' });
    $('.sub-wrapper').removeClass('open');
}

function closeSubPage() {
    $('html, body').css({ 'overflow': '' });
    $('.sub-wrapper').removeClass('open');
}



// $('.btn-dialog-share').on('click', function() {
//     TGDialogS('dialog-share-mask');
// });



// ҳ��ˢ��ʱ����swiper
function swiperVideo(){
    // ��Ѷ�ֲ�ͼ
    var mySwiper = new Swiper('.swiper-container', {
        loop:false,
        observer:true,
        observeParents:true,//swiper��Ԫ�ر仯ʱ����
        observeSlideChildren:true,//swiper��Ԫ�ر仯ʱ����
        // autoplay: {
        //     delay:3000,
        //     disableOnInteraction: false,
        // },
        pagination: {
            el: '.swiper-pagination',
            clickable :true,
        },
    })
}

var player = new Txplayer({
    containerId: 'video-container', //id
    vid: 'f3234lp6wdb',
    width: '100%',
    height: '100%',
    autoplay: false,
    poster:'',
});

$('.swiper-slide .btn-play').on('click',function(){
    $(this).hide();
    player.play();
})

function onReachBottom(params, callFn) {
    if (!params.container || !params.content) {
        console.error('ȱʧ��Ҫ�Ĳ���');
        return;
    }

    var $container = params.container,
        $content = params.content,
        distance = params.distance || 30;

    $container.on('scroll', function() {
        var awayBtm = $content.height() - $container.scrollTop() - $container.height();
        if (awayBtm <= distance) {
            callFn && callFn()
        }
    });
}
/* ���ò��? */
onReachBottom({
    "container": $('.legion-list-box'),
    /* �������� */
    "content": $('.legion-ul'),
    /* ���ݶ��� */
    "distance": 100 /* �����¼����룬Ĭ��30px */
}, function() {
    /* ����ص�����? */
    getUserList.get();
});

/* ��Ŀ���� */
var getUserList = {
    /* �������� */
    isGet: true,
    /* ���� */
    rows: 20,
    /* ҳ�� */
    page: 1,
    /*��ȡ*/
    get: function() {
        if (!this.isGet) {
            return;
        }
        /* �ر����������������ε��� */
        this.isGet = false;

        /* ���� this ���� */
        var _self = this;

        $("#load-tip").html('���ڼ���');


        /* ģ������ */
        setTimeout(function() {
            var strHtml = '';
            // �����ҵľ���
            if ($('#legion-ul .legion-li').length === 0) {
                var myLegionRank = 477;
                strHtml += '<li class="legion-li legion-li-mine"> <div class="rank-num"> <p class="rank-label">����</p> <p class="rank-desc">'+ (myLegionRank) +'</p> </div> <div class="msg-box"> <div class="msg-item"> <div class="msg-label">����</div> <div class="msg-desc">��÷���?</div> </div> <div class="msg-item"> <div class="msg-label">���˼��?</div> <div class="msg-desc">�컨��</div> </div> <div class="msg-item"> <div class="msg-label">������</div> <div class="msg-desc">�컨�����?</div> </div>  <div class="msg-item"> <div class="msg-label">Ʊ��</div> <div class="msg-desc">5678Ʊ</div> </div></div></li>';
            }
            // ������������
            for (var i = 1; i <= _self.rows; i++) {
                switch (_self.rows * (_self.page - 1) + i){
                    case 1:
                        strHtml += '<li class="legion-li legion-li-first"> '
                        break;
                    case 2:
                        strHtml += '<li class="legion-li legion-li-second"> '
                        break;
                    case 3:
                        strHtml += '<li class="legion-li legion-li-third"> '
                        break;
                    default:
                        strHtml += '<li class="legion-li"> '
                }
                strHtml += '<div class="rank-num"> <p class="rank-label">����</p> <p class="rank-desc">'+ (_self.rows * (_self.page - 1) + i) +'</p> </div> <div class="msg-box"> <div class="msg-item"> <div class="msg-label">����</div> <div class="msg-desc">��÷���?</div> </div> <div class="msg-item"> <div class="msg-label">���˼��?</div> <div class="msg-desc">�컨��</div> </div> <div class="msg-item"> <div class="msg-label">������</div> <div class="msg-desc">�컨�����?</div> </div> <div class="msg-item"> <div class="msg-label">Ʊ��</div> <div class="msg-desc">5678Ʊ</div> </div></div></li>';
            }
            $("#legion-ul").append(strHtml);

            /* �������¼��� */
            $("#load-tip").html('�������ظ���');
            _self.isGet = true;
            _self.page++;
        }, 2000);
    }
};

/* ��ʼ��ģ������ */
getUserList.get();



// ������Ƶ
// fillNews.list({
//     gameID:73,
//     type:'iTag',
//     id:'5617',
//     newsType:'video',
//     pageSize:5,
//     source:'web_m',
//     tpl:`
//         <div class="swiper-slide">
//             <img src="{sCoverMap.One}" width="750" height="422" alt="">
//             <a class="btn-play" href="javascript:;" title="����" svid="{sVID}" stitle="{sTitle}" scontent="{sDesc}" onclick="openSubPage({sVID:'{sVID}',sDesc:'{sDesc}',sTitle:'{sTitle}'},'video'),PTTSendClick('btn','btn-play','����')"></a>
//         </div>
//     `,
//     wrap:'#videoSwiper',
//     callback:function(result){
//         // �����Ļص�
//         console.log(result);
//         swiperVideo();
//         // �����Ļص�
//         var vid=[];
//         for( var i=0;i<result.msg.result.length;i++){
//             vid.push(result.msg.result[i].sVID)
//         }
//         setTimeout(function(){initContent(vid)},100);
//     }
//   });

// ���������б�

fillNews.list({
	gameID:65,
	type:'iTag',
	newsType:'news',
    id:'114902,114903',
	// pager:{
	// 	wrap:'#pager',
	// 	type:'click', // laypage | click | scroll Ĭ����laypage��ҳ | ������ظ���? | �������ظ���
	// 	scrollDistance:0, // typeΪscrollʱ��wrapԪ�صĶ���������Ļ�ײ��Ĵ�������,Ĭ��Ϊ0,�˴�ʹ��500�Ǳ�����ʾ
	// 	// scrollContainer:window, // typeΪscrollʱ�򣬼���ĸ�Ԫ�ع�����Ĭ����window
	// },
	pageSize:10000, // ÿһҳ��������
	source:'client_circle_detail', //�����ϱ��õģ�������ҳ������pc�����ƶ�����gicp�����������ƶ�������web_m ��PC������ web_pc
    detailURL:'news', // ���ŵ�����ҳ�����ں������??newsid=XXX
	tpl: 
    '<a class="btn-txt" href="javascript:void(0)" title="����" onclick="openSubPage({iNewsId}),PTTSendClick(\'btn\',\'txt1\',\'����\')"><div class="img-box"><img src="{sCoverMap.One}" alt=""></div><div class="txt-box"><p class="titl">{sTitle}</p><p class="txt"  style="opacity:0" id="content-{iNewsId}"></p></div></a>'
    // function(json){
    //     console.log(json.iNewsId,this);
    //     if(json.iNewsId==='114902'){
    //       return '<a class="btn-txt" href="javascript:void(0)" title="����" onclick="openSubPage({iNewsId}),PTTSendClick(\'btn\',\'txt1\',\'����\')"><div class="img-box"><img src="{sCoverMap.One}" alt=""></div><div class="txt-box"><p class="titl">{sTitle}</p><p class="txt"  style="opacity:0" id="content-{iNewsId}"></p></div></a>'
    //     }
    //   }
      , // ģ���ַ�����
	wrap:'#txt-list', //����ȥ������
	callback:function(result){
        document.title='�����Ŷ�-��������-�ٷ���վ-��Ѷ��Ϸ';
        console.log(result)
		// �����Ļص�
        var dataNews=[];
        for( var i=0;i<result.msg.result.length;i++){
            console.log(result.msg.result[i].sCoverMap)
            dataNews.push(result.msg.result[i].iNewsId)
        }
        setTimeout(function(){initContent(dataNews)},100);
	}
});

// ����
var initContent = function(dataNews){
    dataNews.map(function(val){
        fillNews.detail({
            gameID: 65,
            id:val,
            type:'iTag',
            pageSize:10000, // ÿһҳ��������
            source:'client_circle_detail', 
            newsType:'news',
            wrap:'#content-'+val, // ģ�崦����������������
            tpl:'{sContent}', // ģ���ַ���
            relWrap:'.rel', // ����Ƽ�������?
            relTpl:'<p><a href="{url}"><img src="{sIMG}">{sTitle} {sCreated}</a></p>', // ����Ƽ���dom�ṹģ��
            callback:function(obj){
                setTimeout(function(){clearContentTags(val)},100);
                document.title='�����Ŷ�-��������-�ٷ���վ-��Ѷ��Ϸ';       
            }
          });
    })
}
var clearContentTags = function(val){
    var t = setInterval(function(){
        if(document.getElementById('content-'+val).innerText.length > 0){
            clearInterval(t);
            document.getElementById('content-'+val).innerHTML = document.getElementById('content-'+val).innerText
            $(document.getElementById('content-'+val)).css({opacity:'1'});
        }
    },30)
}

