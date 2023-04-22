const ModelFields = {
  active: {},
  activity_calendar_event_id: {},
  activity_ids: {},
  activity_user_id: { string: 'Activity by' },
  automated_probability: {},
  calendar_event_count: {},
  campaign_id: {},
  city: { placeholder: 'City' },
  company_currency: {},
  company_id: { groups: 'base.group_multi_company' },
  contact_name: {},
  country_id: { placeholder: 'Country' },
  create_date: {},
  date_closed: {},
  date_conversion: {},
  date_deadline: {},
  date_open: {},
  day_close: {},
  day_open: {},
  description: { placeholder: 'Add a description...' },
  duplicate_lead_count: {},
  email_cc: { groups: 'base.group_no_one' },
  email_from: { string: 'Email' },
  email_state: {},
  expected_revenue: {},
  function: {},
  is_automated_probability: {},
  is_blacklisted: {},
  is_partner_visible: {},
  lang_active_count: {},
  lang_code: {},
  lang_id: {},
  lead_properties: {},
  lost_reason_id: {},
  medium_id: {},
  message_bounce: { readonly: '1' },
  message_needaction: {},
  mobile: { string: 'Mobile' },
  mobile_blacklisted: {},
  my_activity_date_deadline: { string: 'My Deadline' },
  name: {
    placeholder: 'e.g. Product Pricing',
    string: '===todo==',
    readonly: '1'
  },

  name_$_tree_$$_120: { string: 'Lead' },
  name_$_tree_$$_152: { string: 'Opportunity' },
  partner_email_update: {},
  partner_id: {
    string: '===todo==',
    context: '===todo=='
  },

  partner_id_$_form_$$_121: {
    string: 'Organization / Contact',
    context: { todo_ctx: "{                             'res_partner_search_mode': type == 'opportunity' and 'customer' or False,                             'default_name': contact_name or partner_name,                             'default_is_company': type == 'opportunity' and contact_name == False,                             'default_company_name': type == 'opportunity' and partner_name,                             'default_phone': phone,                             'default_email': email_from,                             'default_user_id': user_id,                             'default_team_id': team_id,                             'show_vat': True}" }
  },

  partner_id_$_form_$$_125: {
    string: 'Customer',
    context: { todo_ctx: "{'res_partner_search_mode': type == 'opportunity' and 'customer' or False,                                         'default_name': contact_name or partner_name,                                         'default_street': street,                                         'default_is_company': type == 'opportunity' and contact_name == False,                                         'default_company_name': type == 'opportunity' and partner_name,                                         'default_street2': street2,                                         'default_city': city,                                         'default_title': title,                                         'default_state_id': state_id,                                         'default_zip': zip,                                         'default_country_id': country_id,                                         'default_function': function,                                         'default_phone': phone,                                         'default_mobile': mobile,                                         'default_email': email_from,                                         'default_user_id': user_id,                                         'default_team_id': team_id,                                         'default_website': website,                                         'default_lang': lang_code,                                         'show_vat': True,                                     }" }
  },

  partner_id_$_form_$$_368: {
    context: { todo_ctx: "{                                         'default_name': contact_name,                                         'default_title': title,                                         'default_street': street,                                         'default_street2': street2,                                         'default_city': city,                                         'default_state_id': state_id,                                         'default_zip': zip,                                         'default_country_id': country_id,                                         'default_function': function,                                         'default_phone': phone,                                         'default_mobile': mobile,                                         'default_email': email_from,                                         'default_user_id': user_id,                                         'default_team_id': team_id,                                         'default_website': website,                                         'default_lang': lang_code,                                         'show_vat': True                                     }" }
  },

  partner_is_blacklisted: {},
  partner_name: {},
  partner_phone_update: {},
  phone: { string: 'Phone' },
  phone_blacklisted: {},
  phone_state: {},
  priority: {},
  probability: { string: 'Probability (%)' },
  prorated_revenue: {},
  recurring_plan: {
    required: [['recurring_revenue', '!=', 0]],
    placeholder: 'E.g. Monthly',
    groups: 'crm.group_use_recurring_revenues'
  },

  recurring_revenue: { groups: 'crm.group_use_recurring_revenues' },
  recurring_revenue_monthly: { groups: 'crm.group_use_recurring_revenues' },
  referred: {},
  source_id: {},
  stage_id: {},
  state_id: { placeholder: 'State' },
  street2: { placeholder: 'Street 2...' },
  street: { placeholder: 'Street...' },
  tag_ids: {},
  team_id: {},
  title: {
    domain: [],
    placeholder: 'Title'
  },

  type: {},
  user_company_ids: {},
  user_id: {
    context: { todo_ctx: "{'default_sales_team_id': team_id}" },
    domain: [['share', '=', false]]
  },

  website: { placeholder: 'e.g. https://www.odoo.com' },
  zip: { placeholder: 'ZIP' }
}

const AddonsFields = {
  'crm.lead': ModelFields
}

export default AddonsFields

