export default {
  res_partner_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='mobile']",
            position: 'after'
          },
          phone_sanitized: {
            groups: 'base.group_no_one',
            invisible: '1'
          }
        },
        _xpath_887: {
          _attr: {
            expr: "//field[@name='phone']",
            position: 'replace'
          },
          phone_blacklisted: { invisible: '1' },
          mobile_blacklisted: { invisible: '1' },
          _label_phone: {
            for: 'phone',
            class: 'oe_inline'
          },
          _div: {
            _attr: { class: 'o_row o_row_readonly' },
            _button_phone_action_blacklist_remove: {
              _attr: {
                name: 'phone_action_blacklist_remove',
                type: 'object',
                title: 'This phone number is blacklisted for SMS Marketing. Click to unblacklist.',
                groups: 'base.group_user',
                invisible: [['phone_blacklisted', '=', false]],
                context: { todo_ctx: "{'default_phone': phone}" },
                class: 'fa fa-ban text-danger'
              }
            },
            phone: { widget: 'phone' }
          }
        },
        _xpath_560: {
          _attr: {
            expr: "//field[@name='mobile']",
            position: 'replace'
          },
          phone_blacklisted: { invisible: '1' },
          mobile_blacklisted: { invisible: '1' },
          _label_mobile: {
            for: 'mobile',
            class: 'oe_inline'
          },
          _div: {
            _attr: { class: 'o_row o_row_readonly' },
            _button_phone_action_blacklist_remove: {
              _attr: {
                name: 'phone_action_blacklist_remove',
                type: 'object',
                title: 'This phone number is blacklisted for SMS Marketing. Click to unblacklist.',
                groups: 'base.group_user',
                invisible: [['mobile_blacklisted', '=', false]],
                context: { todo_ctx: "{'default_phone': mobile}" },
                class: 'fa fa-ban text-danger'
              }
            },
            mobile: { widget: 'phone' }
          }
        }
      }
    }
  },

  res_partner_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_res_partner_filter',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='phone']",
            position: 'replace'
          },
          phone_mobile_search: {}
        }
      }
    }
  }
}
