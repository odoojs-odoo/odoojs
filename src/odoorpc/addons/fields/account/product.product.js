const ACCOUNT_DOMAIN = ({ env }) => {
  // ACCOUNT_DOMAIN = "['&', '&', '&',
  //   ('deprecated', '=', False),
  //   ('account_type', 'not in', (
  // 'asset_receivable','liability_payable','asset_cash', 'liability_credit_card')),
  //   ('company_id', '=', current_company_id),
  //   ('is_off_balance', '=', False)]"

  const current_company_id = env.web.session.current_company_id
  return [
    '&',
    '&',
    '&',
    ['deprecated', '=', false],
    [
      'account_type',
      'in',
      [
        'asset_receivable',
        'liability_payable',
        'asset_cash',
        'liability_credit_card'
      ]
    ],
    ['company_id', '=', current_company_id],
    ['is_off_balance', '=', false]
  ]
}

const ModelFields = {
  property_account_income_id: {
    domain: ACCOUNT_DOMAIN
  },
  property_account_expense_id: {
    domain: ACCOUNT_DOMAIN
  }
}

const AddonsFields = {
  'product.template': ModelFields
}

export default AddonsFields
