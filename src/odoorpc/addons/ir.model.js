import { Model } from '../models'

export class IrModelData extends Model {
  constructor(...args) {
    super(...args)
  }

  static async xmlid_to_res_model_res_id(xml_ref, raise_if_not_found) {
    const args =
      raise_if_not_found === undefined
        ? [xml_ref]
        : [xml_ref, raise_if_not_found]
    return this.execute('xmlid_to_res_model_res_id', ...args)
  }

  static async xmlid_to_res_id(xml_ref, raise_if_not_found) {
    const args =
      raise_if_not_found === undefined
        ? [xml_ref]
        : [xml_ref, raise_if_not_found]
    return this.execute('xmlid_to_res_id', ...args)
  }
}

const AddonsModels = {
  'ir.model.data': IrModelData
}

export default AddonsModels
