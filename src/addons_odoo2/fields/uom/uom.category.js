const ModelFields = {
  name: {},
  reference_uom_id: {},
  uom_ids: {
    context: {
      default_uom_type: 'smaller',
      default_category_id: 'todo===id'
    }
  }
}

const AddonsFields = {
  'uom.category': ModelFields
}

export default AddonsFields

