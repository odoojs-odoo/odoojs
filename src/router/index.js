import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import { get_menu } from './menu'
const _import = require('./import.js')

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  // login
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '/login',
        component: () => import('@/views/login/index'),
        name: 'login',
        meta: { title: 'false' } // 登录页不显示标题
        // meta: { title: 'SIGN IN', left: false }
      }
    ]
  },

  // Home
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    // redirect: '/sport/home',
    // redirect: '/sport/web/league-list',

    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: { title: 'Home', left: false }
      },
      {
        path: '/home/test',
        component: () => import('@/views/home/test'),
        name: 'Home-test',
        meta: { title: 'test', left: false }
      }
    ]
  }

  // odoo
  // {
  //   path: '/odoo',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/odoo/list/resBank',
  //       component: () => import('@/views/odoo/listPage'),
  //       name: 'List-resBank',
  //       meta: { name: resBank, title: '银行',  }
  //     },
  //     {
  //       path: '/odoo/view/resBank',
  //       component: () => import('@/views/odoo/viewPage'),
  //       name: 'View-resBank',
  //       meta: { name: resBank, title: '银行',  }
  //     },
  //     {
  //       path: '/odoo/form/resBank',
  //       component: () => import('@/views/odoo/formPage'),
  //       name: 'Form-resBank',
  //       meta: { name: resBank, title: '银行',  }
  //     },
  //   ]
  // },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

// 这里导入 api model 自动创建的菜单
const getOdooRouter = (menus) => {
  const pages = menus.reduce((acc, item) => {
    Object.keys(item.files).forEach((inner) => {
      acc.push({
        path: item.paths[inner],
        component: _import(`${item.files[inner]}`) || null,
        // component: () => import('@/views/odoo/listPage'),
        name: `${inner}-${item.name}`,
        meta: item
      })
    })

    return acc
  }, [])

  // console.log('menu', pages)

  return {
    path: '/odoo',
    component: Layout,
    children: [...pages]
  }
}

// 创建路由
const createRouter = () => {
  const menus = get_menu()

  const odooRouter = getOdooRouter(menus)
  console.log('menus, odooRouter', menus, odooRouter)

  // constantRoutes 在上面定义, 那是定义路由的地方
  // 这里把自动创建的路由 merge到一起
  // 注意 自动创建的路由 的命名规则
  // 在 constantRoutes 里的 路由 不要 与 自动创建的重名
  //
  const routers = [...constantRoutes, odooRouter]

  return new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routers
    // routes: [...constantRoutes]
    // routes: [...constantRoutes, odooRouter]
  })
}

const router = createRouter()

// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router
