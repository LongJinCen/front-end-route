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
    loadRoute: function (route) {
        const url = route.path || window.location.hash.slice(1)
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