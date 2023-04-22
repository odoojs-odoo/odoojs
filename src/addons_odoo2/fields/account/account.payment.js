const ModelFields = {
  amount: { readonly: [['state', '!=', 'draft']] },
  amount_company_currency_signed: { string: 'Amount' },
  amount_signed: {
    string: 'Amount in Currency',
    groups: 'base.group_multi_currency'
  },

  available_journal_ids: {},
  available_partner_bank_ids: {},
  available_payment_method_line_ids: {},
  company_currency_id: {},
  company_id: {},
  country_code: {},
  currency_id: {
    groups: 'base.group_multi_currency',
    readonly: [['state', '!=', 'draft']],
    required: '1',
    string: 'Payment Currency'
  },

  date: { readonly: [['state', '!=', 'draft']] },
  destination_journal_id: {
    readonly: [['state', '!=', 'draft']],
    required: [['is_internal_transfer', '=', true], ['state', '=', 'draft']],
    context: { todo_ctx: "{'default_partner_id': partner_id}" }
  },

  id: {},
  is_internal_transfer: { readonly: [['state', '!=', 'draft']] },
  is_matched: {},
  is_move_sent: {},
  is_reconciled: {},
  journal_id: {
    domain: { todo_ctx: "[('id', 'in', available_journal_ids)]" },
    readonly: [['state', '!=', 'draft']]
  },

  name: { readonly: '1' },
  paired_internal_transfer_payment_id: {},
  partner_bank_id: {
    string: '===todo==',
    required: [['require_partner_bank_account', '=', true], ['is_internal_transfer', '=', false]],
    context: { todo_ctx: "{'default_partner_id': partner_id, 'default_allow_out_payment': True}" }
  },

  partner_bank_id_$_form_$$_341: { string: 'Company Bank Account' },
  partner_bank_id_$_form_$$_501: { string: 'Vendor Bank Account' },
  partner_bank_id_$_form_$$_628: { string: 'Customer Bank Account' },
  partner_id: {
    string: '===todo==',
    readonly: [['state', '!=', 'draft']],
    context: { default_is_company: true }
  },

  partner_id_$_form_$$_409: { string: 'Vendor' },
  partner_id_$_form_$$_582: { string: 'Customer' },
  partner_id_$_tree_$$_942: { string: 'Customer' },
  partner_type: {},
  payment_method_code: {},
  payment_method_line_id: {
    readonly: [['state', '!=', 'draft']],
    required: '1'
  },

  payment_type: { readonly: [['state', '!=', 'draft']] },
  posted_before: {},
  qr_code: {},
  reconciled_bills_count: {},
  reconciled_invoices_count: {},
  reconciled_invoices_type: {},
  reconciled_statement_lines_count: {},
  ref: { string: 'Memo' },
  require_partner_bank_account: {},
  show_partner_bank_account: {},
  state: {},
  suitable_journal_ids: {}
}

const AddonsFields = {
  'account.payment': ModelFields
}

export default AddonsFields

