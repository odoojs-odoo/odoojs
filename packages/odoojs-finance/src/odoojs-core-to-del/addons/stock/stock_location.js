export default {
  models: {
    'stock.location': {
      fields: [
        'name',
        'complete_name',
        'active',
        'usage',
        'location_id',
        'child_ids',
        'partner_id',
        'comment',
        'posx',
        'posy',
        'posz',
        'parent_path',
        'company_id',
        'scrap_location',
        'return_location',
        'removal_strategy_id',
        'putaway_strategy_id',
        'barcode',
        'quant_ids',
      ],
    },

    'stock.location.route': {
      fields: [
        'name',
        'active',
        'sequence',
        'rule_ids',
        'product_selectable',
        'product_categ_selectable',
        'warehouse_selectable',
        'supplied_wh_id',
        'supplier_wh_id',
        'company_id',
        'product_ids',
        'categ_ids',
        'warehouse_ids',
      ],
    },
  },
};