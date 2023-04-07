import { createRouter } from 'vue-router'
import { createWebHashHistory } from 'vue-router'

import BaseLayout from '@/layout/BaseLayout'
import SpaceLayout from '@/layout/SpaceLayout'

import webRoutes from './web_routes'
import api from '@/odoorpc'

const userRoutes = [
  {
    path: '/user',
    component: SpaceLayout,
    children: [
      {
        path: '/user/login',
        component: () => import('@/views/user/loginPage'),
        name: 'user-login'
      }
    ]
  }
]

const homeRoutes = [
  {
    path: '/',
    component: BaseLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home'),
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
  routes: allRoutes
})

router.beforeEach(async (to, from, next) => {
  const whiteList = ['/user/login', '/test']
  if (whiteList.includes(to.path)) {
    next()
    return
  }

  const hasToken = await api.web.session_check()

  if (hasToken) {
    next()
    return
  } else {
    next(`/user/login?redirect=${to.path}`)
    return
  }
})

export default router
