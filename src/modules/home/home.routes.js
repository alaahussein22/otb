export default [
	{
		path: '/',
		component: () => import('./pages/Index.vue'),
		name: 'home',
		meta: {
			layout: 'DashboardLayout'
		}
	},
];
