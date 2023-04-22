export default {
  crm_lead_partner_kanban_view: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.res_partner_kanban_view',
    arch: {
      sheet: {
        mobile: {
          position: 'after',
          __todo__after: {
            opportunity_count: { groups: 'sales_team.group_sale_salesman' }
          }
        },
        _xpath: {
          _attr: {
            expr: "//div[hasclass('oe_kanban_bottom_left')]",
            position: 'inside'
          },
          _a: {
            _attr: {
              groups: 'sales_team.group_sale_salesman',
              class: 'oe_kanban_action oe_kanban_action_a me-1'
            },
            _span: {
              _attr: { class: 'badge rounded-pill' },
              _i: {
                _attr: {
                  title: 'Opportunities',
                  class: 'fa fa-fw fa-star'
                }
              },
              _t: {}
            }
          }
        }
      }
    }
  },

  view_partners_form_crm1: {
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
            _button_action_view_opportunity: {
              _attr: {
                name: 'action_view_opportunity',
                type: 'object',
                icon: 'fa-star',
                groups: 'sales_team.group_sale_salesman',
                context: { todo_ctx: "{'default_partner_id': active_id, 'default_type':'opportunity'}" },
                class: 'oe_stat_button o_res_partner_tip_opp'
              },
              opportunity_count: {
                string: 'Opportunities',
                widget: 'statinfo'
              }
            }
          }
        }
      }
    }
  }
}
