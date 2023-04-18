const ModelFields = {
  company_id: {
    groups: 'base.group_multi_company',
    readonly: '1'
  },

  currency_id: {
    groups: 'base.group_multi_currency'
  },

  date_end: {},
  date_start: {},
  delay: {},
  min_qty: {},
  partner_id: {
    context: {
      res_partner_search_mode: 'supplier'
    },
    readonly: '1'
  },

  price: {
    string: 'Price'
  },

  product_code: {},
  product_id: {
    groups: 'product.group_product_variant',
    readonly: '1'
  },

  product_name: {},
  product_tmpl_id: {
    string: 'Product',
    readonly: '1'
  },

  product_uom: {
    groups: 'uom.group_uom'
  },

  product_variant_count: {},
  sequence: {}
}

const AddonsFields = {
  'product.supplierinfo': ModelFields
}

export default AddonsFields

