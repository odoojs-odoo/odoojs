export default {
  stock_scrap_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.scrap',
    type: 'search',
    arch: {
      name: {
        string: 'Reference'
      },
      product_id: {},
      location_id: {},
      scrap_location_id: {},
      create_date: {},
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_product: {
          _attr: {
            name: 'product',
            string: 'Product',
            domain: [],
            context: {
              group_by: 'product_id'
            }
          }
        },
        _filter_location: {
          _attr: {
            name: 'location',
            string: 'Location',
            domain: [],
            context: {
              group_by: 'location_id'
            }
          }
        },
        _filter_scrap_location: {
          _attr: {
            name: 'scrap_location',
            string: 'Scrap Location',
            domain: [],
            context: {
              group_by: 'scrap_location_id'
            }
          }
        },
        _filter_transfer: {
          _attr: {
            name: 'transfer',
            string: 'Transfer',
            domain: [],
            context: {
              group_by: 'picking_id'
            }
          }
        }
      }
    }
  },

  stock_scrap_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.scrap',
    type: 'form',
    arch: {
      header: {
        _button_action_validate: {
          _attr: {
            name: 'action_validate',
            type: 'object',
            string: 'Validate',
            states: 'draft',
            context: {
              not_unlink_on_discard: true
            },
            class: 'oe_highlight'
          }
        },
        state: {
          widget: 'statusbar',
          statusbar_visible: 'draft,done'
        }
      },
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_get_stock_picking: {
            _attr: {
              name: 'action_get_stock_picking',
              type: 'object',
              string: 'Stock Operation',
              icon: 'fa-cogs',
              invisible: [['picking_id', '=', false]],
              class: 'oe_stat_button'
            }
          },
          picking_id: {
            invisible: '1'
          },
          _button_action_get_stock_move_lines: {
            _attr: {
              name: 'action_get_stock_move_lines',
              type: 'object',
              string: 'Product Moves',
              icon: 'fa-exchange',
              invisible: [['move_id', '=', false]],
              class: 'oe_stat_button'
            }
          },
          move_id: {
            invisible: '1'
          }
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _h1: {
            name: {}
          }
        },
        _group: {
          _group: {
            product_id: {
              context: {
                default_detailed_type: 'product'
              }
            },
            _label_scrap_qty: {
              for: 'scrap_qty'
            },
            _div: {
              _attr: {
                class: 'o_row'
              },
              scrap_qty: {},
              product_uom_category_id: {
                invisible: '1'
              },
              product_uom_id: {
                groups: 'uom.group_uom',
                force_save: '1'
              }
            }
          },
          _group_693: {
            company_id: {
              invisible: '1'
            },
            lot_id: {
              groups: 'stock.group_production_lot',
              invisible: ['|', ['product_id', '=', false], ['tracking', '=', 'none']],
              required: [['tracking', '!=', 'none']],
              context: {
                todo_ctx: "{'default_product_id': product_id, 'default_company_id': company_id}"
              }
            },
            tracking: {
              invisible: '1'
            },
            package_id: {
              groups: 'stock.group_tracking_lot'
            },
            owner_id: {
              groups: 'stock.group_tracking_owner'
            },
            location_id: {
              groups: 'stock.group_stock_multi_locations',
              force_save: '1',
              no_create: true,
              no_open: true
            },
            scrap_location_id: {
              groups: 'stock.group_stock_multi_locations',
              force_save: '1',
              no_create: true,
              no_open: true
            },
            origin: {},
            date_done: {
              invisible: [['state', '=', 'draft']]
            },
            picking_id: {
              invisible: [['picking_id', '=', false]]
            },
            _field_company_id_666: {
              company_id: {
                groups: 'base.group_multi_company'
              }
            }
          }
        }
      }
    }
  },

  stock_scrap_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.scrap',
    type: 'otherview',
    arch: {}
  },

  stock_scrap_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.scrap',
    type: 'tree',
    arch: {
      sheet: {
        company_id: {
          invisible: '1'
        },
        product_uom_category_id: {
          invisible: '1'
        },
        name: {},
        date_done: {},
        product_id: {
          readonly: '1'
        },
        scrap_qty: {},
        product_uom_id: {
          groups: 'uom.group_uom'
        },
        location_id: {
          groups: 'stock.group_stock_multi_locations',
          no_create: true
        },
        scrap_location_id: {
          groups: 'stock.group_stock_multi_locations',
          no_create: true
        },
        _field_company_id_717: {
          company_id: {
            groups: 'base.group_multi_company',
            readonly: '1'
          }
        },
        state: {
          widget: 'badge'
        }
      }
    }
  },

  action_stock_scrap: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Scrap Orders',
    type: 'ir.actions.act_window',
    res_model: 'stock.scrap',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  stock_scrap_form_view2: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.scrap',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            state: {
              invisible: '1'
            },
            product_id: {
              domain: {
                todo_ctx: "[('id', 'in', context.get('product_ids', []))]"
              },
              no_create: true
            },
            _label_scrap_qty: {
              for: 'scrap_qty'
            },
            _div: {
              _attr: {
                class: 'o_row'
              },
              scrap_qty: {
                readonly: [['tracking', '=', 'serial']]
              },
              product_uom_category_id: {
                invisible: '1'
              },
              product_uom_id: {
                groups: 'uom.group_uom'
              }
            }
          },
          _group_781: {
            picking_id: {
              invisible: '1'
            },
            tracking: {
              invisible: '1'
            },
            lot_id: {
              groups: 'stock.group_production_lot',
              invisible: ['|', ['product_id', '=', false], ['tracking', '=', 'none']],
              required: [['tracking', '!=', 'none']],
              context: {
                todo_ctx: "{'default_company_id': company_id, 'default_product_id': product_id}"
              }
            },
            package_id: {
              groups: 'stock.group_tracking_lot'
            },
            owner_id: {
              groups: 'stock.group_tracking_owner'
            },
            company_id: {
              invisible: '1'
            },
            location_id: {
              groups: 'stock.group_stock_multi_locations',
              no_open: true,
              no_create: true
            },
            scrap_location_id: {
              groups: 'stock.group_stock_multi_locations',
              no_open: true,
              no_create: true
            }
          }
        },
        _footer: {
          _button_action_validate: {
            _attr: {
              name: 'action_validate',
              type: 'object',
              string: 'Done',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  }
}
