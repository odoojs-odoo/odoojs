const ModelFields = {
  action_id: {},
  active: {},
  context: { groups: 'base.group_no_one' },
  domain: { groups: 'base.group_no_one' },
  is_default: {},
  model_id: {},
  name: {},
  sort: { groups: 'base.group_no_one' },
  user_id: { string: 'Available for User' }
}

const AddonsFields = {
  'ir.filters': ModelFields
}

export default AddonsFields

