import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// const originalPush = Router.prototype.push
// const originalReplace = Router.prototype.replace
// // push
// Router.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject)
//     return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => {
//     console.log(err)
//     originalReplace.call(this, location)
//   })
// }
// // replace
// Router.prototype.replace = function push(location, onResolve, onReject) {
//   if (onResolve || onReject)
//     return originalReplace.call(this, location, onResolve, onReject)
//   return originalReplace.call(this, location).catch(err => {
//     console.log(err)
//     originalReplace.call(this, location)
//   })
// }

import Layout from '@/layout'
import Space from '@/layout/space'

import webRoutes from './web_routes'

import api from '@/odoorpc'

const userRoutes = [
  {
    path: '/user',
    component: Space,
    children: [
      {
        path: '/user/login',
        component: () => import('@/views/user'),
        name: 'user-login'
      }
    ]
  }
]

const homeRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home'),
        name: 'home'
      },

      {
        path: '/test',
        component: () => import('@/views/test/test_rpc'),
        name: '/test'
      },

      ...webRoutes
    ]
  }
]

const allRoutes = [...userRoutes, ...homeRoutes]

const createRouter = () => {
  const routers = [...allRoutes]
  return new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: routers
  })
}

const router = createRouter()

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
