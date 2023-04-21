const ModelFields = {
  account_control_ids: {},
  active: {},
  alias_domain: { readonly: '1' },
  alias_id: {},
  alias_name: {},
  available_payment_method_ids: {},
  bank_account_id: {
    string: 'Account Number',
    context: { todo_ctx: "{'default_partner_id': company_partner_id}" }
  },

  bank_id: {},
  bank_statements_source: {
    groups: 'account.group_account_readonly',
    required: [['type', '=', 'bank']]
  },

  code: { placeholder: 'e.g. INV' },
  company_id: { groups: 'base.group_multi_company' },
  company_partner_id: {},
  country_code: {},
  currency_id: { groups: 'base.group_multi_currency' },
  default_account_id: {
    groups: 'account.group_account_readonly',
    required: ['|', '&', ['id', '!=', false], ['type', 'in', ('bank', 'cash')], ['type', 'in', ('sale', 'purchase')]]
  },

  default_account_type: {},
  inbound_payment_method_line_ids: {
    context: { default_payment_type: 'inbound' }
  },

  invoice_reference_model: {},
  invoice_reference_type: {},
  journal_group_ids: { readonly: '1' },
  loss_account_id: {},
  name: { placeholder: 'e.g. Customer Invoices' },
  outbound_payment_method_line_ids: {
    context: { default_payment_type: 'outbound' }
  },

  payment_sequence: {},
  profit_account_id: {},
  refund_sequence: {},
  restrict_mode_hash_table: { groups: 'account.group_account_readonly' },
  sale_activity_note: { placeholder: 'e.g. Give a phone call, check with others , ...' },
  sale_activity_type_id: {},
  sale_activity_user_id: {},
  selected_payment_method_codes: {},
  sequence: {},
  suspense_account_id: {
    groups: 'account.group_account_readonly',
    required: [['type', 'in', ('bank', 'cash')]]
  },

  type: {}
}

const AddonsFields = {
  'account.journal': ModelFields
}

export default AddonsFields

