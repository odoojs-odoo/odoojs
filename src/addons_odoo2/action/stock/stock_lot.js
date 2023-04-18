export default {
  view_production_lot_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.lot',
    type: 'form',
    arch: {
      sheet: {
        company_id: {
          invisible: '1'
        },
        display_complete: {
          invisible: '1'
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            invisible: [['display_complete', '=', false]],
            class: 'oe_button_box'
          },
          _button_action_lot_open_transfers: {
            _attr: {
              name: 'action_lot_open_transfers',
              invisible: [['delivery_count', '=', 0]],
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-truck'
            },
            _div: {
              _attr: {
                class: 'o_field_widget o_stat_info'
              },
              _span: {
                _attr: {
                  class: 'o_stat_value'
                },
                delivery_count: {
                  widget: 'statinfo',
                  class: 'mr4'
                }
              },
              _span_452: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Transfers'
                }
              }
            }
          },
          _button_action_lot_open_quants: {
            _attr: {
              name: 'action_lot_open_quants',
              string: 'Location',
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-arrows'
            }
          },
          _button_action_stock_report: {
            _attr: {
              name: 'action_stock_report',
              string: 'Traceability',
              class: 'oe_stat_button',
              type: 'action',
              icon: 'fa-arrow-up'
            }
          }
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _label_name: {
            for: 'name'
          },
          _h1: {
            name: {
              placeholder: 'e.g. LOT/0001/20121'
            }
          }
        },
        _group_main_group: {
          _attr: {
            name: 'main_group'
          },
          _group: {
            product_id: {
              context: {
                default_detailed_type: 'product',
                default_tracking: 'lot'
              },
              force_save: '1'
            },
            _label_product_qty: {
              for: 'product_qty',
              invisible: [['display_complete', '=', false]]
            },
            _div: {
              _attr: {
                invisible: [['display_complete', '=', false]],
                class: 'o_row'
              },
              product_qty: {},
              product_uom_id: {
                groups: 'uom.group_uom'
              }
            },
            ref: {},
            company_id: {
              groups: 'base.group_multi_company'
            }
          },
          _group_579: {}
        },
        _notebook: {
          _attr: {
            invisible: [['display_complete', '=', false]]
          },
          _page_description: {
            _attr: {
              name: 'description',
              string: 'Description'
            },
            note: {}
          }
        }
      }
    }
  },

  view_production_lot_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.lot',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        ref: {},
        product_id: {},
        create_date: {},
        company_id: {
          groups: 'base.group_multi_company'
        },
        last_delivery_partner_id: {
          string: 'Transfer to'
        }
      }
    }
  },

  search_product_lot_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.lot',
    type: 'search',
    arch: {
      name: {
        string: 'Lot/Serial Number'
      },
      product_id: {},
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_group_by_product: {
          _attr: {
            name: 'group_by_product',
            string: 'Product',
            domain: [],
            context: {
              group_by: 'product_id'
            }
          }
        }
      }
    }
  },

  action_production_lot_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Lots/Serial Numbers',
    type: 'ir.actions.act_window',
    search_view_id: 'search_product_lot_filter',
    res_model: 'stock.lot',
    context: {
      todo_ctx: "{'search_default_group_by_product': 1, 'display_complete': True, 'default_company_id': allowed_company_ids[0]}"
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
