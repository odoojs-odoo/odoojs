import rpc from '@/odoorpc'

import { JsonRequest } from '@/odoorpc/request'

import py_utils from '../py_utils'

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

export const Kanban_Image = (model, field, res_id) => {
  // const kanban_image('res.partner', 'image_128', record.id.raw_value)

  const baseURL = JsonRequest.baseURL

  const imgUrl = '/web/image'
  const now = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
  const url = `${baseURL}${imgUrl}?model=${model}&id=${res_id}&field=${field}&unique=${now}`

  return url
}

export const Eval_Context = (info, { str: value_str, record }) => {
  // console.log('eval safe', value_str, record)
  /*
    // #  使用
  
    // # 在多公司时, 用户可能 用 allowed_company_ids 中的一个
    // # 允许 用户 在前端 自己在 allowed_company_ids 中 选择 默认的公司
    // # 该选择 需要 存储在 本地 config 中
  
    // #  全部 odoo 只有这4个 模型 在获取 fields_get时, 需要提供 globals_dict, 设置 domain
    // #  其余的只是需要 company_id
    // #  --- res.partner
    // #  <-str---> state_id [('country_id', '=?', country_id)]
  
    // #  --- sale.order.line
    // #  <-str---> product_uom [('category_id', '=', product_uom_category_id)]
  
    // #  --- purchase.order.line
    // #  <-str---> product_uom [('category_id', '=', product_uom_category_id)]
  
    // #  --- stock.move
    // #  <-str---> product_uom [('category_id', '=', product_uom_category_id)]
    */

  const domain = value_str || false
  if (!domain || typeof domain !== 'string') return domain

  const _get_values_for_domain = () => {
    const allowed_company_ids = rpc.web.session.allowed_company_ids
    const current_company_id = rpc.web.session.current_company_id
    const values0 = record
    const values = { ...values0, allowed_company_ids, current_company_id }

    if (!values.company_id) values.company_id = current_company_id

    // const from_model = this.record_one && this.record_one.from_model
    // if (from_model) values.parent = from_model.values_modifiers

    // TODO: values.parent

    return values
  }

  const values = _get_values_for_domain()

  const { context } = info
  const globals_dict = {
    // TODO: res_model_id
    // res_model_id: this.Model._model_id,
    //
    context,
    ...values,
    active_id: record.id
  }

  // TODO: edit
  // if (!is_virtual_id(row_id)) {
  //   globals_dict.active_id = row_id || false
  //   globals_dict.id = row_id || false
  // }

  // console.log('xxxx, model, eval,', value_str, cp(globals_dict))
  // console.log('xxxx, model, eval,', cp(domain), cp(globals_dict))
  const domain2 = py_utils.eval(domain, globals_dict)
  // console.log('xxxx, model, eval,', domain2)
  return domain2
}
