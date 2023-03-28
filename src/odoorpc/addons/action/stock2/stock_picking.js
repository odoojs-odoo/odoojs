export default {
  form_backorder_wizard: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.backorder.confirmation',
    type: 'form',

    arch: {
      buttons: [
        {
          name: 'process',
          string: '创建欠单',
          type: 'object',
          btn_type: 'primary'
        },

        {
          name: 'process_cancel_backorder',
          string: '没有欠单',
          type: 'object',
          btn_type: 'primary'
          // 'invisible': [('show_transfers', '=', True)]
        }
      ]
    },

    fields: {
      show_transfers: { invisible: 1 },
      pick_ids: { invisible: 1 },
      backorder_confirmation_line_ids: {
        // string: '',
        widget: 'x2many_tree',
        readonly2: 1,
        // invisible: ({ record }) => {
        //   const { show_transfers } = record
        //   return !show_transfers
        // },

        views: {
          tree: {
            fields: {
              picking_id: {},
              to_backorder: {}
            }
          },
          form: {
            fields: {
              // display_name: {},
              picking_id: {},
              to_backorder: {}
            }
          }
        }
      }
    }
  },

  action_backorder_wizard: {
    _odoo_model: 'ir.actions',
    name: '创建欠单？',
    type: 'ir.actions.act_window',
    res_model: 'stock.backorder.confirmation',
    domain: [],

    context: {
      active_model: 'stock.picking'
    },
    views: {
      form: 'form_backorder_wizard'
    }
  }
}
