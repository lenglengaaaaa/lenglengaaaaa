// ����ҳ���л�
$('.content-tab').on('click',function(){
  var idx=$(this).index();
  if(idx == 1){
      OUT.user.listWithBet()
  }else if(idx == 2){
      OUT.user.getLotteryStatus();
  }else if(idx == 3){
      OUT.user.getWishData();
  }else if(idx == 4){
      $('.shop-top .item').eq(1).find('p').text(OUT.user.coinNum);
  }
  $(this).addClass('on').siblings('.content-tab').removeClass('on');
  $('.page-box').eq((idx-1)).show().siblings('.page-box').hide();
})


// �󶨸�ҳ�水ť
$('.btn-back').on('click', function() {
  closeSubPage();
});
$('.btn-match-more').on('click', function() {
  openSubPage('moreplay');
});
$('.btn-match-record').on('click', function() {
  openSubPage('guessrecord');
});
$('.btn-exrecord').on('click', function() {
  //openSubPage('exrecord');
});

// ����Ͷע��ť����¼�
$('.btn-sub-vote').on('click', function () {
    if($(this).hasClass('no')){
        return;
    }
    var key = $('#morePlayUl').attr('data-key');
    var idx = $(this).index();
    var type = 2;
    if(idx > 5){
        type = 3;
    }
    showPoulPop(key, type, idx+1);
});

$('#sel6').on('change', function () {
    var idx = $(this).val();
    OUT.user.selectArea = idx;
    OUT.user.listWithBet();
});

$('#sel7').on('change', function () {
    var idx = $(this).val();
    OUT.user.selectMatchGroup = idx;
    OUT.user.listWithBet();
});

$('#sel8').on('change', function () {
    var idx = $(this).val();
    OUT.user.weekNo = idx;
    OUT.user.listWithBet();
});



// �����콱��ť���
$('.day-cont .result-list').on('click',function () {
    var attr = $(this).find('span').eq(0).attr('data-taskId');
    if(OUT.user.taskQual[attr] != 1){
        return;
    }
    OUT.user.prize(attr);
});
// �򿪸�ҳ��
function openSubPage(n) {
  $('html, body').css({ 'overflow': 'hidden' });
  $('.sub-page').css({ 'display': 'none' });
  $('.sub-page-'+n).css({ 'display': '' })
  $('.sub-wrapper').addClass('open');
}

function closeSubPage() {
  $('html, body').css({ 'overflow': '' });
  $('.sub-wrapper').removeClass('open');
}

// ת�̳齱ѡ��
$('.lott-btns a').on('click',function(){
  // var idx=(this).parent().index();
  $(this).parent().addClass('on').siblings('li').removeClass('on')

})

// Բ�̳齱
//�����ʼ�齱 ֪ͨjs  flash->js
function callJsToStarto(){
  //alert(11);
//����
  //callFlashToRollo(1);
}
//������ó齱��� ֪ͨflash��ʼ����Ч�� js->flash
function callFlashToRollo(id){
  //alert(22)
  //֪ͨת��ת����Ӧ���н���Ʒ��id ����Ŵ�0,1,2.....��0��ָ���ʼָʾ��λ�ã�����˳ʱ��ķ��������
  if(SWFOBJo)SWFOBJo.stopRoll(id);
}
//3��flash�������֪ͨjs  flash->js
function callJsToCompleteo(){
  SWFOBJo.enable()
  showTips(OUT.user.Tips);
}
  //��ʼ���齱�����SWFOBJ 
  //ת�̵����ĵ�����Ϊ��0,0����
