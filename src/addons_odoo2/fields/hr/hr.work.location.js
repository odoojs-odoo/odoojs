const ModelFields = {
  active: {},
  address_id: {},
  company_id: { groups: 'base.group_multi_company' },
  location_number: {},
  name: {}
}

const AddonsFields = {
  'hr.work.location': ModelFields
}

export default AddonsFields

