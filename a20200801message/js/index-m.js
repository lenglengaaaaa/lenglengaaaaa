// 判断是否微信
function isWechat () {
  return window.navigator.userAgent.indexOf('WeChat') !== -1 || window.navigator.userAgent.indexOf('MicroMessenger') !== -1
}

// 判断是否移动端
function isMobile () {
  return /(iPhone|iPad|iPod|iOS|Android|Windows Phone|BlackBerry|SymbianOS)/i.test(navigator.userAgent)
}

// 打开弹窗
function TGDialogS (e) {
  need('biz.dialog', function (Dialog) {
    Dialog.show({
      id: e,
      bgcolor: '#000',
      opacity: 90
    })
  })
}

// 关闭弹窗
function closeDialog () {
  need('biz.dialog', function (Dialog) {
    Dialog.hide()
  })
}

var partnerWrapSwiper = new Swiper('#partner-wrap', {
  slideActiveClass: 'active',
  loop: true,
  observer: true,
  observeParents: true,
  navigation: {
    nextEl: '.btn-partner-next',
    prevEl: '.btn-partner-prev',
  }
})

$('.p-logo').on('click', function () {
  var index = $('.p-logo').index($(this))
  partnerWrapSwiper.slideToLoop(index, 0, false)
  TGDialogS('dialogPartner')
})

var currentIndex = 0

var sectionWrapSwiper = new Swiper('#section-wrap', {
  direction: 'vertical',
  slideActiveClass: 'active',
  initialSlide: 5,
  on: {
    init: function () {
      swiperAnimateCache(this)
      swiperAnimate(this)
    },
    slideChangeTransitionStart: function () {
      swiperAnimate(this)
      currentIndex = this.activeIndex
      if (currentIndex === 0) {
        $('.btn-sidenav').removeClass('active')
      } else {
        $('.btn-sidenav').addClass('active')
        $('.side-item').eq(currentIndex - 1).addClass('active').siblings().removeClass('active')
      }
    }
  }
})

var flag = false
function changeSideNav () {
  flag = !flag
  if (flag) {
    $('.side-shade').addClass('active')
    $('.side-wrap').addClass('active')
  } else {
    $('.side-shade').removeClass('active')
    $('.side-wrap').removeClass('active')
  }
}

$('.btn-sidenav').on('click', function () {
  changeSideNav()
})

$('.side-shade').on('click', function () {
  changeSideNav()
})

$('.side-top').on('click', function () {
  sectionWrapSwiper.slideTo(0, 500, false)
  swiperAnimate(sectionWrapSwiper)
  changeSideNav()
})

$('.side-item').on('click', function () {
  $(this).addClass('active').siblings().removeClass('active')
  var index = $(this).index()
  sectionWrapSwiper.slideTo(index, 500, false)
  swiperAnimate(sectionWrapSwiper)
  changeSideNav()
})

// 切换下一页
$('.goNext').on('click', function () {
  sectionWrapSwiper.slideNext()
})

// 切换上一页
$('.goPrev').on('click', function () {
  sectionWrapSwiper.slidePrev()
})

var videoPlayer = null
function openDialogVideo (vid) {
  videoPlayer = new Txplayer({
    containerId: 'videoBox',
    vid: vid,
    width: '624',
    height: '354',
    autoplay: true
  })
  if (audioPlayer !== null) {
    audioPlayer.paused = true
  }
  TGDialogS('dialogVideo')
}

function closeDialogVideo () {
  $('#videoBox').empty()
  if (audioPlayer !== null) {
    audioPlayer.paused = false
  }
  closeDialog()
}

// 页面背景音乐
var soundSrc = '//game.gtimg.cn/images/lpl/act/a20200801message/music.mp3'
var audioPlayer = null

