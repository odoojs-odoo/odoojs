export default {
  view_mail_tracking_value_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.tracking.value',
    type: 'tree',
    arch: {
      sheet: {
        field: {},
        old_value_integer: {},
        old_value_float: {},
        old_value_char: {},
        old_value_text: {},
        old_value_datetime: {},
        new_value_integer: {},
        new_value_float: {},
        new_value_char: {},
        new_value_text: {},
        new_value_datetime: {},
        mail_message_id: {}
      }
    }
  },

  view_mail_tracking_value_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.tracking.value',
    type: 'form',
    arch: {
      sheet: {
        _group_field_details: {
          _attr: {
            name: 'field_details',
            string: 'Field details'
          },
          field: {},
          field_desc: {},
          field_type: {},
          tracking_sequence: {}
        },
        _group_values: {
          _attr: { name: 'values' },
          _group_old_values: {
            _attr: {
              name: 'old_values',
              string: 'Old values'
            },
            old_value_integer: {},
            old_value_float: {},
            old_value_char: {},
            old_value_text: {},
            old_value_datetime: {}
          },
          _group_new_values: {
            _attr: {
              name: 'new_values',
              string: 'New values'
            },
            new_value_integer: {},
            new_value_float: {},
            new_value_char: {},
            new_value_text: {},
            new_value_datetime: {}
          }
        },
        _group: {
          _attr: { string: 'Related Message' },
          mail_message_id: {}
        }
      }
    }
  },

  action_view_mail_tracking_value: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Tracking Values',
    res_model: 'mail.tracking.value',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
