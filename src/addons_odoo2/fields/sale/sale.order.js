const ModelFields = {
  activity_ids: {},
  amount_tax: {},
  amount_total: {},
  amount_untaxed: {},
  analytic_account_id: {
    groups: 'analytic.group_analytic_accounting',
    readonly: [['invoice_count', '!=', 0], ['state', '=', 'sale']],
    context: { todo_ctx: "{'default_partner_id':partner_invoice_id, 'default_name':name}" }
  },

  campaign_id: {},
  client_order_ref: {},
  commitment_date: {},
  company_id: {
    groups: 'base.group_multi_company',
    readonly: '1'
  },

  create_date: { string: 'Creation Date' },
  currency_id: {},
  date_order: {
    groups: 'base.group_no_one',
    string: 'Order Date'
  },

  expected_date: {},
  fiscal_position_id: {},
  invoice_count: { string: 'Invoices' },
  invoice_status: { groups: '===todo==' },
  invoice_status_$_form_$$_111: { groups: '!base.group_no_one' },
  invoice_status_$_form_$$_190: { groups: 'base.group_no_one' },
  medium_id: {},
  message_needaction: {},
  name: {
    readonly: '1',
    string: 'Number'
  },

  note: { placeholder: 'Terms and conditions...' },
  order_line: { readonly: [['state', 'in', ('done', 'cancel')]] },
  origin: {},
  partner_credit_warning: {},
  partner_id: {
    context: {
      res_partner_search_mode: 'customer',
      show_address: 1,
      show_vat: true
    },
    readonly: '1'
  },

  partner_invoice_id: {
    groups: 'account.group_delivery_invoice_address',
    context: { default_type: 'invoice' }
  },

  partner_shipping_id: {
    groups: 'account.group_delivery_invoice_address',
    context: { default_type: 'delivery' }
  },

  payment_term_id: {},
  pricelist_id: { groups: '!product.group_product_pricelist' },
  reference: { readonly: '1' },
  require_payment: {},
  require_signature: {},
  show_update_fpos: {},
  show_update_pricelist: {},
  signature: {},
  signed_by: {},
  signed_on: {},
  source_id: {},
  state: {},
  tag_ids: {},
  tax_country_id: {},
  tax_totals: { readonly: '1' },
  team_id: {},
  user_id: {},
  validity_date: {}
}

const AddonsFields = {
  'sale.order': ModelFields
}

export default AddonsFields

