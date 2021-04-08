var LoginManager = ulink.LoginManager;
LoginManager.init({
    loginType: 'qq',       // 指定登录态，wx为微信登录态，qq为QQ登录态
    qqLoginType: 'qc',     // 校验指定QQ登录方式防冲突，qc为QQ的互联登录，qq为QQ的PT登录
})
var gamePerson = {
    url: ulink.getQueryString("ulenv") === 'test' ? 'https://soccerStarCard.game.qq.com/index.php?' : 'https://ulink.game.qq.com/app/3388/050f10ecf9db6b08/index.php?',
    nickName: '',//用户昵称
    loginType: '',//登录状态
    bindingRoleState: 1,//角色绑定状态 0-已绑定，1-未绑定
    iActId: 4107,   //活动ID
    game: 'fo4',
    sAppId: 'ULINK-AKKJ-784060',    //腾讯优联APPID
    randomStar: '', //随机球员
    lostMyCard: '',//选择要丢弃的卡牌
    giveMyCard: '',//选择要赠送的卡牌
    giveCard: '',//选择受赠的球星卡，操作丢弃和放集卡包的操作
    alreadyGet:'',//是否有领取初次分享资格，1，可以，2，不可以
};
//隐藏注销按钮
if (ulink.isQQApp()) {
    $('#btn_logout').hide();
}

var options = {
    iActId: gamePerson.iActId, // 活动号
    title: '我在FIFA Online 4获得了专属球星卡，快来点击领取你的专属球星卡吧！', // 分享标题
    desc: '答题收集球星卡',  // 分享内容简介
    link: 'https://fo4.qq.com/act/4107/a20201102sjh/index.html',  // 分享链接
    imgUrl: 'https://game.gtimg.cn/images/ulink/act/4107/a20201102sjh/share.jpg', // 分享后朋友看到的图标，大小不能超过32K
    WXsuccess: function (res) { // wx成功、失败、或取消的回调
        if(gamePerson.alreadyGet == 1){
            $('#getStarPriza').removeClass('btn-getno');
            $('#getStarPriza').addClass('btn-get');
            //初次分享自动发放球员包
            $('.cont3 .btn-get').on('click',function(){
                loginAndBind();
                ulink.http.post({
                    url: gamePerson.url + 'route=Index/firstShare',
                    params: {game: gamePerson.game, iActId: gamePerson.iActId},
                    success: function (data) {
                        console.log(data);
                        $('#publicMsg').text(data.sMsg);
                        TGDialogS('alert');

                    },
                    error: function () {
                        $('#publicMsg').text('系统繁忙，请稍后再试！');
                        TGDialogS('alert');
                    }
                })
            })
        }
    },
};
ulink.share.init(options);

LoginManager.checkLogin(function (userInfo) {
    console.log("已登录");
    console.log("登录信息：", userInfo);
    gamePerson.loginType = userInfo.loginType;

    $('#unlogin').hide();
    $('#changeRole').show();
    $('#logined').show();

    //登录用户昵称
    gamePerson.nickName = ulink.xssFilter(userInfo.nickName);
    $('#login_qq_span').html(gamePerson.nickName);
    //查询绑定角色
    init();
}, function () {
    console.log("未登录");
    if (ulink.isQQApp()) {
        LoginManager.login();
    }
});

