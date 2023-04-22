const ModelFields = {
  consumption: {},
  mrp_production_id: {},
  product_consumed_qty_uom: {},
  product_expected_qty_uom: {},
  product_id: {},
  product_uom_id: { groups: 'uom.group_uom' }
}

const AddonsFields = {
  'mrp.consumption.warning.mrp_consumption_warning_line_ids': ModelFields
}

export default AddonsFields

