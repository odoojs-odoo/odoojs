const ModelFields = {
  partner_bank_id: {
    //  context="{'default_allow_out_payment': True}"/>
    context: { default_allow_out_payment: true },
    readonly({ record }) {
      // 'readonly': [('payment_type', '=', 'inbound')]
      const { payment_type } = record
      return payment_type === 'inbound'
    },

    required({ record }) {
      // 'required': [('require_partner_bank_account', '=', True),
      // ('can_edit_wizard', '=', True), '|',
      // ('can_group_payments', '=', False), ('group_payment', '=', False)],
      const {
        require_partner_bank_account,
        can_edit_wizard,
        can_group_payments,
        group_payment
      } = record
      return (
        require_partner_bank_account &&
        can_edit_wizard &&
        (!can_group_payments || !group_payment)
      )
    }
  },
  journal_id: {
    required: '1',
    domain({ record }) {
      // domain="[('id', 'in', available_journal_ids)]")
      const { available_journal_ids } = record
      return [['id', 'in', available_journal_ids]]
    }
  },
  payment_method_line_id: { required: '1' },
  currency_id: { required: '1' },
  writeoff_account_id: {
    required({ record }) {
      // 'required':
      //   [('payment_difference_handling', '=', 'reconcile'),
      //   ('early_payment_discount_mode', '=', False)]}"/>
      const { payment_difference_handling, early_payment_discount_mode } =
        record
      return (
        payment_difference_handling === 'reconcile' &&
        !early_payment_discount_mode
      )
    }
  },
  writeoff_label: {
    required({ record }) {
      // 'required':
      //   [('payment_difference_handling', '=', 'reconcile')]
      const { payment_difference_handling } = record
      return payment_difference_handling === 'reconcile'
    }
  }
}

const AddonsFields = {
  'account.payment.register': ModelFields
}

export default AddonsFields
