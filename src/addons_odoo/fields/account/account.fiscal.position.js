const ModelFields = {
  country_id: {
    required: ({ record }) => {
      // 'required': [('foreign_vat', '!=', False)]
      const { foreign_vat } = record
      return foreign_vat
    }
  }
}

const AddonsFields = {
  'account.fiscal.position': ModelFields
}

export default AddonsFields
