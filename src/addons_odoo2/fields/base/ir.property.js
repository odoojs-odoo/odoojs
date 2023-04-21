const ModelFields = {
  company_id: { groups: 'base.group_multi_company' },
  fields_id: {},
  name: {},
  res_id: {},
  type: {},
  value_binary: { string: 'Value' },
  value_datetime: { string: 'Value' },
  value_float: { string: 'Value' },
  value_integer: { string: 'Value' },
  value_reference: { string: 'Value' },
  value_text: { string: 'Value' }
}

const AddonsFields = {
  'ir.property': ModelFields
}

export default AddonsFields

