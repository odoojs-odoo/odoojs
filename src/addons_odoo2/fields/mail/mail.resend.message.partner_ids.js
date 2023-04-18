const ModelFields = {
  email: {
    readonly: [['parent.partner_readonly', '=', true]]
  },

  message: {
    readonly: '1'
  },

  name: {
    readonly: '1'
  },

  partner_id: {},
  resend: {}
}

const AddonsFields = {
  'mail.resend.message.partner_ids': ModelFields
}

export default AddonsFields

