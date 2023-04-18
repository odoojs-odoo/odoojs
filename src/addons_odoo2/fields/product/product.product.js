const ModelFields = {
  active: {},
  additional_product_tag_ids: {},
  barcode: {
    readonly: '1'
  },

  categ_id: {},
  company_id: {
    groups: 'base.group_multi_company',
    readonly: '1'
  },

  cost_currency_id: {},
  currency_id: {},
  default_code: {
    readonly: '1'
  },

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
    readonly: '1',
    placeholder: 'e.g. Odoo Enterprise Subscription'
  },

  packaging_ids: {
    context: {
      todo_ctx: "{'tree_view_ref':'product.product_packaging_tree_view2', 'default_company_id': company_id}"
    }
  },

  priority: {
    readonly: '1'
  },

  product_tag_ids: {
    string: 'Product Template Tags',
    readonly: '1'
  },

  product_template_attribute_value_ids: {
    readonly: '1'
  },

  product_template_variant_value_ids: {
    groups: 'product.group_product_variant',
    readonly: '1'
  },

  product_tmpl_id: {
    readonly: '1'
  },

  product_variant_count: {},
  standard_price: {},
  type: {
    readonly: '1'
  },

  uom_id: {
    groups: 'uom.group_uom',
    readonly: '1'
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

