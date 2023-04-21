const ModelFields = {
  analytic_distribution: { groups: 'analytic.group_analytic_accounting' },
  company_id: {},
  currency_id: {},
  customer_lead: { readonly: [['parent.state', 'not in', ['draft', 'sent', 'sale']]] },
  discount: {
    string: 'Disc.%',
    groups: 'product.group_discount_per_so_line'
  },

  display_type: {},
  invoice_lines: {},
  invoice_status: {},
  is_downpayment: {},
  name: {},
  price_subtotal: { groups: 'account.group_show_line_subtotals_tax_excluded' },
  price_tax: {},
  price_total: { groups: 'account.group_show_line_subtotals_tax_included' },
  price_unit: { readonly: [['qty_invoiced', '>', 0]] },
  product_id: {
    domain: { todo_ctx: "[('sale_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]" },
    readonly: [['product_updatable', '=', false]],
    required: [['display_type', '=', false]],
    context: '===todo=='
  },

  product_id_$_form: {
    context: { todo_ctx: "{'partner_id':parent.partner_id, 'quantity':product_uom_qty, 'pricelist':parent.pricelist_id, 'uom':product_uom, 'company_id': parent.company_id}" }
  },

  product_id_$_tree: {
    context: { todo_ctx: "{                                         'partner_id': parent.partner_id,                                         'quantity': product_uom_qty,                                         'pricelist': parent.pricelist_id,                                         'uom':product_uom,                                         'company_id': parent.company_id,                                         'default_lst_price': price_unit,                                         'default_description_sale': name                                     }" }
  },

  product_packaging_id: {
    groups: 'product.group_stock_packaging',
    context: { todo_ctx: "{'default_product_id': product_id, 'tree_view_ref':'product.product_packaging_tree_view', 'form_view_ref':'product.product_packaging_form_view'}" }
  },

  product_packaging_qty: { groups: 'product.group_stock_packaging' },
  product_template_id: {
    string: 'Product',
    domain: { todo_ctx: "[('sale_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]" },
    readonly: [['product_updatable', '=', false]],
    required: [['display_type', '=', false]],
    context: { todo_ctx: "{                                         'partner_id': parent.partner_id,                                         'quantity': product_uom_qty,                                         'pricelist': parent.pricelist_id,                                         'uom':product_uom,                                         'company_id': parent.company_id,                                         'default_list_price': price_unit,                                         'default_description_sale': name                                     }" }
  },

  product_type: {},
  product_uom: {
    groups: '===todo==',
    readonly: [['product_uom_readonly', '=', true]],
    required: [['display_type', '=', false]],
    string: 'UoM',
    context: { todo_ctx: "{'company_id': parent.company_id}" }
  },

  product_uom_$_form_$$_248: { groups: 'uom.group_uom' },
  product_uom_$_form_$$_690: { groups: '!uom.group_uom' },
  product_uom_$_tree_$$_185: { groups: 'uom.group_uom' },
  product_uom_$_tree_$$_650: { groups: '!uom.group_uom' },
  product_uom_category_id: {},
  product_uom_qty: { context: '===todo==' },
  product_uom_qty_$_form: {
    context: { todo_ctx: "{'partner_id':parent.partner_id, 'quantity':product_uom_qty, 'pricelist':parent.pricelist_id, 'uom':product_uom, 'uom_qty_change':True, 'company_id': parent.company_id}" }
  },

  product_uom_qty_$_tree: {
    context: { todo_ctx: "{                                         'partner_id': parent.partner_id,                                         'quantity': product_uom_qty,                                         'pricelist': parent.pricelist_id,                                         'uom': product_uom,                                         'company_id': parent.company_id                                     }" }
  },

  product_uom_readonly: {},
  product_updatable: {},
  qty_delivered: {
    readonly: [['qty_delivered_method', '!=', 'manual']],
    string: 'Delivered'
  },

  qty_delivered_method: {},
  qty_invoiced: { string: 'Invoiced' },
  qty_to_invoice: {},
  sequence: {},
  state: {},
  tax_id: {
    domain: '===todo==',
    readonly: [['qty_invoiced', '>', 0]],
    context: '===todo=='
  },

  tax_id_$_form: {
    domain: { todo_ctx: "[('type_tax_use','=','sale'), ('company_id','=',parent.company_id), ('country_id', '=', parent.tax_country_id)]" },
    context: { search_view_ref: 'account.account_tax_view_search' }
  },

  tax_id_$_tree: {
    domain: { todo_ctx: "[('type_tax_use','=','sale'),('company_id','=',parent.company_id), ('country_id', '=', parent.tax_country_id)]" },
    context: { active_test: true }
  }
}

const AddonsFields = {
  'sale.order.order_line': ModelFields
}

export default AddonsFields

