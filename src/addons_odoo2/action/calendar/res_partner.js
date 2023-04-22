export default {
  res_partner_kanban_view: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.res_partner_kanban_view',
    arch: {
      sheet: {
        mobile: {
          position: 'after',
          __todo__after: {
            meeting_count: {}
          }
        },
        _xpath: {
          _attr: {
            expr: "//div[hasclass('oe_kanban_bottom_left')]",
            position: 'inside'
          },
          _a: {
            _attr: { class: 'oe_kanban_action oe_kanban_action_a me-1' },
            _span: {
              _attr: { class: 'badge rounded-pill' },
              _i: {
                _attr: {
                  title: 'Meetings',
                  class: 'fa fa-fw fa-calendar'
                }
              },
              _t: {}
            }
          }
        }
      }
    }
  },

  view_partners_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _data: {
          _div_button_box: {
            _attr: {
              name: 'button_box',
              position: 'inside'
            },
            _button_schedule_meeting: {
              _attr: {
                name: 'schedule_meeting',
                type: 'object',
                icon: 'fa-calendar',
                context: { todo_ctx: "{'partner_id': active_id, 'partner_name': name}" },
                class: 'oe_stat_button'
              },
              meeting_count: {
                string: 'Meetings',
                widget: 'statinfo'
              }
            }
          }
        }
      }
    }
  }
}