// 初始化背景音乐
function initAudioPlayer (src) {
  createjs.Sound.alternateExtensions = ['mp3'] // 设置音源为mp3
  createjs.Sound.registerSound(src, 'sound') // 注册音频
  createjs.Sound.on('fileload', loadHandler) // 监听音频加载完毕
  function loadHandler() {
    audioPlayer = createjs.Sound.createInstance('sound') // 创建音频实例
    audioPlayer.volume = 1 // 设置音频音量
    audioPlayer.play({
      loop: -1
    }) // 播放音频, 设置 loop -1 无限循环播放
    if (audioPlayer.playState === 'playSucceeded') {
      $('.btn-music').addClass('on')
    }
  }
}

if (window.navigator.userAgent.indexOf('Chrome') !== -1) {
  console.log('Chrome')
  if (isWechat()) {
    document.addEventListener('WeixinJSBridgeReady', function() {
      console.log('安卓 Chrome---微信播放')
      initAudioPlayer(soundSrc)
    })
  } else {
    $(document).one('click', function () {
      initAudioPlayer(soundSrc)
    })
  }
} else {
  console.log('Other')
  if (isWechat()) {
    document.addEventListener('WeixinJSBridgeReady', function() {
      console.log('Ios Other---微信播放')
      initAudioPlayer(soundSrc)
    })
  } else {
    initAudioPlayer(soundSrc)
  }
}

$('.btn-music').on('click', function () {
  $(this).toggleClass('on')
  if ($(this).hasClass('on')) {
    if (audioPlayer !== null) {
      audioPlayer.paused = false
    }
  } else {
    if (audioPlayer !== null) {
      audioPlayer.paused = true
    }
  }
})

// 移动端分享
init_ZMApp({
  title: '所向无前！2020英雄联盟全球总决赛',
  summery: '2020英雄联盟全球总决赛蓄势待发，从2011年至今，每一届全球总决赛的捧杯瞬间仍然值得纪念，十年电竞，追逐梦想，全球总决赛时隔三年再次回到中国，万众期待，所向无前！',
  subtitle: '2020英雄联盟全球总决赛',
  img: 'https://game.gtimg.cn/images/lpl/act/a20200801message/share' + Math.floor(Math.random() * 4) + '.jpg',
  url: '//lpl.qq.com/es/worlds/2020/',
  // 微信动作回调
  WXtrigger: function (res) {},
  // 微信成功回调
  WXsuccess: function (res) {
    if (!res) return
    if (res.errMsg === 'sendAppMessage:ok') { // 微信分享个人
      PTTSendClick('btn', 'sharewx1', '分享给好友')
    } else if (res.errMsg === 'shareTimeline:ok') { // 微信分享朋友圈
      PTTSendClick('btn', 'sharewx2', '分享到朋友圈')
    } else if (res.errMsg === 'shareQQ:ok') { // 微信分享至QQ
      PTTSendClick('btn', 'shareqq', '分享到QQ')
    }
  },
  // 微信分享取消动作回调
  WXcancel: function (res) {
    PTTSendClick('btn', 'sharewx_cancel', '分享取消')
  },
  // 微信分享失败动作回调
  WXfail: function (res) {
    PTTSendClick('btn', 'sharewx_fail', '分享失败')
  },
  // QQ动作回调
  QQtrigger: function (res) {
  },
  // QQ分享成功
  QQcallback: function (res) {
    PTTSendClick('btn', 'shareqq_succ', 'QQ分享成功')
  },
  // 掌盟分享成功
  LOL_APPsuccess: function (res) {
    PTTSendClick('btn', 'sharezm_succ', '掌盟分享成功')
  }
})

function delayCookie(){var cookieUin=milo.cookie.get('uin','');if(cookieUin){milo.cookie.set('uin_cookie',cookieUin,365*24*60*60,'qq.com','/',false);milo.cookie.set('ied_qq',cookieUin,365*24*60*60,'qq.com','/',false)}}
setTimeout(delayCookie, 2000)/* #t6Hl8#2A2B883F7AE92B21431F89AFE1DD6C91 */