const ModelFields = {
  action: {},
  active: {},
  child_id: {
    context: {
      todo_ctx: "{'default_parent_id': active_id}"
    }
  },

  complete_name: {
    string: 'Menu'
  },

  groups_id: {},
  name: {},
  parent_id: {
    groups: 'base.group_no_one'
  },

  sequence: {
    groups: 'base.group_no_one'
  },

  web_icon: {},
  web_icon_data: {}
}

const AddonsFields = {
  'ir.ui.menu': ModelFields
}

export default AddonsFields

