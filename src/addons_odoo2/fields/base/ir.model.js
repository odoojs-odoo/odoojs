const ModelFields = {
  access_ids: {},
  field_id: {},
  id: {},
  info: {},
  model: {
    readonly: [['id', '!=', false]]
  },

  modules: {
    groups: 'base.group_no_one'
  },

  name: {},
  order: {},
  rule_ids: {},
  state: {
    groups: 'base.group_no_one'
  },

  transient: {
    groups: 'base.group_no_one',
    readonly: [['id', '!=', false]]
  },

  view_ids: {}
}

const AddonsFields = {
  'ir.model': ModelFields
}

export default AddonsFields

