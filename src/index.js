var vm = new Vue({

 	el: '#app',

 	ready:function(){
 		this.userName = sessionStorage.getItem('userName');
 		if(this.userName){
 				this.islogin = false;
 				$.ajax({
 					type:'get',
 					url:'http://127.0.0.1:8080/indexs.json',
 					success:function(data){
 						console.log('111')
 						vm.items = data
 					}
 				});
 			
 			}
 		
 	},

 	data:{
 		items: [],
 		item:{
 			id:'',
 			name:'',
 			date:'',
 			index:''
 		},
 		loginUrl:'',
 		loginModel:{
 			username:'',
 			password:'',
 			grant_type:'password'
 		},
 		msg:'',
 		userName:'',
 		passWord:'',
 		islogin:true
 	},

 	computed:{
 		
 	},

 	methods:{
 		// 添加指数
 		addIndex:function(item){
 			this.items.push(this.item);
 			this.item = '';
 		},
 		// 删除指数
 		deleteIndex:function(item){
 			this.items.$remove(item)
 		},
 		// 修改指数
 		changeIndex:function(item){
 			str = $(event.target).text()=="修改"?"保存":"修改"
 			$(event.target).text(str);
 			if($(event.target).text()=="保存"){
 				$(event.target).parents('tr').find('input').removeAttr('disabled');
 			}else{
 				$(event.target).parents('tr').find('input').attr('disabled','disabled');
 			}
 		},
 		// 登陆按钮
 		signIndex:function(){
 			$('#signIn').show();
 		},
 		// 登陆页面确认登陆
 		login:function(){

 			var vm = this;
 			vm.msg = '';
 			vm.result = '';

 			vm.userName = vm.loginModel.username
 			sessionStorage.setItem('userName',vm.loginModel.username);
 			sessionStorage.setItem('passWord',vm.loginModel.password);

 			
 			$.ajax({
 				url: vm.loginUrl,
 				type:'POST',
 				dataType:'json',
 				data: vm.loginModel,
 				success: function(data){
 					vm.msg = '登陆成功！';
 					vm.userName = data.userName;
 					sessionStorage.setItem('userName',vm.userName);
 					sessionStorage.setItem('accessToken',data.access_token);
 				},
 				error: vm.requestError
 			});
 		},
 		requestError: function(xhr,errorType,error){
 			this.msg = '登陆失败';
 			if(vm.userName){
 				vm.islogin = false
 				$.get('http://127.0.0.1:8080/indexs.json',function(data){
		 			vm.items = data;
		 		})
 			}
 		},

 		// 期初指数按钮
 		openIndex:function(){
 			if(!this.islogin){
 				$('#eCharts').show();
 			}
 		},
 		// 关闭按钮
 		close:function(){
 			$('#eCharts').hide();
 		},
 		// 同步指数按钮
 		upData:function(){
		 	$.get('http://127.0.0.1:8080/indexs.json',{},function(res){
				console.log('123')
			});
 		},

 	}
 })