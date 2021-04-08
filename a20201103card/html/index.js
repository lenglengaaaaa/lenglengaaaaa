var LoginManager = ulink.LoginManager;
LoginManager.init({
    loginType: 'qq',       // ָ����¼̬��wxΪ΢�ŵ�¼̬��qqΪQQ��¼̬
    qqLoginType: 'qc',     // У��ָ��QQ��¼��ʽ����ͻ��qcΪQQ�Ļ�����¼��qqΪQQ��PT��¼
})
var gamePerson = {
    url: ulink.getQueryString("ulenv") === 'test' ? 'https://soccerStarCard.game.qq.com/index.php?' : 'https://ulink.game.qq.com/app/3388/050f10ecf9db6b08/index.php?',
    nickName: '',//�û��ǳ�
    loginType: '',//��¼״̬
    bindingRoleState: 1,//��ɫ��״̬ 0-�Ѱ󶨣�1-δ��
    iActId: 4107,   //�ID
    game: 'fo4',
    sAppId: 'ULINK-AKKJ-784060',    //��Ѷ����APPID
    randomStar: '', //�����Ա
    lostMyCard: '',//ѡ��Ҫ�����Ŀ���
    giveMyCard: '',//ѡ��Ҫ���͵Ŀ���
    giveCard: '',//ѡ�����������ǿ������������ͷż������Ĳ���
    alreadyGet:'',//�Ƿ�����ȡ���η����ʸ�1�����ԣ�2��������
};
//����ע����ť
if (ulink.isQQApp()) {
    $('#btn_logout').hide();
}

var options = {
    iActId: gamePerson.iActId, // ���
    title: '����FIFA Online 4�����ר�����ǿ������������ȡ���ר�����ǿ��ɣ�', // �������
    desc: '�����ռ����ǿ�',  // �������ݼ��
    link: 'https://fo4.qq.com/act/4107/a20201102sjh/index.html',  // ��������
    imgUrl: 'https://game.gtimg.cn/images/ulink/act/4107/a20201102sjh/share.jpg', // ��������ѿ�����ͼ�꣬��С���ܳ���32K
    WXsuccess: function (res) { // wx�ɹ���ʧ�ܡ���ȡ���Ļص�
        if(gamePerson.alreadyGet == 1){
            $('#getStarPriza').removeClass('btn-getno');
            $('#getStarPriza').addClass('btn-get');
            //���η����Զ�������Ա��
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
                        $('#publicMsg').text('ϵͳ��æ�����Ժ����ԣ�');
                        TGDialogS('alert');
                    }
                })
            })
        }
    },
};
ulink.share.init(options);

LoginManager.checkLogin(function (userInfo) {
    console.log("�ѵ�¼");
    console.log("��¼��Ϣ��", userInfo);
    gamePerson.loginType = userInfo.loginType;

    $('#unlogin').hide();
    $('#changeRole').show();
    $('#logined').show();

    //��¼�û��ǳ�
    gamePerson.nickName = ulink.xssFilter(userInfo.nickName);
    $('#login_qq_span').html(gamePerson.nickName);
    //��ѯ�󶨽�ɫ
    init();
}, function () {
    console.log("δ��¼");
    if (ulink.isQQApp()) {
        LoginManager.login();
    }
});

