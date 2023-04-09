const ModelFields = {
  journal_id: {
    required: '1',
    domain({ record }) {
      // domain="[('id', 'in', available_journal_ids)]")
      const { available_journal_ids } = record
      return [['id', 'in', available_journal_ids]]
    }
  },

  partner_bank_id: {
    domain({ record }) {
      // domain="[('id', 'in', available_partner_bank_ids)]",
      const { available_partner_bank_ids } = record
      return [['id', 'in', available_partner_bank_ids]]
    }
  },

  payment_method_line_id: {
    domain({ record }) {
      //  domain="[('id', 'in', available_payment_method_line_ids)]"
      const { available_payment_method_line_ids } = record
      return [['id', 'in', available_payment_method_line_ids]]
    }
  },

  writeoff_account_id: {
    domain({ record }) {
      //   domain="[('deprecated', '=', False),
      //   ('company_id', '=', company_id)]",
      const { company_id } = record
      return [
        ['deprecated', '=', false],
        ['company_id', '=', company_id]
      ]
    }
  }
}

const AddonsFields = {
  'account.payment.register': ModelFields
}

export default AddonsFields
