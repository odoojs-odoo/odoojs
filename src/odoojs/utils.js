export const image2url = (model, res_id, field) => {
  const baseURL = process.env.VUE_APP_BASE_API
  const imgUrl = '/web/image'
  if (!res_id) {
    return ''
  }
  return `${baseURL}${imgUrl}?model=${model}&id=${res_id}&field=${field}`
}

export const new_list = len => {
  return Array.from(new Array(len).keys())
}

export const is_node = node => {
  if (typeof node !== 'object') {
    return false
  }
  if (Array.isArray(node)) {
    return false
  }
  if (typeof node === 'boolean') {
    return false
  }
  return true
}

export const is_virtual_id = id_ => {
  return typeof id_ === 'string' && id_.slice(0, 8) === 'virtual_'
}

export const get_cookie = function(c_name) {
  var cookies = document.cookie ? document.cookie.split('; ') : []
  for (var i = 0, l = cookies.length; i < l; i++) {
    var parts = cookies[i].split('=')
    var name = parts.shift()
    var cookie = parts.join('=')

    if (c_name && c_name === name) {
      return cookie
    }
  }
  return ''
}

export const set_cookie = function(name, value, ttl) {
  ttl = ttl || 24 * 60 * 60 * 365
  document.cookie = [
    name + '=' + value,
    'path=/',
    'max-age=' + ttl,
    'expires=' + new Date(new Date().getTime() + ttl * 1000).toGMTString()
  ].join(';')
}

export function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

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

// export const model_odoo2vuex = name =>
//   name
//     .replace(/(\.|^)[a-z]/g, L => L.toUpperCase())
//     .replace(/\./g, '')
//     .replace(/( |^)[A-Z]/g, L => L.toLowerCase())

// export const model_vuex2odoo = name =>
//   name.replace(/[A-Z]/g, L => `.${L.toLowerCase()}`)
