const ModelFields = {
  analytic_distribution: {
    groups: 'analytic.group_analytic_accounting'
  },

  currency_id: {},
  date_planned: {
    required: [['display_type', '=', false]]
  },

  display_type: {},
  invoice_lines: {},
  name: {},
  price_subtotal: {},
  price_tax: {},
  price_total: {},
  price_unit: {
    readonly: [['qty_invoiced', '!=', 0]]
  },

  product_id: {
    domain: {
      todo_ctx: "[('purchase_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]"
    },
    context: '===todo==',
    readonly: [['state', 'in', ('purchase', 'to approve', 'done', 'cancel')]],
    required: [['display_type', '=', false]]
  },

  product_id_$_form: {
    context: {
      todo_ctx: "{'partner_id': parent.partner_id}"
    }
  },

  product_id_$_tree: {
    context: {
      todo_ctx: "{'partner_id':parent.partner_id, 'quantity':product_qty,'uom':product_uom, 'company_id': parent.company_id}"
    }
  },

  product_packaging_id: {
    groups: 'product.group_stock_packaging',
    context: {
      todo_ctx: "{'default_product_id': product_id, 'tree_view_ref':'product.product_packaging_tree_view', 'form_view_ref':'product.product_packaging_form_view'}"
    }
  },

  product_packaging_qty: {
    groups: 'product.group_stock_packaging'
  },

  product_qty: {},
  product_type: {},
  product_uom: {
    groups: '===todo==',
    required: [['display_type', '=', false]],
    string: 'UoM',
    readonly: [['state', 'in', ('purchase', 'done', 'cancel')]]
  },

  product_uom_$_form: {
    groups: 'uom.group_uom'
  },

  product_uom_$_kanban: {
    groups: 'uom.group_uom'
  },

  product_uom_$_tree_$$_489: {
    groups: 'uom.group_uom'
  },

  product_uom_$_tree_$$_530: {
    groups: '!uom.group_uom'
  },

  product_uom_category_id: {},
  qty_invoiced: {
    string: '===todo=='
  },

  qty_invoiced_$_form: {
    string: 'Billed Quantity'
  },

  qty_invoiced_$_tree: {
    string: 'Billed'
  },

  qty_received: {
    string: '===todo==',
    readonly: [['qty_received_method', '!=', 'manual']]
  },

  qty_received_$_form: {
    string: 'Received Quantity'
  },

  qty_received_$_tree: {
    string: 'Received'
  },

  qty_received_manual: {},
  qty_received_method: {},
  sequence: {},
  state: {},
  taxes_id: {
    domain: '===todo==',
    context: {
      default_type_tax_use: 'purchase',
      search_view_ref: 'account.account_tax_view_search'
    }
  },

  taxes_id_$_form: {
    domain: {
      todo_ctx: "[('type_tax_use', '=', 'purchase'), ('company_id', '=', parent.company_id), ('country_id', '=', parent.tax_country_id)]"
    }
  },

  taxes_id_$_tree: {
    domain: {
      todo_ctx: "[('type_tax_use','=','purchase'), ('company_id', '=', parent.company_id), ('country_id', '=', parent.tax_country_id)]"
    }
  }
}

const AddonsFields = {
  'purchase.order.order_line': ModelFields
}

export default AddonsFields

