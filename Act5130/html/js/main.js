// ����ҳ���л�
$('.content-tab').on('click',function(){
    var idx=$(this).index();
    // if(idx==1){
    //     $('.content-tabs .login-box').hide();
    // }else{
    //     $('.content-tabs .login-box').show();
    // }
    if(idx == 1 && OUT.login.isLogin === false){
        return OUT.login.doLogin();
    }
    if(idx == 1){
        OUT.user.getGroupList();
        $('.schedule-nav-list').eq(0).addClass('on').siblings('.schedule-nav-list').removeClass('on');
        $('.integral-content').eq(0).show().siblings('.integral-content').hide();
    }
    $(this).addClass('on').siblings('.content-tab').removeClass('on');
    $('.cont-box').eq((idx-1)).show().siblings('.cont-box').hide();
    swiperVideo();
});

// ��Χ������̭�����Ծ�����ҳ���л�
$('.schedule-nav-list').on('click',function(){
    var idx=$(this).index();
    if(idx == 1){
        showTips('��δ����');
        return;
    }else if(idx == 2){
        OUT.user.getByWeekMG();
    }else if(idx == 0){
        OUT.user.getGroupList();
    }
    $(this).addClass('on').siblings('.schedule-nav-list').removeClass('on');
    $('.integral-content').eq((idx)).show().siblings('.integral-content').hide();
});

$('#sel1').on('change', function () {
    var idx = $(this).val();
    OUT.user.selectArea = idx;
    OUT.user.getGroupList();
});

$('#sel2').on('change', function () {
    var idx = $(this).val();
    OUT.user.selectMatchGroup = idx;
    OUT.user.getGroupList();
});

$('#sel3').on('change', function () {
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
    OUT.user.getByWeekMG();
});


$('#sel6').on('change', function () {
    var idx = $(this).val();
    OUT.user.selectArea = idx;
});

$('#sel7').on('change', function () {
    var idx = $(this).val();
    OUT.user.selectMatchGroup = idx;
});

$('#sel8').on('change', function () {
    var idx = $(this).val();
    OUT.user.weekNo = idx;
});





// �󶨸�ҳ�水ť
$('.btn-back').on('click', function() {
    closeSubPage();
});
// $('.legion-table li a').on('click', function() {
//     openSubPage('matchlist');
// });
$('.cont-box3 .swiper-slide').on('click', function() {
    openSubPage('video');
    swiperVideo();
});
$('.btn-txt   ').on('click', function() {
    openSubPage('img');
});

$('.btn-exrecord').on('click', function() {
    openSubPage('exrecord');
});

// �򿪸�ҳ��
function openSubPage(n) {
    $('html, body').css({ 'overflow': 'hidden' });
    $('.sub-page').css({ 'display': 'none' });
    $('.sub-page-'+n).css({ 'display': '' })
    $('.sub-wrapper').addClass('open');
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
        loop:true,
        observer:true,
        observeParents:true,//swiper��Ԫ�ر仯ʱ����
        observeSlideChildren:true,//swiper��Ԫ�ر仯ʱ����
        // preventClicks : false,//Ĭ��true
        // preventClicksPropagation : false,
        autoplay: {
            delay:3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
        },
    })
}

$('.sub-page-video .btn-play').on('click', function () {
	var vid = '';
	if (!vid) {
		alert('�����ڴ�');
		return;
	} else {
		$(this).hide();
		var player = new Txplayer({
			containerId: "video-container", //id
			vid: vid,
			width: '100%',
			height: '100%',
			autoplay: true,
			poster:'',
		});
	}
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
/* ���ò�� */
onReachBottom({
    "container": $('.legion-list-box'),
    /* �������� */
    "content": $('.legion-ul'),
    /* ���ݶ��� */
    "distance": 100 /* �����¼����룬Ĭ��30px */
}, function() {
    /* ����ص����� */
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
            // ����ҵľ���
            if ($('#legion-ul .legion-li').length === 0) {
                var myLegionRank = 477;
                strHtml += '<li class="legion-li legion-li-mine"> <div class="rank-num"> <p class="rank-label">����</p> <p class="rank-desc">'+ (myLegionRank) +'</p> </div> <div class="msg-box"> <div class="msg-item"> <div class="msg-label">����</div> <div class="msg-desc">��÷���</div> </div> <div class="msg-item"> <div class="msg-label">���˼��</div> <div class="msg-desc">�컨��</div> </div> <div class="msg-item"> <div class="msg-label">������</div> <div class="msg-desc">�컨�����</div> </div>  <div class="msg-item"> <div class="msg-label">Ʊ��</div> <div class="msg-desc">5678Ʊ</div> </div></div></li>';
            }
            // �����������
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
                strHtml += '<div class="rank-num"> <p class="rank-label">����</p> <p class="rank-desc">'+ (_self.rows * (_self.page - 1) + i) +'</p> </div> <div class="msg-box"> <div class="msg-item"> <div class="msg-label">����</div> <div class="msg-desc">��÷���</div> </div> <div class="msg-item"> <div class="msg-label">���˼��</div> <div class="msg-desc">�컨��</div> </div> <div class="msg-item"> <div class="msg-label">������</div> <div class="msg-desc">�컨�����</div> </div> <div class="msg-item"> <div class="msg-label">Ʊ��</div> <div class="msg-desc">5678Ʊ</div> </div></div></li>';
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
// getUserList.get();



