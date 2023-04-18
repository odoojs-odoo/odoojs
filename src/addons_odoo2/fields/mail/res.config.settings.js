const ModelFields = {
  alias_domain: {
    placeholder: 'e.g. "mycompany.com"'
  },

  external_email_server_default: {},
  module_google_gmail: {},
  module_microsoft_outlook: {},
  primary_color: {},
  restrict_template_rendering: {},
  secondary_color: {},
  twilio_account_sid: {
    placeholder: 'e.g. ACd5543a0b450ar4c7t95f1b6e8a39t543'
  },

  twilio_account_token: {
    placeholder: 'e.g. 65ea4f9e948b693N5156F350256bd152'
  },

  use_twilio_rtc_servers: {}
}

const AddonsFields = {
  'res.config.settings': ModelFields
}

export default AddonsFields

