const ModelFields = {
  expected_qty: { readonly: 'True' },
  multiple_lot_components_names: { readonly: 'True' },
  next_serial_count: {},
  next_serial_number: {},
  produced_qty: { readonly: 'True' },
  production_id: { readonly: 'True' },
  serial_numbers: { placeholder: 'copy paste a list and/or use Generate' },
  show_apply: {},
  show_backorders: {}
}

const AddonsFields = {
  'stock.assign.serial': ModelFields
}

export default AddonsFields

