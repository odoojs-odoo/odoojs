export default {
  quant_package_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant.package',
    type: 'search',
    arch: {
      name: { string: 'Package Name' },
      location_id: {},
      package_type_id: {},
      _group: {
        _attr: { string: 'Group by...' },
        _filter_location: {
          _attr: {
            name: 'location',
            string: 'Location',
            domain: [],
            context: { group_by: 'location_id' }
          }
        },
        _filter_package_type: {
          _attr: {
            name: 'package_type',
            string: 'Package Type',
            domain: [],
            context: { group_by: 'package_type_id' }
          }
        }
      }
    }
  },

  view_quant_package_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant.package',
    type: 'form',
    arch: {
      header: {
        _button_unpack: {
          _attr: {
            name: 'unpack',
            type: 'object',
            string: 'Unpack'
          }
        }
      },
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_view_picking: {
            _attr: {
              name: 'action_view_picking',
              type: 'object',
              string: 'Package Transfers',
              icon: 'fa-arrows-v',
              class: 'oe_stat_button'
            }
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: {
            for: 'name',
            string: 'Package Reference'
          },
          _h1: {
            name: {
              class: 'oe_inline',
              placeholder: 'e.g. PACK0000007'
            }
          }
        },
        _group: {
          _group: {
            package_type_id: {},
            company_id: { groups: 'base.group_multi_company' },
            owner_id: { groups: 'stock.group_tracking_owner' },
            location_id: { no_create: true }
          },
          _group_554: {
            pack_date: {}
          }
        },
        _separator: {
          _attr: { string: 'Content' }
        },
        quant_ids: {
          views: {
            tree: {
              arch: {
                sheet: {
                  product_id: {},
                  lot_id: { groups: 'stock.group_production_lot' },
                  quantity: {},
                  product_uom_id: { groups: 'uom.group_uom' }
                }
              }
            }
          }
        }
      }
    }
  },

  view_quant_package_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant.package',
    type: 'tree',
    arch: {
      sheet: {
        display_name: {},
        package_type_id: {},
        location_id: { no_create: true },
        company_id: { groups: 'base.group_multi_company' }
      }
    }
  },

  view_quant_package_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.quant.package',
    type: 'otherview',
    arch: {}
  },

  action_package_view: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Packages',
    res_model: 'stock.quant.package',
    search_view_id: 'tooooooodoooooo',
    context: {},
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
