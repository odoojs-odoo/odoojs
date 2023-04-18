const ModelFields = {
  company_id: {
    groups: 'base.main_company'
  },

  is_done: {
    readonly: ['|', ['parent.state', 'in', ('draft', 'new', 'done')], ['is_fresh_package', '=', true]]
  },

  is_fresh_package: {},
  location_dest_id: {
    groups: 'stock.group_stock_multi_locations'
  },

  location_id: {
    groups: 'stock.group_stock_multi_locations'
  },

  move_ids: {},
  move_line_ids: {},
  package_id: {
    readonly: [['state', 'in', ('confirmed', 'assigned', 'done', 'cancel')]]
  },

  picking_id: {},
  picking_type_code: {},
  show_lots_m2o: {},
  show_lots_text: {},
  state: {}
}

const AddonsFields = {
  'stock.package.level': ModelFields
}

export default AddonsFields

