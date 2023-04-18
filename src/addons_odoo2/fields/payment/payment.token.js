const ModelFields = {
  active: {},
  company_id: {
    groups: 'base.group_multi_company'
  },

  partner_id: {},
  payment_details: {},
  provider_id: {},
  provider_ref: {}
}

const AddonsFields = {
  'payment.token': ModelFields
}

export default AddonsFields

