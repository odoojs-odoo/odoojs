const ModelFields = {
  message: {},
  partner_ids: {
    context: {
      force_email: true,
      show_email: true
    },
    placeholder: 'Add contacts to notify...'
  },

  res_id: {},
  res_model: {},
  send_mail: {}
}

const AddonsFields = {
  'mail.wizard.invite': ModelFields
}

export default AddonsFields

