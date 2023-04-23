const ModelFields = {
  tax_dest_id: {
    // domain="[('type_tax_use', '!=', None)]"
    domain: [['type_tax_use', '!=', null]]
  },
  tax_src_id: {
    // domain="[('type_tax_use', '!=', None)]"
    domain: [['type_tax_use', '!=', null]]
  }
}

const AddonsFields = {
  'account.fiscal.position.tax.template': ModelFields
}

export default AddonsFields
