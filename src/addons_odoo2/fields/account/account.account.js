const ModelFields = {
  account_type: {},
  allowed_journal_ids: {
    domain: {
      todo_ctx: "[('company_id','=',company_id)]"
    }
  },

  code: {
    placeholder: 'e.g. 101000'
  },

  company_id: {
    groups: 'base.group_multi_company'
  },

  currency_id: {
    groups: 'base.group_multi_currency'
  },

  current_balance: {},
  deprecated: {},
  group_id: {},
  internal_group: {},
  name: {
    placeholder: 'e.g. Current Assets'
  },

  non_trade: {},
  opening_balance: {},
  opening_credit: {},
  opening_debit: {},
  reconcile: {},
  related_taxes_amount: {},
  tag_ids: {
    domain: [['applicability', '=', 'accounts']],
    context: {
      default_applicability: 'accounts'
    }
  },

  tax_ids: {
    domain: {
      todo_ctx: "[('company_id','=',company_id)]"
    }
  }
}

const AddonsFields = {
  'account.account': ModelFields
}

export default AddonsFields

