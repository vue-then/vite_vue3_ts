import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../pages/Home.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: {
            name: 'dashboard',
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/Login.vue'),
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue")
            }
        ]
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
