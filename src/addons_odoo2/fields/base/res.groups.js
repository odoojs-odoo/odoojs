const ModelFields = {
  category_id: {},
  comment: {},
  implied_ids: {},
  menu_access: {},
  model_access: {},
  name: {},
  rule_groups: {},
  share: {},
  users: {
    context: {
      search_default_filter_no_share: 1
    }
  },

  view_access: {
    groups: 'base.group_system'
  }
}

const AddonsFields = {
  'res.groups': ModelFields
}

export default AddonsFields

