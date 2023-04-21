const ModelFields = {
  account_id: {
    domain: '===todo==',
    required: [['display_type', 'not in', ('line_section', 'line_note')]]
  },

  account_id_$_form: {
    domain: { todo_ctx: "[('company_id', '=', parent.company_id), ('deprecated', '=', False)]" }
  },

  account_id_$_tree: {
    domain: { todo_ctx: "[('deprecated', '=', False), ('company_id', '=', parent.company_id)]" }
  },

  account_internal_group: {},
  account_type: {},
  amount_currency: { groups: 'base.group_multi_currency' },
  analytic_distribution: { groups: 'analytic.group_analytic_accounting' },
  balance: {},
  company_currency_id: {},
  company_id: {},
  credit: { readonly: [['parent.move_type', 'in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')], ['display_type', 'in', ('line_section', 'line_note', 'product')]] },
  currency_id: { groups: 'base.group_multi_currency' },
  date_maturity: { required: '0' },
  debit: { readonly: [['parent.move_type', 'in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')], ['display_type', 'in', ('line_section', 'line_note', 'product')]] },
  discount_amount_currency: { string: 'Discount Amount' },
  discount_date: { string: 'Discount Date' },
  display_type: {},
  id: {},
  name: {},
  partner_id: { domain: ['|', ['parent_id', '=', false], ['is_company', '=', true]] },
  sequence: {},
  tax_ids: {
    string: 'Taxes Applied',
    domain: { todo_ctx: "[('type_tax_use', '=?', parent.invoice_filter_type_domain)]" },
    readonly: ['|', '|', ['display_type', 'in', ('line_section', 'line_note')], ['tax_line_id', '!=', false], '&', ['parent.move_type', 'in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')], ['account_type', 'in', ('asset_receivable', 'liability_payable')]],
    context: { todo_ctx: "{'append_type_to_tax_name': not parent.invoice_filter_type_domain}" }
  },

  tax_line_id: {},
  tax_tag_ids: {
    string: 'Tax Grids',
    domain: { todo_ctx: "[                                                     ('applicability', '=', 'taxes'),                                                     '|', ('country_id', '=', parent.tax_country_id),                                                     ('country_id', '=', False),                                                 ]" }
  },

  tax_tag_invert: {
    groups: 'base.group_no_one',
    readonly: '1'
  }
}

const AddonsFields = {
  'account.move.line_ids': ModelFields
}

export default AddonsFields

