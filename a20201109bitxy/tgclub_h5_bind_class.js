var bindInfo = {'sArea':-1,'sPlatId':-1,'sPartition':-1,'sRoleId':-1};
var tgclub_h5_bind_class = {
    'config':
    {
        'act_id':null,
        'is_partition':null,
        'game_code':null,
        'commit_fid':null,
        'query_fid':null,
        'query_rolelist_fid':null,
        'query_callback':null,
        'area_type':null,
        'check_class_name':'cur'
    },
    'showPartitionList':function(system)
    {
        if(!this.config.is_partition)return;
        if(loginInfo.loginType==undefined||['ios','android'].indexOf(system)==-1)return;
        var ck = loginInfo.loginType=='wx'?'weixin':'qq';
        var sk = system;
        var arrOpt = window[this.config.game_code+'ServerSelect'].STD_DATA;
        if (arrOpt && arrOpt.length > 0) {
            var selectStr = '<option value="0">请选择大区</option>';
            for(var i=0;i<arrOpt.length;i++){
                if (arrOpt[i].sk !== sk || arrOpt[i].ck !== ck)continue;
                if (arrOpt[i].status * 1 != 0)selectStr += '<option value="' + arrOpt[i].v + '">' + arrOpt[i].t + '</option>';
            }
            $('#sPartition').html(selectStr);
        }
    },
    'queryRoleList':function(loginType,system)
    {
        var sArea =  loginType == 'wx' ? 1 : 2;
        var sPartition = $('#sPartition').val();
        var sPlatId = system == 'ios' ? 0 : 1;
        if(this.config.area_type){
            if(loginInfo.loginType=='qq'){
                sArea = sPlatId ? this.config.area_type.qq_android : this.config.area_type.qq_ios;
            }else{
                sArea = sPlatId ? this.config.area_type.wx_android : this.config.area_type.wx_ios;
            }
        }
        window['amsCfg_'+this.config.query_rolelist_fid].sData = {
            'sArea' : sArea,
            'sPartition' : sPartition,
            'sPlatId' : sPlatId
        };
        amsSubmit(this.config.act_id,this.config.query_rolelist_fid);
    },
    'bindRoleInfo':function()
    {
        //var sk = $('a[data-group="system"].'+this.config.check_class_name).attr('data-value');
        var sk = tgclub_h5_bind_class.check_mobile_type();
        if($("#sPartition").val()<=0&&this.config.is_partition)
        {
            alert('请选择大区');
            return false;
        }
        if($("#sRoleId").val()<=0&&this.config.is_partition)
        {
            alert('请选择角色');
            return false;
        }
        var sPlatId = sk == 'ios' ? 0 : 1;
        var sArea =  loginInfo.loginType == 'wx' ? 1 : 2;
        if(this.config.area_type){
            if(loginInfo.loginType=='qq'){
                sArea = sPlatId ? this.config.area_type.qq_android : this.config.area_type.qq_ios;
            }else{
                sArea = sPlatId ? this.config.area_type.wx_android : this.config.area_type.wx_ios;
            }
        }
        var sPartition = this.config.is_partition?$('#sPartition').val():0;
        var sAreaName = this.config.is_partition?$("#sPartition").find("option[value='"+sPartition+"']").text():-1;
        var sRoleId = this.config.is_partition?$('#sRoleId').val():-1;
        var sRoleName = this.config.is_partition?$("#sRoleId").find("option[value='"+sRoleId+"']").text():-1;
        window['amsCfg_'+this.config.commit_fid].sData = {
            'sArea' : sArea,
            'sPartition' : sPartition,
            'sPlatId' : sPlatId,
            'sRoleId':sRoleId,
            'sAreaName':sAreaName,
            'sRoleName':sRoleName
        };
        amsSubmit(this.config.act_id,this.config.commit_fid);
    },
    'sPartitionChangeEvent':function()
    {
        if(!this.config.is_partition)return;
        $("#sPartition").bind('change', function() {
            //var sk = $('a[data-group="system"].'+tgclub_h5_bind_class.config.check_class_name).attr('data-value');
            var sk = tgclub_h5_bind_class.check_mobile_type();
            if(['qq','wx'].indexOf(loginInfo.loginType)<=-1)return;
            var sPartition=$(this).val();
            if(sPartition<=0)return;
            tgclub_h5_bind_class.queryRoleList(loginInfo.loginType,sk);
        });
    },
    'SystemClickEvent':function()
    {
        $('a[data-group="system"]').on('click',function(){
            //$('a[data-group="system"]').removeClass(tgclub_h5_bind_class.config.check_class_name);
            //$(this).addClass(tgclub_h5_bind_class.config.check_class_name);
            tgclub_h5_bind_class.config.is_partition&&tgclub_h5_bind_class.showPartitionList($(this).attr('data-value'));
            var selectStr = '<option value="0">请选择角色</option>';
            $('#sRoleId').html(selectStr);
        });
    },
    'showBindDiv':function()
    {
        is_gameinfo = 1;
        amsSubmit(this.config.act_id,this.config.query_fid);
    },
    'setConfig':function(config)
    {
        for(var i in config)
        {
            this.config[i] = config[i];
        }
    },
    'get_commit_ams_config':function()
    {
        return {
            "iActivityId": tgclub_h5_bind_class.config.act_id,
            "iFlowId": tgclub_h5_bind_class.config.commit_fid,
			"sNeedSubmitPopDiv":  false,
			'_everyRead' : true,
            "fFlowSubmitEnd": function (res) {
                alert('绑定成功');
                closeDialog();
                amsSubmit(tgclub_h5_bind_class.config.act_id, tgclub_h5_bind_class.config.query_fid);
                return;
            },
            "fFlowSubmitFailed": function (res) {
                alert(res.sMsg);
            }
        }
    },
    'get_query_rolelist_ams_config':function()
    {
        return {
            "iActivityId": tgclub_h5_bind_class.config.act_id,
            "iFlowId": tgclub_h5_bind_class.config.query_rolelist_fid,
			"sNeedSubmitPopDiv":  false,
			'_everyRead' : true,
            "fFlowSubmitEnd": function (res) {
                var role_list = res.jData.list;
                if (role_list && role_list.length > 0) {
                    var selectStr = '';
                    for (var i = 0; i < role_list.length; i++) {
                        selectStr += '<option value=' + role_list[i].roleid + '>' + role_list[i].rolename + '</option>';
                    }
                    $('#sRoleId').html(selectStr);
                    if (bindInfo.sRoleId > 0)
                        $("#sRoleId").find("option[value='" + bindInfo.sRoleId + "']").attr("selected", true);
                } else {
                    var selectStr = '<option value="0">该服务器无角色</option>';
                    $('#sRoleId').html(selectStr);
                }
                return;
            },
            "fFlowSubmitFailed": function (res) {
                var selectStr = '<option value="0">该服务器无角色</option>';
                $('#sRoleId').html(selectStr);
                return;
            }
        }
    },
    'get_query_ams_config':function()
    {
        return {
            "iActivityId": tgclub_h5_bind_class.config.act_id,
            "iFlowId":    tgclub_h5_bind_class.config.query_fid,
			"sNeedSubmitPopDiv":  false,
            "fFlowSubmitEnd": function(res){
                var bind_info = eval('(' + res.jData.bind_info + ')');
                if(bind_info)
                {
                    var now_type = tgclub_h5_bind_class.check_mobile_types();
                    if(bind_info.sPlatId != now_type){
                        var sk = tgclub_h5_bind_class.check_mobile_type();
                        tgclub_h5_bind_class.showPartitionList(sk);
                        TGDialogS('login');
                        return;
                    }
                    bindInfo.sArea = bind_info.sArea;
                    bindInfo.sPlatId = bind_info.sPlatId;
                    var sk = tgclub_h5_bind_class.check_mobile_type();
                    //var sk = bindInfo.sPlatId==0?'ios':'android';
                    //var now_sk_btn = sk =='ios'?$('a[data-value="ios"]'):$('a[data-value="android"]');
                    //$('a[data-group="system"]').removeClass(tgclub_h5_bind_class.config.check_class_name);
                    //now_sk_btn.addClass(tgclub_h5_bind_class.config.check_class_name);
                    if(tgclub_h5_bind_class.config.is_partition)
                    {
                        bindInfo.sPartition = bind_info.sPartition;
                        bindInfo.sRoleId = bind_info.sRoleId;
                        tgclub_h5_bind_class.showPartitionList(sk);
                        $("#sPartition").find("option[value='"+bindInfo.sPartition+"']").attr("selected",true);
                        $('#sPartition').trigger('change');
                        $('#roleinfo').html(bind_info.sAreaName+'-'+bind_info.sRoleName);
                        $('#dobind').html('【切换大区】');
                        $('#userinfo').hide();
                    }
                    else
                    {
                        $('#roleinfo').html(sk);
                        $('#dobind').html('【切换绑定】');
                        $('#userinfo').hide();
                    }
                }
                else
                {
                    var sk = tgclub_h5_bind_class.check_mobile_type();
                    tgclub_h5_bind_class.showPartitionList(sk);
                    //TGDialogS('pop2');
                    if(is_gameinfo==1)
                    {
                        TGDialogS('login');
                        is_gameinfo = 0;
                        return;
                    }
                    return;
                }
                if(is_gameinfo==1)
                {
                    TGDialogS('login');
                    is_gameinfo = 0;
                    return;
                }
                tgclub_h5_bind_class.config.query_callback&&tgclub_h5_bind_class.config.query_callback(res);
                return;
            },
            "fFlowSubmitFailed" : function(res) {
                alert(res.sMsg);
                return false;
            }
        }
    },
    'init':function(config)
    {
        this.setConfig(config);
        $('#dobind').on('click',function(){tgclub_h5_bind_class.showBindDiv();});
        $('#commit_bind').on('click',function(){tgclub_h5_bind_class.bindRoleInfo()});
        this.sPartitionChangeEvent();
        this.SystemClickEvent();
        window['amsCfg_'+tgclub_h5_bind_class.config.commit_fid] = this.get_commit_ams_config();
        window['amsCfg_'+tgclub_h5_bind_class.config.query_rolelist_fid] = this.get_query_rolelist_ams_config();
        window['amsCfg_'+tgclub_h5_bind_class.config.query_fid] = this.get_query_ams_config();
        is_gameinfo = 0;
        amsSubmit(this.config.act_id,this.config.query_fid);
    },
    'check_mobile_type':function(){
        var userAgent_temp = navigator.userAgent;
        if (userAgent_temp.indexOf('iPhone') > -1 || userAgent_temp.indexOf('iPad') > -1 || userAgent_temp.indexOf('iTouch') > -1) {
            return 'ios';
        }else{
            return 'android';
        }
    },
    'check_mobile_types':function(){
        var userAgent_temp = navigator.userAgent;
        if (userAgent_temp.indexOf('iPhone') > -1 || userAgent_temp.indexOf('iPad') > -1 || userAgent_temp.indexOf('iTouch') > -1) {
            return '0';
        }else{
            return '1';
        }
    }
};