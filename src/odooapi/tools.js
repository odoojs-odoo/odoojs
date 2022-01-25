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
