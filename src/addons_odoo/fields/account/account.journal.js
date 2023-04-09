const ModelFields = {
  code: { placeholder: 'e.g. INV' },
  currency_id: { groups: 'base.group_multi_currency' },

  default_account_id: {
    groups: 'account.group_account_readonly',
    required({ record }) {
      // 'required': [
      // '|',
      // '&amp;',
      // ('id', '!=', False),
      // ('type', 'in', ('bank', 'cash')),
      // ('type', 'in', ('sale', 'purchase'))]
      const { type, id: res_id } = record

      return (
        (res_id && ['bank', 'cash'].includes(type)) ||
        ['sale', 'purchase'].includes(type)
      )
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
    groups: 'account.group_account_readonly',
    required({ record }) {
      // [('type', 'in', ('bank', 'cash'))]
      const { type } = record
      return ['bank', 'cash'].includes(type)
    },
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
    string: 'Account Number',
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
    },
    context({ record }) {
      // context="{'default_partner_id': company_partner_id}"
      const { company_partner_id } = record
      return {
        default_partner_id: company_partner_id
      }
    }
  },

  bank_statements_source: {
    groups: 'account.group_account_readonly',
    required({ record }) {
      // 'required': [('type', '=', 'bank')]
      const { type } = record
      return type === 'bank'
    }
  },

  restrict_mode_hash_table: { groups: 'account.group_account_readonly' }
}

const AddonsFields = {
  'account.journal': ModelFields
}

export default AddonsFields
