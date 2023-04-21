const ModelFields = {
  country_code: {},
  country_id: {},
  name: {},
  preceding_subtotal: {},
  property_advance_tax_payment_account_id: {
    domain: { todo_ctx: "[('company_id', '=', context['force_account_company'])] if context.get('force_account_company') else []" }
  },

  property_tax_payable_account_id: {
    domain: { todo_ctx: "[('company_id', '=', context['force_account_company'])] if context.get('force_account_company') else []" }
  },

  property_tax_receivable_account_id: {
    domain: { todo_ctx: "[('company_id', '=', context['force_account_company'])] if context.get('force_account_company') else []" }
  },

  sequence: {}
}

const AddonsFields = {
  'account.tax.group': ModelFields
}

export default AddonsFields

