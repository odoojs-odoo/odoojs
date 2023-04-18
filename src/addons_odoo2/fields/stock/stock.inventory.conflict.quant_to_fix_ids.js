const ModelFields = {
  company_id: {
    groups: 'base.group_multi_company'
  },

  id: {},
  inventory_diff_quantity: {
    string: 'Difference'
  },

  inventory_quantity: {
    string: 'Counted Quantity',
    readonly: '0'
  },

  location_id: {
    readonly: [['id', '!=', false]]
  },

  lot_id: {
    groups: 'stock.group_production_lot',
    readonly: ['|', ['id', '!=', false], ['tracking', 'not in', ['serial', 'lot']]],
    required: [['tracking', '!=', 'none']],
    context: {
      todo_ctx: "{'default_product_id': product_id, 'default_company_id': company_id}"
    }
  },

  owner_id: {
    groups: 'stock.group_tracking_owner',
    readonly: [['id', '!=', false]]
  },

  package_id: {
    groups: 'stock.group_tracking_lot',
    readonly: [['id', '!=', false]]
  },

  product_id: {
    readonly: "context.get['single_product', False]"
  },

  product_uom_id: {
    groups: 'uom.group_uom'
  },

  quantity: {
    string: 'Quantity'
  },

  tracking: {}
}

const AddonsFields = {
  'stock.inventory.conflict.quant_to_fix_ids': ModelFields
}

export default AddonsFields

