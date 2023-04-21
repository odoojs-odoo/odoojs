const ModelFields = {
  attachment_ids: {},
  body_html: {},
  email_cc: {},
  email_from: {},
  email_to: {},
  error_msg: {},
  lang: { placeholder: 'Select a language' },
  mail_template_id: { readonly: '1' },
  model_id: { readonly: '1' },
  no_record: {},
  partner_ids: {},
  reply_to: {},
  resource_ref: { readonly: 'False' },
  scheduled_date: {},
  subject: {}
}

const AddonsFields = {
  'mail.template.preview': ModelFields
}

export default AddonsFields

