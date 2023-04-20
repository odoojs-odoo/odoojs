const ModelFields = {
  activity_exception_decoration: {},
  activity_ids: {},
  amount_total: {},
  amount_untaxed: {
    string: 'Untaxed'
  },

  company_id: {
    groups: 'base.group_multi_company',
    readonly: '1'
  },

  currency_id: {
    groups: '===todo=='
  },

  currency_id_$_form_$$_897: {
    groups: 'base.group_multi_currency'
  },

  currency_id_$_form_$$_964: {
    groups: '!base.group_multi_currency'
  },

  date_approve: {},
  date_order: {},
  date_planned: {
    readonly: [['state', 'not in', ('draft', 'sent', 'to approve', 'purchase')]]
  },

  fiscal_position_id: {
    readonly: ['|', ['invoice_status', '=', 'invoiced'], ['state', '=', 'done']]
  },

  id: {},
  invoice_count: {
    string: 'Vendor Bills'
  },

  invoice_ids: {},
  invoice_status: {},
  mail_reception_confirmed: {},
  mail_reminder_confirmed: {},
  name: {
    readonly: '1',
    string: 'Reference'
  },

  notes: {
    placeholder: 'Define your terms and conditions ...'
  },

  order_line: {
    readonly: [['state', 'in', ('done', 'cancel')]],
    context: {
      default_state: 'draft'
    }
  },

  origin: {},
  partner_id: {
    context: {
      res_partner_search_mode: 'supplier',
      show_vat: true
    },
    placeholder: 'Name, TIN, Email, or Reference',
    readonly: '1'
  },

  partner_ref: {},
  payment_term_id: {
    readonly: ['|', ['invoice_status', '=', 'invoiced'], ['state', '=', 'done']]
  },

  priority: {},
  receipt_reminder_email: {},
  reminder_date_before_receipt: {},
  state: {},
  tax_country_id: {},
  tax_totals: {
    readonly: '1'
  },

  user_id: {
    domain: [['share', '=', false]]
  }
}

const AddonsFields = {
  'purchase.order': ModelFields
}

export default AddonsFields

