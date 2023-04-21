const ModelFields = {
  active_user_count: {},
  company_count: {},
  company_id: {},
  company_informations: {},
  company_name: {},
  external_report_layout_id: { domain: [['type', '=', 'qweb']] },
  language_count: {},
  module_account_inter_company_rules: {},
  module_auth_ldap: {},
  module_auth_oauth: {},
  module_base_geolocalize: {},
  module_base_import: {},
  module_google_calendar: {},
  module_google_recaptcha: {},
  module_mail_plugin: {},
  module_microsoft_calendar: {},
  module_partner_autocomplete: {},
  module_web_unsplash: {},
  profiling_enabled_until: {},
  show_effect: {},
  user_default_rights: {}
}

const AddonsFields = {
  'res.config.settings': ModelFields
}

export default AddonsFields

