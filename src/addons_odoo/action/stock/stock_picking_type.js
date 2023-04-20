export default {
  action_picking_type_list: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Operations Types',
    type: 'ir.actions.act_window',
    res_model: 'stock.picking.type',
    domain: [],
    context: {},
    search_view_id: 'view_pickingtype_filter',
    views: {
      tree: 'view_picking_type_tree',
      form: 'view_picking_type_form'
    }
  },

  view_pickingtype_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking.type',
    type: 'search',
    arch: {
      fields: {
        name: {},
        warehouse_id: {}
      },

      filters: {
        group_active: {
          inactive: {
            string: 'Archived',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  view_picking_type_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking.type',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        active: { invisible: '1' },
        warehouse_id: {},
        sequence_id: {},
        company_id: {}
      }
    }
  },

  view_picking_type_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking.type',
    type: 'form',
    arch: {
      sheet: {
        _widget: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible({ record }) {
              // 'invisible': [('active', '=', True)]
              const { active } = record
              return active
            }
          }
        },
        _div_title: {
          _label: { for: 'name' },
          _h1: { name: {} }
        },

        _group_first: {
          _attr: { name: 'first' },
          _group: {
            code: {},
            active: { invisible: '1' },
            company_id: { invisible: '1' },
            hide_reservation_method: { invisible: '1' },
            sequence_id: { groups: 'base.group_no_one' },
            sequence_code: {},
            warehouse_id: {},
            reservation_method: {
              widget: 'radio',
              invisible({ record }) {
                //'invisible': [('hide_reservation_method', '=', True)]
                const { hide_reservation_method } = record
                return hide_reservation_method
              }
            },

            auto_show_reception_report: {
              invisible({ record }) {
                // 'invisible': [('code', 'not in', ['incoming', 'internal'])]
                const { code } = record
                return !['incoming', 'internal'].includes(code)
              }
            },

            _field_reservation_days_before: {
              _attr: {
                invisible({ record }) {
                  // 'invisible':
                  // ['|', ('code', '=', 'incoming'),
                  // ('reservation_method', '!=', 'by_date')]
                  const { code, reservation_method } = record
                  return code === 'incoming' || reservation_method !== 'by_date'
                }
              },
              _label: {
                for: 'reservation_days_before',
                string: 'Reserve before scheduled date'
              },

              _div_row: {
                reservation_days_before: {},
                _span: 'days before/',
                reservation_days_before_priority: {},
                _span_2: ' days before when starred'
              }
            }
          }
        },

        _group_2: {
          company_id: {},
          return_picking_type_id: {
            string: 'Returns Type',
            invisible({ record }) {
              // "invisible": [("code", "not in",
              //   ["incoming", "outgoing", "internal"])]}'
              const { code } = record
              return !['incoming', 'outgoing', 'internal'].includes(code)
            }
          },
          create_backorder: {},
          show_operations: {},
          show_reserved: {
            invisible({ record }) {
              // 'invisible': [('code', '!=', 'incoming')]
              const { code } = record
              return code !== 'incoming'
            }
          }
        }
      },

      _group_second: {
        _attr: { name: 'second' },
        _group: {
          attr: {
            string: 'Lots/Serial Numbers',
            groups: 'stock.group_production_lot',
            name: 'stock_picking_type_lot',
            invisible({ record }) {
              // {"invisible": [("code", "not in",
              //   ["incoming", "outgoing", "internal"])]}'
              const { code } = record
              return !['incoming', 'outgoing', 'internal'].includes(code)
            }
          },
          use_create_lots: { string: 'Create New' },
          use_existing_lots: { string: 'Use Existing ones' }
        },
        _group_Packages: {
          _attr: {
            string: 'Packages',
            groups: 'stock.group_tracking_lot',
            invisible({ record }) {
              // "invisible": [("code", "not in",
              //   ["incoming", "outgoing", "internal"])]}'
              const { code } = record
              return !['incoming', 'outgoing', 'internal'].includes(code)
            }
          },
          show_entire_packs: {}
        },
        _group_locations: {
          _attr: {
            name: 'locations',
            string: 'Locations',
            groups: 'stock.group_stock_multi_locations'
          },

          default_location_src_id: {},
          default_location_dest_id: {}
        }
      }
    }
  }
}
