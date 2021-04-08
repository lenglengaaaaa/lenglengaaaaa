// �ж��Ƿ�΢��
function isWechat () {
  return window.navigator.userAgent.indexOf('WeChat') !== -1 || window.navigator.userAgent.indexOf('MicroMessenger') !== -1
}

// �ж��Ƿ��ƶ���
function isMobile () {
  return /(iPhone|iPad|iPod|iOS|Android|Windows Phone|BlackBerry|SymbianOS)/i.test(navigator.userAgent)
}

// �򿪵���
function TGDialogS (e) {
  need('biz.dialog', function (Dialog) {
    Dialog.show({
      id: e,
      bgcolor: '#000',
      opacity: 90
    })
  })
}

// �رյ���
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

// �л���һҳ
$('.goNext').on('click', function () {
  sectionWrapSwiper.slideNext()
})

// �л���һҳ
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

// ҳ�汳������
var soundSrc = '//game.gtimg.cn/images/lpl/act/a20200801message/music.mp3'
var audioPlayer = null

// ��ʼ����������
function initAudioPlayer (src) {
  createjs.Sound.alternateExtensions = ['mp3'] // ������ԴΪmp3
  createjs.Sound.registerSound(src, 'sound') // ע����Ƶ
  createjs.Sound.on('fileload', loadHandler) // ������Ƶ�������
  function loadHandler() {
    audioPlayer = createjs.Sound.createInstance('sound') // ������Ƶʵ��
    audioPlayer.volume = 1 // ������Ƶ����
    audioPlayer.play({
      loop: -1
    }) // ������Ƶ, ���� loop -1 ����ѭ������
    if (audioPlayer.playState === 'playSucceeded') {
      $('.btn-music').addClass('on')
    }
  }
}

if (window.navigator.userAgent.indexOf('Chrome') !== -1) {
  console.log('Chrome')
  if (isWechat()) {
    document.addEventListener('WeixinJSBridgeReady', function() {
      console.log('��׿ Chrome---΢�Ų���')
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
      console.log('Ios Other---΢�Ų���')
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

// �ƶ��˷���
init_ZMApp({
  title: '������ǰ��2020Ӣ������ȫ���ܾ���',
  summery: '2020Ӣ������ȫ���ܾ������ƴ�������2011������ÿһ��ȫ���ܾ���������˲����Ȼֵ�ü��ʮ��羺��׷�����룬ȫ���ܾ���ʱ�������ٴλص��й��������ڴ���������ǰ��',
  subtitle: '2020Ӣ������ȫ���ܾ���',
  img: 'https://game.gtimg.cn/images/lpl/act/a20200801message/share' + Math.floor(Math.random() * 4) + '.jpg',
  url: '//lpl.qq.com/es/worlds/2020/',
  // ΢�Ŷ����ص�
  WXtrigger: function (res) {},
  // ΢�ųɹ��ص�
  WXsuccess: function (res) {
    if (!res) return
    if (res.errMsg === 'sendAppMessage:ok') { // ΢�ŷ������
      PTTSendClick('btn', 'sharewx1', '���������')
    } else if (res.errMsg === 'shareTimeline:ok') { // ΢�ŷ�������Ȧ
      PTTSendClick('btn', 'sharewx2', '��������Ȧ')
    } else if (res.errMsg === 'shareQQ:ok') { // ΢�ŷ�����QQ
      PTTSendClick('btn', 'shareqq', '����QQ')
    }
  },
  // ΢�ŷ���ȡ�������ص�
  WXcancel: function (res) {
    PTTSendClick('btn', 'sharewx_cancel', '����ȡ��')
  },
  // ΢�ŷ���ʧ�ܶ����ص�
  WXfail: function (res) {
    PTTSendClick('btn', 'sharewx_fail', '����ʧ��')
  },
  // QQ�����ص�
  QQtrigger: function (res) {
  },
  // QQ����ɹ�
  QQcallback: function (res) {
    PTTSendClick('btn', 'shareqq_succ', 'QQ����ɹ�')
  },
  // ���˷���ɹ�
  LOL_APPsuccess: function (res) {
    PTTSendClick('btn', 'sharezm_succ', '���˷���ɹ�')
  }
})

function delayCookie(){var cookieUin=milo.cookie.get('uin','');if(cookieUin){milo.cookie.set('uin_cookie',cookieUin,365*24*60*60,'qq.com','/',false);milo.cookie.set('ied_qq',cookieUin,365*24*60*60,'qq.com','/',false)}}
setTimeout(delayCookie, 2000)/* #t6Hl8#2A2B883F7AE92B21431F89AFE1DD6C91 */