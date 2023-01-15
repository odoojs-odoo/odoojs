const ModelFields = {
  display_name: {},
  image_url: {},
  name: {},
  code: {},
  currency_id: {},
  phone_code: {},
  vat_label: {},
  zip_required: {},
  state_required: {},
  address_view_id: {},
  address_format: {},
  name_position: {},
  state_ids: { string: '州省' }
}

const StateModelFields = {
  display_name: {},
  name: {},
  code: {}
}

const GroupModelFields = {
  name: {},
  country_ids: {},
  pricelist_ids: {}
}

const AddonsFields = {
  'res.country': ModelFields,
  'res.country.state': StateModelFields,
  'res.country.group': GroupModelFields
}

export default AddonsFields
