const ModelFields = {
  advance_payment_method: {},
  amount: { required: [['advance_payment_method', '=', 'percentage']] },
  company_id: {},
  count: {},
  currency_id: {},
  deduct_down_payments: {},
  deposit_account_id: { groups: 'account.group_account_manager' },
  deposit_taxes_id: {},
  fixed_amount: { required: [['advance_payment_method', '=', 'fixed']] },
  has_down_payments: {},
  product_id: {},
  sale_order_ids: {}
}

const AddonsFields = {
  'sale.advance.payment.inv': ModelFields
}

export default AddonsFields

