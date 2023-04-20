export default {
  view_immediate_transfer: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.immediate.transfer',
    type: 'form',
    arch: {
      buttons: {
        process: {
          name: 'process',
          type: 'object',
          string: 'Apply',
          btn_type: 'primary'
        }
      },

      sheet: {
        _p: {
          _attr: {
            text: 'You have not recorded'
          },
          _i: 'done',
          _i_541: 'apply'
        },
        pick_ids: { invisible: '1' },
        show_transfers: { invisible: '1' },
        immediate_transfer_line_ids: {
          // invisible: [['show_transfers', '=', false]],
          views: {
            tree: {
              arch: {
                sheet: {
                  picking_id: {},
                  to_immediate: { widget: 'boolean_toggle' }
                }
              }
            },
            form: {
              arch: {
                sheet: {
                  picking_id: {},
                  to_immediate: { widget: 'boolean_toggle' }
                }
              }
            }
          }
        }
      }
    }
  },

  action_immediate_transfer_wizard: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Immediate Transfer?',
    type: 'ir.actions.act_window',
    res_model: 'stock.immediate.transfer',
    domain: [],

    context: {
      active_model: 'stock.picking'
      // default_show_transfers: true
    },
    views: {
      form: 'view_immediate_transfer'
    }
  }
}
