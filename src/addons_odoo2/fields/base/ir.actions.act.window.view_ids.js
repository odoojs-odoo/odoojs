const ModelFields = {
  sequence: {},
  view_id: {
    domain: {
      todo_ctx: "[('type', '=', view_mode)]"
    }
  },

  view_mode: {}
}

const AddonsFields = {
  'ir.actions.act.window.view_ids': ModelFields
}

export default AddonsFields

