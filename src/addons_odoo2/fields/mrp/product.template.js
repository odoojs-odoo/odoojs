const ModelFields = {
  bom_count: {
    string: 'Bill of Materials',
    groups: 'mrp.group_mrp_user'
  },

  days_to_prepare_mo: {},
  is_kits: {},
  mrp_product_qty: {},
  produce_delay: {},
  uom_name: {},
  used_in_bom_count: { string: 'Used In' }
}

const AddonsFields = {
  'product.template': ModelFields
}

export default AddonsFields

