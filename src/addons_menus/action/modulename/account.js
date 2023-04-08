export default {
  menu_account: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Account Move',
    sequence: 30,
    children: {
      account_move_master: {
        name: 'Master Data',
        children: {
          res_partner_action_customer: {
            action: 'account.res_partner_action_customer',
            name: 'Customers'
          },
          res_partner_action_supplier: {
            action: 'account.res_partner_action_supplier',
            name: 'Vendors'
          },
          product_product_action_sellable: {
            action: 'account.product_product_action_sellable',
            name: 'Products(Sold)'
          },
          product_product_action_purchasable: {
            action: 'account.product_product_action_purchasable',
            name: 'Products(Purchased)'
          }
        }
      },
      action_account_moves_all: {
        action: 'account.action_account_moves_all',
        name: 'Journal Items'
      },
      account_analytic_line_action_entries: {
        action: 'analytic.account_analytic_line_action_entries',
        name: 'Analytic Items'
      },
      account_move: {
        name: 'Account Move',
        children: {
          action_move_journal_line: {
            action: 'account.action_move_journal_line',
            name: 'Journal Entries'
          },
          action_move_out_invoice_type: {
            action: 'account.action_move_out_invoice_type',
            name: 'Invoices'
          },
          action_move_in_invoice_type: {
            action: 'account.action_move_in_invoice_type',
            name: 'Bills'
          }
        }
      },
      account_payment: {
        name: 'Payments',
        children: {
          action_account_payments: {
            action: 'account.action_account_payments',
            name: 'Payments In'
          },

          action_account_payments_payable: {
            action: 'account.action_account_payments_payable',
            name: 'Payments Out'
          },

          action_account_payments_transfer: {
            action: 'account.action_account_payments_transfer',
            name: 'Internal Transfers'
          },
          action_bank_statement_tree: {
            action: 'account.action_bank_statement_tree',
            name: 'Bank Statements'
          },
          action_view_bank_statement_tree: {
            action: 'account.action_view_bank_statement_tree',
            name: 'Cash Registers'
          }
        }
      }
    }
  }
}
