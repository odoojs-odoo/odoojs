const ModelFields = {
  default_account_id: {
    string({ record }) {
      const default_account = {
        en_US: 'Default Account',
        zh_CN: '默认科目',
        zh_HK: '默认科目'
      }

      const maps = {
        bank: {
          en_US: 'Bank Account',
          zh_CN: '银行存款科目',
          zh_HK: '银行存款科目'
        },
        cash: {
          en_US: 'Cash Account',
          zh_CN: '现金科目',
          zh_HK: '现金科目'
        },
        sale: {
          en_US: 'Default Income Account',
          zh_CN: '默认收入科目',
          zh_HK: '默认收入科目'
        },
        purchase: {
          en_US: 'Default Expense Account',
          zh_CN: '默认费用科目',
          zh_HK: '默认费用科目'
        },
        general: default_account
      }

      const { type } = record
      return maps[type] || default_account
    },
    domain({ record }) {
      // domain="
      // [('deprecated', '=', False),
      //  ('company_id', '=', company_id),
      //  ('account_type', '=', default_account_type),
      //  ('account_type', 'not in', ('asset_receivable', 'liability_payable'))
      // ]

      const { company_id, default_account_type } = record
      return [
        ['deprecated', '=', false],
        ['company_id', '=', company_id],
        ['account_type', '=', default_account_type],
        ['account_type', 'not in', ['asset_receivable', 'liability_payable']]
      ]
    }
  },

  suspense_account_id: {
    domain({ record }) {
      // [('deprecated', '=', False),
      //   ('company_id', '=', company_id),
      //    ('account_type', '=', 'asset_current')]

      const { company_id } = record
      return [
        ['deprecated', '=', false],
        ['company_id', '=', company_id],
        ['account_type', '=', 'asset_current']
      ]
    }
  },

  profit_account_id: {
    domain({ record }) {
      //   [('deprecated', '=', False),
      // ('company_id', '=', company_id),
      //  ('account_type', 'in', ('income', 'income_other'))]

      const { company_id } = record
      return [
        ['deprecated', '=', false],
        ['company_id', '=', company_id],
        ['account_type', 'in', ['income', 'income_other']]
      ]
    }
  },
  loss_account_id: {
    domain({ record }) {
      // [('deprecated', '=', False),
      // ('company_id', '=', company_id),
      //   ('account_type', '=', 'expense')]

      const { company_id } = record
      return [
        ['deprecated', '=', false],
        ['company_id', '=', company_id],
        ['account_type', '=', 'expense']
      ]
    }
  },

  bank_account_id: {
    domain({ record }) {
      // [
      // ('partner_id','=', company_partner_id),
      //   '|',
      //   ('company_id', '=', False),
      //   ('company_id', '=', company_id)
      // ]

      const { company_id, company_partner_id } = record
      return [
        ['partner_id', '=', company_partner_id],
        '|',
        ['company_id', '=', false],
        ['company_id', '=', company_id]
      ]
    }
  }
}

const AddonsFields = {
  'account.journal': ModelFields
}

export default AddonsFields
