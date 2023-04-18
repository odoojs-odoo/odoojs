const ModelFields = {
  active: {},
  company_id: {
    groups: 'base.group_multi_company'
  },

  partner_id: {},
  payment_details: {},
  provider_id: {
    readonly: '1'
  },

  provider_ref: {
    readonly: '1'
  }
}

const AddonsFields = {
  'payment.token': ModelFields
}

export default AddonsFields

