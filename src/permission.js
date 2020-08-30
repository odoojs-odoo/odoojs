import router from './router'
import store from './store'

import { getToken } from '@/utils/auth' // get token from cookie

const whiteList = [
  '/login', //
  '/user/register',
  '/user/resetpsw'
] // no redirect whitelist

// eslint-disable-next-line space-before-function-paren
router.beforeEach(async (to, from, next) => {
  // console.log('xxxx,beforeEach 1 ')
  // await store.dispatch('header/set', to.meta)

  // determine whether the user has logged in
  const hasToken = getToken()
  // console.log('hasToken,', hasToken)

  if (hasToken) {
    // console.log('hasToken, to, ', to)
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // console.log('hasToken, login redirect to the home page, ', to)
      // next({ path: '/' })
      next()
    } else {
      try {
        // console.log('hasToken,  check token 1st', to)
        // 发一个网络请求, 回 session info
        await store.dispatch('user/getSessionInfo')
        // console.log('hasToken, check token no error. go not login, ', to)
        next()
      } catch (error) {
        // remove token and go to login page to re-login
        // console.log('hasToken,  check token, has error', to)
        await store.dispatch('user/resetToken')
        // console.log('hasToken,  check token, has error, go to path login', to)
        next('/login')
      }
    }
  } else {
    /* has no token*/
    console.log('has no token', to.path)
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      // console.log('has no token, in whitelist', to.path)
      next()
    } else {
      // console.log('has no token, not in whitelist', to.path)
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {})
