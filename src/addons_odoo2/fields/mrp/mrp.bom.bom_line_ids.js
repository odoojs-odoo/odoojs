const ModelFields = {
  allowed_operation_ids: {},
  attachments_count: { string: ' ' },
  bom_product_template_attribute_value_ids: { groups: 'product.group_product_variant' },
  company_id: {},
  manual_consumption: {
    groups: 'mrp.group_mrp_routings',
    readonly: ['|', ['tracking', '!=', 'none'], ['operation_id', '!=', false]]
  },

  operation_id: { groups: 'mrp.group_mrp_routings' },
  parent_product_tmpl_id: {},
  possible_bom_product_template_attribute_value_ids: {},
  product_id: {
    context: { default_detailed_type: 'product' }
  },

  product_qty: {},
  product_tmpl_id: {},
  product_uom_category_id: {},
  product_uom_id: { groups: 'uom.group_uom' },
  sequence: {},
  tracking: {}
}

const AddonsFields = {
  'mrp.bom.bom_line_ids': ModelFields
}

export default AddonsFields

