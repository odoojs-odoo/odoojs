const ModelFields = {
  active: {},
  arch_base: {
    string: 'View Architecture'
  },

  arch_db: {},
  field_parent: {},
  groups_id: {},
  inherit_children_ids: {
    context: {
      todo_ctx: "{'default_model':model,'default_type':type,'default_inherit_id':active_id,'default_mode':'extension', 'active_test': False}"
    }
  },

  inherit_id: {},
  mode: {},
  model: {},
  model_data_id: {},
  name: {},
  priority: {
    string: 'Sequence'
  },

  type: {},
  xml_id: {
    groups: 'base.group_no_one'
  }
}

const AddonsFields = {
  'ir.ui.view': ModelFields
}

export default AddonsFields

