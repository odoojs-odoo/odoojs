export default {
  view_account_accrued_orders_wizard: {
    _odoo_model: 'ir.ui.view',
    model: 'account.accrued.orders.wizard',
    type: 'form',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        _group: {
          _div: {
            _attr: {
              invisible: [['display_amount', '!=', true]],
              class: 'alert alert-info',
              text: "There doesn't appear to be anything to invoice for the selected order. However, you can use the amount field to force an accrual entry."
            }
          },
          _group: {
            journal_id: {},
            account_id: {},
            amount: { invisible: [['display_amount', '!=', true]] },
            display_amount: { invisible: '1' }
          },
          _group_324: {
            date: {},
            reversal_date: {}
          }
        },
        preview_data: {
          widget: 'grouped_view_widget',
          class: 'w-100'
        },
        _footer: {
          _button_create_entries: {
            _attr: {
              name: 'create_entries',
              type: 'object',
              string: 'Create Entry',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  }
}
