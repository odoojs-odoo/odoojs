const ModelFields = {
  tax_dest_id: {
    domain: [['type_tax_use', '!=', None]]
  },

  tax_src_id: {
    domain: [['type_tax_use', '!=', None]]
  }
}

const AddonsFields = {
  'account.fiscal.position.template.tax_ids': ModelFields
}

export default AddonsFields

