import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/user',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/User.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/singer',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Singer.vue'),
                    meta: { title: '歌手管理' }
                },
                {
                    path: '/ablum',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Ablum.vue'),
                    meta: { title: '专辑管理' }
                },
                {
                    path: '/ai',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Ai.vue'),
                    meta: { title: 'AI参数调整' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
