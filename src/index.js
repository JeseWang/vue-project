const Main = {template: '#main'};
const OpenIndex = {template: '#openIndex'};
const AddIndex = {template: '#addIndex'};

const routes = [
	{path: '/main',component: Main},
	{path: '/openIndex',component: OpenIndex},
	{path: '/addIndex',component: AddIndex}
];

const router = new VueRouter({
	routes
});

const app = new Vue({
	router
}).$mount('#app');
