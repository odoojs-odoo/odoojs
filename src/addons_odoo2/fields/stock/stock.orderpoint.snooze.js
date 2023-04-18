const ModelFields = {
  orderpoint_ids: {},
  predefined_date: {},
  snoozed_until: {
    readonly: [['predefined_date', '!=', 'custom']]
  }
}

const AddonsFields = {
  'stock.orderpoint.snooze': ModelFields
}

export default AddonsFields

