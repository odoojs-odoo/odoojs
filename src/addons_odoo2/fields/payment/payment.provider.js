const ModelFields = {
  allow_express_checkout: {},
  allow_tokenization: {},
  auth_msg: {},
  available_country_ids: {
    placeholder: 'Select countries. Leave empty to make available everywhere.'
  },

  cancel_msg: {},
  capture_manually: {},
  code: {
    groups: 'base.group_no_one',
    readonly: [['id', '!=', false]]
  },

  company_id: {
    groups: 'base.group_multi_company'
  },

  display_as: {
    placeholder: 'If not defined, the provider name will be used.'
  },

  done_msg: {},
  fees_active: {},
  fees_dom_fixed: {},
  fees_dom_var: {},
  fees_int_fixed: {},
  fees_int_var: {},
  image_128: {
    readonly: [['module_state', '!=', 'installed']]
  },

  is_published: {},
  main_currency_id: {},
  maximum_amount: {},
  module_id: {},
  module_state: {},
  module_to_buy: {},
  name: {
    placeholder: 'Name'
  },

  payment_icon_ids: {},
  pending_msg: {},
  pre_msg: {},
  sequence: {},
  show_allow_express_checkout: {},
  show_allow_tokenization: {},
  show_auth_msg: {},
  show_cancel_msg: {},
  show_credentials_page: {},
  show_done_msg: {},
  show_payment_icon_ids: {},
  show_pending_msg: {},
  show_pre_msg: {},
  state: {},
  support_express_checkout: {},
  support_fees: {},
  support_manual_capture: {},
  support_tokenization: {}
}

const AddonsFields = {
  'payment.provider': ModelFields
}

export default AddonsFields

