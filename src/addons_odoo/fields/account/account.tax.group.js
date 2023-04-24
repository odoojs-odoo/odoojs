const ModelFields = {
  country_code: {},
  country_id: {},
  name: {},
  preceding_subtotal: {},
  property_advance_tax_payment_account_id: {
    domain: ({ context }) => {
      if (context.force_account_company) {
        return [['company_id', '=', context.force_account_company]]
      } else {
        return []
      }
    }
  },

  property_tax_payable_account_id: {
    domain: ({ context }) => {
      if (context.force_account_company) {
        return [['company_id', '=', context.force_account_company]]
      } else {
        return []
      }
    }
  },

  property_tax_receivable_account_id: {
    domain: ({ context }) => {
      if (context.force_account_company) {
        return [['company_id', '=', context.force_account_company]]
      } else {
        return []
      }
    }
  },

  sequence: {}
}

const AddonsFields = {
  'account.tax.group': ModelFields
}

export default AddonsFields
