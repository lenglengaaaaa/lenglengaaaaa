var heroHead = {
	top: [84, 10, 74, 68, 13, 8, 85, 50, 133, 17, 14, 27, 98, 36, 78, 106, 54, 31, 75, 516, 86, 57, 150, 62, 6, 420, 126, 122, 83, 58, 24, 41, 39, 114, 164, 2, 92, 48, 23, 266, 19, 875, 82, 240, ],
	jug: [107, 121, 28, 35, 76, 60, 30, 163, 517, 9, 427, 104, 203, 20, 32, 154, 113, 33, 72, 5, 56, 59, 120, 141, 102, 64, 254, 421, 79, 77, 11, 246, 245, 106, 62, 80, 164, 2, 48, 19, ],
	mid: [246, 105, 7, 238, 91, 55, 142, 45, 61, 134, 38, 63, 90, 112, 103, 99, 4, 43, 268, 34, 136, 518, 69, 161, 101, 115, 1, 131, 127, 42, 3, 80, 157, 84, 26, 25, 74, 30, 163, 517, 68, 13, 8, 9, 50, 143, 117, 111, 31, 56, 39, 266, 240,245, ],
	adc: [69, ],adc: [69,110,81,21,523,15,145,18,236,96,119,51,67,235,29,202,429,222,498,22,133,],
	sup: [26, 25, 412, 40, 223, 555, 267, 44, 12, 201, 432, 350, 53, 143, 117, 89, 16, 497, 37, 111, 99, 43, 161, 235, 3, 79, 875, ]
}
$.getJSON('//lpl.qq.com/web201612/data/LOL_MATCH2_TEAM_LIST.js', function(result) {
	var heroList = result.hero
	let topList = filterArray(heroList, heroHead.top)
	let jugList = filterArray(heroList, heroHead.jug)
	let midList = filterArray(heroList, heroHead.mid)
	let adcList = filterArray(heroList, heroHead.adc)
	let supList = filterArray(heroList, heroHead.sup)
	renderList(topList)
	$('.seltabbox a').on('click', function() {
		var index = $(this).index()
		switch(index) {
			case 0:
				renderList(topList)
				break
			case 1:
				renderList(jugList)
				break
			case 2:
				renderList(midList)
				break
			case 3:
				renderList(adcList)
				break
			case 4:
				renderList(supList)
				break
		}
	})
})

function filterArray(heroList, data) {
	var result = []
	for(var i=0;i<heroList.length;i++){
	    for(var j=0;j<data.length;j++){
	        if(heroList[i].heroId==data[j]){
	            result.push(heroList[i]);
	        }
	    }
	}
	return result
}

function renderList(data) {
	$('.heroul').empty()
	var reanderHtml = ''
	for(var i = 0; i < data.length; i++) {
		reanderHtml += '<li>' +
			'<img src="//game.gtimg.cn/images/lol/act/img/champion/' + data[i].alias + '.png">' +
			'<p>' + data[i].name + '</p>' +
			'</li>'
	}
	$('.heroul').append(reanderHtml)
}/* #t6Hl8#10974170BDBF363C823E581A567833AB */