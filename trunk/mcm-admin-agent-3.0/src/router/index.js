/**
*  author pzh
*  day  2017-9-14
*  主页路由配置
*/
const indexView = r => require.ensure([], () => r(require('../view/index/index')), 'Index')

const router = [
	{
		name : "index.index",
		path : "/index",
		component : indexView
	}
]

export default{
	router
}