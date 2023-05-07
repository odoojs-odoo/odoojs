export default {
  menu_account: {
    name: '财务管理',
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
        name: '财务配置',
        children: {
          menu_action_account_journal_form: { name: '日记账' },
          menu_action_account_form: { name: '科目表' }
        }
      },

      menu_account_move_master: {
        name: '主数据',
        children: {}
      },
      menu_action_account_moves_all: { name: '日记账本明细' },

      menu_account_move: {
        name: '会计业务',
        children: {
          menu_action_move_journal_line: { name: '分录' },
          menu_action_move_out_invoice_type: { name: '销项凭据' },
          menu_action_move_in_invoice_type: { name: '进项账单' }
        }
      },

      menu_account_payment: {
        name: '收付款',
        children: {
          menu_action_account_payments: { name: '销售收款' },
          menu_action_account_payments_payable: { name: '采购付款' },
          menu_action_account_payments_transfer: { name: '内部转账' },
          menu_action_bank_statement_tree: { name: '银行对账单' },
          menu_action_view_bank_statement_tree: { name: '现金对账单' }
        }
      }
    }
  }
}
