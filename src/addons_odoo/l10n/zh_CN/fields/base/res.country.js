const ModelFields = {
  display_name: {},
  image_url: {},
  name: { string: '国家名称' },
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
  name: { string: '名称' },
  code: { string: '代码' }
}

const GroupModelFields = {
  name: { string: '名称' },
  country_ids: { string: '国家' }
}

const AddonsFields = {
  'res.country': ModelFields,
  'res.country.state': StateModelFields,
  'res.country.group': GroupModelFields
}

export default AddonsFields
