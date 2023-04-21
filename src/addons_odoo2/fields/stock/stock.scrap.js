const ModelFields = {
  company_id: {
    groups: 'base.group_multi_company',
    readonly: '1'
  },

  date_done: {},
  location_id: { groups: 'stock.group_stock_multi_locations' },
  lot_id: {
    groups: 'stock.group_production_lot',
    required: [['tracking', '!=', 'none']],
    context: '===todo=='
  },

  lot_id_$_form_$$_812: {
    context: { todo_ctx: "{'default_product_id': product_id, 'default_company_id': company_id}" }
  },

  lot_id_$_form_$$_983: {
    context: { todo_ctx: "{'default_company_id': company_id, 'default_product_id': product_id}" }
  },

  move_id: {},
  name: {},
  origin: {},
  owner_id: { groups: 'stock.group_tracking_owner' },
  package_id: { groups: 'stock.group_tracking_lot' },
  picking_id: {},
  product_id: {
    context: { default_detailed_type: 'product' },
    domain: { todo_ctx: "[('id', 'in', context.get('product_ids', []))]" },
    readonly: '1'
  },

  product_uom_category_id: {},
  product_uom_id: { groups: 'uom.group_uom' },
  scrap_location_id: { groups: 'stock.group_stock_multi_locations' },
  scrap_qty: { readonly: [['tracking', '=', 'serial']] },
  state: {},
  tracking: {}
}

const AddonsFields = {
  'stock.scrap': ModelFields
}

export default AddonsFields

