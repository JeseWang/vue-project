var vm = new Vue({
 	el: '#app',
 	ready:function(){
 		$.get('https://api.myjson.com/bins/r8mm',function(data){
 			vm.items = data;
 		})
 	},
 	data:{
 		signIn:false,
 		items: [],
 		item:{
 			id:'',
 			name:'',
 			date:'',
 			index:''
 		}
 	},
 	computed:{
 		
 	},
 	methods:{
 		addIndex:function(item){
 			this.items.push(this.item);
 			this.item = '';
 		},
 		deleteIndex:function(item){
 			this.items.$remove(item)
 		},
 		changeIndex:function(item){
 			str = $(event.target).text()=="修改"?"保存":"修改"
 			$(event.target).text(str);
 			if($(event.target).text()=="保存"){
 				$(event.target).parents('tr').find('input').removeAttr('disabled');
 			}else{
 				$(event.target).parents('tr').find('input').attr('disabled','disabled');
 			}
 		},
 		signIndex:function(){
 			this.signIn = true;
 		},
 		openIndex:function(){
 			$('#eCharts').show()
 		},
 		close:function(){
 			$('#eCharts').hide()
 		},
 		upData:function(){
 			location.reload();
 		}
 	}
 })