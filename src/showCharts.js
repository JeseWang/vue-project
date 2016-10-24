(function(){
	var myChart = echarts.init(document.getElementById('showCharts'));
	var data = [];
	var now = +new Date(2016,0,0);
	var oneDay = 24 * 3600 * 1000;
	var value = Math.random()*1000;
	for (var i = 0; i < 1000; i++){
		data.push(randomData());
	}

	function randomData(){
		now = new Date(+now + oneDay);
		return{
			name: now.toString(),
			value:[
				[now.getFullYear(),now.getMonth()+1,now.getDate()].join('/')
			]
		};
	}

	var option = {
		title:{
			text:'玻璃指数折线图'
		},
		tooltip:{},
		legend:{
			data:['期初指数']
		},
		dataZoom:[
			{
				type:'slider',
				start: 10,
				end: 60
			},
			{
				type:'inside',
				start:10,
				end:60
			}
		],
		xAxis:{
			data:data
		},
		yAxis:{},
		series:[{
			name:'期初指数',
			type:'line',
			data:[50,70,90,40,60,90,50,70,50,70,90,40,60,90,50,70,50,70,90,40,60,90,50,70,50,70,90,40,60,90,50,70,50,70,90,40,60,90,50,70,50,70,90,40,60,90,50,70,50,70,90,40,60,90,50,70,50,70,90,40,60,90,50,70,90,40,60,90,50,70,90,40,60,90,50,70,90,40,60,90,50,70,90,40,60,90,50,70,90,40,60,90,50,70,90,40,60,90,50,70,90,40,6,100,90,]
		}]
	};
	myChart.setOption(option);	
})()