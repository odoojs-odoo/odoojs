import { Model } from '@/odoojs-rpc/models'

export class PartnerCategory extends Model {
  constructor(...args) {
    super(...args)
  }
  //   static async onchange(ids, values, field_name, field_onchange, kwargs = {}) {

  //     return super(ids, values, field_name, field_onchange, kwargs)
  //   }
}

const AddonsModels = {
  'res.partner.category': PartnerCategory
}

export default AddonsModels
