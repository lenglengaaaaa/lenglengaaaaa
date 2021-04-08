// 赛程页面切换
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

// 入围赛，淘汰赛，对局详情页面切换
$('.schedule-nav-list').on('click',function(){
    var idx=$(this).index();
    if(idx == 1){
        showTips('暂未开放');
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





// 绑定副页面按钮
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

// 打开副页面
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



// 页面刷新时更新swiper
function swiperVideo(){
    // 视讯轮播图
    var mySwiper = new Swiper('.swiper-container', {
        loop:true,
        observer:true,
        observeParents:true,//swiper父元素变化时更新
        observeSlideChildren:true,//swiper子元素变化时更新
        // preventClicks : false,//默认true
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
		alert('敬请期待');
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
        console.error('缺失必要的参数');
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
/* 调用插件 */
onReachBottom({
    "container": $('.legion-list-box'),
    /* 容器对象 */
    "content": $('.legion-ul'),
    /* 内容对象 */
    "distance": 100 /* 触发事件距离，默认30px */
}, function() {
    /* 插件回调函数 */
    getUserList.get();
});

/* 项目方法 */
var getUserList = {
    /* 允许请求 */
    isGet: true,
    /* 条数 */
    rows: 20,
    /* 页码 */
    page: 1,
    /*获取*/
    get: function() {
        if (!this.isGet) {
            return;
        }
        /* 关闭请求条件，避免多次调用 */
        this.isGet = false;

        /* 缓存 this 对象 */
        var _self = this;

        $("#load-tip").html('正在加载');


        /* 模拟请求 */
        setTimeout(function() {
            var strHtml = '';
            // 添加我的军团
            if ($('#legion-ul .legion-li').length === 0) {
                var myLegionRank = 477;
                strHtml += '<li class="legion-li legion-li-mine"> <div class="rank-num"> <p class="rank-label">排名</p> <p class="rank-desc">'+ (myLegionRank) +'</p> </div> <div class="msg-box"> <div class="msg-item"> <div class="msg-label">区服</div> <div class="msg-desc">青梅煮酒</div> </div> <div class="msg-item"> <div class="msg-label">联盟简称</div> <div class="msg-desc">红花会</div> </div> <div class="msg-item"> <div class="msg-label">军团名</div> <div class="msg-desc">红花会军团</div> </div>  <div class="msg-item"> <div class="msg-label">票数</div> <div class="msg-desc">5678票</div> </div></div></li>';
            }
            // 添加其他军团
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
                strHtml += '<div class="rank-num"> <p class="rank-label">排名</p> <p class="rank-desc">'+ (_self.rows * (_self.page - 1) + i) +'</p> </div> <div class="msg-box"> <div class="msg-item"> <div class="msg-label">区服</div> <div class="msg-desc">青梅煮酒</div> </div> <div class="msg-item"> <div class="msg-label">联盟简称</div> <div class="msg-desc">红花会</div> </div> <div class="msg-item"> <div class="msg-label">军团名</div> <div class="msg-desc">红花会军团</div> </div> <div class="msg-item"> <div class="msg-label">票数</div> <div class="msg-desc">5678票</div> </div></div></li>';
            }
            $("#legion-ul").append(strHtml);

            /* 允许重新加载 */
            $("#load-tip").html('上拉加载更多');
            _self.isGet = true;
            _self.page++;
        }, 2000);
    }
};

/* 初始化模拟数据 */
// getUserList.get();



