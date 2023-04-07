const ModelFields = {
  payment_method_id: {
    domain: ({ record }) => {
      // [('payment_type', '=?', payment_type),
      // ('id', 'in', available_payment_method_ids)]
      const { payment_type, available_payment_method_ids } = record
      return [
        ['payment_type', '=?', payment_type],
        ['id', 'in', available_payment_method_ids]
      ]
    }
  },

  payment_account_id: {
    groups: 'account.group_account_readonly',
    string: 'Outstanding Receipts accounts',
    placeholder: 'Leave empty to use the default outstanding account',

    domain({ record }) {
      // [
      // ('deprecated', '=', False),
      // ('company_id', '=', company_id),
      // ('account_type', 'not in', ('asset_receivable', 'liability_payable')),
      // '|',
      // ('account_type', 'in', ('asset_current', 'liability_current')),
      // ('id', '=', parent.default_account_id)
      // ]

      console.log(record)
      //   todo parent
      const { company_id, parent: parent_record = {} } = record
      return [
        ['deprecated', '=', false],
        ['company_id', '=', company_id],
        ['account_type', 'not in', ['asset_receivable', 'liability_payable']],
        '|',
        ['account_type', 'not in', ['asset_receivable', 'liability_payable']],
        ['id', '=', parent_record.default_account_id]
      ]
    }
  }
}

const AddonsFields = {
  'account.payment.method.line': ModelFields
}

export default AddonsFields
