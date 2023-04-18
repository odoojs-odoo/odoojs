const ModelFields = {
  attachment_ids: {
    string: 'Attach a file'
  },

  author_id: {},
  auto_delete: {},
  auto_delete_message: {},
  body: {
    readonly: [['can_edit_body', '=', false]],
    placeholder: 'Write your message here...'
  },

  can_edit_body: {},
  composition_mode: {},
  email_from: {},
  email_layout_xmlid: {},
  is_log: {},
  mail_server_id: {},
  model: {},
  notify: {},
  parent_id: {},
  partner_ids: {
    context: {
      force_email: true,
      show_email: true
    },
    placeholder: 'Add contacts to notify...'
  },

  record_name: {},
  reply_to: {
    string: 'Reply-to Address',
    required: [['reply_to_mode', '!=', 'update'], ['composition_mode', '=', 'mass_mail']],
    placeholder: 'e.g: "info@mycompany.odoo.com"'
  },

  reply_to_force_new: {},
  reply_to_mode: {},
  res_id: {},
  subject: {
    required: 'True',
    placeholder: 'Welcome to MyCompany!'
  },

  subtype_id: {},
  template_id: {
    string: 'Load template',
    context: {
      todo_ctx: "{'default_model': model, 'default_body_html': body, 'default_subject': subject}"
    }
  }
}

const AddonsFields = {
  'mail.compose.message': ModelFields
}

export default AddonsFields

