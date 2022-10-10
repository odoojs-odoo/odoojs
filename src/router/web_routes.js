import { Addons } from '@/odoorpc/ui/action'
import { addons_list, components } from '@/config/config'

const actions = Addons.load(addons_list).actions

const default_component = () => import('@/components/OView/WebView')

const routers = Object.keys(actions).reduce((acc, act) => {
  const one = actions[act]
  const xml_id = one.xml_id
  const path = ['', 'web', ...xml_id.split('.')].join('/')

  const component = components[act] || default_component

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
