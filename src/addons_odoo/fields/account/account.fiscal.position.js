const ModelFields = {
  account_ids: {},
  active: {},
  auto_apply: {},
  company_country_id: {},
  company_id: { groups: 'base.group_multi_company' },
  country_group_id: {},
  country_id: {
    required: ({ record }) => {
      // 'required': [('foreign_vat', '!=', False)]
      const { foreign_vat } = record
      return foreign_vat
    }
  },
  foreign_vat: {},
  foreign_vat_header_mode: {},
  name: {},
  note: { placeholder: 'Legal Notes...' },
  sequence: {},
  state_ids: {
    domain: ({ record }) => {
      // domain="[('country_id', '=', country_id)]
      const { country_id } = record
      return [['country_id', '=', country_id]]
    }
  },

  states_count: {},
  tax_ids: {
    context: { append_type_to_tax_name: true }
  },

  vat_required: {},
  zip_from: {},
  zip_to: {}
}

const AddonsFields = {
  'account.fiscal.position': ModelFields
}

export default AddonsFields
