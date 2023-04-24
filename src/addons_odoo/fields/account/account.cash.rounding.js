const ModelFields = {
  loss_account_id: {
    groups: 'account.group_account_invoice,account.group_account_readonly',
    domain: [
      ['account_type', 'not in', ('asset_receivable', 'liability_payable')]
    ],
    required: [['strategy', '=', 'add_invoice_line']]
  },

  name: {},
  profit_account_id: {
    groups: 'account.group_account_invoice,account.group_account_readonly',
    domain: [
      ['account_type', 'not in', ('asset_receivable', 'liability_payable')]
    ],
    required: [['strategy', '=', 'add_invoice_line']]
  },

  rounding: {},
  rounding_method: {},
  strategy: {}
}

const AddonsFields = {
  'account.cash.rounding': ModelFields
}

export default AddonsFields
