const ModelFields = {
  alias_contact: { string: 'Accept Emails From' },
  alias_domain: { readonly: '1' },
  alias_id: {
    string: 'Email Alias',
    required: '0'
  },

  alias_name: {},
  assignment_auto_enabled: {},
  assignment_domain: { string: 'Domain' },
  assignment_enabled: {},
  assignment_max: {},
  assignment_optout: {},
  lead_all_assigned_month_count: {},
  name: {},
  use_leads: {},
  use_opportunities: {}
}

const AddonsFields = {
  'crm.team': ModelFields
}

export default AddonsFields

