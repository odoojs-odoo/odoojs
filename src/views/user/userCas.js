import api from '@/odoorpc'
import { cas_server, sso_cas } from '@/config/config'
import { computed } from 'vue'

// function sleep(millisecond) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, millisecond)
//   })
// }

export function useCasLogin(router) {
  const service_url = computed(() => {
    const origin = window.location.origin
    const pathname = window.location.pathname
    const hash = window.location.hash
    return `${origin}${pathname}${hash}`
  })

  async function cas_login() {
    console.log('cas_login', cas_server, window.location.href)
    const service = service_url.value
    const url = `${cas_server}/login?service=${service}`
    console.log('cas_login', url)

    window.location.assign(url)
  }

  async function call_odoo_login(ticket) {
    const service = service_url.value
    const server = cas_server
    const db = process.env.VUE_APP_ODOO_DB
    // console.log('call_odoo_login todo ', server, service)

    // const info =
    await api.cas_login({ db, server, service, ticket })

    window.location.assign(service)
  }

  async function onCasCall() {
    if (!sso_cas) {
      return
    }

    const ticket = get_ticket()
    console.log([ticket])

    console.log('onMounted', ticket)
    if (ticket) {
      console.log('onMounted11, cas_tiket', ticket)
      await call_odoo_login(ticket)
      // const url = ''
      // window.location.assign(url)
    } else {
      const session = api.env.session
      // call odoo  check_sessoion
      if (!session) {
        const hasToken = await api.cas_session_check()
        if (!hasToken) {
          console.log('call cas_login')
          cas_login(window.location.href)
        } else {
          console.log('onMounted2', 'hasToken', [hasToken])
          router.push({ path: '/' })
        }
      } else {
        console.log('onMounted2', 'has session', [session])
      }
    }
  }

  function get_ticket() {
    // alert(window.location)
    // http://localhost:8081/?ticket=123#/
    // console.log(window.location, typeof window.location)
    // console.log(search, typeof search)

    const search = window.location.search
    if (!search) {
      return
    }

    const query = search
      .slice(1)
      .split('&')
      .reduce((acc, cur) => {
        const [key, val] = cur.split('=')
        acc[key] = val
        return acc
      }, {})

    return query.ticket
  }

  return { sso_cas, onCasCall }
}
