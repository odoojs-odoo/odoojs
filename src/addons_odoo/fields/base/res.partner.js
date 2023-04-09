const ModelFields = {
  name: {
    string: 'Name',
    required: ({ record }) => {
      // [('type', '=', 'contact')]
      return record.type === 'contact'
    }
  },
  display_name: {},

  company_id: {
    groups: 'base.group_multi_company',
    readonly({ record }) {
      // 'readonly': [('parent_id', '!=', False)]
      const { parent_id } = record
      return parent_id
    }
  },
  parent_id: {
    domain: () => {
      // [('is_company', '=', True)]
      return [['is_company', '=', true]]
    }
  },

  is_company: {},
  company_type: {},

  type: {
    required: ({ record }) => {
      // 'required': [('is_company','!=', True)],
      return !record.is_company
    },
    readonly({ record }) {
      // 'readonly': [('user_ids', '!=', [])]
      const { user_ids = [] } = record
      return user_ids.length > 0
    }
  },

  image_1920: {},

  function: { placeholder: 'e.g. Sales Director' },

  title: { placeholder: 'e.g. Mister' },
  email: {
    context: "{'gravatar_image': True}",
    required({ record }) {
      // 'required': [('user_ids','!=', [])]
      const { user_ids = [] } = record
      return user_ids.length > 0
    }
  },
  website: { placeholder: 'e.g. https://www.odoo.com' },

  street: {
    placeholder: 'Street...',
    readonly({ record }) {
      // 'readonly':
      // [('type', '=', 'contact'),
      // ('parent_id', '!=', False)]
      const { type, parent_id } = record
      return type === 'contact' && parent_id
    }
  },
  street2: {
    placeholder: 'Street 2...',
    readonly({ record }) {
      const { type, parent_id } = record
      return type === 'contact' && parent_id
    }
  },
  city: {
    placeholder: 'City',
    readonly({ record }) {
      const { type, parent_id } = record
      return type === 'contact' && parent_id
    }
  },

  state_id: {
    placeholder: 'State',
    readonly({ record }) {
      const { type, parent_id } = record
      return type === 'contact' && parent_id
    },
    string: '州省',
    domain: ({ record }) => {
      // domain="[('country_id', '=?', country_id)]"
      const { country_id } = record
      return [['country_id', '=?', country_id]]
    }
  },
  zip: {
    placeholder: 'ZIP',
    readonly({ record }) {
      const { type, parent_id } = record
      return type === 'contact' && parent_id
    }
  },
  country_id: {
    placeholder: 'Country',
    readonly({ record }) {
      const { type, parent_id } = record
      return type === 'contact' && parent_id
    }
  },
  vat: {
    readonly({ record }) {
      // 'readonly': [('parent_id','!=',False)]
      const { parent_id } = record
      return parent_id
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
    string: 'Name'
  },
  name: { string: 'Name' },
  parent_id: { string: 'Parent' },
  active: { string: 'Active' }
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
