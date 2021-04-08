OUT.user = {
    indexInitStatus: function () {
        // ����¼̬
        LoginManager.checkLogin(function (userInfo) { //����¼̬
            console.log(userInfo);
            OUT.login.isLogin = true;
            if ((ulink.isWxApp() || ulink.isQQApp()) && ulink.getQueryString("msdkEncodeParam")) {
                window.location.href = OUT.site.indexUrl;
                return;
            }
            var nickName = userInfo.nickName;
            OUT.role.avatar = userInfo.headimgurl;
            if (ulink.isMSDK()) {
                nickName = ' �װ������';
            } else {
                nickName = typeof (userInfo.def_nickname) != "undefined" ? userInfo.def_nickname : (userInfo.nickName.length > 0 ? userInfo.nickName : '');
            }
            $('#unlogin').hide();
            $('#login_qq_span').text(nickName);
            $('.dia-tit-logout em').text(nickName);
            // ����ҳ�治����ʾ��¼̬
            // $('#logined').show();

            var params = {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
            };

            if (ulink.isMSDK()) {
                params = {
                    'iActId': OUT.site.iActId,
                    'game': OUT.site.game,
                    'sAppId': OUT.site.sAppId,
                    'area': ulink.getQueryString('areaid'),
                    'partition': ulink.getQueryString('partition'),
                    'roleId': ulink.getQueryString('roleid'),
                    'platId': ulink.getQueryString('platid'),
                };
            }

            ulink.http.get({
                url: OUT.site.url + '?route=User/init',
                params: params,
                success: function (result) {
                    console.log('indexInitStatus=========>' + JSON.stringify(result));
                    if (result.iRet == 4001) {
                        OUT.role.updateBindRole();
                        return;
                    } else if (result.iRet == -1 && result.jData.code == -111) {
                        showTips(result.sMsg);
                        return;
                    } else if (result.iRet != 0) {
                        showTips(result.sMsg);
                        return;
                    }
                    OUT.role.isBindRole = 1;
                    OUT.role.roleInfo = result.jData.roleData;
                    OUT.user.selectMatchGroup = result.jData.selectMatchGroup;
                    OUT.user.selectArea = result.jData.selectArea;
                    OUT.user.weekNo = result.jData.weekNo;
                    $('#login_qq_span').text(result.jData.roleName);
                    $('.dia-tit-logout em').text(result.jData.roleName);
                    if (result.jData.selectArea == 2) {
                        $('#sel1 option').eq(0).attr('selected', true);
                        $('#sel1 option').eq(1).attr('selected', false);
                    } else {
                        $('#sel1 option').eq(1).attr('selected', true);
                        $('#sel1 option').eq(0).attr('selected', false);
                    }

                    $('#sel2 option').attr('selected', false);
                    $('#sel2 option').eq(result.jData.selectMatchGroup - 1).attr('selected', true);
                },
                error: function (e) {
                }
            });
        }, function () {
            console.log('not login');
            // OUT.login.doLogin();
            if (ulink.isQQApp()) {
                LoginManager.login();
            } else if (ulink.isWxApp()) {
                console.log('debug wx login');
                wxLogin = true;
                LoginManager.loginByWx();
            } else {
                TGDialogS('dialog-login');
            }
        });
    },
    // ������ҳ���а�ӿ�
    matchHomeList: function (index) {
        $('.login-tab').removeClass('on');
        if (OUT.user.homeWxList && OUT.user.homeQQList) {
            if (index == 2) {
                $('.login-tab').eq(0).addClass('on');
                OUT.user.showHomeRankTools(OUT.user.homeQQList);
            } else if (index == 1) {
                $('.login-tab').eq(1).addClass('on');
                OUT.user.showHomeRankTools(OUT.user.homeWxList);
            }
            return;
        }
        ulink.http.get({
            url: OUT.site.url + '?route=Team/matchHomeList',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
            },
            success: function (result) {
                if (result.iRet != 0) {
                    showTips(result.sMsg);
                    return;
                }
                OUT.user.homeQQList = result.jData.qqList;
                OUT.user.homeWxList = result.jData.wxList;
                if (index == 2) {
                    $('.login-tab').eq(0).addClass('on');
                    OUT.user.showHomeRankTools(OUT.user.homeQQList);
                } else if (index == 1) {
                    $('.login-tab').eq(1).addClass('on');
                    OUT.user.showHomeRankTools(OUT.user.homeWxList);
                }
            },
            error: function (e) {
            }
        });
    },
    // ��ҳ���а�����ƴ��
    showHomeRankTools: function (data) {
        // �����������
        var strHtml = '';
        for (var i = 0; i < data.length; i++) {
            switch (i) {
                case 0:
                    strHtml += '<li class="legion-li legion-li-first"> '
                    break;
                case 1:
                    strHtml += '<li class="legion-li legion-li-second"> '
                    break;
                case 2:
                    strHtml += '<li class="legion-li legion-li-third"> '
                    break;
                default:
                    strHtml += '<li class="legion-li">'
            }
            strHtml += '<div class="rank-num"> <p class="rank-label">����</p> <p class="rank-desc">' + data[i].no + '</p> </div> <div class="msg-box"> <div class="msg-item"> <div class="msg-label">����</div> <div class="msg-desc">' + data[i].partitionName + '</div> </div> <div class="msg-item"> <div class="msg-label">���˼��</div> <div class="msg-desc">' + data[i].leagueName + '</div> </div> <div class="msg-item"> <div class="msg-label">������</div> <div class="msg-desc">' + data[i].groupName + '</div> </div> <div class="msg-item"> <div class="msg-label">����</div> <div class="msg-desc">' + data[i].score + '</div> </div></div></li>';
        }
        $("#legion-ul").html(strHtml);
        $("#load-tip").html('���ڼ���');
    },
    changeSelect: function () {
        ulink.http.get({
            url: OUT.site.url + '?route=User/changeSelect',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'selectArea': OUT.user.selectArea,
                'selectMatchGroup': OUT.user.selectMatchGroup
            },
            success: function (result) {
                console.log('change select', result);
            },
            error: function (e) {
            }
        });
    },
    // ��ȡ���������Ϣ
    getGroupList: function () {
        if (OUT.login.isLogin === false) {
            return OUT.login.doLogin();
        }
        ulink.http.get({
            url: OUT.site.url + '?route=Team/getGroupList',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'selectArea': OUT.user.selectArea,
                'selectMatchGroup': OUT.user.selectMatchGroup,
            },
            success: function (result) {
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    showTips(result.sMsg);
                    return;
                } else if (result.iRet != 0) {
                    showTips(result.sMsg);
                    return;
                }
                for (var k = 1; k <= 16; k++) {
                    console.log('��ʼ��Ⱦ���:' + k);
                    var groupBox = $("#matchGroup_" + k);
                    var data = result.jData.list[k];
                    var sHtml = '';
                    for (var i = 0; i < data.length; i++) {
                        sHtml += "<li><a href=\"javascript:OUT.user.getByGroupId('" + data[i].groupId + "');\" onclick=\"PTTSendClick('btn','legion-list1','�Ծ�����');\">";
                        var no = i + 1;
                        sHtml += "<p class=\"th1\"><i></i>" + no + "</p>";
                        sHtml += "<p class=\"th2\"><em>" + data[i].partitionNoName + "</em><em>" + data[i].leagueName + "</em><em>" + data[i].groupName + "</em></p>";
                        sHtml += "<p class=\"th3\">" + data[i].winNum + "/" + data[i].loseNum + "</p>";
                        sHtml += "<p class=\"th4\">" + data[i].score + "</p>";
                    }
                    groupBox.find('ul').html(sHtml);
                    if (result.jData.showWinner) {
                        groupBox.find('ul li').eq(0).addClass('out');
                        groupBox.find('ul li').eq(1).addClass('out');
                    }
                }
                var eTop = getElTop('matchGroup_' + OUT.user.selectMatchGroup);
                goHeight(eTop - 150)
            },
            error: function (e) {
            }
        });
    },
    // ����groupId ���ұ�����Ϣ
    getByGroupId: function (groupId) {
        if (OUT.login.isLogin === false) {
            return OUT.login.doLogin();
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Match/getByGroupId',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'groupId': groupId,
            },
            success: function (result) {
                console.log('getByGroupId=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    showTips(result.sMsg);
                    return;
                } else if (result.iRet != 0) {
                    showTips(result.sMsg);
                    return;
                }

                var data = result.jData;
                var sHtml = '';
                for (var i = 0; i < data.length; i++) {
                    sHtml += '<li><div class="sub-item"><div class="box"><span><em>' + data[i].matchDay + data[i].weekDay + '</em>';
                    sHtml += '<em>С����</em></span></div></div><div class="sub-item"><div class="box"><div class="box-mid"><span>';
                    if (data[i].winnerGroupId == data[i].team1Id) {
                        sHtml += '<em class="win">' + data[i].team1Name + '</em>vs<em>' + data[i].team2Name + '</em>';
                    } else if (data[i].winnerGroupId == data[i].team2Id) {
                        sHtml += '<em>' + data[i].team1Name + '</em> vs <em class="win">' + data[i].team2Name + '</em>';
                    } else {
                        sHtml += '<em>' + data[i].team1Name + '</em> vs <em>' + data[i].team2Name + '</em>';
                    }
                    sHtml += '</span><p>' + data[i].team1Point + '�֣�' + data[i].team2Point + '��</p></div></div></div></li>';
                }
                $('.sub-page-matchlist ul').html(sHtml);
                openSubPage('test', 'matchlist');
            },
            error: function (e) {
            }
        });
    },
    // �Ծ�����
    getByWeekMG: function () {
        if (OUT.login.isLogin === false) {
            return OUT.login.doLogin();
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Match/getByWeekMG',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'selectArea': OUT.user.selectArea,
                'selectMatchGroup': OUT.user.selectMatchGroup,
                'weekNo': OUT.user.weekNo
            },
            success: function (result) {
                console.log('getByWeekMG=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    showTips(result.sMsg);
                    return;
                } else if (result.iRet != 0) {
                    showTips(result.sMsg);
                    return;
                }
                var groupNoList = {
                    1: 'һ',
                    2: '��',
                    3: '��',
                    4: '��',
                    5: '��',
                    6: '��',
                    7: '��',
                    8: '��',
                    9: '��',
                    10: 'ʮ',
                    11: 'ʮһ',
                    12: 'ʮ��',
                    13: 'ʮ��',
                    14: 'ʮ��',
                    15: 'ʮ��',
                    16: 'ʮ��',
                };
                var groupNo = groupNoList[OUT.user.selectMatchGroup];
                console.log('��������', groupNo);
                $("#matchDetailTitle").text("��" + groupNo + "����");
                $('#sel3').val(OUT.user.selectArea);
                $('#sel4').val(OUT.user.selectMatchGroup);
                $('#sel5').val(OUT.user.weekNo);
                for (var k = 1; k <= 5; k++) {
                    var data = result.jData[k];
                    var sHtml = '';
                    var text = '';
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].type == 1) {
                            text = '��̭��';
                        } else {
                            text = 'С����';
                        }
                        sHtml += '<li><p class="time">' + data[i].matchDay + ' 2021�ļ������-' + text + '</p><div class="match-item">';
                        if (data[i].winnerGroupId == data[i].team1Id) {
                            sHtml += '<div class="item-box win"><div class="box"><div><p class="area">' + data[i].team1AreaName + '</p>';
                            sHtml += '<span><em>' + data[i].league1Name + '</em><em>' + data[i].group1Name + '</em></span><p class="num">ս���ȷ֣�' + data[i].team1Point + '</p>';
                            sHtml += '</div></div></div><i class="icon-vs">vs</i>';
                            sHtml += '<div class="item-box"><div class="box"><div><p class="area">' + data[i].team2AreaName + '</p>';
                            sHtml += '<span><em>' + data[i].league2Name + '</em><em>' + data[i].group2Name + '</em></span><p class="num">ս���ȷ֣�' + data[i].team2Point + '</p>';
                        } else if (data[i].winnerGroupId == data[i].team2Id) {
                            sHtml += '<div class="item-box"><div class="box"><div><p class="area">' + data[i].team1AreaName + '</p>';
                            sHtml += '<span><em>' + data[i].league1Name + '</em><em>' + data[i].group1Name + '</em></span><p class="num">ս���ȷ֣�' + data[i].team1Point + '</p>';
                            sHtml += '</div></div></div><i class="icon-vs">vs</i>';
                            sHtml += '<div class="item-box win"><div class="box"><div><p class="area">' + data[i].team2AreaName + '</p>';
                            sHtml += '<span><em>' + data[i].league2Name + '</em><em>' + data[i].group2Name + '</em></span><p class="num">ս���ȷ֣�' + data[i].team2Point + '</p>';
                        } else {
                            sHtml += '<div class="item-box"><div class="box"><div><p class="area">' + data[i].team1AreaName + '</p>';
                            sHtml += '<span><em>' + data[i].league1Name + '</em><em>' + data[i].group1Name + '</em></span><p class="num">ս���ȷ֣�' + data[i].team1Point + '</p>';
                            sHtml += '</div></div></div><i class="icon-vs">vs</i>';
                            sHtml += '<div class="item-box"><div class="box"><div><p class="area">' + data[i].team2AreaName + '</p>';
                            sHtml += '<span><em>' + data[i].league2Name + '</em><em>' + data[i].group2Name + '</em></span><p class="num">ս���ȷ֣�' + data[i].team2Point + '</p>';
                        }

                        sHtml += '</li>';
                        $("#matchDetailWeek_" + k).html(sHtml);


                    }
                }
                var eTop = getElTop("matchDetailWeek_" + OUT.user.weekNo);
                goHeight(eTop - 150);
            },
            error: function (e) {
            }
        });
    }
};
OUT.user.indexInitStatus();
OUT.user.matchHomeList(2);