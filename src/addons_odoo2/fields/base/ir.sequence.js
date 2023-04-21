const ModelFields = {
  active: {},
  code: {},
  company_id: { groups: 'base.group_multi_company' },
  date_range_ids: {},
  implementation: {},
  name: {},
  number_increment: {},
  number_next_actual: { string: 'Next Number' },
  padding: {},
  prefix: {},
  suffix: {},
  use_date_range: {}
}

const AddonsFields = {
  'ir.sequence': ModelFields
}

export default AddonsFields

