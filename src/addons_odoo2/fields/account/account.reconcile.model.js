const ModelFields = {
  active: {},
  allow_payment_tolerance: {},
  auto_reconcile: {},
  company_id: {},
  decimal_separator: {
    groups: 'base.group_no_one'
  },

  line_ids: {},
  match_amount: {},
  match_amount_max: {
    required: [['match_amount', '=', 'between']]
  },

  match_amount_min: {
    required: [['match_amount', '!=', false]]
  },

  match_journal_ids: {},
  match_label: {},
  match_label_param: {
    required: [['match_label', '!=', false]]
  },

  match_nature: {},
  match_note: {},
  match_note_param: {
    required: [['match_note', '!=', false]]
  },

  match_partner: {},
  match_partner_category_ids: {},
  match_partner_ids: {},
  match_same_currency: {},
  match_text_location_label: {},
  match_text_location_note: {},
  match_text_location_reference: {},
  match_transaction_type: {},
  match_transaction_type_param: {
    required: [['match_transaction_type', '!=', false]]
  },

  matching_order: {},
  name: {
    placeholder: 'e.g. Bank Fees'
  },

  number_entries: {
    string: 'Journal Entries'
  },

  partner_mapping_line_ids: {},
  past_months_limit: {},
  payment_tolerance_param: {},
  payment_tolerance_type: {},
  rule_type: {},
  sequence: {},
  show_decimal_separator: {},
  to_check: {}
}

const AddonsFields = {
  'account.reconcile.model': ModelFields
}

export default AddonsFields

