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
        component: () => import('@/views/user/LoginPage'),
        name: 'user-login'
      }
    ]
  }
]

const echartsRoutes = [
  {
    path: '/echarts',
    component: BaseLayout,
    redirect: '/echarts/ctrl',
    children: [
      {
        path: '/echarts/ctrl',
        component: () => import('@/views/echarts/EchartsCtrl'),
        name: '/echarts/ctrl'
      },
      // {
      //   path: '/echarts/examples',
      //   component: () => import('@/views/echarts/EchartsExamples'),
      //   name: '/echarts/examples'
      // },
      {
        path: '/echarts/type',
        component: () => import('@/views/echarts/EchartsType'),
        name: '/echarts/type'
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

const allRoutes = [...userRoutes, ...homeRoutes, ...echartsRoutes]

const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes
})

router.beforeEach(async (to, from, next) => {
  // console.log(to, from)

  const whiteList = [
    '/user/login',
    '/echarts/examples',
    '/echarts/ctrl',
    '/echarts/type'
  ]

  if (whiteList.includes(to.path)) {
    next()
    return
  }

  const hasToken = await api.session_check()

  if (hasToken) {
    next()
    return
  } else {
    next(`/user/login`)

    return
  }
})

export default router
