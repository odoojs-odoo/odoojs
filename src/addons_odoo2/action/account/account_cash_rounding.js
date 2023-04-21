export default {
  rounding_list_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Cash Roundings',
    res_model: 'account.cash.rounding',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  rounding_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.cash.rounding',
    type: 'form',
    arch: {
      sheet: {
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: { for: 'name' },
          _h1: {
            name: { class: 'oe_inline' }
          }
        },
        _group: {
          _group: {
            rounding: {},
            strategy: {},
            profit_account_id: {
              groups: 'account.group_account_invoice,account.group_account_readonly',
              domain: [['account_type', 'not in', ('asset_receivable', 'liability_payable')]],
              invisible: [['strategy', '!=', 'add_invoice_line']],
              required: [['strategy', '=', 'add_invoice_line']],
              no_create: true
            },
            loss_account_id: {
              groups: 'account.group_account_invoice,account.group_account_readonly',
              domain: [['account_type', 'not in', ('asset_receivable', 'liability_payable')]],
              invisible: [['strategy', '!=', 'add_invoice_line']],
              required: [['strategy', '=', 'add_invoice_line']],
              no_create: true
            },
            rounding_method: {}
          }
        }
      }
    }
  },

  rounding_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.cash.rounding',
    type: 'search',
    arch: {
      name: {}
    }
  },

  rounding_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.cash.rounding',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        rounding: {},
        rounding_method: {}
      }
    }
  }
}
