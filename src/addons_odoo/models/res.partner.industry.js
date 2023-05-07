import { Model } from '@/odoorpc'

export class PartnerIndustry extends Model {
  constructor(...args) {
    super(...args)
  }

  static async web_search_read(kwargs = {}) {
    const { order } = kwargs
    const kwargs2 = { ...kwargs, ...(order || { order: 'full_name' }) }
    return super.web_search_read(kwargs2)
  }
}

const AddonsModels = {
  'res.partner.industry': PartnerIndustry
}

export default AddonsModels
