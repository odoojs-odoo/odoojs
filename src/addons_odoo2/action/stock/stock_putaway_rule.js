export default {
  stock_putaway_list: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.putaway.rule',
    type: 'tree',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        package_type_ids: { invisible: '1' },
        sequence: {
          widget: 'handle',
          invisible: "context.get['invisible_handle', False]"
        },
        location_in_id: {
          string: 'When product arrives in',
          readonly: "context.get['fixed_location', False]",
          no_create: true
        },
        product_id: {
          string: 'Product',
          readonly: "context.get['single_product', False]",
          required: [['category_id', '=', false], ['package_type_ids', '=', false]],
          force_save: '1',
          no_create: true,
          no_open: true
        },
        category_id: {
          string: 'Product Category',
          readonly: "context.get['fixed_category', False]",
          required: [['product_id', '=', false], ['package_type_ids', '=', false]],
          force_save: '1',
          no_create: true,
          no_open: true
        },
        _field_package_type_ids_945: {
          package_type_ids: {
            string: 'Package type',
            widget: 'many2many_tags',
            groups: 'stock.group_tracking_lot',
            optional: 'show',
            no_create: true,
            no_open: true
          }
        },
        location_out_id: {
          readonly: [['location_in_id', '=', false]],
          optional: 'show',
          no_create: true
        },
        storage_category_id: {
          string: 'Having Category',
          groups: 'stock.group_stock_storage_categories',
          optional: 'show',
          no_create: true
        },
        _field_company_id_358: {
          company_id: {
            groups: 'stock.group_stock_multi_locations',
            readonly: "context.get['fixed_location', False]",
            optional: 'show',
            force_save: '1',
            no_create: true
          }
        }
      }
    }
  },

  action_putaway_tree: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Putaways Rules',
    type: 'ir.actions.act_window',
    res_model: 'stock.putaway.rule',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'stock_putaway_list',
      form: '=======todo=========='
    }
  },

  view_putaway_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.putaway.rule',
    type: 'search',
    arch: {
      product_id: {},
      category_id: {},
      location_in_id: {},
      location_out_id: {},
      _group: {
        _attr: { string: 'Filters' },
        _filter_filter_to_rules_on_product: {
          _attr: {
            name: 'filter_to_rules_on_product',
            string: 'Rules on Products',
            domain: [['product_id', '!=', false]]
          }
        },
        _filter_filter_to_rules_on_category: {
          _attr: {
            name: 'filter_to_rules_on_category',
            string: 'Rules on Categories',
            domain: [['category_id', '!=', false]]
          }
        }
      },
      _group_488: {
        _attr: { string: 'Group By' },
        _filter_location_in: {
          _attr: {
            name: 'location_in',
            string: 'Location: When arrives to',
            context: { group_by: 'location_in_id' }
          }
        },
        _filter_location_out: {
          _attr: {
            name: 'location_out',
            string: 'Location: Store to',
            context: { group_by: 'location_out_id' }
          }
        }
      }
    }
  },

  category_open_putaway: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Putaway Rules',
    res_model: 'stock.putaway.rule',
    search_view_id: 'tooooooodoooooo',
    context: { todo_ctx: "{\n            'search_default_category_id': [active_id],\n            'fixed_category': True,\n        }" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  location_open_putaway: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Putaway Rules',
    res_model: 'stock.putaway.rule',
    search_view_id: 'tooooooodoooooo',
    domain: "['|', ['location_out_id', '=', active_id], ['location_in_id', '=', active_id]]",
    context: { fixed_location: true },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
