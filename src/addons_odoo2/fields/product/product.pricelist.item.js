const ModelFields = {
  applied_on: {},
  base: {},
  base_pricelist_id: {
    required: [['compute_price', '=', 'formula'], ['base', '=', 'pricelist']],
    readonly: [['base', '!=', 'pricelist']]
  },

  categ_id: { required: [['applied_on', '=', '2_product_category']] },
  company_id: { groups: 'base.group_multi_company' },
  compute_price: { string: 'Computation' },
  currency_id: { groups: 'base.group_multi_currency' },
  date_end: {},
  date_start: {},
  fixed_price: {
    string: 'Price',
    required: '1'
  },

  min_quantity: {},
  name: { string: 'Applied On' },
  percent_price: {},
  price: {},
  price_discount: {},
  price_max_margin: { string: 'Max. Margin' },
  price_min_margin: { string: 'Min. Margin' },
  price_round: { string: 'Rounding Method' },
  price_surcharge: { string: 'Extra Fee' },
  pricelist_id: { string: 'Pricelist' },
  product_id: {
    required: [['applied_on', '=', '0_product_variant']],
    groups: 'product.group_product_variant',
    domain: { todo_ctx: "['|', '|',                     ('id', '=', context.get('default_product_id', 0)),                     ('product_tmpl_id', '=', context.get('default_product_tmpl_id', 0)),                     ('categ_id', '=', context.get('default_categ_id', 0)), '|', ('company_id', '=', company_id), ('company_id', '=', False)                   ]" },
    readonly: "context.get['active_model']=='product.product'"
  },

  product_tmpl_id: {
    required: [['applied_on', '=', '1_product']],
    domain: { todo_ctx: "[('categ_id', '=', context.get('default_categ_id', True)), '|', ('company_id', '=', company_id), ('company_id', '=', False)]" }
  },

  rule_tip: {}
}

const AddonsFields = {
  'product.pricelist.item': ModelFields
}

export default AddonsFields

