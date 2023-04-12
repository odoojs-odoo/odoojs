const ModelFields = {
  display_name: {},
  image_url: {},
  name: { string: 'Name' },
  code: {},
  currency_id: {},
  phone_code: {},
  vat_label: {},
  zip_required: {},
  state_required: {},
  address_view_id: {},
  address_format: {},
  name_position: {},
  state_ids: {
    // string: 'States'
  }
}

const StateModelFields = {
  name: { string: 'Name' },
  code: { string: 'Code' }
}

const GroupModelFields = {
  name: { string: 'Name' },
  country_ids: { string: 'Countrys' }
}

const AddonsFields = {
  'res.country': ModelFields,
  'res.country.state': StateModelFields,
  'res.country.group': GroupModelFields
}

export default AddonsFields
