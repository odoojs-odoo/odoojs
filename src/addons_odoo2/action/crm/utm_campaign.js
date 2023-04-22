export default {
  utm_campaign_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.campaign',
    inherit_id: 'utm.utm_campaign_view_kanban',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='user_id']",
            position: 'after'
          },
          use_leads: {}
        },
        _xpath_994: {
          _attr: {
            expr: "//div[@id='utm_statistics']",
            position: 'inside'
          },
          _div: {
            _attr: {
              groups: 'sales_team.group_sale_salesman',
              class: 'me-3'
            },
            _i: {
              _attr: { class: 'fa fa-star text-muted' }
            },
            _small: {
              _attr: { class: 'fw-bold' },
              crm_lead_count: {}
            }
          }
        }
      }
    }
  },

  utm_campaign_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.campaign',
    inherit_id: 'utm.utm_campaign_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[hasclass('oe_button_box')]",
            position: 'inside'
          },
          _button_action_redirect_to_leads_opportunities: {
            _attr: {
              name: 'action_redirect_to_leads_opportunities',
              type: 'object',
              icon: 'fa-star',
              groups: 'sales_team.group_sale_salesman',
              class: 'oe_stat_button order-3'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              use_leads: { invisible: '1' },
              _span: {
                _attr: { class: 'o_stat_value' },
                crm_lead_count: {}
              },
              _span_218: {
                _attr: {
                  invisible: [['use_leads', '=', false]],
                  class: 'o_stat_text',
                  text: 'Leads'
                }
              },
              _span_665: {
                _attr: {
                  invisible: [['use_leads', '=', true]],
                  class: 'o_stat_text',
                  text: 'Opportunities'
                }
              }
            }
          }
        }
      }
    }
  }
}
