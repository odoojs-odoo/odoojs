import { OdooCreater } from '@/odoojs'

// const baseURL = 'http://192.168.56.103:8069'
// const baseURL = 'http://192.168.56.103/odoo'
const baseURL = process.env.VUE_APP_BASE_API

const is_mobile2 = process.env.VUE_APP_IS_MOBILE
// 环境变量 都是字符串,
const is_mobile = is_mobile2 ? eval(is_mobile2) : false
const debug = 0
export const api = OdooCreater({ baseURL, is_mobile, debug })

export default api
