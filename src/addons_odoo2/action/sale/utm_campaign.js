export default {
  utm_campaign_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.campaign',
    inherit_id: 'utm.utm_campaign_view_kanban',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[@id='utm_statistics']",
            position: 'inside'
          },
          _div: {
            _attr: {
              title: 'Revenues',
              groups: 'sales_team.group_sale_salesman',
              class: 'me-3'
            },
            currency_id: { invisible: 'True' },
            _small: {
              _attr: { class: 'fw-bold' },
              invoiced_amount: {
                widget: 'monetary',
                currency_field: 'currency_id'
              }
            }
          },
          _div_865: {
            _attr: {
              title: 'Quotations',
              groups: 'sales_team.group_sale_salesman',
              class: 'me-3'
            },
            _i: {
              _attr: { class: 'fa fa-money text-muted' }
            },
            _small: {
              _attr: { class: 'fw-bold' },
              quotation_count: {}
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
          _button_action_redirect_to_invoiced: {
            _attr: {
              name: 'action_redirect_to_invoiced',
              type: 'object',
              icon: 'fa-usd',
              groups: 'sales_team.group_sale_salesman',
              class: 'oe_stat_button order-1'
            },
            invoiced_amount: {
              string: 'Revenues',
              widget: 'statinfo'
            }
          },
          _button_action_redirect_to_quotations: {
            _attr: {
              name: 'action_redirect_to_quotations',
              type: 'object',
              icon: 'fa-money',
              groups: 'sales_team.group_sale_salesman',
              class: 'oe_stat_button order-2'
            },
            quotation_count: {
              string: 'Quotations',
              widget: 'statinfo'
            }
          }
        }
      }
    }
  }
}
