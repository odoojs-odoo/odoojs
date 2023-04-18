const ModelFields = {
  attachment_ids: {
    string: 'Attach a file'
  },

  body: {},
  composition_mode: {},
  email_from: {},
  invoice_ids: {},
  invoice_without_email: {},
  is_email: {},
  is_print: {},
  mail_server_id: {},
  move_types: {},
  partner_ids: {
    context: {
      force_email: true,
      show_email: true
    },
    placeholder: 'Add contacts to notify...'
  },

  subject: {
    required: [['is_email', '=', true], ['composition_mode', '=', 'comment']],
    placeholder: 'Subject...'
  },

  template_id: {
    context: {
      default_model: 'account.move'
    }
  }
}

const AddonsFields = {
  'account.invoice.send': ModelFields
}

export default AddonsFields

