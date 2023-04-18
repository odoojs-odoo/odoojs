const ModelFields = {
  location_src_id: {
    required: [['action', 'in', ['pull', 'push', 'pull_push']]]
  }
}

const AddonsFields = {
  'stock.rule': ModelFields
}

export default AddonsFields

