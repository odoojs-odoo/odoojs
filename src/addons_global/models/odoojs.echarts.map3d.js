import { EchartsBaseModel, call_echarts_request } from './odoojs.echarts.base'

export class ExtendModel extends EchartsBaseModel {
  constructor(...args) {
    super(...args)
  }
}

const AddonsModels = {
  'odoojs.echarts.scatter': ExtendModel
}

export default AddonsModels
