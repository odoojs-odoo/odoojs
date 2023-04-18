const ModelFields = {
  active: {},
  active_lang_count: {},
  avatar_128: {},
  bank_ids: {},
  category_id: {
    placeholder: 'e.g. "B2B", "VIP", "Consulting", ...'
  },

  child_ids: {
    context: {
      todo_ctx: "{'default_parent_id': active_id, 'default_street': street, 'default_street2': street2, 'default_city': city, 'default_state_id': state_id, 'default_zip': zip, 'default_country_id': country_id, 'default_lang': lang, 'default_user_id': user_id, 'default_type': 'other'}"
    }
  },

  city: {
    readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]],
    placeholder: 'City'
  },

  comment: {
    placeholder: 'Internal notes...'
  },

  commercial_partner_id: {},
  company_id: {
    groups: 'base.group_multi_company',
    readonly: [['parent_id', '!=', false]]
  },

  company_name: {},
  company_registry: {},
  company_type: {
    groups: 'base.group_no_one'
  },

  country_code: {},
  country_id: {
    placeholder: 'Country',
    readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]]
  },

  display_name: {
    string: 'Name'
  },

  email: {
    required: [['user_ids', '!=', []]],
    context: {
      gravatar_image: true
    }
  },

  function: {
    placeholder: 'e.g. Sales Director'
  },

  image_1920: {},
  industry_id: {},
  is_company: {},
  lang: {},
  mobile: {},
  name: {
    required: '===todo==',
    placeholder: '===todo=='
  },

  name_$_form_$$_293: {
    required: [['type', '=', 'contact'], ['is_company', '=', true]],
    placeholder: 'e.g. Lumber Inc'
  },

  name_$_form_$$_370: {
    required: [['type', '=', 'contact']],
    placeholder: 'e.g. Lumber Inc'
  },

  name_$_form_$$_408: {
    required: [['type', '=', 'contact'], ['is_company', '=', false]],
    placeholder: 'e.g. Brandom Freeman'
  },

  name_$_form_$$_523: {
    required: [['type', '=', 'contact']],
    placeholder: 'e.g. Brandom Freeman'
  },

  parent_id: {
    domain: [['is_company', '=', true]],
    context: {
      todo_ctx: "{'default_is_company': True, 'show_vat': True, 'default_user_id': user_id}"
    },
    placeholder: 'Company Name...'
  },

  phone: {},
  ref: {
    string: 'Reference'
  },

  same_company_registry_partner_id: {},
  state_id: {
    context: '===todo==',
    placeholder: 'State',
    readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]]
  },

  state_id_$_form_$$_118: {
    context: {
      todo_ctx: "{'country_id': country_id, 'default_country_id': country_id, 'zip': zip}"
    }
  },

  state_id_$_form_$$_422: {
    context: {
      todo_ctx: "{'country_id': country_id, 'default_country_id': country_id, 'zip': zip}"
    }
  },

  state_id_$_form_$$_609: {
    context: {
      todo_ctx: "{'default_country_id': country_id}"
    }
  },

  street2: {
    placeholder: 'Street 2...',
    readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]]
  },

  street: {
    placeholder: 'Street...',
    readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]]
  },

  title: {
    placeholder: 'e.g. Mister'
  },

  type: {
    required: [['is_company', '!=', true]],
    readonly: [['user_ids', '!=', []]]
  },

  user_id: {
    domain: [['share', '=', false]]
  },

  user_ids: {},
  vat: {
    readonly: [['parent_id', '!=', false]],
    placeholder: 'e.g. BE0477472701'
  },

  website: {
    string: 'Website',
    placeholder: 'e.g. https://www.odoo.com'
  },

  zip: {
    placeholder: 'ZIP',
    readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]]
  }
}

const AddonsFields = {
  'res.partner': ModelFields
}

export default AddonsFields

