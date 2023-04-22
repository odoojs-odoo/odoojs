const ModelFields = {
  allowed_operation_ids: {},
  bom_product_template_attribute_value_ids: { groups: 'product.group_product_variant' },
  company_id: {},
  operation_id: { groups: 'mrp.group_mrp_routings' },
  parent_product_tmpl_id: {},
  possible_bom_product_template_attribute_value_ids: {},
  product_id: {},
  product_qty: {},
  product_uom_category_id: {},
  product_uom_id: { groups: 'uom.group_uom' },
  sequence: { groups: 'base.group_no_one' }
}

const AddonsFields = {
  'mrp.bom.line': ModelFields
}

export default AddonsFields

