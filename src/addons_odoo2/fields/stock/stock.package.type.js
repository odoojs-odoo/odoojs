const ModelFields = {
  barcode: {},
  base_weight: {},
  company_id: { groups: 'base.group_multi_company' },
  height: { placeholder: 'Height' },
  length_uom_name: {},
  max_weight: {},
  name: {},
  packaging_length: { placeholder: 'Length' },
  sequence: {},
  storage_category_capacity_ids: {
    context: { default_package_type_id: 'todo===id' }
  },

  weight_uom_name: {},
  width: { placeholder: 'Width' }
}

const AddonsFields = {
  'stock.package.type': ModelFields
}

export default AddonsFields

