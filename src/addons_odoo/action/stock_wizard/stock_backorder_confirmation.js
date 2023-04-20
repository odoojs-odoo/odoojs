export default {
  view_backorder_confirmation: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.backorder.confirmation',
    type: 'form',

    arch: {
      buttons: {
        process: {
          name: 'process',
          string: '创建欠单',
          type: 'object',
          btn_type: 'primary'
        },
        process_cancel_backorder: {
          name: 'process_cancel_backorder',
          string: '没有欠单',
          type: 'object',
          btn_type: 'primary'
          // 'invisible': [('show_transfers', '=', True)]
        }
      },

      sheet: {
        _group: {
          _group: {
            _div: {
              _p_explanation$dash$text: {
                _attr: {
                  name: 'explanation-text',
                  text: 'You have processed less products than the initial demand.'
                }
              }
            }
          },
          _group_243: {
            _div: {
              _attr: {
                class: 'text-muted',
                text: 'Create a backorder if you expect to process the remaining\n                            products later. Do not create a backorder if you will not\n                            process the remaining products.'
              }
            }
          }
        },
        pick_ids: { invisible: 1 },
        show_transfers: { invisible: 1 },
        backorder_confirmation_line_ids: {
          widget: 'x2many_tree',
          invisible: ({ record }) => {
            const { show_transfers } = record
            return !show_transfers
          },

          views: {
            tree: {
              arch: {
                sheet: {
                  picking_id: {},
                  to_backorder: { widget: 'boolean_toggle' }
                }
              }
            },
            form: {
              arch: {
                sheet: {
                  picking_id: {},
                  to_backorder: { widget: 'boolean_toggle' }
                }
              }
            }
          }
        }
      }
    }
  },

  action_backorder_confirmation_wizard: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Create Backorder?',
    type: 'ir.actions.act_window',
    res_model: 'stock.backorder.confirmation',
    domain: [],

    context: {
      active_model: 'stock.picking'
      // default_show_transfers: true
    },
    views: {
      form: 'view_backorder_confirmation'
    }
  }
}