//��ѯ�󶨽�ɫ
function init() {
    ulink.http.get({
        url: gamePerson.url + 'route=Index/init',
        params: {game: gamePerson.game, iActId: gamePerson.iActId},
        success: function (data) {
            console.log('��ɫ��Ϣ', data);
            if (data.iRet === 0) {
                gamePerson.nickName = ulink.xssFilter(decodeURIComponent(data.jData.roleName));
                $('#login_qq_span').html(gamePerson.nickName);
                //�Ѱ�
                gamePerson.bindingRoleState = 0;
                //�Ƿ�����ȡ���η����ʸ�1�����ԣ�2��������
                gamePerson.alreadyGet = data.jData.alreadyGet;
                if(gamePerson.alreadyGet == 2){
                    $('#getStarPriza').removeClass('btn-getno');
                    $('#getStarPriza').removeClass('btn-get');
                    $('#getStarPriza').addClass('btn-got');
                }
                //�������
                var clubObj = data.jData.club;
                var clubOption = '';
                for (var i in clubObj) {
                    clubOption += "<option value=" + i + ">" + clubObj[i] + "</option>";
                }
                $('#club').append(clubOption);
            } else if (data.iRet === 1102) {
                $('#changeRole').text('���󶨽�ɫ��');
                //�󶨽�ɫ
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');

            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('ϵͳ��æ�����Ժ����ԣ�');
            TGDialogS('alert');
        }

    });
}

//��ɫ�󶨺ͻ���
$('#changeRole').on('click', function () {
    if (gamePerson.loginType == '') {
        ulink.alert('���¼������');
        return false;
    }
    ulink.http.get({
        url: gamePerson.url + 'route=Index/getUserCode',
        params: {game: gamePerson.game, iActId: gamePerson.iActId},
        success: function (data) {
            console.log(data);
            //�������ڽ�ɫѡ�����ĵ�¼��Ϣ��ǩ����ʱ���
            if (data.iRet == 0) {
                var options = {
                    "sAppId": gamePerson.sAppId,  //��Ѷ����APPID
                    "iActId": gamePerson.iActId,   //�ID
                    "sSign": data.jData.data.sSign,  //ǩ��
                    "acctype": 'qq',
                    "game": gamePerson.game,  //��Ϸid
                    "timestamp": data.jData.data.timestamp, //ʱ���
                    "sCode": encodeURIComponent(data.jData.data.sCode),  //�������������ܴ�
                    "zoom": 1,
                };
                var roleselector = new ulink.RoleSelector(options);
                roleselector.show();

                /*
                * ��ȡ��ɫ������Ϣ
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
                            console.log('��ɫ�󶨷���', data);
                            if (data.iRet == 0) {
                                gamePerson.bindingRoleState = 0;
                                gamePerson.nickName = ulink.xssFilter(decodeURIComponent(data['jData']['roleName']));
                                $('#login_qq_span').html(gamePerson.nickName);
                                $('#changeRole').text('�����İ󶨡�');
                                init();
                                ulink.toast('�󶨳ɹ���');
                            } else {
                                $('#publicMsg').text(data.sMsg);
                                TGDialogS('alert');
                            }
                        },
                        error: function () {
                            $('#publicMsg').text('ϵͳ��æ,���Ժ����ԣ�');
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
            $('#publicMsg').text('ϵͳ��æ,���Ժ����ԣ�');
            TGDialogS('alert');
        }
    })
});

//��װ���ڸ�����ǰ��У���¼̬�Ͱ�;
function loginAndBind() {
    //��¼
    if (gamePerson.loginType === '') {
        $('#publicMsg').text('���ȵ�¼');
        TGDialogS('alert');
        return false;
    }
    //�󶨽�ɫ
    if (gamePerson.bindingRoleState === 1) {
        $('#publicMsg').text('��δ��������ɫ');
        TGDialogS('alert');
        return false;
    }
}

//ѡ�����
$('#club').on('change',function(){
    loginAndBind();
    var chooseClub = $(this).val();
    //��ͼ����
    $('.chip .mc').css({'background-size': '100%'});
    $('.chip .draw').removeClass('draw');
    ulink.http.post({
        url: gamePerson.url + 'route=Index/chooseClub',
        params: {game: gamePerson.game, iActId: gamePerson.iActId, chooseClub: chooseClub},
        success: function (data) {
            console.log('chooseClub', data);
            if (data.iRet === 0) {
                //��Ӧ����Ա
                var html = '';
                var clubType = data.jData.clubType;
                for (var i in data.jData.starArr) {
                    html += "<p data-answerStar=" + clubType + i + "><span>" + data.jData.starArr[i] + "</span><i>ANSWER " + i + "</i></span></p>";
                }
                $('#clubStar').html(html);
                $('#clubStar p').click(function () {
                    var answerStar = $(this).attr('data-answerStar');
                    //�𰸸�����ʽ
                    $(this).addClass('on');
                    $(this).siblings('p').removeClass('on');
                    guessStar(answerStar);
                });
                //ƴͼ�����Ա
                gamePerson.randomStar = data.jData.randomStar;
                $('.chip').children('img').attr("src", "//game.gtimg.cn/images/ulink/act/4107/a20201102sjh/team-star" + gamePerson.randomStar + ".jpg");
                //�����ƣ��������
                $('.chip ul li').on('click', function () {
                    var drawNum = $('.chip .draw').length;
                    if (drawNum >= 3) {
                        ulink.toast('ֻ�ܷ��������ƣ�');
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
            $('#publicMsg').text('ϵͳ��æ�����Ժ����ԣ�');
            TGDialogS('alert');
        }
    })
});

//��Ա����
function guessStar(answerStar) {
    loginAndBind();
    if (gamePerson.randomStar === '') {
        $('#publicMsg').text('����ѡ���');
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
                //1��ͨ����2��
                var collectCard = answerStar + data.jData;
                //��������
                $('#collectCard').attr('collectCard', collectCard);
                $('#dia1').children('.dia-con').children('img').attr("src", "//game.gtimg.cn/images/ulink/act/4107/a20201102sjh/star-card-" + collectCard + ".png");
                gamePerson.randomStar = '';
                TGDialogS('dia1');
                //�����룬������ͬ����Ҫ�ÿ�ȫ�ֱ���randomStar
            } else if (data.iRet === 6005) {
                gamePerson.randomStar = '';
                TGDialogS('dia5');
            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('ϵͳ��æ�����Ժ����ԣ�');
            TGDialogS('alert');
        }
    })
}

//���뼯����
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
                //��״̬�£���������������������
                $('#TS').attr('TSStarCard', collectCard);
                TGDialogS('dia6');
            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('ϵͳ��æ�����Ժ����ԣ�');
            TGDialogS('alert');
        }
    })
})

//�ݴ�
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
            $('#publicMsg').text('ϵͳ��æ�����Ժ����ԣ�');
            TGDialogS('alert');
        }
    })
})

//�����ҵ����ǿ�
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
                    //����û��ʱ�������
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
                    $('#shareCard').html(shareStarCard);//����

                    //ѡ��Ҫ��������
                    $('#MyCard li').click(function () {
                        $('#MyCard li').removeClass('on');
                        $(this).addClass('on');
                        //��ȡѡ�еĴ���
                        var lostMyCardAttr = $(this).attr('data-card');
                        gamePerson.lostMyCard = lostMyCardAttr;

                    });
                    //ѡ��Ҫ���͵���
                    $('#MyCard1 li').click(function () {
                        $('#MyCard1 li').removeClass('on');
                        $(this).addClass('on');
                        //��ȡѡ�еĴ���
                        var giveMyCardAttr = $(this).attr('data-card');
                        gamePerson.giveMyCard = giveMyCardAttr;
                    });

                }else{
                    $('#dia2 .dia-txt').show();
                    $('#dia3 .dia-txt').show();
                    $('#MyCard').html('');
                    $('#MyCard1').html('');
                    $('#shareCard').html('');//����

                }
                TGDialogS('dia2');

            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('ϵͳ��æ�����Ժ����ԣ�');
            TGDialogS('alert');
        }
    })
}

//���������ҵ����ǿ�
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
                    //����û��ʱ���������ʾ
                    $('#dia4 .dia-txt').hide();
                    var cardLi = '';
                    for (var i in giveCardList) {
                        cardLi += "<li data-card='" + giveCardList[i]['cardType'] + giveCardList[i]['starCard'] + giveCardList[i]['openid'] + "'><img src='//game.gtimg.cn/images/ulink/act/4107/a20201102sjh/star-card-" + giveCardList[i]['starCard'] + giveCardList[i]['cardType'] + ".png'></li>";
                    }
                    $('#giveCard').html(cardLi);
                    //ѡ��Ҫ��������
                    $('#giveCard li').click(function () {
                        $('#giveCard li').removeClass('on');
                        $(this).addClass('on');
                        //��ȡѡ�еĴ���
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
            $('#publicMsg').text('ϵͳ��æ�����Ժ����ԣ�');
            TGDialogS('alert');
        }
    })
}

//�����Լ��Ŀ�
$("#lostMyCard").on('click', function () {
    loginAndBind();
    if (gamePerson.lostMyCard === '') {
        $('#publicMsg').text('����ѡ����Ա��');
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
            $('#publicMsg').text('ϵͳ��æ�����Ժ����ԣ�');
            TGDialogS('alert');
        }
    })
})

//���ͺ��ѿ���
$("#giveMyCard").on('click', function () {
    loginAndBind();
    if (gamePerson.giveMyCard === '') {
        $('#publicMsg').text('����ѡ����Ա��');
        TGDialogS('alert');
        return false;
    }
    var qqNumber = $('#qqNumber').val();
    if (!/^[1-9]\d{4,9}$/.test(qqNumber)) {
        $('#publicMsg').text('��������ȷ��QQ��');
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
            $('#publicMsg').text('ϵͳ��æ�����Ժ����ԣ�');
            TGDialogS('alert');
        }
    })
})

//�������������ǿ�
$("#lostGiveCard").on('click', function () {
    loginAndBind();
    if (gamePerson.giveCard === '') {
        $('#publicMsg').text('����ѡ����Ա��');
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
            $('#publicMsg').text('ϵͳ��æ�����Ժ����ԣ�');
            TGDialogS('alert');
        }
    })
})

//�����������ǿ������Լ��ļ�����
$('#collectGiveCard').on('click', function () {
    loginAndBind();
    if (gamePerson.giveCard === '') {
        $('#publicMsg').text('����ѡ����Ա��');
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
                //�����ݴ水ť
                $('#TS').hide();
                //��״̬�£���������������������
                TGDialogS('dia6');
            } else {
                $('#publicMsg').text(data.sMsg);
                TGDialogS('alert');
            }
        },
        error: function () {
            $('#publicMsg').text('ϵͳ��æ�����Ժ����ԣ�');
            TGDialogS('alert');
        }
    })
})



//��¼
$("#btn_qqlogin").on('click', function () {
    LoginManager.login();
    // LoginManager.openLink();
    // LoginManager.loginByPT();
});

//ע��
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



