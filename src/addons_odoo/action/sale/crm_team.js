export default {
  crm_team_salesteams_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    inherit_id: 'sales_team.crm_team_view_form',
    arch: {
      sheet: {
        _div_title: {
          _div_options_active: {
            _div: {
              _attr: {
                class: 'o_row'
              },
              use_quotations: {},
              _label_use_quotations: {
                for: 'use_quotations'
              }
            }
          }
        },

        _group: {
          _group_left: {
            company_id: {},
            _label_invoiced_target: { for: 'invoiced_target' },
            _div: {
              _attr: {
                class: 'o_row'
              },
              invoiced_target: {
                widget: 'monetary',
                class: 'oe_inline',
                currency_field: 'currency_id'
              },
              _span: '/ Month'
            }
          }
        }
      }
    }
  }
}
