var vm = new Vue({

 	el: '#app',

 	ready:function(){
 		this.userName = sessionStorage.getItem('userPhone');
 		this.islogin = sessionStorage.getItem('islogin');
 		if(this.islogin == 'ok'){
			$.get('/Api/GIPreIndex?FindAll',function(data){
	 			vm.items = data;
	 			console.log('初始化数据成功')
 			})
		}
 	},

 	data:{
 		items: [],
 		item:{
 			Id:'',
 			StartDate:'',
 			IndexName:'',
 			IndexNum:''
 		},
 		loginUrl:'/api/user?',

 		loginModel:{
 			phone:'',
 			password:'',
 		},
 		msg:'',
 		userName:'',
 		passWord:'',
 		islogin:''
 	},

 	computed:{
 		
 	},

 	methods:{
 		// 添加指数
 		addIndex:function(){
			var vm = this;
 			$.ajax({
 				url: '/api/GIPreIndex',
 				type: 'POST',
 				data: vm.item,
 				success:function(data){
 					vm.item.Id = data.Id;
 					vm.items.push(vm.item);
 					console.log('添加成功');
 					vm.item = '';
 				}
 			})
 		},
 		// 删除指数
 		deleteIndex:function(item){
 			var vm = this;
 			$.ajax({
 				url: '/api/GIPreIndex?DelById&id=' + item.Id,
 				type: 'get',
 				success:function(data){
 					vm.items.$remove(item)
 					console.log('删除成功！')
 				}
 			})
 			
 		},
 		// 修改指数
 		changeIndex:function(item){
 			var et = $(event.target);
 			if(et.text() == '修改'){
 				et.text('保存')
 				et.parents('tr').find('input').removeAttr('disabled');
 			}else{
 				$.post('/api/GIPreIndex',item,function(){
 					et.text('修改')
 					et.parents('tr').find('input').attr('disabled','disabled');
	 				console.log('修改成功')
	 			})
 			};
 			
 		},
 		// 指数详情
 		indexInfo:function(item){
 			console.log(item)
 		},

 		// 登陆按钮
 		signIndex:function(){
 			// $('#signIn').show();
 		},
 		// 登陆页面确认登陆
 		login:function(){
 			var vm = this;
 			vm.msg = '';
 			vm.result = '';

 			$.ajax({
 				url: vm.loginUrl + 'phone=' + vm.loginModel.phone + '&password=' + vm.loginModel.password,
 				type:'POST',
 				data: vm.loginModel,
 				success: function(data){
 					vm.msg = '登陆成功！';
 					alert(vm.msg)
 					vm.islogin = data;
 					vm.userName = vm.loginModel.phone;
 					sessionStorage.setItem('userPhone',vm.loginModel.phone);
 					sessionStorage.setItem('islogin',data);
 					$.get('/Api/GIPreIndex?FindAll',function(data){
			 			vm.items = data;
			 			console.log('获取数据成功')
		 			})
 				},
 				error: vm.requestError
 			});

 		},
 		requestError: function(xhr,errorType,error){
 			this.msg = '登陆失败';
 			alert(this.msg);
 		},

 		// 期初指数按钮
 		openIndex:function(){
 			if(this.islogin=='ok'){
 				$('#eCharts').show();
 			}
 		},
 		// 关闭按钮
 		close:function(){
 			$('#eCharts').hide();
 		},
 		// 同步指数按钮
 		upData:function(){
 			// location.reload();
 			console.log(this.items)
 		},

 	}
 })