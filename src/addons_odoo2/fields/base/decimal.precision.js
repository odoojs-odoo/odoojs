const ModelFields = {
  digits: {},
  name: {
    readonly: [['id', '!=', false]]
  }
}

const AddonsFields = {
  'decimal.precision': ModelFields
}

export default AddonsFields

