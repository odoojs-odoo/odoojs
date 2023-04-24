const ModelFields = {
  account_control_ids: {},
  active: {},
  alias_domain: { readonly: '1' },
  alias_id: {},
  alias_name: {},
  available_payment_method_ids: {},
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
  bank_id: {},
  bank_statements_source: {
    groups: 'account.group_account_readonly',
    required({ record }) {
      // 'required': [('type', '=', 'bank')]
      const { type } = record
      return type === 'bank'
    }
  },

  code: { placeholder: 'e.g. INV' },
  company_id: { groups: 'base.group_multi_company' },
  company_partner_id: {},
  country_code: {},
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
  default_account_type: {},
  inbound_payment_method_line_ids: {
    context: { default_payment_type: 'inbound' }
  },

  invoice_reference_model: {},
  invoice_reference_type: {},
  journal_group_ids: { readonly: '1' },
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
  name: { placeholder: 'e.g. Customer Invoices' },
  outbound_payment_method_line_ids: {
    context: { default_payment_type: 'outbound' }
  },

  payment_sequence: {},

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
  refund_sequence: {},
  restrict_mode_hash_table: { groups: 'account.group_account_readonly' },
  sale_activity_note: {
    placeholder: 'e.g. Give a phone call, check with others , ...'
  },
  sale_activity_type_id: {},
  sale_activity_user_id: {},
  selected_payment_method_codes: {},
  sequence: {},
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
  type: {}
}

const AddonsFields = {
  'account.journal': ModelFields
}

export default AddonsFields
