const ModelFields = {
  email: {
    readonly: [['parent.partner_readonly', '=', true]]
  },

  message: {},
  name: {},
  partner_id: {},
  resend: {}
}

const AddonsFields = {
  'mail.resend.message.partner_ids': ModelFields
}

export default AddonsFields

