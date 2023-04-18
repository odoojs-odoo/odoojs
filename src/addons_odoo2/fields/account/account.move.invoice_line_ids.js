const ModelFields = {
  account_id: {
    domain: '===todo==',
    context: {
      todo_ctx: "{'partner_id': partner_id, 'move_type': parent.move_type}"
    },
    groups: 'account.group_account_readonly',
    required: [['display_type', 'not in', ('line_note', 'line_section')]]
  },

  account_id_$_form: {
    domain: {
      todo_ctx: "[('company_id', '=', company_id)]"
    }
  },

  account_id_$_tree: {
    domain: {
      todo_ctx: "[('deprecated', '=', False), ('account_type', 'not in', ('asset_receivable', 'liability_payable')), ('company_id', '=', parent.company_id), ('is_off_balance', '=', False)]"
    }
  },

  analytic_distribution: {
    groups: 'analytic.group_analytic_accounting'
  },

  company_currency_id: {},
  company_id: {},
  currency_id: {},
  discount: {
    string: 'Disc.%'
  },

  display_type: {},
  name: {},
  partner_id: {},
  price_subtotal: {
    string: 'Subtotal',
    groups: 'account.group_show_line_subtotals_tax_excluded'
  },

  price_total: {
    string: 'Total',
    groups: 'account.group_show_line_subtotals_tax_included'
  },

  price_unit: {
    string: 'Price'
  },

  product_id: {
    domain: {
      todo_ctx: "                                                     context.get('default_move_type') in ('out_invoice', 'out_refund', 'out_receipt')                                                     and [('sale_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]                                                     or [('purchase_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]                                                "
    }
  },

  product_uom_category_id: {},
  product_uom_id: {
    groups: 'uom.group_uom',
    string: 'UoM'
  },

  quantity: {},
  sequence: {},
  tax_ids: {
    domain: {
      todo_ctx: "[('type_tax_use', '=?', parent.invoice_filter_type_domain), ('company_id', '=', parent.company_id), ('country_id', '=', parent.tax_country_id)]"
    },
    context: {
      todo_ctx: "{'append_type_to_tax_name': not parent.invoice_filter_type_domain}"
    }
  }
}

const AddonsFields = {
  'account.move.invoice_line_ids': ModelFields
}

export default AddonsFields

