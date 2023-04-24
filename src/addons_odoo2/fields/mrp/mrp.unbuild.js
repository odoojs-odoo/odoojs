const ModelFields = {
  activity_exception_decoration: {},
  bom_id: {
    required: [['mo_id', '=', false]],
    readonly: ['|', ['mo_id', '!=', false], ['state', '=', 'done']]
  },

  company_id: {
    groups: 'base.group_multi_company',
    readonly: '1'
  },

  has_tracking: {},
  location_dest_id: { groups: 'stock.group_stock_multi_locations' },
  location_id: { groups: 'stock.group_stock_multi_locations' },
  lot_id: {
    groups: 'stock.group_production_lot',
    required: [['has_tracking', '!=', 'none']],
    readonly: '===todo=='
  },

  lot_id_$_form_$$_146: { readonly: ['|', ['mo_id', '!=', false], ['state', '=', 'done']] },
  lot_id_$_form_$$_458: { readonly: '1' },
  mo_bom_id: {},
  mo_id: {},
  name: { placeholder: 'Unbuild Order' },
  product_id: { readonly: ['|', ['mo_id', '!=', false], ['state', '=', 'done']] },
  product_qty: { readonly: '===todo==' },
  product_qty_$_form_$$_121: { readonly: [['has_tracking', '=', 'serial']] },
  product_qty_$_form_$$_159: { readonly: ['|', ['has_tracking', '=', 'serial'], ['state', '=', 'done']] },
  product_uom_id: {
    groups: 'uom.group_uom',
    readonly: '===todo=='
  },

  product_uom_id_$_form_$$_107: { readonly: ['|', ['mo_id', '!=', false], ['state', '=', 'done']] },
  product_uom_id_$_form_$$_371: { readonly: [['mo_id', '!=', false]] },
  state: {}
}

const AddonsFields = {
  'mrp.unbuild': ModelFields
}

export default AddonsFields

