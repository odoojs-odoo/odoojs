const ModelFields = {
  activity_ids: {},
  amount_residual: {},
  amount_residual_signed: {
    string: 'Amount Due'
  },

  amount_tax_signed: {
    string: 'Tax'
  },

  amount_total_in_currency_signed: {
    string: 'Total in Currency',
    groups: 'base.group_multi_currency'
  },

  amount_total_signed: {
    string: 'Total'
  },

  amount_untaxed_signed: {
    string: 'Tax Excluded'
  },

  auto_post: {
    readonly: '===todo=='
  },

  auto_post_$_form_$$_219: {
    readonly: [['state', '!=', 'draft']]
  },

  auto_post_$_form_$$_833: {
    readonly: [['state', '!=', 'draft']]
  },

  auto_post_$_form_$$_974: {
    readonly: '1'
  },

  auto_post_until: {
    readonly: '===todo=='
  },

  auto_post_until_$_form_$$_115: {
    readonly: '1'
  },

  auto_post_until_$_form_$$_150: {
    readonly: [['state', '!=', 'draft']]
  },

  auto_post_until_$_form_$$_709: {
    readonly: [['state', '!=', 'draft']]
  },

  bank_partner_id: {},
  commercial_partner_id: {},
  company_currency_id: {},
  company_id: {
    groups: 'base.group_multi_company',
    required: '1'
  },

  country_code: {},
  currency_id: {
    groups: '===todo==',
    readonly: [['state', '!=', 'draft']]
  },

  currency_id_$_form_$$_237: {
    groups: '!account.group_account_readonly,base.group_multi_currency'
  },

  currency_id_$_form_$$_271: {
    groups: 'base.group_multi_currency'
  },

  currency_id_$_tree_$$_731: {
    groups: 'base.group_multi_currency'
  },

  date: {
    readonly: '===todo==',
    string: 'Accounting Date'
  },

  date_$_form_$$_113: {
    readonly: '1'
  },

  date_$_form_$$_825: {
    readonly: [['state', '!=', 'draft']]
  },

  date_$_form_$$_917: {
    readonly: '1'
  },

  display_inactive_currency_warning: {},
  display_qr_code: {},
  duplicated_ref_ids: {},
  fiscal_position_id: {},
  has_reconciled_entries: {},
  hide_post_button: {},
  highest_name: {},
  id: {},
  invoice_cash_rounding_id: {
    groups: 'account.group_cash_rounding'
  },

  invoice_date: {
    string: '===todo=='
  },

  invoice_date_$_tree_$$_400: {
    string: 'Bill Date'
  },

  invoice_date_$_tree_$$_779: {
    string: 'Invoice Date'
  },

  invoice_date_due: {
    placeholder: 'Date'
  },

  invoice_filter_type_domain: {},
  invoice_has_outstanding: {},
  invoice_incoterm_id: {},
  invoice_line_ids: {
    context: {
      todo_ctx: "{                                            'default_move_type': context.get('default_move_type'),                                            'journal_id': journal_id,                                            'default_partner_id': commercial_partner_id,                                            'default_currency_id': currency_id or company_currency_id,                                            'default_display_type': 'product',                                            'quick_encoding_vals': quick_encoding_vals,                                        }"
    }
  },

  invoice_origin: {
    string: 'Source Document'
  },

  invoice_outstanding_credits_debits_widget: {},
  invoice_partner_display_name: {
    string: '===todo==',
    groups: 'base.group_user'
  },

  invoice_partner_display_name_$_tree_$$_239: {
    string: 'Vendor'
  },

  invoice_partner_display_name_$_tree_$$_381: {
    string: 'Customer'
  },

  invoice_payment_term_id: {
    context: {
      todo_ctx: "{'example_date': invoice_date, 'example_amount': tax_totals['amount_total']}"
    },
    placeholder: 'Terms'
  },

  invoice_payments_widget: {},
  invoice_source_email: {},
  invoice_user_id: {
    domain: [['share', '=', false]],
    string: 'Salesperson'
  },

  invoice_vendor_bill_id: {
    domain: {
      todo_ctx: "[('company_id', '=', company_id), ('partner_id','child_of', [partner_id]), ('move_type','=','in_invoice')]"
    },
    context: {
      show_total_amount: true
    },
    placeholder: 'Select an old vendor bill'
  },

  is_move_sent: {},
  journal_id: {
    readonly: [['posted_before', '=', true]]
  },

  line_ids: {
    context: {
      todo_ctx: "{                                            'default_move_type': context.get('default_move_type'),                                            'line_ids': line_ids,                                            'journal_id': journal_id,                                            'default_partner_id': commercial_partner_id,                                            'default_currency_id': currency_id or company_currency_id,                                            'kanban_view_ref': 'account.account_move_line_view_kanban_mobile',                                        }"
    }
  },

  made_sequence_hole: {},
  move_type: {
    readonly: '1'
  },

  name: {
    readonly: [['state', '!=', 'draft']],
    placeholder: 'Draft'
  },

  narration: {
    placeholder: '===todo=='
  },

  narration_$_form_$$_280: {
    placeholder: 'Terms and Conditions'
  },

  narration_$_form_$$_418: {
    placeholder: 'Add an internal note...'
  },

  partner_bank_id: {
    domain: {
      todo_ctx: "[('partner_id', '=', bank_partner_id)]"
    },
    context: {
      todo_ctx: "{'default_partner_id': bank_partner_id}"
    },
    readonly: [['state', '!=', 'draft']]
  },

  partner_credit_warning: {},
  partner_id: {
    domain: {
      todo_ctx: "[('type', '!=', 'private'), ('company_id', 'in', (False, company_id))]"
    },
    context: {
      todo_ctx: "{                                             'res_partner_search_mode': (context.get('default_move_type', 'entry') in ('out_invoice', 'out_refund', 'out_receipt') and 'customer') or (context.get('default_move_type', 'entry') in ('in_invoice', 'in_refund', 'in_receipt') and 'supplier') or False,                                             'show_address': 1, 'default_is_company': True, 'show_vat': True}"
    }
  },

  partner_shipping_id: {
    groups: 'account.group_delivery_invoice_address',
    readonly: [['state', '!=', 'draft']]
  },

  payment_id: {},
  payment_reference: {},
  payment_state: {},
  posted_before: {},
  qr_code_method: {},
  quick_edit_mode: {},
  quick_edit_total_amount: {
    readonly: [['state', '!=', 'draft']]
  },

  quick_encoding_vals: {},
  ref: {},
  restrict_mode_hash_table: {},
  reversed_entry_id: {},
  show_name_warning: {},
  show_reset_to_draft_button: {},
  state: {},
  statement_line_id: {},
  suitable_journal_ids: {},
  tax_cash_basis_created_move_ids: {},
  tax_cash_basis_origin_move_id: {},
  tax_country_id: {},
  tax_lock_date_message: {},
  tax_totals: {
    readonly: ['|', ['state', '!=', 'draft'], '&', ['move_type', 'not in', ('in_invoice', 'in_refund')], ['quick_edit_mode', '=', false]]
  },

  to_check: {},
  user_id: {}
}

const AddonsFields = {
  'account.move': ModelFields
}

export default AddonsFields

