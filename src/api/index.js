import { ODOO as ODOORPC } from '@/odoorpc'
import { ODOO as ODOOJS } from '@/odoojs'

// const baseURL = 'http://192.168.56.103:8069'
// const baseURL = 'http://192.168.56.103/odoo'
const baseURL = process.env.VUE_APP_BASE_API

const menuLoad = process.env.VUE_APP_MENU_LOAD

export const api = new ODOOJS({ baseURL, menuLoad, ODOORPC })

export default api
