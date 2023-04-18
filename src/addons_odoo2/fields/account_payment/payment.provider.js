const ModelFields = {
  journal_id: {
    required: [['state', '!=', 'disabled'], ['code', 'not in', ['none', 'custom']]],
    context: {
      default_type: 'bank'
    }
  }
}

const AddonsFields = {
  'payment.provider': ModelFields
}

export default AddonsFields

