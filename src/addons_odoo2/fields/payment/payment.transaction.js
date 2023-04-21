const ModelFields = {
  amount: {},
  company_id: { groups: 'base.group_multi_company' },
  create_date: {},
  currency_id: {},
  fees: {},
  last_state_change: {},
  partner_address: { placeholder: 'Address' },
  partner_city: { placeholder: 'City' },
  partner_country_id: { placeholder: 'Country' },
  partner_email: {},
  partner_id: {},
  partner_lang: {},
  partner_name: {},
  partner_phone: {},
  partner_state_id: { placeholder: 'State' },
  partner_zip: { placeholder: 'ZIP' },
  provider_code: {},
  provider_id: {},
  provider_reference: {},
  reference: {},
  refunds_count: { string: 'Refunds' },
  source_transaction_id: {},
  state: {},
  state_message: {},
  token_id: {}
}

const AddonsFields = {
  'payment.transaction': ModelFields
}

export default AddonsFields

