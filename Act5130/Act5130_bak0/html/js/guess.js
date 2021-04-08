OUT.user = {
    coinNum: 0,
    indexInitStatus: function () {
// 检查登录态
        LoginManager.checkLogin(function (userInfo) { //检查登录态
            console.log(userInfo);
            OUT.login.isLogin = true;
            if ((ulink.isWxApp() || ulink.isQQApp()) && ulink.getQueryString("msdkEncodeParam")) {
                window.location.href = OUT.site.indexUrl;
                return;
            }
            var nickName = userInfo.nickName;
            OUT.role.avatar = userInfo.headimgurl;
            if (ulink.isMSDK()) {
                nickName = ' 亲爱的玩家';
            } else {
                nickName = typeof (userInfo.def_nickname) != "undefined" ? userInfo.def_nickname : (userInfo.nickName.length > 0 ? userInfo.nickName : '');
            }
            $('#unlogin').hide();
            $('#login_qq_span').text(nickName);
            $('.dia-tit-logout em').text(nickName);
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
                        showTips(result.sMsg, 'OUT.login.logout()');
                        return;
                    } else if (result.iRet != 0) {
                        showTips(result.sMsg);
                        return;
                    }
                    if (ulink.isMSDK()) {
                        $("#changeRoleBtn").hide();
                    }
                    OUT.role.isBindRole = 1;
                    OUT.role.roleInfo = result.jData.roleData;
                    OUT.user.selectMatchGroup = result.jData.selectMatchGroup;
                    OUT.user.selectArea = result.jData.selectArea;
                    OUT.user.weekNo = result.jData.weekNo;
                    OUT.user.coinNum = result.jData.coinNum;
                    $('#login_qq_span').text(result.jData.roleName);
                    $('.dia-tit-logout em').text(result.jData.roleName);
                    $('#nickname').text(result.jData.roleName);
                    $('.shop-top .item').eq(1).find('p').text(result.jData.coinNum);
                    $('.shop-top .item').eq(0).find('div').text(getPartitionInfo(result.jData.roleData.partition));
                    $('#sel6').val(OUT.user.selectArea);
                    $('#sel7').val(OUT.user.selectMatchGroup);
                    $('#sel8').val(OUT.user.weekNo);
                    OUT.user.listWithBet();
                },
                error: function (e) {
                }
            });
        }, function () {
            OUT.login.doLogin();
        });
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
    // 获取比赛数据
    listWithBet: function () {
        if (OUT.login.isLogin === false) {
            OUT.login.doLogin();
            return;
        }
        ulink.http.get({
            url: OUT.site.url + '?route=Match/listWithBet',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'selectArea': OUT.user.selectArea,
                'selectMatchGroup': OUT.user.selectMatchGroup,
                'weekNo': OUT.user.weekNo
            },
            success: function (result) {
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    showTips(result.sMsg, 'OUT.login.logout()');
                    return;
                } else if (result.iRet != 0) {
                    showTips(result.sMsg);
                    return;
                }
                var data = result.jData;
                OUT.user.betList = data;
                // if (OUT.user.selectArea == 2) {
                //     $('#sel6 option').eq(0).attr('selected', true);
                //     $('#sel6 option').eq(1).attr('selected', false);
                // } else {
                //     $('#sel6 option').eq(1).attr('selected', true);
                //     $('#sel6 option').eq(0).attr('selected', false);
                // }
                //
                // $('#sel7 option').attr('selected', false);
                // $('#sel7 option').eq(OUT.user.selectMatchGroup - 1).attr('selected', true);
                // $('#sel8 option').attr('selected', false);
                // $('#sel8 option').eq(OUT.user.weekNo - 1).attr('selected', true);
                OUT.user.createBetHtml();
                var eTop = getElTop("betMatchList_" + OUT.user.selectMatchGroup);
                goHeight(eTop)
            },
            error: function (e) {
            }
        });
    },
    // 整理竞猜页面数据html
    createBetHtml: function () {
        for (var gNo = 1; gNo <= 16; gNo++) {
            var html = '';
            var data = OUT.user.betList[gNo];
            var tmpArr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六'];
            var status = ['end', 'nostart', 'on', 'on'];
            var leftBtnHtml = '';
            var rightBtnHtml = '';
            var tmpNum = '';
            var sumNum = '';
            var leftRate = '';
            var rightRate = '';
            for (var k in data) {
                html += '<li class="match-guess-list"><p class="match-guess-txt1"><span>' + data[k].matchDay + '</span>·<span>第' + tmpArr[gNo - 1] + '赛区</span>';
                html += '<a class="btn-match-more" href="javascript:showMorePlay(' + gNo + ');" onclick="PTTSendClick(\'btn\',\'btn-match-more\',\'更多玩法\');" title="更多玩法">更多玩法>></a>';
                html += '</p>';
                html += '<div class="match-guess-list-bg ' + status[data[k].status] + '">';
                html += '<div class="match-guess-box match-guess-left">';

                html += '<div class="competitors-information"><p class="competitors-region">' + data[k].team1AreaName + '</p>';
                html += '<p class="competitors-name"><span>' + data[k].league1Name + ' </span>  <span>' + data[k].fightTeam1CoinTotal + '</span></p>';
                html += '<p class="competitors-score">战斗比分：<span>' + data[k].team1Point + '</span></p>';

                if (data[k].status == 0) {
                    if (data[k].winnerGroupId == data[k].team1Id) {
                        leftBtnHtml = '<a class="btn-match-winner win" href="javascript:showPoulPop(' + gNo + ',' + 1 + ',\'' + data[k].team1Id + '\');" onclick="PTTSendClick(\'btn\',\'btn-match-winner\',\'胜利\');" title="胜利">';
                        rightBtnHtml = '<a class="btn-match-winner" href="javascript:showPoulPop(' + gNo + ',' + 1 + ',\'' + data[k].team2Id + '\');" onclick="PTTSendClick(\'btn\',\'btn-match-winner\',\'胜利\');" title="胜利">';
                    } else {
                        leftBtnHtml = '<a class="btn-match-winner" href="javascript:showPoulPop(' + gNo + ',' + 1 + ',\'' + data[k].team1Id + '\');" onclick="PTTSendClick(\'btn\',\'btn-match-winner\',\'胜利\');" title="胜利">';
                        rightBtnHtml = '<a class="btn-match-winner win" href="javascript:showPoulPop(' + gNo + ',' + 1 + ',\'' + data[k].team2Id + '\');" onclick="PTTSendClick(\'btn\',\'btn-match-winner\',\'胜利\');" title="胜利">';
                    }
                } else if (data[k].status == 1) {
                    leftBtnHtml = '<a class="btn-match-winner no" href="javascript:showPoulPop(' + gNo + ',' + 1 + ',\'' + data[k].team1Id + '\');" onclick="PTTSendClick(\'btn\',\'btn-match-winner\',\'胜利\');" title="胜利">';
                    rightBtnHtml = '<a class="btn-match-winner no" href="javascript:showPoulPop(' + gNo + ',' + 1 + ',\'' + data[k].team2Id + '\');" onclick="PTTSendClick(\'btn\',\'btn-match-winner\',\'胜利\');" title="胜利">';
                } else if (data[k].status == 2 || data[k].status == 3) {
                    if (data[k].fightBetGroupId == data[k].team1Id) {
                        leftBtnHtml = '<a class="btn-match-winner win" href="javascript:showPoulPop(' + gNo + ',' + 1 + ',\'' + data[k].team1Id + '\');" onclick="PTTSendClick(\'btn\',\'btn-match-winner\',\'胜利\');" title="胜利">';
                        rightBtnHtml = '<a class="btn-match-winner no" href="javascript:showPoulPop(' + gNo + ',' + 1 + ',\'' + data[k].team2Id + '\');" onclick="PTTSendClick(\'btn\',\'btn-match-winner\',\'胜利\');" title="胜利">';
                    } else if (data[k].fightBetGroupId == data[k].team2Id) {
                        leftBtnHtml = '<a class="btn-match-winner no" href="javascript:showPoulPop(' + gNo + ',' + 1 + ',\'' + data[k].team1Id + '\');" onclick="PTTSendClick(\'btn\',\'btn-match-winner\',\'胜利\');" title="胜利">';
                        rightBtnHtml = '<a class="btn-match-winner win" href="javascript:showPoulPop(' + gNo + ',' + 1 + ',\'' + data[k].team2Id + '\');" onclick="PTTSendClick(\'btn\',\'btn-match-winner\',\'胜利\');" title="胜利">';
                    } else {
                        leftBtnHtml = '<a class="btn-match-winner win" href="javascript:showPoulPop(' + gNo + ',' + 1 + ',\'' + data[k].team1Id + '\');" onclick="PTTSendClick(\'btn\',\'btn-match-winner\',\'胜利\');" title="胜利">';
                        rightBtnHtml = '<a class="btn-match-winner win" href="javascript:showPoulPop(' + gNo + ',' + 1 + ',\'' + data[k].team2Id + '\');" onclick="PTTSendClick(\'btn\',\'btn-match-winner\',\'胜利\');" title="胜利">';
                    }
                }
                html += leftBtnHtml;
                html += "<span>" + data[k].group1Name + "</span>";
                html += '</a></div></div><i class="icon"></i>';


                html += '<div class="match-guess-box match-guess-right">';
                html += '<div class="competitors-information"><p class="competitors-region">' + data[k].team2AreaName + '</p>';
                html += '<p class="competitors-name"><span>' + data[k].league2Name + ' </span>  <span>' + data[k].fightTeam2CoinTotal + '</span></p>';
                html += '<p class="competitors-score">战斗比分：<span>' + data[k].team2Point + '</span></p>';
                html += rightBtnHtml;
                html += "<span>" + data[k].group2Name + "</span>";
                html += '</a></div></div>'

                if (data[k].fightTeam1CoinTotal < 10000) {
                    tmpNum = data[k].fightTeam1CoinTotal;
                } else {
                    tmpNum = Math.floor(data[k].fightTeam1CoinTotal / 10000) + '万';
                }
                html += '<div class="support-box"><div class="rate-box"><span>' + tmpNum + '</span><div class="rate">';
                sumNum = parseInt(data[k].fightTeam2CoinTotal) + parseInt(data[k].fightTeam1CoinTotal);
                leftRate = parseInt(data[k].fightTeam1CoinTotal) / sumNum * 100;
                rightRate = parseInt(data[k].fightTeam2CoinTotal) / sumNum * 100;
                if (!leftRate && !rightRate) {
                    leftRate = 50;
                    rightRate = 50;
                }
                if (sumNum >= 10000) {
                    sumNum = Math.floor(tmpNum / 10000) + '万';
                }

                if (data[k].fightTeam1CoinTotal < data[k].fightTeam2CoinTotal) {
                    html += '<div class="rate-left" style="width: ' + leftRate + '%"></div><div class="rate-right win" style="width: ' + rightRate + '%"></div>';
                } else {
                    html += '<div class="rate-left win" style="width: ' + leftRate + '%"></div><div class="rate-right" style="width: ' + rightRate + '%"></div>';
                }

                if (data[k].fightTeam2CoinTotal < 10000) {
                    tmpNum = data[k].fightTeam2CoinTotal;
                } else {
                    tmpNum = Math.floor(data[k].fightTeam2CoinTotal / 10000) + '万';
                }
                html += '</div><span>' + tmpNum + '</span></div>';

                html += '<p class="all">总奖池：' + sumNum + '</p><p class="time">' + data[k].matchTime + '</p></div></div></li>';
            }
            $("#betMatchList_" + gNo).html(html);
        }

    },
    // 获取任务状态
    getTaskStatus: function () {
        if (OUT.login.isLogin === false) {
            OUT.login.doLogin();
            return;
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Task/status',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
            },
            success: function (result) {
                console.log('getTaskStatus=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    showTips(result.sMsg, 'OUT.login.logout()');
                    return;
                } else if (result.iRet != 0) {
                    showTips(result.sMsg);
                    return;
                }
                var data = result.jData.statusList;
                OUT.user.taskQual = data;
                for (var i in data) {
                    if (data[i] == 1) {
                        $('.day-cont .result-list').eq(i - 1).find('a').removeClass().addClass('btn-dialog-receive');
                    } else if (data[i] == 2) {
                        $('.day-cont .result-list').eq(i - 1).find('a').removeClass().addClass('btn-dialog-receive on');
                    } else {
                        $('.day-cont .result-list').eq(i - 1).find('a').removeClass().addClass('btn-dialog-receive notreach');
                    }
                }
            },
            error: function (e) {
            }
        });
    },
    // 领取任务奖励
    prize: function (taskId) {
        if (OUT.login.isLogin === false) {
            OUT.login.doLogin();
            return;
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Task/prize',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'taskNo': taskId
            },
            success: function (result) {
                console.log('prize=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    showTips(result.sMsg, 'OUT.login.logout()');
                    return;
                } else if (result.iRet != 0) {
                    closeDialog();
                    showTips(result.sMsg, "TGDialogS('dialog-active')");
                    return;
                }
                closeDialog();
                showTips('领取成功, 请到游戏邮箱内领取~', 'TGDialogS(\'dialog-active\')');
                OUT.user.taskQual[taskId] = 2;
                $('.day-cont .result-list').eq(taskId - 1).find('a').addClass('on');
                $('.shop-top .item').eq(1).find('p').text(result.jData.coinNum);
            },
            error: function (e) {
            }
        });
    },
    // 获取竞猜纪录
    getGuessStatus: function () {
        if (OUT.login.isLogin === false) {
            OUT.login.doLogin();
            return;
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Bet/getRecord',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
            },
            success: function (result) {
                console.log('getRecord=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    showTips(result.sMsg, 'OUT.login.logout()');
                    return;
                } else if (result.iRet != 0) {
                    showTips(result.sMsg);
                    return;
                }
                var html = '';
                var data = result.jData;
                for (var key in data) {
                    var betTypeName = '胜负竞猜';
                    var betOptionName = '';
                    var msgStr = '';
                    var timeSplit = data[key].matchTime.split(' ');
                    if (data[key].betType == '1') {
                        var betGroupName = data[key].team1GroupId == data[key].betOptionId ? data[key].team1GroupName : data[key].team2GroupName;
                        msgStr = '<p>参与 ' + timeSplit[0] + ' <em>' + data[key].team1AreaName + data[key].team1GroupName + '</em> VS <em>' + data[key].team2AreaName + data[key].team2GroupName + '</em>竞猜 <br>投注' + betGroupName + '胜 ' + data[key].coinNum + '竞猜币</p>';
                    } else if (data[key].betType == '2') {
                        betTypeName = '积分之和';
                        switch (data[key].betOptionId) {
                            case '1':
                                betOptionName = '0-20000';
                                break;
                            case '2':
                                betOptionName = '20001-25000';
                                break;
                            case '3':
                                betOptionName = '25001-30000';
                                break;
                            case '4':
                                betOptionName = '30001-35000';
                                break;
                            case '5':
                                betOptionName = '35001-40000';
                                break;
                            case '6':
                                betOptionName = '40001+';
                                break;
                            default:
                                betOptionName = '';
                        }
                        msgStr = '<p>在' + timeSplit[0] + ' <em>' + data[key].team1GroupName + '</em> VS <em>' + data[key].team2GroupName + '</em> ' + betTypeName + ' ' + betOptionName + ' 中投注' + data[key].coinNum + '</p>';
                    } else if (data[key].betType == '3') {
                        betTypeName = '积分之差';
                        switch (data[key].betOptionId) {
                            case '7':
                                betOptionName = '0-4000';
                                break;
                            case '8':
                                betOptionName = '4001-8000';
                                break;
                            case '9':
                                betOptionName = '8001-12000';
                                break;
                            case '10':
                                betOptionName = '12001-16000';
                                break;
                            case '11':
                                betOptionName = '16001-20000';
                                break;
                            case '12':
                                betOptionName = '20001+';
                                break;
                            default:
                                betOptionName = '';
                        }
                        msgStr = '<p>在' + timeSplit[0] + ' <em>' + data[key].team1GroupName + '</em> VS <em>' + data[key].team2GroupName + '</em> ' + betTypeName + ' ' + betOptionName + ' 中投注' + data[key].coinNum + '</p>';
                    }
                    html += '<li><div class="sub-item"><div class="box-mid">';

                    html += msgStr;
                    html += '</div></div><div class="sub-item"><div class="box-mid">';
                    if (data[key].betStatus == 0) {
                        html += '<p>敬请期待</p>';
                    } else if (data[key].betStatus == 1) {
                        html += '<p>竞猜失败</p>';
                    } else {
                        html += '<p class="win">竞猜成功<br>+' + data[key].prizeNum + '</p>'
                    }

                    html += '</div></div></li>';
                }
                $('#guessRecord').html(html);
                openSubPage('guessrecord');
            },
            error: function (e) {
            }
        });
    },
    // 下注
    pour: function () {
        var len = $('#betPour .on').length;
        var param = '';
        if (len < 1) {
            var tmpNum = $('#pourInput').val();
            if (!isNaN(tmpNum) && Math.ceil(tmpNum) == tmpNum && parseInt(tmpNum) > 0) {
                param = tmpNum * 100;
            } else {
                closeDialog();
                showTips('投注数量不得有小数点', "TGDialogS('dialog-bet1')");
                return;
            }
        } else {
            if (OUT.user.coinNum == 0) {
                showTips('抱歉, 亲爱的玩家, 您持有的竞猜币不足~', "TGDialogS('dialog-bet1')");
                return;
            }
            param = $('#betPour .on').index();
            switch (param) {
                case 0:
                    param = 100;
                    break;
                case 1:
                    param = 500;
                    break;
                case 2:
                    param = 1000;
                    break;
                case 3:
                    param = parseInt(OUT.user.coinNum / 4 / 100) * 100;
                    break;
                case 4:
                    param = parseInt(OUT.user.coinNum / 2 / 100) * 100;
                    break;
                case 5:
                    param = parseInt(OUT.user.coinNum / 100) * 100;
                    break;
                default:
                    closeDialog();
                    showTips('系统繁忙, 请稍候再试~', "TGDialogS('dialog-bet1')");
                    return;
            }
        }

        if (param > OUT.user.coinNum) {
            closeDialog();
            showTips('抱歉, 亲爱的玩家, 您持有的竞猜币不足~', "TGDialogS('dialog-bet1')");
            return;
        }
        if (param < 100) {
            showTips('抱歉, 亲爱的玩家, 投注数必须是100的倍数噢~', "TGDialogS('dialog-bet1')");
            return;
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Bet/ante',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'matchId': OUT.user.matchId,
                'type': OUT.user.type,
                'optionId': OUT.user.optionId,
                'coinNum': param
            },
            success: function (result) {
                console.log('ante=========>' + JSON.stringify(result));
                closeDialog();
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    showTips(result.sMsg, 'OUT.login.logout()');
                    return;
                } else if (result.iRet != 0) {
                    showTips(result.sMsg, "TGDialogS('dialog-bet1')");
                    return;
                }
                showTips('下注成功, 请关注比赛，查看投注结果');
                OUT.user.coinNum = result.jData.coinNum;
                OUT.user.betList = result.jData.list;
                OUT.user.createBetHtml();
                // 渲染积分之和、积分之差的投注
                if (OUT.user.type == 2 || OUT.user.type == 3) {
                    $(".btn-sub-vote[data-type='" + OUT.user.type + "']").addClass('no');
                    $(".btn-sub-vote[data-type='" + OUT.user.type + "'][data-option='" + OUT.user.optionId + "']").removeClass('no');
                }
            },
            error: function (e) {
            }
        });
    },
    // 获取转盘初始化数据
    getLotteryStatus: function () {
        if (OUT.login.isLogin === false) {
            OUT.login.doLogin();
            return;
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Lottery/status',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
            },
            success: function (result) {
                console.log('status=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    showTips(result.sMsg, 'OUT.login.logout()');
                    return;
                } else if (result.iRet != 0) {
                    showTips(result.sMsg);
                    return;
                }
                OUT.user.lotteryNum = 5 - parseInt(result.jData.lotteryNum);
                $('.btn-betting').text('占星' + OUT.user.lotteryNum + '/5');
            },
            error: function (e) {
            }
        });
    },
    // 占星
    doLottery: function () {
        if (OUT.login.isLogin === false) {
            OUT.login.doLogin();
            return;
        }

        if ((OUT.user.lotteryNum) < 1) {
            closeDialog();
            showTips('抱歉, 您今日所剩余的占星次数不足, 请明日再来吧~');
            return;
        }

        var len = $('.lott-btns .on').length;
        if (len < 1) {
            showTips('请先选择倍数~');
            return;
        }

        var index = $('.lott-btns .on').index();

        var lotteryIdx = 2;
        switch (index) {
            case 0:
                index = 2;
                lotteryIdx = 5;
                break;
            case 1:
                index = 4;
                lotteryIdx = 3;
                break;
            case 2:
                index = 8;
                lotteryIdx = 1;
                break;
            case 3:
                index = 16;
                lotteryIdx = 7;
                break;
            default:
                showTips('系统繁忙, 请稍候再试1~');
                return;
        }
        closeDialog();
        len = $('#lotteryPour .on').length;
        var param = '';
        console.log(len);
        if (len < 1) {
            var tmpNum = $('#lotteryInput').val();
            if (!isNaN(tmpNum) && Math.ceil(tmpNum) == tmpNum && parseInt(tmpNum) > 0) {
                param = tmpNum * 100;
                if (param > 500) {
                    showTips('转盘投注数量每次最多只能投注500噢~', "TGDialogS('dialog-bet2')")
                }
            } else {
                showTips('投注数量不得有小数点', TGDialogS('dialog-bet2'));
                return;
            }
        } else {
            param = $('#lotteryPour .on').index();
            switch (param) {
                case 0:
                    param = 100;
                    break;
                case 1:
                    param = 200;
                    break;
                case 2:
                    param = 300;
                    break;
                case 3:
                    param = 400;
                    break;
                case 4:
                    param = 500;
                    break;
                case 5:
                    param = 500;
                    break;
                default:
                    showTips('系统繁忙, 请稍候再试~', TGDialogS('dialog-bet2'));
                    return;
            }
        }

        if (param > OUT.user.coinNum) {
            showTips('抱歉, 亲爱的玩家, 您持有的竞猜币不足~', TGDialogS('dialog-bet2'));
            return;
        }


        if (param < 100) {
            showTips('抱歉, 亲爱的玩家, 投注数必须是100的倍数噢~', "TGDialogS('dialog-bet2')");
        }


        ulink.http.get({
            url: OUT.site.url + '?route=Lottery/do',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'type': index,
                'coinNum': param
            },
            success: function (result) {
                console.log('status=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    showTips(result.sMsg, 'OUT.login.logout()');
                    return;
                } else if (result.iRet != 0) {
                    showTips(result.sMsg);
                    return;
                }
                OUT.user.lotteryNum = parseInt(OUT.user.lotteryNum) - 1;
                OUT.user.lotteryNum = OUT.user.lotteryNum < 0 ? 0 : OUT.user.lotteryNum;
                $('.btn-betting').text('占星' + OUT.user.lotteryNum + '/5');
                OUT.user.coinNum = parseInt(result.jData.coinNum);
                if (result.jData.prizeStatus) {
                    OUT.user.Tips = '恭喜主公，本次占星获得' + result.jData.prizeNum + '竞猜币奖励。请主公前往游戏内邮件领取。';
                    callFlashToRollo(lotteryIdx);
                    return;
                }
                callFlashToRollo(Math.floor(lotteryIdx / 2));
                OUT.user.Tips = '很遗憾呢主公，本次占星失败。再来一次吧！';
            },
            error: function (e) {
            }
        });
    },
    // 获取许愿池初始化数据
    getWishData: function () {
        if (OUT.login.isLogin === false) {
            OUT.login.doLogin();
            return;
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Wish/data',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
            },
            success: function (result) {
                console.log('getWishData=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    showTips(result.sMsg, 'OUT.login.logout()');
                    return;
                } else if (result.iRet != 0) {
                    showTips(result.sMsg);
                    return;
                }
                $('.gift-box img').attr('src', result.jData.prizeImg);
                $('.gift-box li p').eq(0).text(result.jData.prizeName);
                $('.gift-box .txt').text('许愿池总投注：' + result.jData.wishTotalCoinNum);
                OUT.user.maxWishCoinNum = parseInt(result.jData.allowWishCoinNum);
                $("#wishAllowMax").text(OUT.user.maxWishCoinNum);
                OUT.user.coinNum = parseInt(result.jData.userCoinNum);
                $('#dialog-bet .bet-right em').eq(0).text(OUT.user.coinNum);
            },
            error: function (e) {
            }
        });
    },
    // 许愿
    wish: function () {
        if (OUT.login.isLogin === false) {
            OUT.login.doLogin();
            return;
        }

        if (OUT.user.maxWishCoinNum < 100) {
            closeDialog();
            showTips('您当日剩余可投注额不足噢~')
        }

        var len = $('#wishSpan .on').length;
        var param = '';
        if (len < 1) {
            var tmpNum = $('#wishInput').val();
            if (!isNaN(tmpNum) && Math.ceil(tmpNum) == tmpNum && parseInt(tmpNum) > 0) {
                param = tmpNum * 100;
                if (param > OUT.user.maxWishCoinNum) {
                    closeDialog();
                    showTips('您当日只能投注' + OUT.user.maxWishCoinNum + '噢~', "TGDialogS('dialog-bet')");
                }
            } else {
                closeDialog();
                showTips('投注数量不得有小数点', "TGDialogS('dialog-bet')");
                return;
            }
        } else {
            param = $('#wishSpan .on').index();
            switch (param) {
                case 0:
                    param = 100;
                    break;
                case 1:
                    param = 200;
                    break;
                case 2:
                    param = 300;
                    break;
                case 3:
                    param = 400;
                    break;
                case 4:
                    param = 500;
                    break;
                case 5:
                    param = parseInt($("#wishInput").val()) * 100;
                    break;
                default:
                    closeDialog();
                    showTips('系统繁忙, 请稍候再试~', "TGDialogS('dialog-bet')");
                    return;
            }
        }

        if (param > OUT.user.coinNum) {
            closeDialog();
            showTips('抱歉, 亲爱的玩家, 您持有的竞猜币不足~', "TGDialogS('dialog-bet')");
            return;
        }

        if (param > OUT.user.maxWishCoinNum) {
            closeDialog();
            showTips('抱歉, 亲爱的玩家, 您的剩余许愿额度不足');
            return;
        }

        if (param < 100) {
            showTips('抱歉, 亲爱的玩家, 投注数必须是100的倍数噢~', "TGDialogS('dialog-bet')");
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Wish/do',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'coinNum': param
            },
            success: function (result) {
                console.log('do=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    showTips(result.sMsg, 'OUT.login.logout()');
                    return;
                } else if (result.iRet != 0) {
                    showTips(result.sMsg);
                    return;
                }
                $('.gift-box .txt').text('许愿池总投注：' + result.jData.wishTotalCoinNum);
                OUT.user.maxWishCoinNum = parseInt(result.jData.allowWishCoinNum);
                $("#wishAllowMax").text(OUT.user.maxWishCoinNum);
                OUT.user.coinNum = parseInt(result.jData.userCoinNum);
                $('#dialog-bet .bet-right em').eq(0).text(OUT.user.coinNum);
                $('#dialog-wish-written2 .dialog-written-desc em').eq(0).text(param);
                TGDialogS('dialog-wish-written2');
            },
            error: function (e) {
            }
        });
    },
    // 查看许愿结果
    wishRecord: function () {
        if (OUT.login.isLogin === false) {
            OUT.login.doLogin();
            return;
        }
        ulink.http.get({
            url: OUT.site.url + '?route=Wish/record',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
            },
            success: function (result) {
                console.log('record=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    showTips(result.sMsg, 'OUT.login.logout()');
                    return;
                } else if (result.iRet != 0) {
                    showTips(result.sMsg);
                    return;
                }
                var data = result.jData;
                var html = '<p>往期开奖</p>';
                if (data.length == 0) {
                    html = '<p>暂未开奖</p>';
                } else {
                    for (var key in data) {
                        // 2021-03-31期 幸运玩家：手Q350 XXXX
                        var splitDate = data[key].day.split(' ');
                        html += '<span>' + splitDate[0] + '期 幸运玩家：' + getPartitionInfo(data[key].partition) + ' ' + data[key].roleName + '</span>';
                    }
                }
                $('#dialog-written .dialog-written-desc>div').html(html);
                TGDialogS('dialog-written');
            },
            error: function (e) {
            }
        });
    },
    // 显示竞猜结果
    showBetResult: function () {
        if (OUT.login.isLogin === false) {
            OUT.login.doLogin();
            return;
        }
        ulink.http.get({
            url: OUT.site.url + '?route=Bet/prizeStatus',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
            },
            success: function (result) {
                console.log('prizeStatus=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    showTips(result.sMsg, 'OUT.login.logout()');
                    return;
                } else if (result.iRet != 0) {
                    showTips(result.sMsg);
                    return;
                }
                var html = '';
                var data = result.jData;
                var text = '';
                OUT.user.prizeData = data;
                for (var key in data) {
                    html += '<div class="result-list">';
                    html += '<span>小组赛</span>';
                    if (data[key].betType == 1) {
                        if (data[key].betOptionId == data[key].team1GroupId) {
                            html += '<span>' + data[key].team1GroupName + '军团赢</span>';
                        } else {
                            html += '<span>' + data[key].team2GroupName + '军团赢</span>';
                        }
                    } else if (data[key].betType == 2) {
                        switch (data[key].betOptionId) {
                            case 1:
                                text = '为0-20000';
                                break;
                            case 2:
                                text = '为20000-25000';
                                break;
                            case 3:
                                text = '为25001-30000';
                                break;
                            case 4:
                                text = '为30001-35000';
                                break;
                            case 5:
                                text = '为35001-40000';
                                break;
                            default:
                                text = '为40001+';
                                break;
                        }

                        html += '<span>' + data[key].team1GroupName + ' vs ' + data[key].team2GroupName + '积分之和' + text + '</span>';
                    } else if (data[key].betType == 3) {
                        switch (data[key].betOptionId) {
                            case 7:
                                text = '为0-4000';
                                break;
                            case 8:
                                text = '为4001-8000';
                                break;
                            case 9:
                                text = '为8001-12000';
                                break;
                            case 10:
                                text = '为12001-16000';
                                break;
                            case 11:
                                text = '为16001-20000';
                                break;
                            default:
                                text = '为20001+';
                                break;
                        }

                        html += '<span>' + data[key].team1GroupName + ' vs ' + data[key].team2GroupName + '积分之差' + text + '</span>';
                    }

                    html += '<span>可领取' + data[key].prizeNum + '</span>';
                    if (data[key].betStatus == 1) {
                        html += '<a class="btn-dialog-receive fail" href="javascript:;" onclick="PTTSendClick(\'btn\',\'btn-dialog-receive\',\'领取\');" title="领取"></a>';
                    } else if (data[key].betStatus == 2) {
                        html += '<a class="btn-dialog-receive" href="javascript:OUT.user.getPrize(' + key + ',' + data[key].betId + ');" onclick="PTTSendClick(\'btn\',\'btn-dialog-receive\',\'领取\');" title="领取"></a>';
                    } else if (data[key].betStatus == 3) {
                        html += '<a class="btn-dialog-receive on" href="" onclick="PTTSendClick(\'btn\',\'btn-dialog-receive\',\'领取\');" title="领取"></a>';
                    }
                    html += '</div>';

                }
                $('.act-cont').html(html);
                $(".btn-dialog-bet-end").addClass('on');
                $(".btn-dialog-day-act").removeClass('on');
                $('.act-cont').show();
                $('.day-cont').hide();
                TGDialogS('dialog-active');
            },
            error: function (e) {
            }
        });
    },
    // 领取竞猜奖励
    getPrize: function (index, id) {
        if (OUT.login.isLogin === false) {
            OUT.login.doLogin();
            return;
        }
        if (OUT.user.prizeData[index].betStatus != 2) {
            return;
        }
        ulink.http.get({
            url: OUT.site.url + '?route=Bet/getPrize',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'betId': id
            },
            success: function (result) {
                console.log('prizeStatus=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.updateBindRole();
                    return;
                } else if (result.iRet == -1 && result.jData.code == -111) {
                    closeDialog();
                    showTips(result.sMsg, 'OUT.login.logout()');
                    return;
                } else if (result.iRet != 0) {
                    closeDialog();
                    showTips(result.sMsg, "TGDialogS('dialog-active')");
                    return;
                }
                OUT.user.prizeData[index].betStatus = 3;
                $('.act-cont .result-list').eq(index).find('a').addClass('on');
                showTips('领取成功');

            },
            error: function (e) {
            }
        });
    }
};

