export default {
  account_journal_dashboard_kanban_view_inherit_hr_expense: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal',
    inherit_id: 'account.account_journal_dashboard_kanban_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//t[@id='account.JournalBodySalePurchase']//div[hasclass('o_kanban_primary_right')]",
            position: 'inside'
          },
          _div: {
            _attr: { class: 'row' },
            _div: {
              _attr: { class: 'col overflow-hidden text-start' },
              _a_open_expenses_action: {
                _attr: {
                  name: 'open_expenses_action',
                  type: 'object',
                  text: 'Expenses to Process'
                },
                _t: {}
              }
            },
            _div_599: {
              _attr: { class: 'col-auto text-end' },
              _span: {
                _t: {}
              }
            }
          }
        }
      }
    }
  }
}
