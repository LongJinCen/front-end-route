# front-end-route
单页面应用路由实现

## hash + hashchange事件
在 url 中, `#` 后面的所有值都被看做是 hash 值，`#` 号后面的值改变不会导致浏览器刷新。我们可以监听 hashchange 事件，然后根据 hash 值，去动态的替换内容，这就可以实现单页面应用的效果。代码如下:
```javascript
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
```

## history(pushstate | replaceState) + popstate事件
`pushState` 和 `replaceState`,它们分别可以添加和修改历史记录条目，这些方法通常与 `window.onpopstate` 配合使用
- pushState(state, '可选title', url) 不填 state 默认保存到当前 url
  - XMLHttpRequest 对象的 referrer 都会被改变
 
注意 pushState() 绝对不会触发 hashchange 事件，即使新的URL与旧的URL仅哈希不同也是如此。

- replaceState(state, '可选title', url)  区别在于 `replaceState()`  是修改了当前的历史记录项而不是新建一个
 
- popstate事件
  - 调用 history.pushState() 或者 history.replaceState() 不会触发 popstate 事件. popstate 事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在 JavaScript 中调用 history.back()、history.forward()、history.go() 方法).
