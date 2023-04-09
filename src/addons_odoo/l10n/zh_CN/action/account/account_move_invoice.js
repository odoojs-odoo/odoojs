export default {
  view_account_invoice_filter: {
    arch: {
      fields: {
        name: { string: '发票' },
        invoice_user_id: { string: '销售员' }
      },
      filters: {
        group_me: {
          myinvoices: { string: '我的发票' }
        },

        group_state: {
          __title: '状态',
          draft: { string: '草稿' },
          posted: { string: '已过账' },
          cancel: { string: '已取消' }
        },
        group_to_check: {
          __title: '检查',
          to_check: { string: '检查' }
        },
        group_payment: {
          __title: '支付状态',
          open: { string: '待付款' },
          closed: { string: '已付款' },
          late: { string: '逾期' }
        }
      }
    }
  }
}
