import { JsonRequest } from '@/odoorpc/request'

class Attachment extends JsonRequest {
  constructor(payload) {
    super(payload)
  }

  static async add_data(payload) {
    const url = '/web_editor/attachment/add_data'
    const { name, data } = payload
    const { res_model, res_id } = payload
    const { quality = 0, width = 0, height = 0 } = payload
    const payload2 = { name, data, res_model, res_id }
    const payload3 = { quality, width, height }
    const payload9 = { ...payload2, ...payload3 }

    return await this.json_call(url, payload9)
  }
}

export default {
  web_editor: {
    attachment: Attachment
  }
}
