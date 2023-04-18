const ModelFields = {
  auth_signup_uninvited: {},
  automatic_invoice: {},
  default_invoice_policy: {},
  deposit_default_product_id: {
    context: {
      default_detailed_type: 'service'
    }
  },

  group_auto_done_setting: {},
  group_discount_per_so_line: {},
  group_product_pricelist: {},
  group_product_variant: {},
  group_proforma_sales: {},
  group_sale_pricelist: {},
  group_stock_packaging: {},
  group_uom: {},
  group_warning_sale: {},
  invoice_mail_template_id: {},
  module_delivery: {},
  module_delivery_bpost: {},
  module_delivery_dhl: {},
  module_delivery_easypost: {},
  module_delivery_fedex: {},
  module_delivery_sendcloud: {},
  module_delivery_ups: {},
  module_delivery_usps: {},
  module_loyalty: {},
  module_product_email_template: {},
  module_sale_amazon: {},
  module_sale_margin: {},
  module_sale_product_matrix: {},
  portal_confirmation_pay: {},
  portal_confirmation_sign: {},
  product_pricelist_setting: {},
  quotation_validity_days: {
    required: [['use_quotation_validity_days', '=', true]]
  },

  use_quotation_validity_days: {}
}

const AddonsFields = {
  'res.config.settings': ModelFields
}

export default AddonsFields

