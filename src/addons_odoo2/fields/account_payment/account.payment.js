const ModelFields = {
  amount_available_for_refund: {},
  payment_method_line_id: {},
  payment_transaction_id: { groups: 'base.group_no_one' },
  refunds_count: { string: 'Refunds' },
  source_payment_id: {}
}

const AddonsFields = {
  'account.payment': ModelFields
}

export default AddonsFields

