const ModelFields = {
  amount: {},
  available_journal_ids: {},
  available_partner_bank_ids: {},
  available_payment_method_line_ids: {},
  can_edit_wizard: {},
  can_group_payments: {},
  communication: {},
  company_currency_id: {},
  company_id: {},
  country_code: {},
  currency_id: {
    groups: 'base.group_multi_currency'
  },

  early_payment_discount_mode: {},
  group_payment: {},
  hide_writeoff_section: {},
  journal_id: {},
  line_ids: {},
  partner_bank_id: {
    required: [['require_partner_bank_account', '=', true], ['can_edit_wizard', '=', true], '|', ['can_group_payments', '=', false], ['group_payment', '=', false]],
    readonly: [['payment_type', '=', 'inbound']],
    context: {
      default_allow_out_payment: true
    }
  },

  partner_id: {},
  partner_type: {},
  payment_date: {},
  payment_difference: {},
  payment_difference_handling: {},
  payment_method_line_id: {},
  payment_type: {},
  require_partner_bank_account: {},
  show_partner_bank_account: {},
  source_amount: {},
  source_amount_currency: {},
  source_currency_id: {},
  writeoff_account_id: {
    string: 'Post Difference In',
    required: [['payment_difference_handling', '=', 'reconcile'], ['early_payment_discount_mode', '=', false]]
  },

  writeoff_label: {
    required: [['payment_difference_handling', '=', 'reconcile']]
  }
}

const AddonsFields = {
  'account.payment.register': ModelFields
}

export default AddonsFields

