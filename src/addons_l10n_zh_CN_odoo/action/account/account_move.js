const view_move_form_sheet = {
  _widget_web_ribbon_in_payment: {
    _attr: { title: '支付中' }
  },
  _group: {
    _group_header_left_group: {
      _field_partner_id: {
        _label_customer: { string: '客户' },
        _label_vendor: { string: '供应商' }
      }
    },

    _group_header_right_group: {
      _field_invoice_date: {
        _label_invoice: { string: '开票日期' },
        _label_bill: { string: '账单日期' }
      }
    }
  },

  _notebook: {
    _page_invoice_tab: {
      _attr: { string: '明细' }
    },

    _page_aml_tab: {
      _attr: { string: '日记账分录' }
    },

    _page_other_tab: {
      _attr: { string: '其他信息' }
    },

    _page_other_tab_entry: {
      _attr: { string: '其他信息' }
    }
  }
}

export default {
  view_move_form: {
    arch: {
      header: {
        buttons: {
          action_post: { string: '过账' },
          action_post2: { string: '确认' },
          action_invoice_sent: { string: '发送和打印' },
          action_invoice_sent2: { string: '发送和打印' },
          action_register_payment: { string: '注册支付' },
          preview_invoice: { string: '预览' },
          action_view_account_move_reversal: { string: '反转分录' },
          action_reverse: { string: '开红单' },
          button_cancel: { string: '取消分录' },
          button_cancel2: { string: '取消' },
          button_draft: { string: '重置为草稿' },
          button_set_checked: { string: '置为已检查' }
        }
      },

      sheet: { ...view_move_form_sheet }
    }
  }
}
