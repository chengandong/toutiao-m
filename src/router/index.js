import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置 路由规则
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // path 为空，会默认 指向子路由
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video/')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/')
  },
  {
    // 采用路径传参
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    props: true // 如果 props 被设置为 true，route.params 将会被设置为组件属性。
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile/')
  }
]

const router = new VueRouter({
  routes
})

export default router
