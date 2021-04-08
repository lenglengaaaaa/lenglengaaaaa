// 竞猜页面切换
$('.content-tab').on('click', function () {
    var idx = $(this).index();
    if (idx == 1) {
        OUT.user.listWithBet()
    } else if (idx == 2) {
        OUT.user.getLotteryStatus();
    } else if (idx == 3) {
        OUT.user.getWishData();
    } else if (idx == 4) {
        $('.shop-top .item').eq(1).find('p').text(OUT.user.coinNum);
    }
    $(this).addClass('on').siblings('.content-tab').removeClass('on');
    $('.page-box').eq((idx - 1)).show().siblings('.page-box').hide();
})


// 绑定副页面按钮
$('.btn-back').on('click', function () {
    closeSubPage();
});
$('.btn-match-more').on('click', function () {
    openSubPage('moreplay');
});
$('.btn-match-record').on('click', function () {
    openSubPage('guessrecord');
});
$('.btn-exrecord').on('click', function () {
    //openSubPage('exrecord');
});


$('.btn-sub-vote').on('click', function () {
    if ($(this).hasClass('no')) {
        return;
    }
    var key = $('#morePlayUl').attr('data-key');
    showPoulPop(key, parseInt($(this).attr('data-type')), parseInt($(this).attr('data-option')));
});

$('#sel6').on('change', function () {
    var idx = $(this).val();
    OUT.user.selectArea = idx;
    OUT.user.listWithBet();
});

$('#sel7').on('change', function () {
    var idx = $(this).val();
    OUT.user.selectMatchGroup = idx;
    OUT.user.changeSelect();
    var eTop = getElTop("betMatchList_" + OUT.user.selectMatchGroup);
    goHeight(eTop);
});

$('#sel8').on('change', function () {
    var idx = $(this).val();
    OUT.user.weekNo = idx;
    OUT.user.listWithBet();
});


$('.day-cont .result-list').on('click', function () {
    var attr = $(this).find('span').eq(0).attr('data-taskId');
    if (OUT.user.taskQual[attr] != 1) {
        return;
    }
    OUT.user.prize(attr);
});

// 打开副页面
function openSubPage(n) {
    $('html, body').css({'overflow': 'hidden'});
    $('.sub-page').css({'display': 'none'});
    $('.sub-page-' + n).css({'display': ''})
    $('.sub-wrapper').addClass('open');
}

function closeSubPage() {
    $('html, body').css({'overflow': ''});
    $('.sub-wrapper').removeClass('open');
}

// 转盘抽奖选择
$('.lott-btns a').on('click', function () {
    // var idx=(this).parent().index();
    $(this).parent().addClass('on').siblings('li').removeClass('on')

})

// 转盘初始化
// 第一个参数是奖品的个数
// 第二个是用来旋转的圆盘（指针不动）
var panel=new PanelLotery({
    length:8,
    el:'#lotterycontent'
  });
  
  $('.btn-betting').on('click', function(event) {
    event.preventDefault();
    if(panel.playing) return;
    // 演示用，随机转到奖品n
    // 初始的指针右侧开始
    // 顺时针方向开始算
    // 第一个奖品是n=0
    var n=Math.floor(Math.random()*8);
    console.log(n);
    panel.playto(n,function(){
        alert(n);
    });
  });

$('.bet-left input').on('click', function () {
    $('.bet-body span').removeClass('on');
})
$('.bet-body span').on('click', function () {
    $(this).addClass('on').siblings().removeClass('on');
})

$('.btn-dialog-day-act').on('click', function () {
    $(this).addClass('on').siblings('a').removeClass('on');
    $('.act-cont').hide();
    $('.day-cont').show();
    OUT.user.switchPrizeTip();
})
$('.btn-dialog-bet-end').on('click', function () {
    $(this).addClass('on').siblings('a').removeClass('on');
    $('.act-cont').show();
    $('.day-cont').hide();
    OUT.user.switchPrizeTip();
})

$('.wish-tab a').on('click', function () {
    $(this).addClass('on').siblings().removeClass('on');
    if ($('.btn-dialog-wish').hasClass('on')) {
        $('.wish-tab').removeClass('change');
        $('.wish-cont').show();
        $('.wish-cont2').hide();
    } else {
        $('.wish-tab').addClass('change');
        $('.wish-cont').hide();
        $('.wish-cont2').show();
    }
});

// 我的总票数
var myVoteNumber = 230;

// 投票拖拽条事件
$('#range-vote-input').on('input change', function () {
    $('#number-vote-input').val($(this).val() === '0' ? null : Math.round($(this).val() / 100 * myVoteNumber));
    setRangeNumberTip($(this).val());

});

// 投票数输入事件
$('#number-vote-input').on('input change', function () {
    var rangeNumber = Math.round((($(this).val() > myVoteNumber) ? myVoteNumber : $(this).val()) / myVoteNumber * 100);
    $('#range-vote-input').val(rangeNumber);
    setRangeNumberTip(rangeNumber, $(this).val());
});
$('#number-vote-input').on('blur', function () {

    if (!$(this).val()) {
        $(this).val(0);
    } else if ($(this).val() > myVoteNumber) {
        $(this).val(myVoteNumber);
    } else if ($(this).val() < 0) {
        $(this).val(0)
    } else {
        $(this).val(parseInt($(this).val()));
    }
    $('.choice-num span').text(parseInt($(this).val()));
    $('.range-number-tip p').text(parseInt($(this).val()));
});

// 点击修改票数
$('.btn-range-minus').on('click', function () {
    var curr = parseInt($('#range-vote-input').val());
    var aim = (curr - 10 < 0) ? 0 : curr - 10;
    $('#range-vote-input').val(aim);
    setRangeNumberTip(aim);
    $('#number-vote-input').val(Math.round(aim / 100 * myVoteNumber));
});
$('.btn-range-plus').on('click', function () {
    var curr = parseInt($('#range-vote-input').val());
    var aim = (curr + 10 > 100) ? 100 : curr + 10;
    $('#range-vote-input').val(aim);
    setRangeNumberTip(aim);
    $('#number-vote-input').val(Math.round(aim / 100 * myVoteNumber));
});

// 修改投票上标位置 + 进度条
function setRangeNumberTip(n, n2) {
    n = n < 0 ? 0 : n;
    $('.range-number-tip').css({'left': (((410 * n / 100) - 5) / 100) + 'rem'});
    $('.range-inner').css({'width': n + '%'});
    if (!n2) {
        $('.choice-num span').text(Math.round(n / 100 * myVoteNumber));
        $('.range-number-tip p').text(Math.round(n / 100 * myVoteNumber));
    } else {
        $('.choice-num span').text(n2);
        $('.range-number-tip p').text(n2);
    }
}