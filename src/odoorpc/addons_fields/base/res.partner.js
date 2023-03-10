const ModelFields = {
  name: { string: 'Name' },
  display_name: {},

  parent_id: {
    domain: () => {
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

      const country_id2 = country_id || [false, '']
      const country_id3 = country_id2[0]
      return [['country_id', '=?', country_id3]]
    }
  },

  user_id: { domain: [['share', '=', false]] }
}

const TitleFields = {
  name: {},
  shortcut: {}
}

const CategoryFields = {
  display_name: {},
  name: {},
  parent_id: {},
  active: {}
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
