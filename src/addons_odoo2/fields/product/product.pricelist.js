const ModelFields = {
  active: {},
  company_id: { groups: 'base.group_multi_company' },
  country_group_ids: {},
  currency_id: { groups: 'base.group_multi_currency' },
  discount_policy: { groups: 'product.group_discount_per_so_line' },
  item_ids: {
    context: { default_base: 'list_price' }
  },

  name: { placeholder: 'e.g. USD Retailers' },
  sequence: {}
}

const AddonsFields = {
  'product.pricelist': ModelFields
}

export default AddonsFields

