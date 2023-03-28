const ModelFields = {
  name: { string: 'Name' },
  display_name: {},

  parent_id: {
    domain: () => {
      // [('is_company', '=', True)]
      return [['is_company', '=', true]]
    }
  },

  image_1920: {},
  is_company: {},
  company_type: {},

  type: {},
  email: {},
  company_id: {},

  state_id: {
    name: '州省',
    domain: ({ record }) => {
      // domain="[('country_id', '=?', country_id)]"
      const { country_id } = record
      return [['country_id', '=?', country_id]]
    }
  },

  user_id: { domain: [['share', '=', false]] }
}

const TitleFields = {
  name: {},
  shortcut: {}
}

const CategoryFields = {
  display_name: {
    disable_field_onchange: 1,
    string: { en_US: 'Name', zh_CN: '名称', zh_HK: '名称' }
  },
  name: { string: { en_US: 'Name', zh_CN: '名称', zh_HK: '名称' } },
  parent_id: { string: { en_US: 'Parent', zh_CN: '上级', zh_HK: '上级' } },
  active: { string: { en_US: 'Active', zh_CN: '激活', zh_HK: '激活' } }
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
