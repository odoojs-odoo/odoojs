export const get_image = (model, res_id, field) => {
  const baseURL = process.env.VUE_APP_BASE_API
  const imgUrl = '/web/image'
  if (!res_id) {
    return ''
  }
  return `${baseURL}${imgUrl}?model=${model}&id=${res_id}&field=${field}`
}
