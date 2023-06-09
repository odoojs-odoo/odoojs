const ModelFields = {
  active: {},
  active_lang_count: {},
  avatar_128: {},
  bank_ids: {},
  category_id: { placeholder: 'e.g. "B2B", "VIP", "Consulting", ...' },
  child_ids: {
    context: { todo_ctx: "{'default_parent_id': active_id, 'default_street': street, 'default_street2': street2, 'default_city': city, 'default_state_id': state_id, 'default_zip': zip, 'default_country_id': country_id, 'default_lang': lang, 'default_user_id': user_id, 'default_type': 'other'}" }
  },

  city: {
    placeholder: 'City',
    readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]]
  },

  comment: { placeholder: 'Internal notes...' },
  commercial_partner_id: {},
  company_id: {
    groups: 'base.group_multi_company',
    readonly: '===todo=='
  },

  company_id_$_form_$$_308: { readonly: [['parent_id', '!=', false]] },
  company_id_$_tree: { readonly: '1' },
  company_name: {},
  company_registry: {},
  company_type: { groups: 'base.group_no_one' },
  country_code: {},
  country_id: {
    placeholder: 'Country',
    readonly: '===todo=='
  },

  country_id_$_form_$$_407: { readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]] },
  country_id_$_tree: { readonly: '1' },
  display_name: { string: 'Name' },
  email: {
    required: '===todo==',
    context: { gravatar_image: true }
  },

  email_$_form_$$_535: { required: [['user_ids', '!=', []]] },
  email_$_form_$$_690: { required: "context.get['force_email', False]" },
  function: { placeholder: 'e.g. Sales Director' },
  image_1920: { readonly: '1' },
  industry_id: {},
  is_company: {},
  lang: {},
  mobile: {},
  name: {
    readonly: '1',
    required: '===todo==',
    placeholder: '===todo=='
  },

  name_$_form_$$_324: {
    required: [['type', '=', 'contact'], ['is_company', '=', false]],
    placeholder: 'e.g. Brandom Freeman'
  },

  name_$_form_$$_360: {
    required: [['type', '=', 'contact'], ['is_company', '=', true]],
    placeholder: 'e.g. Lumber Inc'
  },

  name_$_form_$$_551: { required: '0' },
  name_$_form_$$_785: {
    required: [['type', '=', 'contact']],
    placeholder: 'e.g. Brandom Freeman'
  },

  name_$_form_$$_920: {
    required: [['type', '=', 'contact']],
    placeholder: 'e.g. Lumber Inc'
  },

  parent_id: {
    domain: [['is_company', '=', true]],
    context: { todo_ctx: "{'default_is_company': True, 'show_vat': True, 'default_user_id': user_id}" },
    placeholder: 'Company Name...',
    readonly: '1'
  },

  phone: {},
  ref: { string: 'Reference' },
  same_company_registry_partner_id: {},
  same_vat_partner_id: {},
  state_id: {
    context: '===todo==',
    placeholder: 'State',
    readonly: '===todo=='
  },

  state_id_$_form_$$_171: {
    context: { todo_ctx: "{'default_country_id': country_id}" }
  },

  state_id_$_form_$$_518: {
    context: { todo_ctx: "{'country_id': country_id, 'default_country_id': country_id, 'zip': zip}" },
    readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]]
  },

  state_id_$_form_$$_899: {
    context: { todo_ctx: "{'country_id': country_id, 'default_country_id': country_id, 'zip': zip}" }
  },

  state_id_$_tree: { readonly: '1' },
  street2: {
    readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]],
    placeholder: 'Street 2...'
  },

  street: {
    readonly: [['type', '=', 'contact'], ['parent_id', '!=', false]],
    placeholder: 'Street...'
  },

  title: { placeholder: 'e.g. Mister' },
  type: {
    required: [['is_company', '!=', true]],
    readonly: [['user_ids', '!=', []]]
  },

  user_id: { domain: [['share', '=', false]] },
  user_ids: {},
  vat: {
    readonly: '===todo==',
    placeholder: 'e.g. BE0477472701'
  },

  vat_$_form: { readonly: [['parent_id', '!=', false]] },
  vat_$_tree: { readonly: '1' },
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

