const ModelFields = {
  active: {},
  company_id: { groups: 'base.group_multi_company' },
  name: { placeholder: 'e.g. Two-steps reception' },
  packaging_selectable: {
    string: 'Packagings',
    groups: 'product.group_stock_packaging'
  },

  product_categ_selectable: { string: 'Product Categories' },
  product_selectable: { string: 'Products' },
  rule_ids: {
    context: { todo_ctx: "{'default_company_id': company_id, 'form_view_ref':'stock.view_route_rule_form'}" }
  },

  sequence: {
    string: 'Sequence',
    groups: 'base.group_no_one'
  },

  supplied_wh_id: { groups: 'base.group_no_one' },
  warehouse_domain_ids: {},
  warehouse_ids: {},
  warehouse_selectable: {}
}

const AddonsFields = {
  'stock.route': ModelFields
}

export default AddonsFields

