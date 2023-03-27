export default {
  id: 'odoo.account_move_root',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Account Move', zh_CN: '财务', zh_HK: '财务' },
  children: [
    {
      id: 'odoo.account_move_master',
      icon: 'shopping',
      theme: 'twoTone',
      name: { en_US: 'Master Data', zh_CN: '主数据', zh_HK: '主数据' },
      children: [
        {
          action: 'account.res_partner_action_customer',
          id: 'odoo_account.res_partner_action_customer',
          icon: 'shopping',
          name: { en_US: 'Customers', zh_CN: '客户', zh_HK: '客户' }
        },
        {
          action: 'account.res_partner_action_supplier',
          id: 'odoo_account.res_partner_action_supplier',
          icon: 'shopping',
          name: { en_US: 'Vendors', zh_CN: '供应商', zh_HK: '供应商' }
        },

        {
          action: 'account.product_product_action_sellable',
          id: 'odoo_account.product_product_action_sellable',
          icon: 'shopping',
          name: {
            en_US: 'Products(Sold)',
            zh_CN: '产品(可销售)',
            zh_HK: '产品(可销售)'
          }
        },
        {
          action: 'account.product_product_action_purchasable',
          id: 'odoo_account.product_product_action_purchasable',
          icon: 'shopping',
          name: {
            en_US: 'Products(Purchased)',
            zh_CN: '产品(可采购)',
            zh_HK: '产品(可采购)'
          }
        }
      ]
    },

    {
      action: 'account.action_account_moves_all',
      id: 'odoo_account.action_account_moves_all',
      icon: 'shopping',
      name: { en_US: 'Journal Items', zh_CN: '会计分录', zh_HK: '会计分录' }
    },
    {
      action: 'account.account_analytic_line_action_entries',
      id: 'odoo_account.account_analytic_line_action_entries',
      icon: 'shopping',
      name: { en_US: 'Analytic Items', zh_CN: '分析明细', zh_HK: '分析明细' }
    },
    {
      id: 'odoo.account_move',
      icon: 'shopping',
      theme: 'twoTone',
      name: { en_US: 'Account Move', zh_CN: '会计记账', zh_HK: '会计记账' },
      children: [
        {
          action: 'account.action_move_journal_line',
          id: 'odoo_account.action_move_journal_line',
          icon: 'shopping',
          name: {
            en_US: 'Journal Entries',
            zh_CN: '会计凭证',
            zh_HK: '会计凭证'
          }
        },

        {
          action: 'account.action_move_out_invoice_type',
          id: 'odoo_account.action_move_out_invoice_type',
          icon: 'shopping',
          name: { en_US: 'Invoices', zh_CN: '销售结单', zh_HK: '销售结单' }
        },

        {
          action: 'account.action_move_in_invoice_type',
          id: 'odoo_account.action_move_in_invoice_type',
          icon: 'shopping',
          name: { en_US: 'Bills', zh_CN: '采购账单', zh_HK: '采购账单' }
        }
      ]
    },

    {
      id: 'odoo.account_payment',
      icon: 'shopping',
      theme: 'twoTone',
      name: { en_US: 'Payments', zh_CN: '出纳收付', zh_HK: '出纳收付' },
      children: [
        {
          action: 'account.action_account_payments',
          id: 'odoo_account.action_account_payments',
          icon: 'shopping',
          name: { en_US: 'Payments In', zh_CN: '收款/退款', zh_HK: '收款/退款' }
        },
        {
          action: 'account.action_account_payments_payable',
          id: 'odoo_account.action_account_payments_payable',
          icon: 'shopping',
          name: {
            en_US: 'Payments Out',
            zh_CN: '支付/退款',
            zh_HK: '支付/退款'
          }
        },
        {
          action: 'account.action_account_payments_transfer',
          id: 'odoo_account.action_account_payments_transfer',
          icon: 'shopping',
          name: {
            en_US: 'Internal Transfers',
            zh_CN: '内部转账',
            zh_HK: '内部转账'
          }
        }
      ]
    }
  ]
}
