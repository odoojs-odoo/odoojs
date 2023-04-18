const ModelFields = {
  active: {},
  additional_product_tag_ids: {},
  barcode: {},
  categ_id: {},
  company_id: {
    groups: 'base.group_multi_company'
  },

  cost_currency_id: {},
  currency_id: {},
  default_code: {},
  id: {},
  image_1920: {},
  list_price: {
    readonly: [['product_variant_count', '>', 1]]
  },

  lst_price: {
    readonly: [['product_variant_count', '>', 1]],
    string: 'Sales Price'
  },

  name: {
    placeholder: 'e.g. Odoo Enterprise Subscription'
  },

  packaging_ids: {
    context: {
      todo_ctx: "{'tree_view_ref':'product.product_packaging_tree_view2', 'default_company_id': company_id}"
    }
  },

  priority: {},
  product_tag_ids: {
    string: 'Product Template Tags'
  },

  product_template_attribute_value_ids: {},
  product_template_variant_value_ids: {
    groups: 'product.group_product_variant'
  },

  product_tmpl_id: {},
  product_variant_count: {},
  standard_price: {},
  type: {},
  uom_id: {
    groups: 'uom.group_uom'
  },

  volume: {},
  volume_uom_name: {},
  weight: {},
  weight_uom_name: {}
}

const AddonsFields = {
  'product.product': ModelFields
}

export default AddonsFields

