export default {
  account_resequence_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.resequence.wizard',
    type: 'form',
    arch: {
      sheet: {
        move_ids: { invisible: '1' },
        new_values: { invisible: '1' },
        sequence_number_reset: { invisible: '1' },
        _group: {
          _group: {
            ordering: { widget: 'radio' }
          },
          _group_989: {
            first_name: {}
          }
        },
        _group_689: {
          _label_preview_moves: {
            for: 'preview_moves',
            string: 'Preview Modifications'
          },
          preview_moves: { widget: 'account_resequence_widget' }
        },
        _footer: {
          _button_resequence: {
            _attr: {
              name: 'resequence',
              type: 'object',
              string: 'Confirm',
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

  action_account_resequence: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Resequence',
    res_model: 'account.resequence.wizard',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'account_resequence_view',
      form: '=======todo=========='
    }
  }
}
