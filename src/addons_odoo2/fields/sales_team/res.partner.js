const ModelFields = {
  parent_id: {
    context: {
      todo_ctx: "{'default_is_company': True, 'show_vat': True, 'default_user_id': user_id, 'default_team_id': team_id}"
    }
  },

  team_id: {
    groups: 'base.group_no_one'
  }
}

const AddonsFields = {
  'res.partner': ModelFields
}

export default AddonsFields

