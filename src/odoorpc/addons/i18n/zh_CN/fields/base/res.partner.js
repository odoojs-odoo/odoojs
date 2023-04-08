const ModelFields = {
  name: { string: 'Name' },
  display_name: {},

  company_id: {},
  parent_id: {},

  is_company: {},
  company_type: {},

  type: {},

  image_1920: {},

  function: { placeholder: 'e.g. Sales Director' },

  title: { placeholder: 'e.g. Mister' },
  email: {},
  website: { placeholder: 'e.g. https://www.odoo.com' },

  street: { placeholder: 'Street...' },
  street2: { placeholder: 'Street 2...' },
  city: { placeholder: 'City' },

  state_id: { string: '州省', placeholder: 'State' },
  zip: { placeholder: 'ZIP' },
  country_id: { placeholder: 'Country' },
  vat: {},

  user_id: {}
}

const TitleFields = {
  name: {},
  shortcut: {}
}

const CategoryFields = {
  display_name: { string: '名称' },
  name: { string: '名称' },
  parent_id: { string: '上级' },
  active: { string: '激活' }
}

const IndustryFields = {
  name: {},
  full_name: {},
  active: {}
}

const AddonsFields = {
  'res.partner': ModelFields,
  'res.partner.title': TitleFields,
  'res.partner.category': CategoryFields,
  'res.partner.industry': IndustryFields
}

export default AddonsFields
