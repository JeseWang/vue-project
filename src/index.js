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
 		// 指数列表
 		items: [],
 		// 临时储存
 		item:{
 			Id:'',
 			StartDate:'',
 			EndDate:'',
 			IndexName:'',
 			IndexNum:'',
 			ComName:''

 		},
 		// 指数详情列表顶部展示
 		itemInfo: '',
 		// 指数详情公司列表
 		comItems:[],
 		// 所有公司列表
 		comList:[],
 		loginUrl:'/api/user?',

 		loginModel:{
 			phone:'',
 			password:'',
 		},
 		msg:'',
 		userName:'',
 		passWord:'',
 		// 是否登陆标识
 		islogin:''
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
 				},
 				error:function(){
 					alert('您输入的内容有误！')
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
 			var vm = this;
 			$('#indexInfo').show().siblings().hide();
 			vm.itemInfo = item;

 			$.ajax({
 				url:'/api/GIPreIndexProject?FindAll&'+'preIndexId='+item.Id,
 				type:'get',
 				success:function(data){
 					vm.comItems = data;
 					console.log('指数详情获取成功')
 				}
 			})
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
 					vm.islogin = data;
 					vm.userName = vm.loginModel.phone;
 					sessionStorage.setItem('userPhone',vm.loginModel.phone);
 					sessionStorage.setItem('islogin',data);
 					$.get('/Api/GIPreIndex?FindAll',function(data){
			 			vm.items = data;
			 			console.log('获取数据成功')
		 			})
 				},
 				error: function(){
 					this.msg = '登陆失败';
 					alert(vm.msg);
 				}
 			});

 		},

 		// 期初指数按钮
 		openIndex:function(){
 			if(this.islogin=='ok'){
 				// $('#eCharts').show();
 				$('#openIndex').show().siblings().hide();
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
 		// 显示企业列表
 		showComList:function(){
 			var vm = this;
 			$('#companyList').toggle(100);
 			$.get('/api/GIProject?FindAll&searchName',function(data){
 				vm.comList = data;
 			})
 		},
 		addCompany:function(item){
 			var vm = this;
 			item = {
 				Id:'',
 				PreIndexId: vm.itemInfo.Id,
 				ProjectId: item.ProjectId,
 				ProjectName: item.ProjectName
 			};
 			$.post('/api/GIPreIndexProject',item,function(data){
 				vm.comItems.push(data);
 				console.log('添加成功')
 			})
 		},
 		quitCompany:function(item){
 			var vm = this;
 			$.get('/api/GIPreIndexProject?StopById&Id='+ item.Id,function(data){
 				item.OutDate = data.OutDate;
 				console.log('退出成功')
 			})
 		}
 	}
 })