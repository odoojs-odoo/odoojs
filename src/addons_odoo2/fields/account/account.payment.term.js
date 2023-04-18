const ModelFields = {
  active: {},
  company_id: {
    groups: 'base.group_multi_company'
  },

  display_on_invoice: {},
  example_amount: {},
  example_date: {},
  example_invalid: {},
  example_preview: {},
  line_ids: {},
  name: {},
  note: {
    placeholder: 'Payment term explanation for the customer...'
  },

  sequence: {}
}

const AddonsFields = {
  'account.payment.term': ModelFields
}

export default AddonsFields