//查询绑定角色
function init() {
    ulink.http.get({
        url: gamePerson.url + 'route=Index/init',
        params: {game: gamePerson.game, iActId: gamePerson.iActId},
        success: function (data) {
            console.log('角色信息', data);
            if (data.iRet === 0) {
                gamePerson.nickName = ulink.xssFilter(decodeURIComponent(data.jData.roleName));
                $('#login_qq_span').html(gamePerson.nickName);
                //已绑定
                gamePerson.bindingRoleState = 0;
                //是否有领取初次分享资格，1，可以，2，不可以
                gamePerson.alreadyGet = data.jData.alreadyGet;
                if(gamePerson.alreadyGet == 2){
                    $('#getStarPriza').removeClass('btn-getno');
                    $('#getStarPriza').removeClass('btn-get');
                    $('#getStarPriza').addClass('btn-got');
                }
                //球队数组
                var clubObj = data.jData.club;
                var clubOption = '';
                for (var i in clubObj) {
                    clubOption += "<option value=" + i + ">" + clubObj[i] + "</option>";
                }
                $('#club').append(clubOption);
            } else if (data.iRet === 1102) {
                $('#changeRole').text('【绑定角色】');
                //绑定角色
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');

            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('系统繁忙，请稍后再试！');
            TGDialogS('alert');
        }

    });
}

//角色绑定和换绑定
$('#changeRole').on('click', function () {
    if (gamePerson.loginType == '') {
        ulink.alert('请登录！！！');
        return false;
    }
    ulink.http.get({
        url: gamePerson.url + 'route=Index/getUserCode',
        params: {game: gamePerson.game, iActId: gamePerson.iActId},
        success: function (data) {
            console.log(data);
            //返回用于角色选择器的登录信息、签名、时间戳
            if (data.iRet == 0) {
                var options = {
                    "sAppId": gamePerson.sAppId,  //腾讯优联APPID
                    "iActId": gamePerson.iActId,   //活动ID
                    "sSign": data.jData.data.sSign,  //签名
                    "acctype": 'qq',
                    "game": gamePerson.game,  //游戏id
                    "timestamp": data.jData.data.timestamp, //时间戳
                    "sCode": encodeURIComponent(data.jData.data.sCode),  //第三方渠道加密串
                    "zoom": 1,
                };
                var roleselector = new ulink.RoleSelector(options);
                roleselector.show();

                /*
                * 获取角色返回信息
               */
                roleselector.on("getRoleData", function (data) {
                    console.log("getRoleData->", data);
                    ulink.http.get({
                        url: gamePerson.url + 'route=Index/rebindRole',
                        params: {
                            game: gamePerson.game,
                            iActId: gamePerson.iActId,
                            area: data.area,
                            roleId: data.roleId,
                            roleName: data.roleName
                        },
                        success: function (data) {
                            console.log('角色绑定返回', data);
                            if (data.iRet == 0) {
                                gamePerson.bindingRoleState = 0;
                                gamePerson.nickName = ulink.xssFilter(decodeURIComponent(data['jData']['roleName']));
                                $('#login_qq_span').html(gamePerson.nickName);
                                $('#changeRole').text('【更改绑定】');
                                init();
                                ulink.toast('绑定成功！');
                            } else {
                                $('#publicMsg').text(data.sMsg);
                                TGDialogS('alert');
                            }
                        },
                        error: function () {
                            $('#publicMsg').text('系统繁忙,请稍后再试！');
                            TGDialogS('alert');
                        }
                    })
                })
            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('系统繁忙,请稍后再试！');
            TGDialogS('alert');
        }
    })
});

//封装便于各方法前端校验登录态和绑定;
function loginAndBind() {
    //登录
    if (gamePerson.loginType === '') {
        $('#publicMsg').text('请先登录');
        TGDialogS('alert');
        return false;
    }
    //绑定角色
    if (gamePerson.bindingRoleState === 1) {
        $('#publicMsg').text('您未绑定区服角色');
        TGDialogS('alert');
        return false;
    }
}

//选择球队
$('#club').on('change',function(){
    loginAndBind();
    var chooseClub = $(this).val();
    //将图覆盖
    $('.chip .mc').css({'background-size': '100%'});
    $('.chip .draw').removeClass('draw');
    ulink.http.post({
        url: gamePerson.url + 'route=Index/chooseClub',
        params: {game: gamePerson.game, iActId: gamePerson.iActId, chooseClub: chooseClub},
        success: function (data) {
            console.log('chooseClub', data);
            if (data.iRet === 0) {
                //对应的球员
                var html = '';
                var clubType = data.jData.clubType;
                for (var i in data.jData.starArr) {
                    html += "<p data-answerStar=" + clubType + i + "><span>" + data.jData.starArr[i] + "</span><i>ANSWER " + i + "</i></span></p>";
                }
                $('#clubStar').html(html);
                $('#clubStar p').click(function () {
                    var answerStar = $(this).attr('data-answerStar');
                    //答案高亮样式
                    $(this).addClass('on');
                    $(this).siblings('p').removeClass('on');
                    guessStar(answerStar);
                });
                //拼图随机球员
                gamePerson.randomStar = data.jData.randomStar;
                $('.chip').children('img').attr("src", "//game.gtimg.cn/images/ulink/act/4107/a20201102sjh/team-star" + gamePerson.randomStar + ".jpg");
                //翻卡牌，最多三张
                $('.chip ul li').on('click', function () {
                    var drawNum = $('.chip .draw').length;
                    if (drawNum >= 3) {
                        ulink.toast('只能翻开三张牌！');
                        return false;
                    }
                    $(this).children('.mc').css({'background-size': '0px'});
                    $(this).children('.mc').addClass('draw');
                })

            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('系统繁忙，请稍后再试！');
            TGDialogS('alert');
        }
    })
});

//球员作答
function guessStar(answerStar) {
    loginAndBind();
    if (gamePerson.randomStar === '') {
        $('#publicMsg').text('请重选球队');
        TGDialogS('alert');
        return false;
    }
    if (gamePerson.randomStar !== answerStar) {
        TGDialogS('dia5');
        gamePerson.randomStar = '';
        return false;
    }
    //
    ulink.http.post({
        url: gamePerson.url + 'route=Index/guessStar',
        params: {game: gamePerson.game, iActId: gamePerson.iActId, answerStar: answerStar},
        success: function (data) {
            console.log(data);
            if (data.iRet === 0) {
                //1普通卡，2金卡
                var collectCard = answerStar + data.jData;
                //集卡属性
                $('#collectCard').attr('collectCard', collectCard);
                $('#dia1').children('.dia-con').children('img').attr("src", "//game.gtimg.cn/images/ulink/act/4107/a20201102sjh/star-card-" + collectCard + ".png");
                gamePerson.randomStar = '';
                TGDialogS('dia1');
                //答错编码，，弹框不同，需要置空全局变量randomStar
            } else if (data.iRet === 6005) {
                gamePerson.randomStar = '';
                TGDialogS('dia5');
            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('系统繁忙，请稍后再试！');
            TGDialogS('alert');
        }
    })
}

//放入集卡册
$('#collectCard').on('click', function () {
    loginAndBind();
    var collectCard = $(this).attr('collectCard');
    ulink.http.post({
        url: gamePerson.url + 'route=Index/collectCard',
        params: {game: gamePerson.game, iActId: gamePerson.iActId, collectCard: collectCard},
        success: function (data) {
            console.log(data);
            if (data.iRet === 0) {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');

            } else if (data.iRet === 1604) {
                //该状态下，集卡册满，弹出整理弹框
                $('#TS').attr('TSStarCard', collectCard);
                TGDialogS('dia6');
            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('系统繁忙，请稍后再试！');
            TGDialogS('alert');
        }
    })
})

//暂存
$("#TS").on('click', function () {
    loginAndBind();
    var TSStarCard = $(this).attr('TSStarCard');

    ulink.http.post({
        url: gamePerson.url + 'route=Index/TSStarCard',
        params: {
            game: gamePerson.game,
            iActId: gamePerson.iActId,
            TSStarCard: TSStarCard,
        },
        success: function (data) {
            console.log(data);
            if (data.iRet === 0) {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('系统繁忙，请稍后再试！');
            TGDialogS('alert');
        }
    })
})

//管理我的球星卡
function manageMyCard() {
    loginAndBind();
    ulink.http.post({
        url: gamePerson.url + 'route=Index/manageMyCard',
        params: {game: gamePerson.game, iActId: gamePerson.iActId},
        success: function (data) {
            console.log('manageMyCard', data);
            if (data.iRet === 0) {
                var myCardList = data.jData;
                if (myCardList.length !== 0) {
                    //隐藏没卡时候的文字
                    $('#dia2 .dia-txt').hide();
                    $('#dia3 .dia-txt').hide();
                    var cardLi = '';
                    var shareStarCard = '';
                    for (var i in myCardList) {
                        cardLi += "<li data-card='" + myCardList[i]['starCard'] + myCardList[i]['cardType'] + "'><img src='//game.gtimg.cn/images/ulink/act/4107/a20201102sjh/star-card-" + myCardList[i]['starCard'] + myCardList[i]['cardType'] + ".png'></li>";
                        shareStarCard += "<img src='//game.gtimg.cn/images/ulink/act/4107/a20201102sjh/star-card-" + myCardList[i]['starCard'] + myCardList[i]['cardType'] + ".png' class='card" + (i * 1 + 1) + "' alt=''>";
                    }
                    $('#MyCard').html(cardLi);
                    $('#MyCard1').html(cardLi);
                    $('#shareCard').html(shareStarCard);//分享

                    //选中要丢弃的牌
                    $('#MyCard li').click(function () {
                        $('#MyCard li').removeClass('on');
                        $(this).addClass('on');
                        //获取选中的传参
                        var lostMyCardAttr = $(this).attr('data-card');
                        gamePerson.lostMyCard = lostMyCardAttr;

                    });
                    //选择要赠送的牌
                    $('#MyCard1 li').click(function () {
                        $('#MyCard1 li').removeClass('on');
                        $(this).addClass('on');
                        //获取选中的传参
                        var giveMyCardAttr = $(this).attr('data-card');
                        gamePerson.giveMyCard = giveMyCardAttr;
                    });

                }else{
                    $('#dia2 .dia-txt').show();
                    $('#dia3 .dia-txt').show();
                    $('#MyCard').html('');
                    $('#MyCard1').html('');
                    $('#shareCard').html('');//分享

                }
                TGDialogS('dia2');

            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('系统繁忙，请稍后再试！');
            TGDialogS('alert');
        }
    })
}

//管理赠送我的球星卡
function manageGiveCard() {
    loginAndBind();
    ulink.http.post({
        url: gamePerson.url + 'route=Index/manageGiveCard',
        params: {game: gamePerson.game, iActId: gamePerson.iActId},
        success: function (data) {
            console.log('manageGiveCard', data);
            if (data.iRet === 0) {
                var giveCardList = data.jData.data;
                var rows = parseInt(data.jData.rows);
                if (rows === 1) {
                    $('#giveCard').addClass('one');
                    $('#giveCard').removeClass('two');
                    $('#giveCard').removeClass('three');
                } else if (rows === 2) {
                    $('#giveCard').addClass('two');
                    $('#giveCard').removeClass('one');
                    $('#giveCard').removeClass('three');
                } else {
                    $('#giveCard').addClass('three');
                    $('#giveCard').removeClass('one');
                    $('#giveCard').removeClass('two');
                }
                // dia4
                if ($('.dia4 ul').hasClass('one')) {
                    $('.dia4').css({'width': '4.2rem'});
                    $('.dia4 .btn-box').css({'margin': '0 0 0 -.13rem'})
                } else if ($('.dia4 ul').hasClass('two')) {
                    $('.dia4').css({'width': '5.94rem'});
                    $('.dia4 .btn-box').css({'margin': '0 auto'})
                } else if ($('.dia4 ul').hasClass('three')) {
                    $('.dia4').css({'width': '6.93rem'});
                    $('.dia4 .btn-box').css({'margin': '0 auto'})
                }
                if (giveCardList != '') {
                    //隐藏没卡时候的文字提示
                    $('#dia4 .dia-txt').hide();
                    var cardLi = '';
                    for (var i in giveCardList) {
                        cardLi += "<li data-card='" + giveCardList[i]['cardType'] + giveCardList[i]['starCard'] + giveCardList[i]['openid'] + "'><img src='//game.gtimg.cn/images/ulink/act/4107/a20201102sjh/star-card-" + giveCardList[i]['starCard'] + giveCardList[i]['cardType'] + ".png'></li>";
                    }
                    $('#giveCard').html(cardLi);
                    //选中要丢弃的牌
                    $('#giveCard li').click(function () {
                        $('#giveCard li').removeClass('on');
                        $(this).addClass('on');
                        //获取选中的传参
                        var giveCardAttr = $(this).attr('data-card');
                        gamePerson.giveCard = giveCardAttr;
                    });

                }
                TGDialogS('dia4');

            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('系统繁忙，请稍后再试！');
            TGDialogS('alert');
        }
    })
}

//丢弃自己的卡
$("#lostMyCard").on('click', function () {
    loginAndBind();
    if (gamePerson.lostMyCard === '') {
        $('#publicMsg').text('请先选择球员卡');
        TGDialogS('alert');
        return false;
    }
    ulink.http.post({
        url: gamePerson.url + 'route=Index/lostMyCard',
        params: {game: gamePerson.game, iActId: gamePerson.iActId, lostMyCard: gamePerson.lostMyCard},
        success: function (data) {
            console.log(data);
            if (data.iRet === 0) {
                manageMyCard();
            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('系统繁忙，请稍后再试！');
            TGDialogS('alert');
        }
    })
})

//赠送好友卡牌
$("#giveMyCard").on('click', function () {
    loginAndBind();
    if (gamePerson.giveMyCard === '') {
        $('#publicMsg').text('请先选择球员卡');
        TGDialogS('alert');
        return false;
    }
    var qqNumber = $('#qqNumber').val();
    if (!/^[1-9]\d{4,9}$/.test(qqNumber)) {
        $('#publicMsg').text('请输入正确的QQ号');
        TGDialogS('alert');
        return false;
    }

    ulink.http.post({
        url: gamePerson.url + 'route=Index/giveMyCard',
        params: {
            game: gamePerson.game,
            iActId: gamePerson.iActId,
            giveMyCard: gamePerson.giveMyCard,
            qqNumber: qqNumber
        },
        success: function (data) {
            console.log(data);
            if (data.iRet === 0) {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('系统繁忙，请稍后再试！');
            TGDialogS('alert');
        }
    })
})

//丢弃受赠的球星卡
$("#lostGiveCard").on('click', function () {
    loginAndBind();
    if (gamePerson.giveCard === '') {
        $('#publicMsg').text('请先选择球员卡');
        TGDialogS('alert');
        return false;
    }
    ulink.http.post({
        url: gamePerson.url + 'route=Index/lostGiveCard',
        params: {game: gamePerson.game, iActId: gamePerson.iActId, lostGiveCard: gamePerson.giveCard},
        success: function (data) {
            console.log(data);
            if (data.iRet === 0) {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('系统繁忙，请稍后再试！');
            TGDialogS('alert');
        }
    })
})

//将受赠的球星卡放入自己的集卡册
$('#collectGiveCard').on('click', function () {
    loginAndBind();
    if (gamePerson.giveCard === '') {
        $('#publicMsg').text('请先选择球员卡');
        TGDialogS('alert');
        return false;
    }
    ulink.http.post({
        url: gamePerson.url + 'route=Index/collectGiveCard',
        params: {game: gamePerson.game, iActId: gamePerson.iActId, collectGiveCard: gamePerson.giveCard},
        success: function (data) {
            console.log(data);
            if (data.iRet === 0) {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');

            } else if (data.iRet === 2104) {
                //隐藏暂存按钮
                $('#TS').hide();
                //该状态下，集卡册满，弹出整理弹框
                TGDialogS('dia6');
            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('系统繁忙，请稍后再试！');
            TGDialogS('alert');
        }
    })
})



//登录
$("#btn_qqlogin").on('click', function () {
    LoginManager.login();
    // LoginManager.openLink();
    // LoginManager.loginByPT();
});

//注销
$('#btn_logout').on('click', function () {
    LoginManager.logout(function () {
        window.location.reload();
    })
});

$('body').on('click','#yd',function(){

    closeDialog();
})

$('#getStarPriza').on('click',function(){
    if($(this).hasClass('btn-getno')){
        TGDialogS('yd');
    }
})



