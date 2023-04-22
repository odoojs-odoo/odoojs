const ModelFields = {
  allowed_operation_ids: {},
  bom_product_template_attribute_value_ids: { groups: 'product.group_product_variant' },
  company_id: {},
  cost_share: {},
  operation_id: { groups: 'mrp.group_mrp_routings' },
  possible_bom_product_template_attribute_value_ids: {},
  product_id: {
    context: { default_detailed_type: 'product' }
  },

  product_qty: {},
  product_uom_category_id: {},
  product_uom_id: { groups: 'uom.group_uom' },
  sequence: {}
}

const AddonsFields = {
  'mrp.bom.byproduct_ids': ModelFields
}

export default AddonsFields

