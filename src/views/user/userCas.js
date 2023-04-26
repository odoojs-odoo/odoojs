import api from '@/odoorpc'

import { casUrl, cascbUrl, myUrl, sso_cas } from '@/config/config'

// function sleep(millisecond) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, millisecond)
//   })
// }

export function useCasLogin(router) {
  async function cas_test() {
    console.log('cas login,')
    // await sleep(100)
    console.log('cas call back')
    // await sleep(100)
    const url = 'http://localhost:8080?ticket=st-123456'
    window.location.assign(url)
  }

  // eslint-disable-next-line no-unused-vars
  function _cas_login() {
    const url = `${casUrl}?service=${cascbUrl}`
    window.location.assign(url)
  }

  function cas_login() {
    console.log('cas_tiket', 'call cas login then call back')
    // _cas_login()
    cas_test()
  }

  async function callLogin(ticket) {
    const db = process.env.VUE_APP_ODOO_DB
    // db: database, login: username, password: password
    const info = await api.cas_login({ db, ticket })
    console.log('callLogin ok ', info)
    // await sleep(100)
    console.log('callLogin ok2 , router', router)
    window.location.assign(myUrl)
  }

  async function onCasCall() {
    if (!sso_cas) {
      return
    }
    const currentRoute = router.currentRoute.value
    const { query } = currentRoute

    const { ticket } = query
    console.log(router.currentRoute.value)
    console.log('onMounted', ticket)
    if (ticket) {
      console.log('onMounted11, cas_tiket', ticket)
      await callLogin(ticket)
      // const url = ''
      // window.location.assign(url)
    } else {
      const session = api.env.session
      // call odoo  check_sessoion
      if (!session) {
        const hasToken = await api.cas_session_check()
        if (!hasToken) {
          console.log('onMountedxxx9999x', 'call cas login', [hasToken])
          cas_login()
        } else {
          console.log('onMounted2', 'has session', [session])
        }
      } else {
        console.log('onMounted2', 'has session', [session])
      }
    }
  }

  return { sso_cas, onCasCall }
}
