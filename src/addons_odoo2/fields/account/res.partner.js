const ModelFields = {
  bank_ids: {
    context: { default_allow_out_payment: true }
  },

  credit: {},
  credit_limit: {},
  currency_id: {},
  duplicated_bank_account_partners_count: {},
  invoice_warn: { required: '1' },
  invoice_warn_msg: {
    required: [['invoice_warn', '!=', false], ['invoice_warn', '!=', 'no-message']],
    placeholder: 'Type a message...'
  },

  property_account_payable_id: {},
  property_account_position_id: {},
  property_account_receivable_id: {},
  property_payment_term_id: {
    string: 'Payment Terms',
    groups: 'account.group_account_invoice,account.group_account_readonly'
  },

  property_supplier_payment_term_id: {
    string: 'Payment Terms',
    groups: 'account.group_account_invoice,account.group_account_readonly'
  },

  show_credit_limit: {},
  total_invoiced: {},
  use_partner_credit_limit: {}
}

const AddonsFields = {
  'res.partner': ModelFields
}

export default AddonsFields

