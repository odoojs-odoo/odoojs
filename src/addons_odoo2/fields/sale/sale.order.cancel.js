const ModelFields = {
  body: {},
  display_invoice_alert: {},
  order_id: {},
  recipient_ids: {
    context: {
      force_email: true,
      show_email: true,
      no_create_edit: true
    }
  },

  render_model: {},
  subject: { placeholder: 'Subject' },
  template_id: {}
}

const AddonsFields = {
  'sale.order.cancel': ModelFields
}

export default AddonsFields

