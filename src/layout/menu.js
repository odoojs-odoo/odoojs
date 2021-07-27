export const menus = [
  {
    name: 'tutorial',
    title: '自定义菜单',
    icon: 'ios-school',
    children: [
      {
        name: 'baseRes',
        title: '基础数据',
        icon: 'ios-contacts',

        children: [
          { name: 'base.action_country', title: '国家/地区', readonly: true },
          { name: 'base.action_partner_category_form', title: '业务伙伴类别' },
          { name: 'contacts.action_contacts', title: '业务伙伴' }

          // { name: 'resBank', title: '银行' },
          // { name: 'resPartnerBank', title: '银行账号' },
          // { name: 'resPartnerTitle', title: '头衔' },
          // { name: 'resPartnerIndustry', title: '行业类型' },
          // { name: 'resCountryState', title: '州/省' }
        ]
      },
      {
        name: 'page_account',
        title: '财务',
        icon: 'ios-settings',

        children: [
          { name: 'page.accountReport', title: '财务报表', icon: 'ios-stats' },
          {
            name: 'accountCash',
            title: '出纳',
            icon: 'ios-cash',
            children: [
              { name: 'account.action_account_payments', title: '收款' },
              {
                name: 'account.action_account_payments_payable',
                title: '付款'
              },
              {
                name: 'account.action_account_payments_transfer',
                title: '内部转账'
              }
            ]
          },
          {
            name: 'accountBase',
            title: '财务处理',
            icon: 'ios-settings',
            children: [
              { name: 'account.action_account_form', title: '科目' },
              {
                name: 'page.accountMoveOpen',
                title: '期初设置',
                icon: 'ios-settings'
              },
              { name: 'account.action_move_journal_line', title: '会计凭证' },
              {
                name: 'account.action_move_out_invoice_type',
                title: '销售账单'
              }
              // { name: 'accountMoveInInvoice', title: '采购账单' },
              // { name: 'accountJournal', title: '凭证类型' },
              // { name: 'accountAnalyticAccount', title: '核算项目' },
            ]
          },

          {
            name: 'accountAccounting',
            title: '财务查询',
            icon: 'md-card',

            children: [
              { name: 'account.action_account_moves_all', title: '会计分录' }
            ]
          }
        ]
      },

      {
        name: 'sale',
        title: '销售',
        icon: 'ios-pricetags',
        children: [
          { name: 'sale.action_quotations_with_onboarding', title: '报价单' },
          { name: 'sale.action_orders', title: '销售订单' }
        ]
      },

      // { name: 'accountSetting', title: '基础数据', icon: 'ios-contacts' }
      {
        name: 'purchase',
        title: '采购',
        icon: 'md-cart',
        children: [
          { name: 'purchase.purchase_rfq', title: '询价单' },
          { name: 'purchase.purchase_form_action', title: '采购订单' }
          //     { name: 'resPartnerCompany', title: '供应商' },
          //     { name: 'productTemplate', title: '产品' }
        ]
      }

      // {
      //   name: 'stock',
      //   title: '库存',
      //   icon: 'ios-cube',
      //   children: [
      //     //     { name: 'stockPicking', title: '入库单' },
      //     //     { name: 'productTemplate', title: '产品' }
      //   ]
      // },

      // {
      //   name: 'hr',
      //   title: 'HR',
      //   icon: 'ios-contacts',
      //   children: [
      //     //     { name: 'hrEmployee', title: '员工' },
      //     //     { name: 'hrDepartment', title: '部门' },
      //     //     { name: 'hrJob', title: '职位' }
      //   ]
      // },

      // {
      //   name: 'hrExpense',
      //   title: '费用报销',
      //   icon: 'ios-briefcase',
      //   children: [
      //     //     { name: 'hrExpense', title: '费用明细' },
      //     //     { name: 'hrExpenseSheet', title: '费用报表' },
      //     //     { name: 'productProductExpense', title: '费用项目' }
      //   ]
      // },

      // {
      //   name: 'tutorial22222',
      //   title: '测试菜单2',
      //   icon: 'ios-school',
      //   children: [
      //     // { name: 'account.action_move_journal_line', title: '会计凭证' },
      //   ]
      // }
    ]
  }
]
