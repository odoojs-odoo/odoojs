import { ODOO as ODOORPC } from '@/odoorpc'
import { ODOO as OdooJS } from './odoo.js'
import toolsAlias from './tools.js'

export const ODOO = OdooJS
export const tools = toolsAlias
export default { ODOO }

export const OdooCreater = (payload = {}) => {
  const { baseURL, debug = 0 } = payload
  tools.baseURL = baseURL
  tools.debug = debug
  return new OdooJS({ ODOORPC, ...payload })
}
