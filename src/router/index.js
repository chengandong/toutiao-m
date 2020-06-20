import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store/'

import { Dialog } from 'vant'

Vue.use(VueRouter)

// 配置 路由规则
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/'),
    meta: { requiresAuth: false } // 路由元信息
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // path 为空，会默认 指向子路由
        name: 'home',
        component: () => import('@/views/home/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/'),
        meta: { requiresAuth: false }
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/'),
    meta: { requiresAuth: false }
  },
  {
    // 采用路径传参
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    props: true, // 如果 props 被设置为 true，route.params 将会被设置为组件属性。
    meta: { requiresAuth: false }
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile/'),
    meta: { requiresAuth: false }
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat/'),
    meta: { requiresAuth: true }
  },
  // 用户主页
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('@/views/user/'),
    props: true,
    meta: { requiresAuth: false }
  },
  // 用户关注 | 粉丝
  {
    path: '/user/:userId/follow',
    name: 'user-follow',
    component: () => import('@/views/user-follow'),
    props: true,
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 判断 页面是否需要 登录来访问
  if (to.meta.requiresAuth) {
    // 如果已登录,直接通过
    if (store.state.user) {
      return next()
    }

    // 没有登录,提示是否登录
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录使用,确认登录嘛？'
    }).then(() => {
      // on confirm
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => {
      // on cancel
      next(false) // 中断当前的导航
    })
  } else {
    // 不需要登录的状态 直接过去
    next()
  }
})

export default router
