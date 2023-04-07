const ModelFields = {
  name: {},
  state: {
    selection: [
      ['draft', { en_US: 'Draft', zh_CN: '草稿', zh_HK: '草稿' }],
      ['posted', { en_US: 'Posted', zh_CN: '过账', zh_HK: '过账' }],
      ['cancel', { en_US: 'Cancelled', zh_CN: '取消', zh_HK: '取消' }]
    ]
  },

  is_internal_transfer: {
    readonly: 1
    // readonly: ({ record }) => {
    //   // 'readonly': [('state', '!=', 'draft')]
    //   const { state } = record
    //   return state !== 'draft'
    // }
  },

  payment_type: {
    selection: [
      ['outbound', { en_US: 'Send', zh_CN: '支付', zh_HK: '支付' }],
      ['inbound', { en_US: 'Receive', zh_CN: '收款', zh_HK: '收款' }]
    ],
    readonly: ({ record }) => {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    }
  },

  partner_type: {
    selection: [
      ['customer', { en_US: 'Customer', zh_CN: '客户', zh_HK: '客户' }],
      ['supplier', { en_US: 'Vendor', zh_CN: '供应商', zh_HK: '供应商' }]
    ]
  },

  partner_id: {
    // domain="['|', ('parent_id','=', False), ('is_company','=', True)]",
    domain: ['|', ['parent_id', '=', false], ['is_company', '=', true]]
  },

  partner_bank_id: {
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

  currency_id: {
    readonly: ({ record }) => {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    }
  },

  date: {
    readonly: ({ record }) => {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    }
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

  amount: {
    readonly: ({ record }) => {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    }
  }
}

const AddonsFields = {
  'account.payment': ModelFields
}

export default AddonsFields
