import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: {
            name: 'login',
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/Login.vue'),
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/pages/Dashboard.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
