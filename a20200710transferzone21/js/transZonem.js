var TransZone = {
    SubmitUrl: "//lol.sw.game.qq.com/lol/commact/?proj=a20200526LOLTrans&c=a20200526LOLTrans",
    SafeCheckUrl: "//apps.game.qq.com/cgi-bin/lol/LOLTrans/transCheck.cgi",
    SafeStatusUrl: "//apps.game.qq.com/cgi-bin/lol/LOLTrans/sppCheck.cgi",
    iStep: 0,
    sArea: 0,
    times:30,
    UserInfo: {},
    typeList: {
        'emote': 8,
        'guard': 19,
        'hero': 1,
        'icon': 6,
        'skin': 2,
        'tftHero': 20,
        'tftChess': 21,
        'tftBuff': 22
    },
    CheckInfo: function () {
        var self = TransZone;
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function () {

                var srcId = $("#leaveserver").val();
                var dstId = $("#gotoserver").val();


                if (srcId == dstId) {
                    $("#msg").html('��ѡ��ͬ��ת��ת�����');
                    TGDialogS("infoMsg");
                    return;
                }

                var sUrl = self.SubmitUrl + "&a=infoCheck&r1=CHECKINFO_RES&srcArea=" + srcId + "&dstArea=" + dstId;

                var mdKey = milo.request('mdKey');
                if (mdKey) {
                    sUrl += "&mdKey=" + mdKey;
                }

                loadScript(sUrl, function () {
                    if (CHECKINFO_RES.status == 0) {
                        $("#msg").html(CHECKINFO_RES.msg);
                        TGDialogS("infoMsg");
                    } else {
                        $("#msg").html(CHECKINFO_RES.msg);
                        TGDialogS("infoMsg");
                    }

                })
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    },
    CheckInfoPre: function () {
        var self = TransZone;
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function () {

                var serverName = $("input[type='radio']:checked").val();
                if (serverName == undefined) {
                    $("#msg").html("����ѡ������Ҫת���Ĵ���");
                    TGDialogS("infoMsg");
                    return;
                }
                var dstName = $("input[type='radio']:checked").parent().next().text();


                $("#checkSrc").html(serverName);
                $("#checkDst").html(dstName);
                TGDialogS("checkMsg");

                return;
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    },
    RollBackTrans: function () {
        var self = TransZone;
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function () {
                var sUrl = self.SubmitUrl + "&a=rollback&r1=ROLLBACK_RES";
                loadScript(sUrl, function () {
                    if (ROLLBACK_RES.status == 0) {
                        $("#msg").html(ROLLBACK_RES.msg);
                        TGDialogS("infoMsg");
                    } else {
                        $("#msg").html(ROLLBACK_RES.msg);
                        TGDialogS("infoMsg");
                    }

                })
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    },
    RollBackTransPre: function () {
        var self = TransZone;
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function () {

                var sUrl = self.SubmitUrl + "&a=getTransInfo&r1=GETTRANS_RES";
                loadScript(sUrl, function () {
                    if (GETTRANS_RES) {
                        if (GETTRANS_RES.status == 0) {
                            if (parseInt(GETTRANS_RES.msg.flag) == 3) {
                                $("#backSrc").html(LOLServerSelect.zoneToName(GETTRANS_RES.msg.src));
                                $("#backDst").html(LOLServerSelect.zoneToName(GETTRANS_RES.msg.dst));
                                $("#backSrc1").html(LOLServerSelect.zoneToName(GETTRANS_RES.msg.src));
                                $("#backDst1").html(LOLServerSelect.zoneToName(GETTRANS_RES.msg.dst));
                                $("#backSrc2").html(LOLServerSelect.zoneToName(GETTRANS_RES.msg.src));
                                $("#backDst2").html(LOLServerSelect.zoneToName(GETTRANS_RES.msg.dst));
                                TGDialogS("rollbackMsg");
                                rollbackClz(5);
                            } else {
                                $("#msg").html("��ǰû�гɹ���ת������");
                                TGDialogS("infoMsg");
                            }
                        } else {
                            $("#msg").html(GETTRANS_RES.msg);
                            TGDialogS("infoMsg");
                        }
                    }
                })
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    },
    SafePhoneCheck: function () {
        var self = TransZone;
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function () {

                var sUrl = self.SafeCheckUrl;
                loadScript(sUrl, function () {
                    if (transCheck_RES) {
                        if (transCheck_RES.iRet == 0) {
                            var iframe = document.createElement("iframe");
                            iframe.src = transCheck_RES.msg
                            iframe.id = "iframe1"
                            iframe.frameborder = 0;
                            iframe.width = 413;
                            iframe.height = 280;

                            if (iframe.attachEvent) {
                                iframe.attachEvent("onload", function () {
                                    var btn = document.getElementById('iframe1').contentWindow.document.getElementById('close_btn');
                                    if (btn) {
                                        btn.href = "javascript:parent.closeDialog()";
                                        btn.onclick = "parent.closeDialog()";
                                    }
                                    var main = document.getElementById('iframe1').contentWindow.document.getElementById('main');
                                    main.style = "width: 98%;overflow: hidden;margin: 0 auto;";
                                    var mod_iframe_window = document.getElementById('iframe1').contentWindow.document.getElementsByClassName('mod_iframe_window');
                                    mod_iframe_window[0].style = "width: 100%!important;overflow: hidden;min-width: unset!important;min-height: unset!important;box-sizing: border-box;";
                                    var iframe_window_header = document.getElementById('iframe1').contentWindow.document.getElementsByClassName('iframe_window_header');
                                    iframe_window_header[0].style = "width: 100%!important;";
                                    var iframe_window_body = document.getElementById('iframe1').contentWindow.document.getElementsByClassName('iframe_window_body');
                                    iframe_window_body[0].style = "width: 100%!important;";
                                    var mod_iframe = document.getElementById('iframe1').contentWindow.document.getElementsByClassName('mod_iframe');
                                    mod_iframe[0].style = "width: 100%!important;box-sizing: border-box;";
                                });
                            } else {
                                iframe.onload = function () {
                                    var btn = document.getElementById('iframe1').contentWindow.document.getElementById('close_btn');
                                    if (btn) {
                                        btn.href = "javascript:parent.closeDialog()";
                                        btn.onclick = "parent.closeDialog()";
                                    }
                                    var main = document.getElementById('iframe1').contentWindow.document.getElementById('main');
                                    main.style = "width: 98%;overflow: hidden;margin: 0 auto;";
                                    var mod_iframe_window = document.getElementById('iframe1').contentWindow.document.getElementsByClassName('mod_iframe_window');
                                    mod_iframe_window[0].style = "width: 100%!important;overflow: hidden;min-width: unset!important;min-height: unset!important;box-sizing: border-box;";
                                    var iframe_window_header = document.getElementById('iframe1').contentWindow.document.getElementsByClassName('iframe_window_header');
                                    iframe_window_header[0].style = "width: 100%!important;";
                                    var iframe_window_body = document.getElementById('iframe1').contentWindow.document.getElementsByClassName('iframe_window_body');
                                    iframe_window_body[0].style = "width: 100%!important;";
                                    var mod_iframe = document.getElementById('iframe1').contentWindow.document.getElementsByClassName('mod_iframe');
                                    mod_iframe[0].style = "width: 100%!important;box-sizing: border-box;";
                                };
                            }
                            $('#infoMsg2').html('');
                            document.getElementById('infoMsg2').appendChild(iframe);
                            TGDialogS('infoMsg2')
                        } else {
                            //alert(transCheck_RES.msg);
                            $("#msg").html(transCheck_RES.msg);
                            TGDialogS("infoMsg");
                        }
                    }
                })
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    },
    InitPage: function () {
        var self = TransZone;
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function () {

                var sppKey = milo.request('dna_result_key');

                if (!sppKey) {
                    self.InitTransInfo();
                    return;
                }

                var sUrl = self.SafeStatusUrl + "?sppKey=" + sppKey;
                loadScript(sUrl, function () {
                    self.InitTransInfo();
                })
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    },
    GetShareUrl: function () {
        $("#msgs").html('������ϽǷ��������');
        TGDialogS('test4');
    },
    GetTransInfo: function () {
        var self = TransZone;
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function () {

                var sUrl = self.SubmitUrl + "&a=getTransInfo&r1=GETTRANS_RES";
                loadScript(sUrl, function () {
                    if (GETTRANS_RES) {
                        if (GETTRANS_RES.status == 0) {
                            $("#srcArea").html(LOLServerSelect.zoneToName(GETTRANS_RES.msg.src));
                            $("#desArea").html(LOLServerSelect.zoneToName(GETTRANS_RES.msg.dst));
                            TransZone.sArea = GETTRANS_RES.msg.src;
                            TGDialogS("payMsg");
                        } else {
                            $("#msg").html(GETTRANS_RES.msg);
                            TGDialogS("infoMsg");
                        }
                    }
                })
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    },
    CancelOrder: function () {
        var self = TransZone;
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function () {

                var sUrl = self.SubmitUrl + "&a=cancelOrder&r1=CANCELORDER_RES";
                loadScript(sUrl, function () {
                    if (CANCELORDER_RES) {
                        if (CANCELORDER_RES.status == 0) {
                            setTimeout(function () {
                                TransZone.InitPage();
                            },800);
                            $("#msg").html(CANCELORDER_RES.msg);
                        } else {
                            $("#msg").html(CANCELORDER_RES.msg);
                        }
                        TGDialogS("infoMsg");
                    }
                })
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    },
    ShowPage: function (num) {
        var self = TransZone;
        //self.iStep = num;
        for (var i = 1; i <= 5; i++) {
            if (i == num) {
                $(".flow-" + num + " span").css({display: "block"});
                $(".matter-" + num).show();
            } else {
                $(".flow-" + i + " span").css({display: "none"});
                $(".matter-" + i).hide();
            }
            //����ǵ����Ĳ�������ת������
            if (num == 4) {
                self.GetTransUserInfo();
            }
            //����ǵ����岽����ȡ�������
            if (num == 5) {
                self.GetTransProgress();
            }
            /* if (num == 5 && self.iStep != 3) {
                 self.GetTransProgress();
             }
             if (num == 5 && self.iStep == 3) {
                 //self.GetTransProgress();
                 //���ת��״̬��3��ֱ��д100%
                 $(".matter-5  .schedule>div").css({"width": '100%'});
                 $("#progress").html('100%');
             }*/
        }
    },
    GoStep1: function () {
        var self = TransZone;
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function () {
                if(IS_READ<=0){
                    readRule ();
                    return;
                }
                var srcId = $("#leaveserver").val();
                var dstId = $("#gotoserver").val();
                if (srcId == dstId) {
                    $("#msg").html('��ѡ��ͬ��ת��ת�����');
                    TGDialogS("infoMsg");
                    return;
                }

                self.iStep = 2;
                self.ShowPage(2);
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    },
    GetTransProgress: function () {
        var self = TransZone;
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function () {

                var sUrl = self.SubmitUrl + "&a=getTransPreg&r1=TRANSPROGRESS_RES";
                loadScript(sUrl, function () {
                    if (TRANSPROGRESS_RES) {
                        if (TRANSPROGRESS_RES.status == 0) {
                            var iFlag = TRANSPROGRESS_RES.msg.proFlag;
                            $(".matter-5  .schedule>div").css({"width": iFlag + '%'});
                            $("#progress").html(iFlag + '%');
                        } else {
                            $(".matter-5  .schedule>div").css({"width": '50%'});
                        }
                    }
                })
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    },
    InitTransInfo: function () {
        var self = TransZone;
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function () {

                var sUrl = self.SubmitUrl + "&a=getTransInfo&r1=GETTRANS_RES";
                loadScript(sUrl, function () {
                    if (GETTRANS_RES) {
                        if (GETTRANS_RES.status == 0) {
                            $("#step4src").html(LOLServerSelect.zoneToName(GETTRANS_RES.msg.src));
                            $("#step4dst").html(LOLServerSelect.zoneToName(GETTRANS_RES.msg.dst));
                            $("#cancelSrcArea").html(LOLServerSelect.zoneToName(GETTRANS_RES.msg.src));
                            $("#cancelDstArea").html(LOLServerSelect.zoneToName(GETTRANS_RES.msg.dst));
                            $("#cancelUin").html($("#login_qq_span").html());

                            self.iStep = GETTRANS_RES.msg.flag;
                            if (GETTRANS_RES.msg.flag == 0 ) {
                                self.ShowPage(3);
                            } else if (GETTRANS_RES.msg.flag == 7 || GETTRANS_RES.msg.flag == 1|| GETTRANS_RES.msg.flag == 8) {
                                self.ShowPage(4);
                            } else {
                                self.ShowPage(5);
                            }
                        } else {
                            self.ShowPage(1);
                        }
                    }
                })
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    },
    GetTransUserInfo: function () {
        var self = TransZone;
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function () {

                var sUrl = self.SubmitUrl + "&a=getUserInfo&r1=TransUserInfo_RES";
                loadScript(sUrl, function () {
                    if (TransUserInfo_RES) {
                        if (TransUserInfo_RES.status == 0) {
                            self.times=-1;
                            closeDialog();
                            //console.log(TransUserInfo_RES);
                            var userInfo = TransUserInfo_RES.msg;
                            var sSrcLV=parseInt(userInfo.sSrcLV);
                            var sDstLV=parseInt(userInfo.sDstLV);
                            $("#sSrcLV").html(userInfo.sSrcLV);
                            if(sSrcLV>sDstLV){
                                $("#sDstLV").html('Ŀ�Ĵ����ȼ���LV<span>'+sDstLV+'</span>(ת����ɺ��ΪLV<span>'+sSrcLV+'</span>)');
                            }else{
                                $("#sDstLV").html('Ŀ�Ĵ����ȼ���LV<span>'+sDstLV+'</span>')
                            }

                            $("#CURRENCY_champion").html(userInfo.CURRENCY_champion);
                            $("#CURRENCY_cosmetic").html(userInfo.CURRENCY_cosmetic);
                            $("#rp").html(userInfo.rp);
                            $("#hero").html(userInfo.hero.length);
                            $("#skin").html(userInfo.skin.length);
                            $("#guard").html(userInfo.guard.length);
                            $("#icon").html(userInfo.icon.length);
                            $("#emote").html(userInfo.emote.length);
                            $("#tftHero").html(userInfo.tftHero.length);
                            $("#tftChess").html(userInfo.tftChess.length);
                            $("#tftBuff").html(userInfo.tftBuff.length);
                            TransZone.UserInfo = userInfo;
                        } else {
                            $("#sSrcLV").html(0);
                            $("#sDstLV").html('Ŀ�Ĵ����ȼ���LV<span>0</span>');
                            $("#CURRENCY_champion").html(0);
                            $("#CURRENCY_cosmetic").html(0);
                            $("#rp").html(0);
                            $("#hero").html(0);
                            $("#skin").html(0);
                            $("#guard").html(0);
                            $("#icon").html(0);
                            $("#emote").html(0);
                            $("#tftHero").html(0);
                            $("#tftChess").html(0);
                            $("#tftBuff").html(0);
                            TransZone.UserInfo = {};
                            if(TransUserInfo_RES.status=='-2'){
                                $("#msg").html('��������ʧ�ܣ��볷�����������²���');
                            }else{
                                if(self.times>=0){
                                    setTimeout(function () {
                                        self.GetTransUserInfo();
                                        self.times--;
                                    },1000);
                                }
                                $("#msg").html('����Ϊ�ٻ�ʦ���Ǩ������ң���ȡ��ɫ���ͣ���ȡ��ɫ����...�ʲ��б�����׼���У������ĵȴ���');
                            }
                            TGDialogS("infoMsg");
                        }
                    }
                })
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    },
    showHeroSkinList: function (type,isBag) {
        if(+isBag>0){
            IS_BAG=true;
        }
        closeDialog();
        var showList = TransZone.UserInfo[type];
        $('#snapshoot-list').html('');
        if (typeof (showList) != 'undefined') {
            var showNum = "";
            if (type == "hero" || type == "skin" || type == "guard" || type == "icon" || type == "emote") {

                if (type == "hero") {
                    showNum = "Ӣ��(����)��";
                } else if (type == "skin") {
                    showNum = "Ƥ��(����)��";
                } else if (type == "guard") {
                    showNum = "����Ƥ��(����)��";
                } else if (type == "icon") {
                    showNum = "�ٻ�ʦͼ��(����)��";
                } else if (type == "emote") {
                    showNum = "����(����)��";
                }
                $("#dialogSnapshoot").attr('class', 'dialog dialog-snapshoot status-three');
                $("#skinHeroNum").html(showNum + showList.length);
            } else if (type == "tftHero") {
                showNum = "�ƶ�֮��ССӢ��(����)��";
                $("#dialogSnapshoot").attr('class', 'dialog dialog-snapshoot status-two');
                $("#tftHeroNum").html(showNum + showList.length);
            } else if (type == "tftChess") {
                showNum = "�ƶ�֮������(����)��";
                $("#dialogSnapshoot").attr('class', 'dialog dialog-snapshoot status-one');
                $("#tftChessNum").html(showNum + showList.length);
            } else if (type == "tftBuff") {
                showNum = "�ƶ�֮�Ĺ�����Ч(����)��";
                $("#dialogSnapshoot").attr('class', 'dialog dialog-snapshoot status-three');
                $("#skinHeroNum").html(showNum + showList.length);
            }
            var item = "";
            for (var i in showList) {
                var info = ItemNameCfg(TransZone.typeList[type], showList[i]);
                item += ' <li>' +
                    '<div class="image">' +
                    '<img src="' + info['img'] + '" alt="">' +
                    '</div>\n' +
                    '<div class="text">' + info['info'] + '</div>' +
                    '</li>'
            }
            $('#snapshoot-list').append(item);
            lazyload();
        }
        TGDialogS('dialogSnapshoot');
    },
    TransferZoneList:function (page) {
        var self = TransZone;
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function () {
                var sUrl = "//lol.sw.game.qq.com/lol/lwdcommact/a20210106transferzone/a20210106transferzone/TransferZoneList?page="+page+"&pageSize=3&r1=TransferZoneList_RES";
                loadScript(sUrl, function () {
                    if (TransferZoneList_RES) {
                        var obj = {};
                        if (TransferZoneList_RES.code == 0) {
                            if(TransferZoneList_RES.list.length>0){
                                obj['tmpData']=TransferZoneList_RES.list;
                                $("#TransferZoneList").html(template('TransferZoneListTemp',obj));
                                var iTotalPage=TransferZoneList_RES.totalPage;
                                need("util.ajaxpage", function(jo) {
                                    pageShow = new jo({
                                        oPage: "pageShow",
                                        pageId: "jPager",
                                        pageNow:  page,
                                        pageShowNum: 2,
                                        pageTotal: iTotalPage,
                                        style: 345,
                                        onChange: function(i) {
                                            self.TransferZoneList(i);
                                        }
                                    });
                                    $('#jPager').show();
                                });
                                TGDialogS('test5');
                            }else{
                                $("#msg").html('����ת����¼');
                                TGDialogS("infoMsg");
                            }
                        }else{
                            $("#msg").html(TransferZoneList_RES.msg);
                            TGDialogS("infoMsg");
                        }
                    }
                })
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    },
    TransferZoneUserInfo:function (orderId) {
        TransZone.UserInfo = {};
        var self = TransZone;
        need("biz.login", function (LoginManager) {
            LoginManager.checkLogin(function () {
                var sUrl ="//lol.sw.game.qq.com/lol/lwdcommact/a20210106transferzone/a20210106transferzone/TransferZoneUserInfo?orderId="+orderId+"&r1=TransUserInfo_RES";
                loadScript(sUrl, function () {
                    if (TransUserInfo_RES) {
                        if (TransUserInfo_RES.code == 0) {
                            closeDialogs();
                            var userInfo = TransUserInfo_RES.msg;
                            var sSrcLV=parseInt(userInfo.sSrcLV);
                            var sDstLV=parseInt(userInfo.sDstLV);
                            $("#sSrcLV2").html('LV<span>'+sSrcLV+'</span>');
                            if(sSrcLV>sDstLV){
                                $("#sDstLV2").html('LV<span>'+sDstLV+'</span>(ת����ɺ��ΪLV<span>'+sSrcLV+'</span>)');
                            }else{
                                $("#sDstLV2").html('LV<span>'+sDstLV+'</span>')
                            }
                            $("#CURRENCY_champion2").html(userInfo.CURRENCY_champion);
                            $("#CURRENCY_cosmetic2").html(userInfo.CURRENCY_cosmetic);
                            $("#rp2").html(userInfo.rp);
                            $("#hero2").html(userInfo.hero.length);
                            $("#skin2").html(userInfo.skin.length);
                            $("#guard2").html(userInfo.guard.length);
                            $("#icon2").html(userInfo.icon.length);
                            $("#emote2").html(userInfo.emote.length);
                            $("#tftHero2").html(userInfo.tftHero.length);
                            $("#tftChess2").html(userInfo.tftChess.length);
                            $("#tftBuff2").html(userInfo.tftBuff.length);
                            TransZone.UserInfo = userInfo;
                        }
                        TGDialogS("test6");
                    }
                })
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    }
}


function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]).replace(/<iframe/g, "").replace(/<\/iframe>/g, "").replace(/<script/g, "").replace(/<\/script>/g, "").replace(/document.write/g, "").replace(/</g, "").replace(/>/g, "").replace(/alert/g, "").replace(/eval/g, "").replace(/"/g, "").replace(/'/g, "");
    return null;
}

function GetZoneIdByName(name) {
    var data = LOLServerSelect.STD_DATA;
    var len = data.length;
    var result;
    for (var i = 0; i < len; i++) {
        if (data[i].t.indexOf(String(name)) >= 0) {
            result = data[i].v;
            break;
        }
    }
    return result;
}

function TransPay() {
    closeDialog();
    amsCfg_681108.sData.sArea = TransZone.sArea;
    amsSubmit(316212, 681108);
}

amsCfg_681108 = {
    'iActivityId': '316212',
    'iFlowId': '681108',
    'sData': {},
    'fFlowSubmitEnd': function (res) {
        need(["ams.daoju_buy_v2.daoju_buy_v2"], function (DaojuBuy) {
            var option = {
                dc: res.jData.dc,
                onPaySuccess: function () {
                    TransZone.ShowPage(5);
                }
            };
            DaojuBuy.pay(res.jData, option);
        });
    },
    'fFlowSubmitFailed': function (res) {
        $("#msg").html(res.sMsg);
        TGDialogS("infoMsg");
    }
};

function rollbackClz(num) {
    $('#rollbackCheck').addClass('djs').text(num + 's').attr('href', 'javascript:;');
    if (num > 0) {
        setTimeout('rollbackClz(' + (num - 1) + ')', 1000);
    } else {
        $('#rollbackCheck').removeClass('djs').text('').attr('href', 'javascript:TransZone.RollBackTrans();');
    }
}

function isZM(callback) {
    var selfs=CheckApp;
    if (selfs.Is_Plat!= "ZM"){
        TGDialogS('zmolMsg');
        return;
    }
    callback();
}

$(function () {
    $("body").on('click', "#close_btn", function () {
        closeDialog();
    })
})
amsCfg_685098 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316212, //�id
    "iFlowId":    685098, //����id
    "sData":{//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){
        IS_READ=1;
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        //alert(res.sMsg);
    }
};
var IS_READ=0;
amsCfg_685099 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316212, //�id
    "iFlowId":    685099, //����id
    "sData":{//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){
        IS_READ=+res.sOutValue1;
        if(IS_READ<=0){
            readRule ();
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};

function showMsg(msg) {
    $("#msg").html(msg);
    TGDialogS("infoMsg");
}

function backHome(){
    isZM(function () {
        if(isCoutDown>1 || IS_READ>0){
            closeDialog();
        }else{
            window.location.href="qtpage://main";
        }
    })
}

template.helper('LOLServerSelect', function(iArea) {
    return LOLServerSelect.zoneToName(iArea)
});


var IS_BAG=false;
function closeDialogList(){
    if(IS_BAG){
        IS_BAG=false;
        TGDialogS('test6');
    }else{
        closeDialogs();
    }
}/* #t6Hl8#2AB51EFD3FCCEEE22570364E0717CB41 */