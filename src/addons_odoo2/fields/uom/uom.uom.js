const ModelFields = {
  active: {},
  category_id: {},
  factor: {
    readonly: [['uom_type', '=', 'bigger']]
  },

  factor_inv: {
    readonly: [['uom_type', '!=', 'bigger']]
  },

  name: {},
  rounding: {},
  uom_type: {}
}

const AddonsFields = {
  'uom.uom': ModelFields
}

export default AddonsFields

