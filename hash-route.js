/**
 * route类，包括确定根节点和路由表，添加监听事件
 * @param {*} config 
 */

function HashRoute(config = {}) {
    this.app = config.root ? config.root : document.body
    this.routes = config.routes ? config.routes : []
    window.addEventListener('hashchange', this.loadRoute)
}

HashRoute.prototype = {
    bind: function (root) {
        this.app = root
    },
    push: function (route) {
        this.routes.push(route)
    },
    pop: function (route) {
        if (route.path === '/') return
        const url = route.path || window.location.hash.slice(1)
        if (window.location.hash.slice(1) === url) {
            this.redirect({
                path: '/'
            })
        }
        this.routes = this.routes.filter(value => value.path !== route.path)
    },
    redirect: function (route) {
        this.loadRoute(route)
    },
    /**
     * 挂载当前路由的组件到根节点当中
     * @param {*} route 
     */
    loadRoute: function (route) {
        const url = route.path || window.location.hash.slice(1) //这里是关键,取得 hash 后面的路径
        const { component } = this.routes.filter(value => value.path === url)[0]
        this.app.innerHTML = component
    }
}
const route = new HashRoute()
route.bind(document.getElementById('#app'))

route.push({
    path: '/path1',
    components: 'xxxx'
})

route.redirect({
    path: '/path1'
})

route.pop({
    path: '/path1'
})

/**
 * a 标签的 click 事件应该绑定这个函数
 * @param {*} e 
 */
function linkto(e) {
    const cur = e.target
    const url = cur.href.replace('file://', '')
    location.hash = url
}