var SWFOBJo= new Lottery({
      'r':8,//��Ʒ����
      'width':580,//flash���
      'height':580,//flash�߶�
      's':'//testimg.qq.com/page/btn-lottery.png',//��ʼ�齱��ťͼƬ
      'bx':0,//Բ�̵�ͼƬλ��x���� ��ת�̵����ĵ�����Ϊ��0,0����
      'by':0,//Բ�̵�ͼƬλ��y����
      'sx':0,//��ʼ�齱��ťx����
      'sy':0,//��ʼ�齱��ťy����
      'contentId' : 'lotterycontent',//Ƕ��swf ��div��� id 
      'onClickRollEvent' : callJsToStarto,//��Ӧ����ӿ�
      'onCompleteRollEvent':callJsToCompleteo //��Ӧ����ӿ�
});

$('.bet-left input').on('click',function(){
  $('.bet-body span').removeClass('on');
})
$('.bet-body span').on('click',function(){
  $(this).addClass('on').siblings().removeClass('on');
})

$('.btn-dialog-day-act').on('click',function(){
  $(this).addClass('on').siblings('a').removeClass('on');
  $('.act-cont').hide();
  $('.day-cont').show();
})
$('.btn-dialog-bet-end').on('click',function(){
  $(this).addClass('on').siblings('a').removeClass('on');
  $('.act-cont').show();
  $('.day-cont').hide();
})

$('.wish-tab a').on('click',function(){
  $(this).addClass('on').siblings().removeClass('on');
  if($('.btn-dialog-wish').hasClass('on')){
      $('.wish-tab').removeClass('change');
      $('.wish-cont').show();
      $('.wish-cont2').hide();
  }else{
      $('.wish-tab').addClass('change');
      $('.wish-cont').hide();
      $('.wish-cont2').show();
  }
});

// �ҵ���Ʊ��
var myVoteNumber = 230;

// ͶƱ��ק���¼�
$('#range-vote-input').on('input change', function() {
  $('#number-vote-input').val($(this).val() === '0'? null: Math.round($(this).val() / 100 * myVoteNumber));
  setRangeNumberTip($(this).val());
  
});

// ͶƱ�������¼�
$('#number-vote-input').on('input change', function() {
  var rangeNumber = Math.round((($(this).val() > myVoteNumber)? myVoteNumber: $(this).val()) / myVoteNumber * 100);
  $('#range-vote-input').val(rangeNumber);
  setRangeNumberTip(rangeNumber,$(this).val());
});
$('#number-vote-input').on('blur', function() {
      
  if (!$(this).val()) { $(this).val(0); }
  else if ($(this).val() > myVoteNumber) { $(this).val(myVoteNumber); }
  else if ($(this).val() <��0){
          $(this).val(0)
  } else {
          $(this).val(parseInt($(this).val()));
  }
  $('.choice-num span').text(parseInt($(this).val()));
  $('.range-number-tip p').text(parseInt($(this).val()));
});

// ����޸�Ʊ��
$('.btn-range-minus').on('click', function(){
  var curr = parseInt($('#range-vote-input').val());
  var aim = (curr - 10 < 0)? 0: curr - 10;
  $('#range-vote-input').val(aim);
  setRangeNumberTip(aim);
  $('#number-vote-input').val(Math.round(aim / 100 * myVoteNumber));
});
$('.btn-range-plus').on('click', function(){
  var curr = parseInt($('#range-vote-input').val());
  var aim = (curr + 10 > 100)? 100: curr + 10;
  $('#range-vote-input').val(aim);
  setRangeNumberTip(aim);
  $('#number-vote-input').val(Math.round(aim / 100 * myVoteNumber));
});

// �޸�ͶƱ�ϱ�λ�� + ������
function setRangeNumberTip(n,n2) {
      n = n<0?��0: n;
  $('.range-number-tip').css({ 'left': (((410 * n / 100) - 5) / 100) + 'rem' });
  $('.range-inner').css({ 'width': n + '%' });
  if (!n2) {
          $('.choice-num span').text(Math.round(n / 100 * myVoteNumber));
          $('.range-number-tip p').text(Math.round(n / 100 * myVoteNumber));
  }else {
          $('.choice-num span').text(n2);
          $('.range-number-tip p').text(n2);
  }
}