

function TGDialogS(e){
    // ����milo������dialog���
    need("biz.dialog",function(Dialog){
        Dialog.show({
            id:e,
            bgcolor:'#000', //���������֡�����ɫ����ʽΪ"#FF6600"�����޸ģ�Ĭ��Ϊ"#fff"
            opacity:80 //���������֡���͸���ȣ���ʽΪ��10-100������ѡ
        });
    });
}
function closeDialog(){
    // ����milo������dialog���
    need("biz.dialog",function(Dialog){
        Dialog.hide();
    });
}


// function publicTop(){
// 	$('.pu-btn-play').click(function(){
// 		TGDialogS('puvidcont');
// 		var obj2 = {
// 				containerId:'puvideowin',
// 				vid:'p0833gqwz7f',
// 				width:864,
// 				height:486,
// 				autoplay: true
// 			}
// 		var newYear2 = new Txplayer(obj2);
// 		musicStop();
// 	});
// 	$('.btn-close-public').click(function(){   //�ر�
// 		$('.video-play').empty();
// 		closeDialog();
// 		musicStart();
// 	});
// }

// ��������
var src2 = '//mdup.apdcdn.tc.qq.com/vcloud1022.tc.qq.com/1022_99b8c4bf27434a578032883da62d4430.f0.mp3?vkey=69BAF142E742BE71EF6655F0A58C44D9F96FE5268605E2B881BCA9A1142BA9C55B760FE7B02107831CBEE39A0BDC515C8B7E3B92DABC0EA5E00D7D3CE8AF92DC0436F3E84DE41BACFD08221B7C5945F54C0FDDDCDF7F8AAB&sha=0';
     if(window.addEventListener)
     {
         var str = '<audio id="topVid" class="topVid" autoplay="autoplay" loop="loop"><source src='+src2+' ></audio>'
         document.getElementById('audio').innerHTML = str;
     } 
     else if(window.attachEvent)
     {
         document.getElementById('audio').style.display=='none';
     }
     var audioMp3= document.getElementById('topVid');
    //  audioMp3[0].play();
    function audioPlay(){
        var mp3State = true;
        var timer = null;
        timer = setInterval(function(){
            if (audioMp3.duration) {
                audioMp3.play();
            }
            if (audioMp3.currentTime) {
                clearInterval(timer);
            }
        }, 500);
        $('.audio-name').click(function(){
            if(mp3State){
                audioMp3.pause();
                $('.top-icon2').attr('src','//game.gtimg.cn/images/lol/act/a20190129spring/nav-icon2.png');
                mp3State = false;
            }
            else{
                audioMp3.play();
                $('.top-icon2').attr('src','//game.gtimg.cn/images/lol/act/a20190129spring/musicon01.gif');
                mp3State = true;
            }
        })
            
    }
    function musicStop(){
        audioMp3.pause();
        $('.top-icon2').attr('src','//game.gtimg.cn/images/lol/act/a20190129spring/nav-icon2.png');
    }

    function musicStart(){
        audioMp3.play();
        $('.top-icon2').attr('src','//game.gtimg.cn/images/lol/act/a20190129spring/musicon01.gif');
    }

	audioPlay()