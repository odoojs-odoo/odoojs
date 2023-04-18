export default {
  view_users_form_simple_modif_mail: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'base.view_users_form_simple_modif',
    arch: {
      sheet: {
        _data: {
          email: {
            __todo__before: {
              notification_type: {
                widget: 'radio'
              }
            }
          },
          _xpath: {
            _attr: {
              expr: "//field[@name='image_1920']",
              position: 'before'
            },
            _widget_notification_alert: {
              _attr: {
                name: 'notification_alert'
              }
            }
          }
        }
      }
    }
  },

  view_users_form_mail: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'base.view_users_form',
    arch: {
      sheet: {
        _data: {
          signature: {
            __todo__before: {
              notification_type: {
                widget: 'radio',
                invisible: [['share', '=', true]]
              }
            }
          }
        }
      }
    }
  }
}
