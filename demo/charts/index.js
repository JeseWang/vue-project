var indexs = {
	preIndexId:'',
	startDate:'2016-01-01',
	endDate:'2016-10-24'
};

var myChart = echarts.init(document.getElementById('main'));

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
	title: {
		text: '大盘指数'
	},
	tooltip: {},
	legend: {
		data: ['指数']
	},
	dataZoom: [
		{
			type: 'slider',
			start: 20,
			end: 100
		},
		{
			type: 'inside',
			start: 20,
			end: 100
		}
	],
	xAxis: {
		data: ['一','二','三','四','五','六']
	},
	yAxis: {},
	series: [{
		name: '指数',
		type: 'line',
		data: [1,3,2,4,3,5,1,23,4,5,6,7]
	}]
};



function changeIndex(id){
	indexs.preIndexId = document.getElementById(id).value;
	console.log('改变成功，Id为' + indexs.preIndexId);
	// option.title.text = document.getElementById(id).getAttribute('name');
	getIndex(indexs.preIndexId);
}

function getIndex(preId){
	$.get('/api/GIIndex?FindByPreIndexId&preIndexId=' + preId + '&startDate=' + indexs.startDate + '&endDate=' + indexs.endDate).done(function(data){
		console.log('获取新指数成功'+data);
		// option.xAxis = data.date
		// option.series.data = data.indexs
		myChart.setOption(option)
	})
}

function dateFil(){
	indexs.startDate = $('#startDate').val();
	indexs.endDate = $('#endDate').val();

	getIndex(indexs.preIndexId);	
}

$(function(){
	
	$.get('/Api/GIPreIndex?FindAll',function(data){
		$.each(data,function(index,item){
			var opt = $('<option>'+ item.IndexName +'</option>');
			opt.attr('value',item.Id);
			opt.attr('name',item.IndexName);
			$('#header select').append(opt);
		});

		indexs.preIndexId = data[0].Id;
		// indexs.startDate = new Date();
		// option.title.text = data[0].IndexName;

		getIndex(indexs.preIndexId);
	});
})