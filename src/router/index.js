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
import Portal from '@/layout/portal'

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
        path: '/user/login',
        component: () => import('@/views/user'),
        name: 'user-login'
      }
    ]
  }
]

const portalRoutes = [
  {
    path: '/my',
    component: Portal,
    redirect: '/my/home',
    children: [
      {
        path: '/test/url',
        component: () => import('@/views/test/test_url'),
        name: '/test/url'
      },

      {
        path: '/my/home',
        component: () => import('@/views/my/home'),
        name: '/my/home'
      },
      {
        path: '/my/account',
        component: () => import('@/views/my/account'),
        name: '/my/account'
      },

      {
        path: '/my/security',
        component: () => import('@/views/my/security'),
        name: '/my/security'
      },

      {
        path: '/my/quotes',
        component: () => import('@/views/my/doc'),
        name: '/my/quotes'
      },
      {
        path: '/my/orders',
        component: () => import('@/views/my/doc'),
        name: '/my/orders'
      },
      {
        path: '/my/orders/:id',
        component: () => import('@/views/my/doc2'),
        name: '/my/orders/id'
      },
      {
        path: '/my/purchase',
        component: () => import('@/views/my/doc'),
        name: '/my/purchase'
      },
      {
        path: '/my/purchase/:id',
        component: () => import('@/views/my/doc2'),
        name: '/my/purchase/id'
      },
      {
        path: '/my/invoices',
        component: () => import('@/views/my/doc'),
        name: '/my/invoices'
      },
      {
        path: '/my/invoices/:id',
        component: () => import('@/views/my/doc2'),
        name: '/my/invoices/id'
      },
      {
        path: '/my/projects',
        component: () => import('@/views/my/doc'),
        name: '/my/projects'
      },
      {
        path: '/my/project/:id',
        component: () => import('@/views/my/doc2'),
        name: '/my/project/id'
      },
      {
        path: '/my/tasks',
        component: () => import('@/views/my/doc'),
        name: '/my/tasks'
      },
      {
        path: '/my/task/:id',
        component: () => import('@/views/my/doc2'),
        name: '/my/task/id'
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
        path: '/web2/:mod',
        component: () => import('@/views/web/web2'),
        name: '/web2/mod'
      },
      {
        path: '/test',
        component: () => import('@/views/test/test_rpc'),
        name: '/test'
      }
    ]
  }
]

const allRoutes = [...userRoutes, ...homeRoutes, ...portalRoutes]

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
