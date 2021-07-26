import { Model } from '../models'

export class SaleOrder extends Model {
  constructor(...args) {
    super(...args)
  }
}

const AddonsModels = {
  'sale.order': SaleOrder
}

export default AddonsModels
