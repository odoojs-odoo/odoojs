const ModelFields = {
  author_id: {
    string: 'User'
  },

  auto_delete: {},
  body_html: {},
  date: {
    readonly: '1'
  },

  email_cc: {},
  email_from: {},
  email_to: {},
  failure_reason: {},
  fetchmail_server_id: {},
  headers: {},
  is_notification: {},
  mail_message_id_int: {
    required: '0'
  },

  mail_server_id: {},
  message_id: {},
  message_type: {},
  model: {},
  recipient_ids: {
    domain: [['type', '!=', 'private'], ['active', '=', true]]
  },

  references: {},
  reply_to: {},
  res_id: {},
  restricted_attachment_count: {},
  scheduled_date: {
    placeholder: 'YYYY-MM-DD HH:MM:SS'
  },

  state: {},
  subject: {},
  to_delete: {},
  unrestricted_attachment_ids: {
    domain: [['res_field', '=', false]]
  }
}

const AddonsFields = {
  'mail.mail': ModelFields
}

export default AddonsFields

