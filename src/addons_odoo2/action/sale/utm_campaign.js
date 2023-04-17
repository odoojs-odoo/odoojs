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
              groups: 'sales_team.group_sale_salesman',
              class: 'me-3',
              title: 'Revenues'
            },
            currency_id: {
              invisible: 'True'
            },
            _small: {
              _attr: {
                class: 'fw-bold'
              },
              invoiced_amount: {
                widget: 'monetary',
                currency_field: 'currency_id'
              }
            }
          },
          _div_607: {
            _attr: {
              groups: 'sales_team.group_sale_salesman',
              class: 'me-3',
              title: 'Quotations'
            },
            _i: {
              _attr: {
                class: 'fa fa-money text-muted'
              }
            },
            _small: {
              _attr: {
                class: 'fw-bold'
              },
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
              groups: 'sales_team.group_sale_salesman',
              class: 'oe_stat_button order-1',
              type: 'object',
              icon: 'fa-usd'
            },
            invoiced_amount: {
              string: 'Revenues',
              widget: 'statinfo'
            }
          },
          _button_action_redirect_to_quotations: {
            _attr: {
              name: 'action_redirect_to_quotations',
              groups: 'sales_team.group_sale_salesman',
              class: 'oe_stat_button order-2',
              type: 'object',
              icon: 'fa-money'
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
