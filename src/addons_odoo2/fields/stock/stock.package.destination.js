const ModelFields = {
  filtered_location: {},
  location_dest_id: {
    domain: {
      todo_ctx: "[('id', 'in', filtered_location)]"
    }
  },

  move_line_ids: {}
}

const AddonsFields = {
  'stock.package.destination': ModelFields
}

export default AddonsFields

