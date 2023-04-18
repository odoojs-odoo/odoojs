const ModelFields = {
  applied_on: {},
  base: {},
  company_id: {},
  compute_price: {},
  currency_id: {},
  date_end: {},
  date_start: {},
  fixed_price: {
    string: 'Price'
  },

  min_quantity: {},
  name: {
    string: 'Applicable On'
  },

  price: {
    string: 'Price'
  },

  price_discount: {},
  pricelist_id: {},
  product_id: {
    string: 'Variants',
    groups: 'product.group_product_variant',
    domain: {
      todo_ctx: "[('product_tmpl_id', '=', product_tmpl_id)]"
    }
  },

  product_tmpl_id: {
    string: 'Products',
    required: '1'
  }
}

const AddonsFields = {
  'product.pricelist.item_ids': ModelFields
}

export default AddonsFields

