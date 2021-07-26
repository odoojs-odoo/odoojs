export const webActions = {
  'page.accountMoveOpen': {
    list: {
      component: () => import('@/views/account_open/OpenList')
    },
    form: {
      component: () => import('@/views/account_open/OpenForm')
    },
    meta: {
      model: 'account.move.line.open'
    }
  },

  'page.accountReport': {
    list: {
      component: () => import('@/views/account_report/ReportList')
    },
    form: {
      component: () => import('@/views/account_report/ReportForm')
    }
  }
}
