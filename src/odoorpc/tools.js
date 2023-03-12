export default {
  path2action_id(path) {
    return path.split('/').slice(2).join('.')
  },

  date_format(date) {
    const year = date.getFullYear().toString().padStart(4, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    const hh = date.getHours().toString().padStart(2, '0')
    const mm = date.getMinutes().toString().padStart(2, '0')
    const ss = date.getSeconds().toString().padStart(2, '0')

    const today_str = `${year}-${month}-${day} ${hh}:${mm}:${ss}`
    return today_str
  }
}

export function tuples_to_ids(tuples) {
  // m2m
  // [6,],[5,],[4,id],[3,id]
  //

  // console.log('tuples_to_ids 1', tuples)

  const ids = tuples.reduce((acc, tup) => {
    const op = tup[0]
    if (op === 6) return [...tup[2]]
    if (op === 5) return []

    if ([4, 1].includes(op)) {
      const rid = tup[1]
      if (acc.includes(rid)) return [...acc]
      else return [...acc, rid]
    }

    if ([3, 2].includes(op)) return acc.filter(item => item !== tup[1])

    // 不应该走到这里
    return acc
  }, [])

  // console.log('tuples_to_ids 2', ids)
  return ids
}

let global_debug = 0
global_debug = 1

export const try_call = async fn => {
  console.log('try_call')
  if (global_debug) return { result: await fn() }
  try {
    return { result: await fn() }
  } catch (error) {
    return { error }
  }
}

export const date_tools = {
  get one_day() {
    return 1000 * 60 * 60 * 24
  },
  format(date) {
    const year = date.getFullYear().toString().padStart(4, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const today_str = `${year}-${month}-${day}`
    return today_str
  },
  increase(date, num = 1) {
    return this.format(new Date(new Date(date).getTime() + this.one_day * num))
  },

  get today() {
    const today = new Date()
    return this.format(today)
  }
  // get today_last_month() {
  //   const today = new Date()
  //   const date2 = new Date().setDate(10) - this.one_day * 32
  //   const last_date = new Date(new Date(date2).setDate(today.getDate()))
  //   return this.format(last_date)
  // },

  // today_for_last_month(num) {
  //   const today = new Date()
  //   const date2 = new Date().setDate(10) - this.one_day * (2 + 30 * num)
  //   const last_date = new Date(new Date(date2).setDate(today.getDate()))
  //   return this.format(last_date)
  // }
}

export function download({ filename, filetype, data }) {
  // //ArrayBuffer 转为 Blob
  const blob = new Blob([data], { type: filetype })
  const objectUrl = URL.createObjectURL(blob)
  const filename2 = decodeURIComponent(filename)
  const a = document.createElement('a')
  a.setAttribute('href', objectUrl)
  a.setAttribute('download', filename2)
  a.click()
  return true
}

export function upload(callback) {
  const input = document.createElement('input')
  input.type = 'file'
  input.click()
  input.onchange = async () => {
    const files = input.files
    callback(files)
  }
}

export async function file2Base64(file) {
  const result = await new Promise(function (resolve, reject) {
    const reader = new FileReader()
    let imgResult = ''
    reader.readAsDataURL(file)
    reader.onload = function () {
      imgResult = reader.result
    }
    reader.onerror = function (error) {
      reject(error)
    }
    reader.onloadend = function () {
      resolve(imgResult)
    }
  })

  const data2 = result.split('base64,')[1]
  // console.log(data2, result)
  return data2
}
