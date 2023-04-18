export default {
  validate_account_move_view: {
    _odoo_model: 'ir.ui.view',
    model: 'validate.account.move',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          force_post: {}
        },
        _span: {
          _attr: {
            class: 'o_form_label',
            text: "All selected journal entries will be validated and posted. You won't be able to modify them afterwards."
          }
        },
        _footer: {
          _button_validate_move: {
            _attr: {
              name: 'validate_move',
              type: 'object',
              string: 'Post Journal Entries',
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

  action_validate_account_move: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Post entries',
    type: 'ir.actions.act_window',
    res_model: 'validate.account.move',
    context: {},
    views: {
      tree: 'validate_account_move_view',
      form: '=======todo=========='
    }
  }
}
