const ModelFields = {
  active: {},
  factor: {},
  factor_inv: {},
  name: {},
  ratio: {
    string: 'Ratio',
    readonly: [['uom_type', '=', 'reference']]
  },

  rounding: {},
  uom_type: {}
}

const AddonsFields = {
  'uom.category.uom_ids': ModelFields
}

export default AddonsFields

