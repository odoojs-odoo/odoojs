export default {
  res_partner_view_buttons: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _div_button_box: {
          _button_action_view_sale_order: {
            _attr: {
              name: 'action_view_sale_order',
              type: 'object',
              icon: 'fa-usd',
              groups: 'sales_team.group_sale_salesman',
              class: 'oe_stat_button'
            },
            sale_order_count: {
              string: 'Sales',
              widget: 'statinfo'
            }
          }
        },

        _notebook: {
          _page_internal_notes: {
            comment: {},
            _group: {
              _attr: {
                groups: 'sales_team.group_sale_salesman'
              },
              _group: {
                _attr: {
                  groups: 'sale.group_warning_sale'
                },
                _separator: {
                  _attr: {
                    string: 'Warning on the Sales Order'
                  }
                },
                sale_warn: {
                  required: '1'
                },
                sale_warn_msg: {
                  string: 'Message',
                  required: [
                    ['sale_warn', '!=', false],
                    ['sale_warn', '!=', 'no-message']
                  ],
                  // invisible: [['sale_warn', 'in', (false, 'no-message')]],
                  placeholder: 'Type a message...'
                }
              }
            }
          }
        }
      }
    }
  }
}
