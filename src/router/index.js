import Vue from 'vue'
import Router from 'vue-router'

import api from '@/api'

Vue.use(Router)

const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => {
    console.log(err)
    originalReplace.call(this, location)
  })
}
// replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => {
    console.log(err)
    originalReplace.call(this, location)
  })
}

import Layout from '@/layout'
import Space from '@/layout/space'

import { menus as local_menus } from '@/layout/menu'

import { webActions } from './actions'

const userRoutes = [
  // user
  {
    path: '/user',
    component: Space,
    children: [
      {
        path: '/test',
        component: () => import('@/views/test/test_rpc'),
        name: '/test'
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
  // Home
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home'),
        name: 'home'
      }
    ]
  }
]

const get_routes = menus => {
  return menus.reduce((acc, menu) => {
    // console.log(menu)
    if (!menu.children) {
      acc[menu.name] = 1
      return acc
    } else {
      acc = { ...acc, ...get_routes(menu.children) }
      return acc
    }
  }, {})
}

const routes = get_routes(local_menus)

const webRoutesChildren = Object.keys(routes).reduce((acc, action) => {
  const acts = webActions[action] || {}

  acc.push({
    path: `/web/${action}/list`,
    component: () => import('@/views/listview'),
    ...(acts.list || {}),
    name: `/web/${action}/list`,
    meta: { name: action, ...(acts.meta || {}) }
  })

  acc.push({
    path: `/web/${action}/form`,
    component: () => import('@/views/formview'),
    ...(acts.form || {}),
    name: `/web/${action}/form`,
    meta: { name: action, ...(acts.meta || {}) }
    // meta: routes[action]
  })

  return acc
}, [])

// console.log(webRoutesChildren)

const webResRoutes = [
  {
    path: '/web',
    component: Layout,
    children: webRoutesChildren
  }
]

const allRoutes = [
  //
  ...userRoutes,
  ...homeRoutes,
  ...webResRoutes
]

// 创建路由
const createRouter = () => {
  return new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: allRoutes
  })
}

const router = createRouter()

router.beforeEach(async (to, from, next) => {
  // console.log('beforeEach, 1  ')
  const whiteList = ['/user/login', '/test']
  if (whiteList.includes(to.path)) {
    next()
    return
  }
  // console.log('beforeEach, 12  ')
  const hasToken = await api.session_check()
  if (!hasToken) {
    next(`/user/login?redirect=${to.path}`)
    return
  }

  // console.log('beforeEach, 13 ')
  if (api.menu_is_set) {
    next()
    return
  }

  // console.log('beforeEach, 14  ', JSON.parse(JSON.stringify(api.menu.actions)))

  api.menu.actions.forEach(item => {
    const action = item.name

    const route = {
      path: `/web/${action}`,
      component: Layout,
      children: [
        {
          path: `/web/${action}/list`,
          component: () => import('@/views/listview'),
          name: `/web/${action}/list`,
          meta: item
        },
        {
          path: `/web/${action}/form`,
          component: () => import('@/views/formview'),
          name: `/web/${action}/form`,
          meta: item
        }
      ]
    }

    router.addRoute('/web', route)
  })

  // console.log('beforeEach, 15  ', to, from)

  api.menu_is_set = true
  next(to)
  return
})

router.afterEach(() => {})

export default router
