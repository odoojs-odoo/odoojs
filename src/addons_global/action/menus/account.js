export default {
  menu_account: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Account Move',
    sequence: 30,
    children: {
      menu_account_move_master: {
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
      menu_action_account_moves_all: {
        action: 'account.action_account_moves_all',
        name: 'Journal Items'
      },
      menu_account_analytic_line_action_entries: {
        action: 'analytic.account_analytic_line_action_entries',
        name: 'Analytic Items'
      },
      menu_account_move: {
        name: 'Account Move',
        children: {
          menu_action_move_journal_line: {
            action: 'account.action_move_journal_line',
            name: 'Journal Entries'
          },
          menu_action_move_out_invoice_type: {
            action: 'account.action_move_out_invoice_type',
            name: 'Invoices'
          },
          menu_action_move_in_invoice_type: {
            action: 'account.action_move_in_invoice_type',
            name: 'Bills'
          }
        }
      },
      menu_account_payment: {
        name: 'Payments',
        children: {
          menu_action_account_payments: {
            action: 'account.action_account_payments',
            name: 'Payments In'
          },

          menu_action_account_payments_payable: {
            action: 'account.action_account_payments_payable',
            name: 'Payments Out'
          },

          menu_action_account_payments_transfer: {
            action: 'account.action_account_payments_transfer',
            name: 'Internal Transfers'
          },
          menu_action_bank_statement_tree: {
            action: 'account.action_bank_statement_tree',
            name: 'Bank Statements'
          },
          menu_action_view_bank_statement_tree: {
            action: 'account.action_view_bank_statement_tree',
            name: 'Cash Registers'
          }
        }
      }
    }
  }
}
