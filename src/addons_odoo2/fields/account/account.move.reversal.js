const ModelFields = {
  available_journal_ids: {},
  company_id: {},
  date: {
    required: [['date_mode', '=', 'custom']],
    string: 'Refund Date'
  },

  date_mode: { string: 'Reversal Date' },
  journal_id: {
    domain: { todo_ctx: "[('id', 'in', available_journal_ids)]" }
  },

  move_ids: {},
  move_type: {},
  reason: {},
  refund_method: { readonly: [['residual', '=', 0]] },
  residual: {}
}

const AddonsFields = {
  'account.move.reversal': ModelFields
}

export default AddonsFields

