const ModelFields = {
  crm_auto_assignment_action: { required: [['crm_use_auto_assignment', '=', true]] },
  crm_auto_assignment_interval_number: { required: [['crm_use_auto_assignment', '=', true], ['crm_auto_assignment_action', '=', 'auto']] },
  crm_auto_assignment_interval_type: { required: [['crm_use_auto_assignment', '=', true], ['crm_auto_assignment_action', '=', 'auto']] },
  crm_auto_assignment_run_datetime: {},
  crm_use_auto_assignment: {},
  group_use_lead: {},
  group_use_recurring_revenues: {},
  is_membership_multi: {},
  lead_enrich_auto: { required: 'True' },
  module_crm_iap_enrich: {},
  module_crm_iap_mine: {},
  module_website_crm_iap_reveal: {},
  predictive_lead_scoring_field_labels: {},
  predictive_lead_scoring_fields_str: {},
  predictive_lead_scoring_start_date: { readonly: '1' },
  predictive_lead_scoring_start_date_str: {}
}

const AddonsFields = {
  'res.config.settings': ModelFields
}

export default AddonsFields

