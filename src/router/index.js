import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
}, {
    path: '/login',
    component: Login
}, {
    path: '/home',
    component: Home
}]

const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })
    // 挂载全局导航守卫
    // to从哪来，from到哪去，next()函数，如果未登录，就跳到登录页，如果登录了，选择哪个页面跳到哪个页面
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        return next()
    }
    const tokenstr = window.sessionStorage.getItem('token')
    if (!tokenstr) {
        return next('/login')
    }
    next()
})
export default router