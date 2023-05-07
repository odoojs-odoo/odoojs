import { Model } from '@/odoorpc'

export class ModelExtend extends Model {
  constructor(...args) {
    super(...args)
  }

  static async web_search_read(kwargs = {}) {
    const { order } = kwargs
    const kwargs2 = { ...kwargs, ...(order || { order: 'code' }) }
    return super.web_search_read(kwargs2)
  }
}

const AddonsModels = {
  'res.country': ModelExtend
}

export default AddonsModels
