// data-appurl的值为APP内活动地址;script标签id写死为pub_top_bar；
// 示例：<script id="pub_top_bar" src="./pub_top_bar.js" data-appurl="https://xinyue.qq.com/act/a20200714new/index.html" data-pagetype=""></script>
window.onload = function () {
    // 插入样式
    var pub_top_bar_style = document.createElement('style')
    pub_top_bar_style.type = 'text/css';
    pub_top_bar_style.innerHTML=".xy-download{display:-webkit-flex;display:flex}"
    pub_top_bar_style.innerHTML+=".xy-download{-webkit-align-items:center;align-items:center;-webkti-justify-rection:space-between;justify-content:space-between;height:1.2rem;background:#fff;-webkit-box-shadow:0 0 .1rem rgba(0,0,0,.3);box-shadow:0 0 .1rem rgba(0,0,0,.3);padding:0;margin:0;padding:0 .56rem}" 
    pub_top_bar_style.innerHTML+=".xy-logo{height:.8rem;width:2.88rem;background-image:url(//game.gtimg.cn/images/tgclub/cp/a20200424pubhead/new_xy_pb_top2.png);background-size:5.18rem .8rem}"; 
    pub_top_bar_style.innerHTML+=".xy-download-btn{height:.64rem;width:1.8rem;background-image:url(//game.gtimg.cn/images/tgclub/cp/a20200424pubhead/new_xy_pb_top2.png);background-size:5.18rem .8rem;background-position:-3.32rem 0}"
    pub_top_bar_style.innerHTML+=".confirmDialog{display:none;height: 100vh;width: 100%;position:fixed;top:0;left:0;z-index:9999;background:rgba(0,0,0,0.5)}"
    pub_top_bar_style.innerHTML+=".confirmDialog .confirmDialogPop{width:5.2rem;min-height:1.6rem;box-sizing:border-box;padding-bottom:1rem;position:relative;background:#fff;border-radius:.3rem;overflow:hidden;text-align:center;position:fixed;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:9998}"
    pub_top_bar_style.innerHTML+=".confirmDialog .confirmDialogPop .confirmDialogPop-text{width:100%;height:1.6rem;display:-webkit-flex;display:flex;align-items:center;justify-content:center;color:#000;font-size:.26rem}"
    pub_top_bar_style.innerHTML+=".confirmDialog .confirmDialogPop .btnbar{position:absolute;bottom:0;left:0;width:100%;height:1rem;display:-webkit-flex;display:flex;align-items:center;border-top:.1px solid #f3f3f3}"
    pub_top_bar_style.innerHTML+=".confirmDialog .confirmDialogPop .btnbar a{text-decoration:none;flex:1;box-sizing:border-box;height:1rem;display:-webkit-flex;display:flex;align-items:center;justify-content:center;color:#000;font-size:.26rem;font-weight:700}"
    pub_top_bar_style.innerHTML+=".confirmDialog .confirmDialogPop .btnbar a:first-child{border-right:.1px solid #f3f3f3}"
    pub_top_bar_style.innerHTML+=".confirmDialog .confirmDialogPop .btnbar .btn-sure{color:#616f89}"
    
    headTag = document.head || document.getElementsByTagName('head')[0];
    headTag.appendChild(pub_top_bar_style)
    // 插入结构
    var pub_top_bar = document.createElement('div')
    pub_top_bar.className = 'xy_topbar'
    pub_top_bar.innerHTML ="<div class='xy-download'><div class='xy-logo'></div>"+
    "<a class='xy-download-btn' href='javascript:;'></a></div>"
    var bodyTag = document.getElementsByTagName('body')[0]
    bodyTag.prepend(pub_top_bar)
    // 插入弹窗
    var confirmDialog = document.createElement('div')
    confirmDialog.className = "confirmDialog"
    confirmDialog.innerHTML = '<div class="confirmDialogPop">' +
      '<p class="confirmDialogPop-text">下载心悦俱乐部App，参与活动吧！</p>' +
        '<div class="btnbar">' +
        '<a class="btn-cancle" href="javascript:;">取消</a>' +
        '<a class="btn-sure" href="javascript:;">确定</a>' +
      '</div>' +
    '</div>'
    var htmlTag = document.getElementsByTagName('html')[0]
    htmlTag.appendChild(confirmDialog)
  
    var pub_top_bar_lock = 'unlock'
    function head_top_goAPP () {
      event.preventDefault()
      event.stopPropagation()
      if (pub_top_bar_lock === 'lock') {
        return
      }
      pub_top_bar_lock = 'lock'
      var appUrl = document.getElementById('pub_top_bar').getAttribute('data-appurl')
      var appPageType = document.getElementById('pub_top_bar').getAttribute('data-pagetype')
      var schemaUrl = null
      if (appPageType === 'video') {
        var vid = document.getElementById('pub_top_bar').getAttribute('data-vid')
        schemaUrl = "tgclub://webVideo?vid="+ vid + "&url=" + encodeURIComponent(appUrl)
      } else {
        schemaUrl = 'tgclub://redirect?url=' + encodeURIComponent(appUrl) + '&share=1'
      }
      var gSUA = navigator.userAgent.toLowerCase()
      var android = gSUA.match(/(android)\s+([\d.]+)/)
      var ios = gSUA.match(/(ipad|iphone|ipod).*os\s([\d_]+)/)
      var isWeixin = gSUA.match(/micromessenger/)
      let isQq = gSUA.match(/QQ\/[0-9]/i)
      var confirmTxt = '若未安装心悦俱乐部App需要先下载'
      if (gSUA.indexOf('tgclub') === -1) {
        switch (true) {
        case (ios !== null && isWeixin !== null): // ios微信
          // IOS的微信，使用JSAPI唤起
          setTimeout(function () {
            window.WeixinJSBridge.invoke('launchApplication', {
              'schemeUrl': schemaUrl
            }, function (res) {
            })
          }, 500)
          // 手Q直接跳转
          head_top_jumpDownApp(3000, confirmTxt, function () {
            pub_top_bar_lock = 'unlock'
          })
          break
        case (ios !== null && isQq !== null): // ios 手Q
          window.location.href = schemaUrl
          var loadDateTime = Date.now()
          setTimeout(function () {
            var timeOutDateTime = Date.now()
            if (timeOutDateTime - loadDateTime < 1000) {
              head_top_jumpDownApp(3000, confirmTxt, function () {
                pub_top_bar_lock = 'unlock'
              })
            }
          }, 25)
          break
        case (ios !== null && isQq === null && isWeixin === null): // ios 浏览器
          window.location.href = schemaUrl
          head_top_jumpDownApp(1500, confirmTxt, function () {
            this.go_help_him_lock = 'unlock'
          })
          break
        case (android !== null && isWeixin !== null):// 安卓 微信
          // IOS的1微信，使用JSAPI唤起
          setTimeout(function () {
            window.WeixinJSBridge.invoke('launchApplication', {
              'schemeUrl': schemaUrl
            }, function (res) {
            })
          }, 500)
          // 手Q直接跳转
          head_top_jumpDownApp(1500, confirmTxt, function () {
            pub_top_bar_lock = 'unlock'
          })
          break
        case (android !== null && isWeixin === null): // 安卓 手Q
          var iframe = document.createElement('iframe')
          iframe.src = schemaUrl
          iframe.style.display = 'none'
          document.body.appendChild(iframe)
          // 手Q直接跳转
          head_top_jumpDownApp(1500, confirmTxt, function () {
            pub_top_bar_lock = 'unlock'
          })
          break
        case (android !== null && isQq === null && isWeixin === null): // android 浏览器
          var iframe2 = document.createElement('iframe')
          iframe2.src = schemaUrl
          iframe2.style.display = 'none'
          document.body.appendChild(iframe2)
          head_top_jumpDownApp(1500, confirmTxt, function () {
            this.go_help_him_lock = 'unlock'
          })
          break
        default:
          // alert('仅适用IOS或Android')
          pub_top_bar_lock = 'unlock'
          return
          break
        }
      }
    }
    function head_top_jumpDownApp (delayTime) {
      setTimeout(function () {
        pub_top_bar_lock = 'unlock'
        confirmDialog.style.display = 'block'
      }, delayTime)
      // setTimeout(function () {
      //   confirmDialog.style.display = 'none'
      // }, 5000)
    }
    function head_top_downApp () {
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        var appDownUrl = 'https://itunes.apple.com/cn/app/%E5%BF%83%E6%82%A6%E4%BF%B1%E4%B9%90%E9%83%A8-%E8%85%BE%E8%AE%AF%E6%B8%B8%E6%88%8F%E7%8E%A9%E5%AE%B6%E7%A6%8F%E5%88%A9%E5%B9%B3%E5%8F%B0/id1156439976?mt=8'
        window.location.href = appDownUrl
      } else {
        var appDownUrl = 'http://dlied5.myapp.com/myapp/6337/tgclub/apk/20200729/cdf9f187052a10bc6109394055721112.apk'
        window.location.href = appDownUrl
      }
    }
    document.getElementsByClassName('xy-download-btn')[0].onclick = function () {
      head_top_goAPP()
    }
    confirmDialog.getElementsByClassName('btn-cancle')[0].onclick = function () {
      confirmDialog.style.display = 'none'
    }
    confirmDialog.getElementsByClassName('btn-sure')[0].onclick = function () {
      head_top_downApp()
    }
  }