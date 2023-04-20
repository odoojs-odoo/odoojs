export default {
  stock_production_lot_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.lot',
    inherit_id: 'stock.view_production_lot_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[hasclass('oe_button_box')]/button",
            position: 'before'
          },
          _button_action_view_so: {
            _attr: {
              name: 'action_view_so',
              type: 'object',
              icon: 'fa-pencil-square-o',
              help: 'Sale Orders',
              invisible: ['|', ['sale_order_count', '=', 0], ['display_complete', '=', false]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: {
                class: 'o_field_widget o_stat_info'
              },
              _span: {
                _attr: {
                  class: 'o_stat_value'
                },
                sale_order_count: {
                  widget: 'statinfo',
                  class: 'mr4'
                }
              },
              _span_309: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Sales'
                }
              }
            }
          }
        },
        _xpath_467: {
          _attr: {
            expr: "//group[@name='main_group']",
            position: 'after'
          },
          _group: {
            sale_order_ids: {
              widget: 'many2many',
              invisible: ['|', ['sale_order_ids', '=', []], ['display_complete', '=', true]],
              readonly: 'True',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      name: {},
                      partner_id: {},
                      date_order: {},
                      state: {
                        invisible: '1'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
