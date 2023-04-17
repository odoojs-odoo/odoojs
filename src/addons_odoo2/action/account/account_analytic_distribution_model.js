export default {
  menu_finance: {
    _odoo_model: 'ir.ui.menu',
    name: '开票',

    sequence: 55,
    children: {
      menu_finance_receivables: {
        name: '客户',
        sequence: 2,
        children: {
          menu_action_move_out_invoice_type: {
            action: 'action_move_out_invoice_type',
            name: '销售凭单',
            sequence: 1
          },

          menu_action_move_out_refund_type: {
            // todo
            action: 'action_move_out_refund_type',
            name: '销售红票',
            active: false,
            sequence: 2
          },

          menu_action_account_payments_receivable: {
            action: 'action_account_payments',
            name: '收款',
            sequence: 15
          },

          product_product_menu_sellable: {
            action: 'product_product_action_sellable',
            name: '产品',
            sequence: 100
          },

          menu_account_customer: {
            action: 'res_partner_action_customer',
            name: '客户',
            sequence: 110
          }
        }
      },

      menu_finance_payables: {
        name: '供应商',
        sequence: 3,
        children: {
          menu_action_move_in_invoice_type: {
            action: 'action_move_in_invoice_type',
            name: '采购账单',
            sequence: 1
          },

          menu_action_move_in_refund_type: {
            action: 'action_move_in_refund_type',
            name: '采购红票',
            // todo
            active: false,
            sequence: 2
          },

          menu_action_account_payments_payable: {
            action: 'action_account_payments_payable',
            name: '付款',
            sequence: 20
          },

          product_product_menu_purchasable: {
            action: 'product_product_action_purchasable',
            name: '产品',
            sequence: 100
          },

          menu_account_supplier: {
            action: 'res_partner_action_supplier',
            name: '供应商',
            sequence: 200
          }
        }
      },

      menu_finance_entries: {
        name: '会计',
        sequence: 4,
        children: {
          menu_finance_entries_accounting_miscellaneous: {
            name: '杂项',
            sequence: 1,
            children: {
              menu_action_move_journal_line_form: {
                action: 'action_move_journal_line',
                name: '日记账分录',
                sequence: 1
              },
              menu_action_account_moves_all: {
                action: 'action_account_moves_all',
                name: '日记账项目',
                sequence: 10
              }
            }
          }
        }
      },

      menu_finance_configuration: {
        name: '配置',
        sequence: 35,
        children: {
          account_invoicing_menu: {
            name: '开票',
            sequence: 1,
            children: {
              menu_action_payment_term_form: {
                name: '付款条款',
                action: 'action_payment_term_form',
                sequence: 1
              },

              menu_action_incoterm_open: {
                name: '国际贸易术语',
                action: 'action_incoterms_tree',
                sequence: 3
              }
            }
          },

          account_banks_menu: {
            name: '银行',
            sequence: 2,
            active: false,
            children: {
              menu_action_account_bank_journal_form: {
                name: '添加银行账户',
                action: 'praction_new_bank_setting',
                sequence: 1
              },
              action_account_reconcile_model_menu: {
                name: '核销模型',
                action: 'action_account_reconcile_model',
                sequence: 3
              }
            }
          },

          account_account_menu: {
            name: '会计',
            sequence: 3,
            children: {
              menu_action_account_form: {
                name: '会计科目',
                action: 'action_account_form',
                sequence: 1
              },
              menu_action_tax_form: {
                name: '税',
                action: 'action_tax_form',
                sequence: 2
              },
              menu_action_account_journal_form: {
                name: '日记账',
                action: 'action_account_journal_form',
                sequence: 3
              },
              account_report_folder: {
                name: '报表',
                active: false,
                sequence: 4
              },
              menu_action_currency_form: {
                name: '币种',
                action: 'base.action_currency_form',
                sequence: 4
              },
              menu_action_account_fiscal_position_form: {
                name: '财务状况',
                action: 'action_account_fiscal_position_form',
                sequence: 5
              },
              menu_action_account_journal_group_list: {
                name: '日记账组',
                action: 'action_account_journal_group_list',
                sequence: 7
              },
              menu_action_tax_group: {
                name: '税组',
                action: 'action_tax_group',
                sequence: 7
              }
            }
          },

          root_payment_menu: {
            name: '支付',
            sequence: 4,
            active: false,
            children: {}
          },

          account_management_menu: {
            name: '管理',
            sequence: 5,
            children: {
              menu_product_product_categories: {
                name: '产品类别',
                action: 'product.product_category_action_form',
                sequence: 3
              },
              menu_action_rounding_form_view: {
                name: '现金舍入',
                action: 'rounding_list_action',
                active: false,
                sequence: 4
              },
              menu_configure_tax_report: {
                name: '税报表',
                action: 'action_configure_tax_report',
                active: false,
                sequence: 5
              },
              menu_action_analytic_lines_tree: {
                name: '分析项目',
                action: 'account_analytic_line_action_entries',
                active: false,
                sequence: 35
              }
            }
          },

          menu_analytic_accounting: {
            name: '分析科目',
            sequence: 6,
            children: {
              account_analytic_def_account: {
                name: '分析科目',
                action: 'analytic.action_account_analytic_account_form',
                sequence: 1
              },
              account_analytic_group_menu: {
                name: '分析科目组',
                action: 'analytic.account_analytic_group_action',
                sequence: 2
              },
              account_analytic_tag_menu: {
                name: '分析科目标签',
                action: 'analytic.account_analytic_tag_action',
                sequence: 3
              }
            }
          }
        }
      }
    }
  }
}
