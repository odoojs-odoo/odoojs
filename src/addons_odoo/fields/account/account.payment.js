const ModelFields = {
  amount: {
    readonly: ({ record }) => {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    }
  },
  amount_company_currency_signed: { string: 'Amount' },
  amount_signed: {
    string: 'Amount in Currency',
    groups: 'base.group_multi_currency'
  },

  available_journal_ids: {},
  available_partner_bank_ids: {},
  available_payment_method_line_ids: {},
  company_currency_id: {},
  company_id: {},
  country_code: {},
  currency_id: {
    groups: 'base.group_multi_currency',
    readonly: ({ record }) => {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    },
    required: '1',
    string: 'Payment Currency'
  },

  date: {
    readonly: ({ record }) => {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    }
  },

  destination_journal_id: {
    readonly({ record }) {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    },
    required({ record }) {
      // 'required': [('is_internal_transfer', '=', True),('state', '=', 'draft')]
      const { is_internal_transfer, state } = record
      return is_internal_transfer && state === 'draft'
    },
    domain({ record }) {
      // domain="[('type', 'in', ('bank','cash')),
      //   ('company_id', '=', company_id), ('id', '!=', journal_id)]",
      const { company_id, journal_id } = record
      return [
        ['type', 'in', ['bank', 'cash']],
        ['company_id', '=', company_id],
        ['id', '!=', journal_id]
      ]
    }
  },

  is_internal_transfer: {
    readonly: 1
    // readonly: ({ record }) => {
    //   // 'readonly': [('state', '!=', 'draft')]
    //   const { state } = record
    //   return state !== 'draft'
    // }
  },

  journal_id: {
    readonly({ record }) {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    },

    domain({ record }) {
      // domain="[('id', 'in', available_journal_ids)]"
      const { available_journal_ids } = record
      return [['id', 'in', available_journal_ids]]
    }
  },
  name: { readonly: '1' },

  partner_bank_id: {
    // string: 'Customer Bank Account'
    // string: 'Vendor Bank Account'
    // string: 'Company Bank Account'
    readonly({ record }) {
      // checked: account_payment_view.xml, line 294
      // Company Bank Account  'invisible': ['|', '|',
      // ('show_partner_bank_account', '=', False),
      // ('is_internal_transfer', '=', True),
      // ('payment_type', '=', 'outbound')],
      const { payment_type } = record
      return payment_type !== 'outbound'
    },
    required({ record }) {
      // 'required': [('require_partner_bank_account', '=', True),
      // ('is_internal_transfer', '=', False)],

      const { require_partner_bank_account, is_internal_transfer } = record
      return require_partner_bank_account && !is_internal_transfer
    }
  },

  partner_id: {
    // string: 'Customer'
    // string: 'Vendor'
    domain: ['|', ['parent_id', '=', false], ['is_company', '=', true]]
  },

  partner_type: {
    selection: [
      ['customer', 'Customer'],
      ['supplier', 'Vendor']
    ]
  },
  payment_method_code: {},
  payment_method_line_id: {
    required: '1',
    readonly: ({ record }) => {
      // 'readonly':[('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    },
    domain({ record }) {
      //  domain="[('id', 'in', available_payment_method_line_ids)]"
      const { available_payment_method_line_ids } = record
      return [['id', 'in', available_payment_method_line_ids]]
    }
  },
  payment_type: {
    selection: [
      ['outbound', 'Send'],
      ['inbound', 'Receive']
    ],
    readonly: ({ record }) => {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    }
  },
  posted_before: {},
  qr_code: {},
  reconciled_bills_count: {},
  reconciled_invoices_count: {},
  reconciled_invoices_type: {},
  reconciled_statement_lines_count: {},
  ref: { string: 'Memo' },
  require_partner_bank_account: {},
  show_partner_bank_account: {},
  state: {
    selection: [
      ['draft', 'Draft'],
      ['posted', 'Posted'],
      ['cancel', 'Cancelled']
    ]
  },
  suitable_journal_ids: {}
}

const AddonsFields = {
  'account.payment': ModelFields
}

export default AddonsFields
