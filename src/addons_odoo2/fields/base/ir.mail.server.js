const ModelFields = {
  active: {},
  from_filter: {},
  name: {
    placeholder: 'e.g. My Outgoing Server'
  },

  sequence: {},
  smtp_authentication: {},
  smtp_authentication_info: {},
  smtp_debug: {
    groups: 'base.group_no_one'
  },

  smtp_encryption: {},
  smtp_host: {},
  smtp_pass: {},
  smtp_port: {},
  smtp_ssl_certificate: {},
  smtp_ssl_private_key: {},
  smtp_user: {}
}

const AddonsFields = {
  'ir.mail.server': ModelFields
}

export default AddonsFields

