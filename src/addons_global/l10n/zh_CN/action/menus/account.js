export default {
  menu_account: {
    name: '财务管理',
    children: {
      menu_account_move_master: {
        name: '主数据',
        children: {
          res_partner_action_customer: { name: '客户' },
          res_partner_action_supplier: { name: '供应商' },
          product_product_action_sellable: { name: '产品(可销售)' },
          product_product_action_purchasable: { name: '产品(可采购)' }
        }
      },
      menu_action_account_moves_all: { name: '日记账本明细' },
      menu_account_analytic_line_action_entries: { name: '分析明细' },
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
