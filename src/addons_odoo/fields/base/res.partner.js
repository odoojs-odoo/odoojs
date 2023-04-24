const ModelFields = {
  active: {},
  active_lang_count: {},
  avatar_128: {},
  bank_ids: {},
  category_id: {
    placeholder: 'e.g. "B2B", "VIP", "Consulting", ...'
  },
  child_ids: {
    context({ record, active_id }) {
      // context="{
      // 'default_parent_id': active_id,
      // 'default_street': street, 'default_street2': street2,
      // 'default_city': city, 'default_state_id': state_id,
      // 'default_zip': zip, 'default_country_id': country_id,
      // 'default_lang': lang, 'default_user_id': user_id,
      // 'default_type': 'other'}">
      //
      const { street, street2, city, state_id, zip } = record
      const { country_id, lang, user_id } = record
      return {
        default_parent_id: active_id,
        default_street: street,
        default_street2: street2,
        default_city: city,
        default_state_id: state_id,
        default_zip: zip,
        default_country_id: country_id,
        default_lang: lang,
        default_user_id: user_id,
        default_type: 'other'
      }
    }
  },
  city: {
    placeholder: 'City',
    readonly({ record }) {
      const { type, parent_id } = record
      return type === 'contact' && parent_id
    }
  },
  color: {},
  comment: { placeholder: 'Internal notes...' },
  commercial_partner_id: {},
  company_id: {
    groups: 'base.group_multi_company',
    readonly({ record }) {
      // 'readonly': [('parent_id', '!=', False)]
      const { parent_id } = record
      return parent_id
    }
  },
  company_name: {},
  company_registry: {},
  company_type: {},
  country_code: {},
  country_id: {
    placeholder: 'Country',
    readonly({ record }) {
      const { type, parent_id } = record
      return type === 'contact' && parent_id
    }
  },
  display_name: {},
  email: {
    context: "{'gravatar_image': True}",
    required({ record }) {
      // 'required': [('user_ids','!=', [])]
      const { user_ids = [] } = record
      return user_ids.length > 0
    }
  },

  function: { placeholder: 'e.g. Sales Director' },
  image_1920: {},
  is_company: {},

  name: {
    // placeholder: 'e.g. Lumber Inc'
    // placeholder: 'e.g. Brandom Freeman'
    string: 'Name',
    required: ({ record }) => {
      // [('type', '=', 'contact')]
      return record.type === 'contact'
    }
  },

  parent_id: {
    domain: () => {
      // [('is_company', '=', True)]
      return [['is_company', '=', true]]
    },
    // context: {
    //   todo_ctx:
    //     "{'default_is_company': True, 'show_vat': True, 'default_user_id': user_id}"
    // },
    placeholder: 'Company Name...'
  },
  phone: {},
  ref: { string: 'Reference' },
  same_company_registry_partner_id: {},
  same_vat_partner_id: {},
  state_id: {
    placeholder: 'State',
    readonly({ record }) {
      const { type, parent_id } = record
      return type === 'contact' && parent_id
    },
    string: 'State',
    domain: ({ record }) => {
      // domain="[('country_id', '=?', country_id)]"
      const { country_id } = record
      return [['country_id', '=?', country_id]]
    }

    // context: { todo_ctx: "{'default_country_id': country_id}" }
    // context: {
    //   todo_ctx:
    //     "{'country_id': country_id, 'default_country_id': country_id, 'zip': zip}"
    // }
  },

  street2: {
    placeholder: 'Street 2...',
    readonly({ record }) {
      const { type, parent_id } = record
      return type === 'contact' && parent_id
    }
  },
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

  title: { placeholder: 'e.g. Mister' },
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

  user_id: { domain: [['share', '=', false]] },
  user_ids: {},
  vat: {
    placeholder: 'e.g. BE0477472701',
    readonly({ record }) {
      // 'readonly': [('parent_id','!=',False)]
      const { parent_id } = record
      return parent_id
    }
  },
  website: { placeholder: 'e.g. https://www.odoo.com' },

  zip: {
    placeholder: 'ZIP',
    readonly({ record }) {
      const { type, parent_id } = record
      return type === 'contact' && parent_id
    }
  }
}

const AddonsFields = {
  'res.partner': ModelFields
}

export default AddonsFields
