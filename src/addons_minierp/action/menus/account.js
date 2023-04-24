export default {
  menu_account: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Finance',
    sequence: 30,
    children: {
      menu_analytic_setting: {
        name: 'Analytic Config',
        children: {
          // menu_action_analytic_distribution_model: {
          //   name: 'Analytic Distribution Models',
          //   action: 'analytic.action_analytic_distribution_model'
          // },
          // menu_action_account_analytic_account_form: {
          //   name: 'Analytic Accounts',
          //   action: 'analytic.action_account_analytic_account_form'
          // },
          // menu_account_analytic_plan_action: {
          //   name: 'Analytic Plan',
          //   action: 'analytic.account_analytic_plan_action'
          // }
        }
      },

      menu_account_setting: {
        name: 'Finance Config',
        children: {
          // menu_action_incoterms_tree: {
          //   name: 'Incoterms',
          //   action: 'account.action_incoterms_tree'
          // },
          // menu_action_account_tax_template_form: {
          //   name: 'Tax Templates',
          //   action: 'account.action_account_tax_template_form'
          // },

          // menu_action_tax_group: {
          //   name: 'Tax Groups',
          //   action: 'account.action_tax_group'
          // },
          // menu_action_tax_form: {
          //   name: 'Taxes',
          //   action: 'account.action_tax_form'
          // },

          // menu_action_account_journal_group_list: {
          //   name: 'Journal Groups',
          //   action: 'account.action_account_journal_group_list'
          // },
          menu_action_account_journal_form: {
            name: 'Journals',
            action: 'account.action_account_journal_form'
          },
          // menu_action_account_account_tag: {
          //   name: 'Account Tags',
          //   action: 'account.action_account_account_tag'
          // },
          // menu_action_account_group_action: {
          //   name: 'Account Groups',
          //   action: 'account.action_account_group_action'
          // },
          menu_action_account_form: {
            name: 'Chart of Accounts',
            action: 'account.action_account_form'
          }
          // menu_action_account_fiscal_position_template: {
          //   name: 'Fiscal Position Templates',
          //   action: 'account.action_account_fiscal_position_template'
          // },
          // menu_action_account_fiscal_position_form: {
          //   name: 'Fiscal Positions',
          //   action: 'account.action_account_fiscal_position_form'
          // },
          // menu_action_payment_term_form: {
          //   name: 'Payment Terms',
          //   action: 'account.action_payment_term_form'
          // }
        }
      },

      menu_account_move_master: {
        name: 'Master Data',
        children: {
          // res_partner_action_customer: {
          //   action: 'account.res_partner_action_customer',
          //   name: 'Customers'
          // },
          // res_partner_action_supplier: {
          //   action: 'account.res_partner_action_supplier',
          //   name: 'Vendors'
          // },
          // product_product_action_sellable: {
          //   action: 'account.product_product_action_sellable',
          //   name: 'Products(Sold)'
          // },
          // product_product_action_purchasable: {
          //   action: 'account.product_product_action_purchasable',
          //   name: 'Products(Purchased)'
          // }
        }
      },

      menu_action_account_moves_all: {
        action: 'account.action_account_moves_all',
        name: 'Journal Items'
      },

      // menu_account_analytic_line_action_entries: {
      //   action: 'analytic.account_analytic_line_action_entries',
      //   name: 'Analytic Items'
      // },

      menu_account_move: {
        name: 'Accounting',
        children: {
          menu_action_move_journal_line: {
            action: '_account.action_move_journal_line',
            name: 'Journal Entries'
          },
          menu_action_move_out_invoice_type: {
            action: '_account.action_move_out_invoice_type',
            name: 'Invoices'
          },
          menu_action_move_in_invoice_type: {
            action: '_account.action_move_in_invoice_type',
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
