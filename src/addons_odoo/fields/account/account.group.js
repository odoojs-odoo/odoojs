const ModelFields = {
  // display_name: { disable_field_onchange: 1 },
  code_prefix_end: {},
  code_prefix_start: {},
  company_id: { groups: 'base.group_multi_company' },
  name: {}
}

const AddonsFields = {
  'account.group': ModelFields
}

export default AddonsFields
