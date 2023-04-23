const ModelFields = {
  account_type: {},
  allowed_journal_ids: {
    domain: ({ record }) => {
      const { company_id } = record
      return [['company_id', '=', company_id]]
    }
  },
  code: { placeholder: 'e.g. 101000' },
  company_id: { groups: 'base.group_multi_company' },
  currency_id: { groups: 'base.group_multi_currency' },
  current_balance: {},
  deprecated: {},
  group_id: {},
  internal_group: { readonly: '1' },
  name: { placeholder: 'e.g. Current Assets' },
  non_trade: {},
  opening_balance: {},
  opening_credit: {},
  opening_debit: {},
  reconcile: {},
  related_taxes_amount: {},
  tag_ids: {
    domain: () => {
      return [['applicability', '=', 'accounts']]
    }
  },
  tax_ids: {
    domain: ({ record }) => {
      const { company_id } = record
      return [['company_id', '=', company_id]]
    }
  }
}

const AddonsFields = {
  'account.account': ModelFields
}

export default AddonsFields
