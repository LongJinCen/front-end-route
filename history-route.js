function HistoryRoute(config = {}) {
    this.app = config.root ? config.root : document.body
    this.routes = config.routes ? config.routes : []
    window.addEventListener('popstate', this.loadRoute)
}

HistoryRoute.prototype = {
    bind: function (root) {
        this.app = root
    },
    push: function (route) {
        this.routes.push(route)
    },
    pop: function (route) {
        if (route.path === '/') return
        const url = route.path || window.location.pathname
        if (url === window.location.pathname) {
            this.redirect({
                path: '/'
            })
        }
        this.routes = this.routes.filter(value => value.path !== url)
    },
    redirect: function (route) {
        this.loadRoute(route)
    },
    loadRoute: function (e) {
        const url = e.path || window.location.pathname // 直接取 pathname
        const { component } = this.routes.filter(value => value.path === url)[0]
        this.app.innerHTML = component
    }
}
const route = new HistoryRoute()
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
