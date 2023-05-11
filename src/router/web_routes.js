import api from '@/odoorpc'

import { baseURL, timeout, messageError, addons_dict } from '@/config/config'

import { modules_installed } from '@/config/config'

api.init({ baseURL, timeout, messageError, addons_dict, modules_installed })

const actions = api.all_actions

const default_component = () => import('@/components/OView/WebView')

const routers = Object.keys(actions).reduce((acc, act) => {
  const one = actions[act]
  const xml_id = one.xml_id
  const path = ['', 'web', ...xml_id.split('.')].join('/')
  const component = default_component
  acc[act] = { path, component, name: path }

  return acc
}, {})

const default_routers = [
  // {
  //   path: '/web',
  //   component: default_component,
  //   name: '/web'
  // }
]

export default [...default_routers, ...Object.values(routers)]
