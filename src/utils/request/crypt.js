import jsrsasign from 'jsrsasign'
import CryptoJS from 'crypto-js/crypto-js'

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */

function parseTime(time, cFormat) {
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

const SIGNATURE = '_signature_'

const sort_for_value = (value = {}) => {
  if (Array.isArray(value)) {
    return value.map(item => sort_for_value(item))
  } else if (typeof value === 'object') {
    return sort_by_key(value)
  } else {
    return value
  }
}

const sort_by_key = (obj = {}) => {
  return Object.keys(obj)
    .sort()
    .reduce((acc, cur) => {
      acc[cur] = sort_for_value(obj[cur])
      return acc
    }, {})
}

const import_key = type => {
  return new Promise(function(resolve, reject) {
    const requestURL = `/${type}-key.pem`
    const request = new XMLHttpRequest()
    request.open('GET', requestURL, true)
    request.overrideMimeType('text/html;charset=utf-8')
    request.send()

    request.onload = function() {
      const res = request.response
      resolve(res)
    }
  })
}

const get_signature = (text, key) => {
  const sig = new jsrsasign.KJUR.crypto.Signature({
    alg: 'SHA256withRSA',
    prov: 'cryptojs/jsrsa',
    prvkeypem: key
  })
  const sign = jsrsasign.hex2b64(sig.signString(text, 'sha1'))
  return sign
}

const aesEncrypt = async data => {
  const keyStr = (await import_key('aes')).trim()
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const srcs = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

// eslint-disable-next-line space-before-function-paren
const encrypt = async (params = {}) => {
  const params2 = JSON.stringify(params)
  const wordArray = CryptoJS.enc.Utf8.parse(params2)
  const base64 = CryptoJS.enc.Base64.stringify(wordArray)

  const data = {
    data: base64,
    timestamp: parseTime(new Date(), '{y}{m}{d}{h}{i}{s}'),
    // timestamp: '20200102080910',
    signature: SIGNATURE
  }

  const data2 = sort_by_key(data)
  const data3 = JSON.stringify(data2)
  const key = await import_key('rsa')
  const signature = get_signature(data3, key)
  data.signature = signature
  const data4 = JSON.stringify(data)
  const data5 = await aesEncrypt(data4)

  return data5
}

/*
加密流程:
1 将请求参数 转JSON, 再BASE64, 目的是 处理中文字符的编码问题
11 处理后的参数, 只有一个
2 加上时间戳 和 签名模版
3 生成签名
31 对 Key 排序
32 转JSON
33 读取 rsa-key
34 SHA256, 生成 签名, 转BASE64
35 将签名替换 原 签名模版
4 将参数 + 时间戳 + 签名, 打包转 JSON
5 做 AES 加密 生成加密串
51 读取 aes-key
52 做加密
53 转 BASE64
*/

/*
密钥生成工具:
aes-key.pem 的内容为 32位长度的任意字符串
rsa-key.pem 的内容为 rsa加密算法的 私钥
两个密钥文件 前端与服务端一致

部署:
需要两个密钥文件
aes-key.pem
rsa-key.pem
放置路径:
开发时放置在 public路径下
部署时放置在 index.html 相同目录下
*/

export default encrypt