// 设置切换转盘投注
$("#lotteryPour span").on('click', function () {
    var setNum = 1;
    var coinNum = $(this).text();
    if (coinNum == "最大投注") {
        if (OUT.user.coinNum >= 500) {
            setNum = 5;
        } else if (OUT.user.coinNum == 0) {
            setNum = 0;
        } else {
            setNum = parseInt(OUT.user.coinNum / 100);
        }
    } else {
        coinNum = parseInt(coinNum);
        setNum = parseInt(coinNum / 100);
    }
    $("#lotteryInput").val(setNum);
});

// 设置切换胜负、积分投注
$("#betPour span").on('click', function () {
    var setNum = 1;
    var coinNum = $(this).text();
    if (coinNum == "最大投注") {
        if (OUT.user.coinNum == 0) {
            setNum = 0;
        } else {
            setNum = parseInt(OUT.user.coinNum / 100);
        }
    } else if (coinNum == "1/2余额") {
        setNum = parseInt(OUT.user.coinNum / 200);
    } else if (coinNum == "1/4余额") {
        setNum = parseInt(OUT.user.coinNum / 400);
    } else {
        coinNum = parseInt(coinNum);
        setNum = parseInt(coinNum / 100);
    }
    $("#pourInput").val(setNum);
});

// 许愿池弹窗
$("#wishSpan span").on('click', function () {
    var setNum = 1;
    var coinNum = $(this).text();
    if (coinNum == "最大投注") {
        var maxLimit = OUT.user.maxWishCoinNum > OUT.user.coinNum ? OUT.user.coinNum : OUT.user.maxWishCoinNum;
        if (maxLimit == 0) {
            setNum = 0;
        } else {
            setNum = parseInt(maxLimit / 100);
        }
    } else {
        coinNum = parseInt(coinNum);
        setNum = parseInt(coinNum / 100);
    }
    $("#wishInput").val(setNum);
});

OUT.user.indexInitStatus();