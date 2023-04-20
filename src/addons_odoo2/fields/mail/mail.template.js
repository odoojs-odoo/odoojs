const ModelFields = {
  attachment_ids: {},
  auto_delete: {},
  body_html: {
    readonly: [['can_write', '=', false], ['id', '!=', false]]
  },

  can_write: {},
  description: {},
  email_cc: {
    placeholder: 'Comma-separated carbon copy recipients addresses'
  },

  email_from: {
    placeholder: "Override author's email"
  },

  email_to: {
    placeholder: 'Comma-separated recipient addresses'
  },

  lang: {
    placeholder: '{{ object.partner_id.lang }}'
  },

  mail_server_id: {},
  model: {},
  model_id: {
    required: '1',
    placeholder: 'e.g. Contact',
    groups: 'base.group_no_one'
  },

  name: {
    required: '1',
    placeholder: 'e.g. "Welcome email"'
  },

  partner_to: {
    placeholder: 'Comma-separated ids of recipient partners'
  },

  ref_ir_act_window: {},
  reply_to: {
    placeholder: 'Email address to which replies will be redirected when sending emails in mass'
  },

  report_name: {},
  report_template: {
    domain: {
      todo_ctx: "[('model','=',model)]"
    }
  },

  scheduled_date: {
    string: 'Scheduled Send Date'
  },

  subject: {
    placeholder: 'e.g. "Welcome to MyCompany" or "Nice to meet you, {{ object.name }}"'
  },

  use_default_to: {}
}

const AddonsFields = {
  'mail.template': ModelFields
}

export default AddonsFields

