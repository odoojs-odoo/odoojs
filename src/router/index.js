import { createRouter } from 'vue-router'
import { createWebHashHistory } from 'vue-router'

import BaseLayout from '@/layout/BaseLayout'
import SpaceLayout from '@/layout/SpaceLayout'

import webRoutes from './web_routes'
import api from '@/odoorpc'
import { sso_cas } from '@/config/config'

const userRoutes = [
  {
    path: '/user',
    component: SpaceLayout,
    children: [
      {
        path: '/user/login',
        component: () => import('@/views/user/LoginPage3'),
        name: 'user-login'
      }
    ]
  }
]
// const RootRoutes = [
//   {
//     path: '/',
//     component: () => import('@/views/home/HomePage'),
//     name: 'home'
//   }
// ]

const homeRoutes = [
  {
    path: '/',
    component: BaseLayout,
    redirect: '/home',

    children: [
      {
        path: '/home',
        component: () => import('@/views/home/HomePage'),
        name: 'home'
      },
      {
        path: '/error',
        component: () => import('@/views/home/error'),
        name: 'error'
      },
      ...webRoutes
    ]
  }
]

const allRoutes = [...userRoutes, ...homeRoutes]

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes: allRoutes
})

router.beforeEach(async (to, from, next) => {
  const whiteList = ['/user/login']

  if (whiteList.includes(to.path)) {
    next()
    return
  }

  const hasToken = await api.session_check(sso_cas)

  if (hasToken) {
    next()
    return
  } else {
    next(`/user/login?redirect=${to.path}`)

    return
  }
})

export default router
