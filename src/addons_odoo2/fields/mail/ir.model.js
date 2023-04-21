const ModelFields = {
  state: {},
  tracking: { readonly: [['state', '!=', 'manual']] },
  transient: {}
}

const AddonsFields = {
  'ir.model': ModelFields
}

export default AddonsFields

