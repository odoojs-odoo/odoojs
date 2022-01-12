import Vue from 'vue'
import Router from 'vue-router'

import api from '@/odooapi'

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

const userRoutes = [
  {
    path: '/user',
    component: Space,
    children: [
      //   {
      //     path: '/test',
      //     component: () => import('@/views/test/test_rpc'),
      //     name: '/test'
      //   },
      {
        path: '/test/form',
        component: () => import('@/views/test/test_form'),
        name: '/test/form'
      },
      {
        path: '/test/table',
        component: () => import('@/views/test/test_table'),
        name: '/test/table'
      },

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
        path: '/web',
        component: () => import('@/views/web'),
        name: '/web'
      },
      {
        path: '/test',
        component: () => import('@/views/test/test_rpc'),
        name: '/test'
      }
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
  // console.log('beforeEach, 1  ', to, from)
  const whiteList = ['/user/login', '/test']
  if (whiteList.includes(to.path)) {
    next()
    return
  }

  const get_info = async () => {
    const { session } = from.meta
    if (session) return from.meta
    else return await api.web.get_session()
  }

  const info = await get_info()

  if (info)
    Object.keys(info).forEach(item => {
      to.meta[item] = info[item]
    })

  if (!info) {
    next(`/user/login?redirect=${to.path}`)
    return
  }

  next()
  return
})

export default router
