const ModelFields = {
  bank_ids: {
    context: { default_allow_out_payment: true }
  },

  credit: {},
  credit_limit: {},
  currency_id: {},
  duplicated_bank_account_partners_count: {},
  invoice_warn: { required: '1' },
  invoice_warn_msg: {
    placeholder: 'Type a message...',
    required: ({ record }) => {
      // 'required':
      // [('invoice_warn','!=', False),
      // ('invoice_warn','!=','no-message')],
      const { invoice_warn } = record
      return invoice_warn && invoice_warn !== 'no-message'
    }
  },

  property_account_payable_id: {
    domain: ({ env }) => {
      // domain="[('account_type', '=', 'liability_payable'),
      //   ('deprecated', '=', False),
      //   ('company_id', '=', current_company_id)]",
      const current_company_id = env.web.session.current_company_id
      return [
        ['account_type', '=', 'liability_payable'],
        ['deprecated', '=', false],
        ['company_id', '=', current_company_id]
      ]
    }
  },
  property_account_position_id: {
    domain: ({ env }) => {
      // domain="[('company_id', '=', current_company_id)]",
      const current_company_id = env.web.session.current_company_id
      return [['company_id', '=', current_company_id]]
    }
  },

  property_account_receivable_id: {
    domain: ({ env }) => {
      // domain="[('account_type', '=', 'asset_receivable'),
      //   ('deprecated', '=', False),
      //   ('company_id', '=', current_company_id)]",
      const current_company_id = env.web.session.current_company_id
      return [
        ['account_type', '=', 'asset_receivable'],
        ['deprecated', '=', false],
        ['company_id', '=', current_company_id]
      ]
    }
  },

  property_payment_term_id: {
    string: 'Payment Terms',
    groups: 'account.group_account_invoice,account.group_account_readonly',
    domain: ({ env }) => {
      // domain="[('company_id', 'in', [current_company_id, False])]",
      const current_company_id = env.web.session.current_company_id
      return [['company_id', 'in', [current_company_id, false]]]
    }
  },

  property_supplier_payment_term_id: {
    string: 'Payment Terms',
    groups: 'account.group_account_invoice,account.group_account_readonly',
    domain: ({ env }) => {
      // domain="[('company_id', 'in', [current_company_id, False])]"
      const current_company_id = env.web.session.current_company_id
      return [['company_id', 'in', [current_company_id, false]]]
    }
  },
  show_credit_limit: {},
  total_invoiced: {},
  use_partner_credit_limit: {}
}

const AddonsFields = {
  'res.partner': ModelFields
}

export default AddonsFields
