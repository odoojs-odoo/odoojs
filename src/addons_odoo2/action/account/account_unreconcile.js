export default {
  account_unreconcile_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.unreconcile',
    type: 'form',
    arch: {
      sheet: {
        _separator: {
          _attr: {
            string: 'Unreconcile Transactions'
          }
        },
        _form: {
          _attr: {
            class: 'o_form_label',
            text: 'If you unreconcile transactions, you must also verify all the actions that are linked to those transactions because they will not be disabled'
          }
        },
        _footer: {
          _button_trans_unrec: {
            _attr: {
              name: 'trans_unrec',
              type: 'object',
              string: 'Unreconcile',
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
  },

  action_account_unreconcile: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Unreconcile',
    res_model: 'account.unreconcile',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'account_unreconcile_view',
      form: '=======todo=========='
    }
  }
}
