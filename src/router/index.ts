import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
Vue.use(VueRouter)
// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpaclChunkName:login */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import(/* webpaclChunkName:home */ '@/views/home/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpaclChunkName:advert */ '@/views/advert/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpaclChunkName:course */ '@/views/course/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpaclChunkName:menu */ '@/views/menu/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpaclChunkName:role */ '@/views/role/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpaclChunkName:user */ '@/views/user/index.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpaclChunkName:resource */ '@/views/resource/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpaclChunkName:advert-space */ '@/views/advert-space/index.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpaclChunkName:404 */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
