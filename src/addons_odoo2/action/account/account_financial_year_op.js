export default {
  setup_financial_year_opening_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.financial.year.op',
    type: 'form',
    arch: {
      sheet: {
        _footer: {
          _button_action_save_onboarding_fiscal_year: {
            _attr: {
              name: 'action_save_onboarding_fiscal_year',
              type: 'object',
              string: 'Apply',
              class: 'oe_highlight'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel'
            }
          }
        },
        _group: {
          _group: {
            _attr: {
              string: 'Fiscal Years'
            },
            opening_move_posted: {
              invisible: '1'
            },
            opening_date: {
              readonly: [['opening_move_posted', '=', true]]
            },
            _label_fiscalyear_last_month: {
              for: 'fiscalyear_last_month',
              string: 'Fiscal Year End'
            },
            _div: {
              fiscalyear_last_day: {
                class: 'text-center me-2'
              },
              fiscalyear_last_month: {
                class: 'w-75'
              }
            }
          }
        }
      }
    }
  }
}
