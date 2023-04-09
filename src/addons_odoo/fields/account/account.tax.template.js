const ModelFields = {
  cash_basis_transition_account_id: {
    required({ record }) {
      // 'required': [('tax_exigibility', '=', 'on_payment')]
      const { tax_exigibility } = record
      return tax_exigibility === 'on_payment'
    }
  }
}

const AddonsFields = {
  'account.tax.template': ModelFields
}

export default AddonsFields
