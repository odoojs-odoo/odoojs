export default {
  view_mrp_production_backorder_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.production.backorder',
    type: 'form',
    arch: {
      sheet: {
        _group: { _p: 'Create a backorder if you expect to process the remaining products later. Do not create a backorder if you will not process the remaining products.' },
        show_backorder_lines: { invisible: '1' },
        mrp_production_backorder_line_ids: {
          invisible: [['show_backorder_lines', '=', false]],
          views: {
            tree: {
              arch: {
                sheet: {
                  mrp_production_id: { force_save: '1' },
                  to_backorder: { widget: 'boolean_toggle' }
                }
              }
            }
          }
        },
        _footer: {
          _button_action_backorder: {
            _attr: {
              name: 'action_backorder',
              type: 'object',
              string: 'Create backorder',
              invisible: [['show_backorder_lines', '!=', false]],
              class: 'btn-primary'
            }
          },
          _button_action_backorder_421: {
            _attr: {
              name: 'action_backorder',
              type: 'object',
              string: 'Validate',
              invisible: [['show_backorder_lines', '=', false]],
              class: 'btn-primary'
            }
          },
          _button_action_close_mo: {
            _attr: {
              name: 'action_close_mo',
              type: 'object',
              string: 'No Backorder',
              invisible: [['show_backorder_lines', '!=', false]]
            }
          },
          _button: {
            _attr: {
              string: 'Discard',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_mrp_production_backorder: {
    _odoo_model: 'ir.actions.act_window',
    name: 'You produced less than initial demand',
    type: 'ir.actions.act_window',
    res_model: 'mrp.production.backorder',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
