const ModelFields = {
  body: {
    string: 'Message',
    required: '1'
  },

  failure_type: {
    readonly: '1'
  },

  mail_message_id: {
    readonly: '1'
  },

  number: {
    required: '1'
  },

  partner_id: {
    string: 'Contact'
  },

  state: {}
}

const AddonsFields = {
  'sms.sms': ModelFields
}

export default AddonsFields

