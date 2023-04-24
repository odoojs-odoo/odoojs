export default {
  mrp_unbuild_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.unbuild',
    type: 'search',
    arch: {
      product_id: {},
      mo_id: {},
      _group: {
        _attr: { string: 'Filters' },
        _filter_draft: {
          _attr: {
            name: 'draft',
            string: 'Draft',
            domain: [['state', '=', 'draft']]
          }
        },
        _filter_done: {
          _attr: {
            name: 'done',
            string: 'Done',
            domain: [['state', '=', 'done']]
          }
        },
        _filter_activities_overdue: {
          _attr: {
            name: 'activities_overdue',
            string: 'Late Activities',
            help: 'Show all records which has next action date is before today',
            invisible: '1',
            domain: { todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]" }
          }
        },
        _filter_activities_today: {
          _attr: {
            name: 'activities_today',
            string: 'Today Activities',
            invisible: '1',
            domain: { todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]" }
          }
        },
        _filter_activities_upcoming_all: {
          _attr: {
            name: 'activities_upcoming_all',
            string: 'Future Activities',
            invisible: '1',
            domain: { todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]" }
          }
        }
      },
      _group_871: {
        _attr: { string: 'Group by...' },
        _filter_productgroup: {
          _attr: {
            name: 'productgroup',
            string: 'Product',
            context: { group_by: 'product_id' }
          }
        },
        _filter_mogroup: {
          _attr: {
            name: 'mogroup',
            string: 'Manufacturing Order',
            context: { group_by: 'mo_id' }
          }
        }
      }
    }
  },

  mrp_unbuild_kanban_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.unbuild',
    type: 'otherview',
    arch: {}
  },

  mrp_unbuild_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.unbuild',
    type: 'form',
    arch: {
      header: {
        _button_action_validate: {
          _attr: {
            name: 'action_validate',
            type: 'object',
            string: 'Unbuild',
            states: 'draft',
            class: 'oe_highlight'
          }
        },
        state: {
          widget: 'statusbar',
          statusbar_visible: 'draft,done'
        }
      },
      sheet: {
        company_id: { invisible: '1' },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_mrp_unbuild_moves: {
            _attr: {
              name: 'action_mrp_unbuild_moves',
              type: 'action',
              string: 'Product Moves',
              icon: 'fa-exchange',
              states: 'done',
              class: 'oe_stat_button'
            }
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _h1: {
            name: { placeholder: 'Unbuild Order' }
          }
        },
        _group: {
          _group: {
            product_id: {
              readonly: ['|', ['mo_id', '!=', false], ['state', '=', 'done']],
              force_save: '1'
            },
            mo_bom_id: { invisible: '1' },
            bom_id: {
              required: [['mo_id', '=', false]],
              readonly: ['|', ['mo_id', '!=', false], ['state', '=', 'done']],
              invisible: [['mo_id', '!=', false], ['mo_bom_id', '=', false]],
              force_save: '1'
            },
            _label_product_qty: { for: 'product_qty' },
            _div: {
              _attr: { class: 'o_row' },
              product_qty: { readonly: ['|', ['has_tracking', '=', 'serial'], ['state', '=', 'done']] },
              product_uom_id: {
                groups: 'uom.group_uom',
                readonly: ['|', ['mo_id', '!=', false], ['state', '=', 'done']],
                force_save: '1',
                no_open: true,
                no_create: true
              }
            }
          },
          _group_701: {
            mo_id: {},
            location_id: {
              groups: 'stock.group_stock_multi_locations',
              no_create: true
            },
            location_dest_id: {
              groups: 'stock.group_stock_multi_locations',
              no_create: true
            },
            has_tracking: { invisible: '1' },
            lot_id: {
              groups: 'stock.group_production_lot',
              invisible: [['has_tracking', '=', 'none']],
              required: [['has_tracking', '!=', 'none']],
              readonly: ['|', ['mo_id', '!=', false], ['state', '=', 'done']],
              force_save: '1'
            },
            company_id: { groups: 'base.group_multi_company' }
          }
        }
      }
    }
  },

  mrp_unbuild_form_view_simplified: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.unbuild',
    type: 'form',
    arch: {
      sheet: {
        _footer: {
          _attr: { class: 'oe_edit_only' },
          _button_action_validate: {
            _attr: {
              name: 'action_validate',
              type: 'object',
              string: 'Unbuild',
              states: 'draft',
              class: 'oe_highlight'
            }
          },
          _button: {
            _attr: { string: 'Discard' }
          }
        },
        _group: {
          _group: {
            company_id: { invisible: '1' },
            state: { invisible: '1' },
            product_id: { invisible: '1' },
            bom_id: { invisible: '1' },
            _label_product_qty: { for: 'product_qty' },
            _div: {
              _attr: { class: 'o_row' },
              product_qty: { readonly: [['has_tracking', '=', 'serial']] },
              product_uom_id: {
                groups: 'uom.group_uom',
                readonly: [['mo_id', '!=', false]],
                force_save: '1',
                no_open: true,
                no_create: true
              }
            }
          },
          _group_776: {
            mo_id: { invisible: '1' },
            location_id: {
              groups: 'stock.group_stock_multi_locations',
              no_create: true
            },
            location_dest_id: {
              groups: 'stock.group_stock_multi_locations',
              no_create: true
            },
            has_tracking: { invisible: '1' },
            lot_id: {
              groups: 'stock.group_production_lot',
              invisible: [['has_tracking', '=', 'none']],
              required: [['has_tracking', '!=', 'none']],
              readonly: '1'
            },
            company_id: {
              groups: 'base.group_multi_company',
              readonly: '1'
            }
          }
        }
      }
    }
  },

  mrp_unbuild_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.unbuild',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        product_id: {},
        bom_id: {},
        mo_id: {},
        lot_id: { groups: 'stock.group_production_lot' },
        product_qty: {},
        product_uom_id: { groups: 'uom.group_uom' },
        location_id: {
          groups: 'stock.group_stock_multi_locations',
          no_create: true
        },
        activity_exception_decoration: { widget: 'activity_exception' },
        company_id: { groups: 'base.group_multi_company' },
        state: { widget: 'badge' }
      }
    }
  },

  mrp_unbuild: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Unbuild Orders',
    type: 'ir.actions.act_window',
    res_model: 'mrp.unbuild',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
