const ModelFields = {
  barcode: {},
  company_id: { groups: 'base.group_multi_company' },
  id: {},
  name: { string: 'Packaging' },
  product_id: {
    readonly: [['id', '!=', false]],
    required: 'True'
  },

  product_uom_id: { groups: 'uom.group_uom' },
  qty: {},
  sequence: {}
}

const AddonsFields = {
  'product.packaging': ModelFields
}

export default AddonsFields

