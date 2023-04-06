const date_tools = {
  get one_day() {
    return 1000 * 60 * 60 * 24
  },
  format(date) {
    const year = date.getFullYear().toString().padStart(4, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const today_str = `${year}-${month}-${day}`
    return today_str
  },
  increase(date, num = 1) {
    return this.format(new Date(new Date(date).getTime() + this.one_day * num))
  },

  get today() {
    const today = new Date()
    return this.format(today)
  }
}

export default {
  view_account_invoice_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: '发票',
          filter_domain: self => {
            return [
              '|',
              '|',
              '|',
              '|',
              ['name', 'ilike', self],
              ['invoice_origin', 'ilike', self],
              ['ref', 'ilike', self],
              ['payment_reference', 'ilike', self],
              ['partner_id', 'ilike', self]
            ]
          }
        },
        journal_id: {},
        partner_id: { operator: 'child_of' },
        invoice_user_id: {
          string: '销售员',
          domain: [['share', '=', false]]
        }
        // date
        // line_ids
      },
      filters: {
        group_me: {
          myinvoices: {
            string: '我的发票',
            domain: ({ env }) => {
              // domain="[('invoice_user_id', '=', uid)]"
              const uid = env.uid
              return [['invoice_user_id', '=', uid]]
            }
          }
        },

        group_state: {
          __title: '状态',
          draft: { string: '草稿', domain: [['state', '=', 'draft']] },
          posted: { string: '已过账', domain: [['state', '=', 'posted']] },
          cancel: { string: '已取消', domain: [['state', '=', 'cancel']] }
        },
        group_to_check: {
          __title: '检查',
          to_check: { string: '检查', domain: [['to_check', '=', true]] }
        },
        group_payment: {
          __title: '支付状态',
          open: {
            string: '待付款',
            domain: [
              ['state', '=', 'posted'],
              ['payment_state', 'in', ['not_paid', 'partial']]
            ]
          },
          closed: {
            string: '已付款',
            domain: [
              ['state', '=', 'posted'],
              ['payment_state', 'in', ['in_payment', 'paid']]
            ]
          },
          late: {
            string: '逾期',
            domain: () => {
              return [
                ['invoice_date_due', '<', date_tools.today],
                ['state', '=', 'posted'],
                ['payment_state', 'in', ['not_paid', 'partial']]
              ]
            }
          }
        },
        group_date: {
          invoice_date: { string: '发票日期', date: 'invoice_date' },
          date: {
            string: '账期',
            date: 'date',
            invisible: ({ context }) => {
              return ['out_invoice', 'out_refund', 'out_receipt'].includes(
                context.default_move_type
              )
            }
          },
          due_date: { string: '到期日期', date: 'invoice_date_due' }
        }
      }
    }
  },

  view_invoice_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'tree',
    fields: {
      made_sequence_hole: { invisible: 1 },
      name: {},
      invoice_partner_display_name: {},
      invoice_date: {},
      // date: { string: 'Accounting Date' },
      invoice_date_due: {
        widget: 'remaining_days'
        // 'invisible': [['payment_state', 'in', ('paid', 'in_payment', 'reversed')]]
      },
      invoice_origin: { string: 'Source Document' },
      // payment_reference: {
      //   invisible({ context }) {
      //     // invisible="context.get('default_move_type') in ('out_invoice', 'out_refund','out_receipt')"
      //     const default_move_type = context.default_move_type
      //     return ['out_invoice', 'out_refund', 'out_receipt'].includes(
      //       default_move_type
      //     )
      //   }
      // },
      // ref: {},
      // invoice_user_id: {
      //   // invisible="context.get('default_move_type') not in ('out_invoice', 'out_refund','out_receipt')"
      //   string: 'Salesperson',
      //   widget: 'many2one_avatar_user'
      // },
      company_id: {},
      amount_untaxed_signed: { string: 'Tax Excluded' },
      amount_tax_signed: { string: 'Tax' },
      amount_total_signed: { string: 'Total' },
      amount_total_in_currency_signed: { string: 'Total in Currency' },
      // amount_residual_signed: {string:"Amount Due"},
      // currency_id: {},
      partner_id: {},
      company_currency_id: { invisible: '1' },
      // to_check: { widget:"boolean_toggle"},
      payment_state: {
        widget: 'badge'
        // decoration-danger="payment_state == 'not_paid'"
        // decoration-warning="payment_state in ('partial', 'in_payment')"
        // decoration-success="payment_state in ('paid', 'reversed')"
        // attrs="{'invisible': [('payment_state', 'in', ('invoicing_legacy'))]}"
      },
      state: {
        widget: 'badge'
        // decoration-success="state == 'posted'"
        // decoration-info="state == 'draft'" optional="show"/>
      }

      // move_type: {
      //   // invisible="context.get('default_move_type', True)"
      // }
    }
  },

  action_move_out_invoice_type: {
    _odoo_model: 'ir.actions',
    name: 'Invoices',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    search_view_id: 'view_account_invoice_filter',
    domain: [['move_type', '=', 'out_invoice']],
    context: { default_move_type: 'out_invoice' },
    views: {
      tree: 'view_invoice_tree',
      form: 'view_move_form'
    }
  },

  action_move_out_refund_type: {
    _odoo_model: 'ir.actions',
    name: 'Credit Notes',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    search_view_id: 'view_account_invoice_filter',
    domain: [['move_type', '=', 'out_refund']],
    context: { default_move_type: 'out_refund' },
    views: {
      // tree: 'view_out_credit_note_tree',
      form: 'view_out_invoice_form'
    }
  },

  action_move_in_invoice_type: {
    _odoo_model: 'ir.actions',
    name: 'Bills',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    search_view_id: 'view_account_invoice_filter',
    domain: [['move_type', '=', 'in_invoice']],
    context: { default_move_type: 'in_invoice' },
    views: {
      tree: 'view_invoice_tree',
      form: 'view_move_form'
    }
  },

  action_move_in_refund_type: {
    _odoo_model: 'ir.actions',
    name: 'Refunds',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    search_view_id: 'view_account_invoice_filter',
    domain: [['move_type', '=', 'in_refund']],
    context: { default_move_type: 'in_refund' },
    views: {
      // tree: 'view_in_invoice_refund_tree',
      form: 'view_move_form'
    }
  },

  action_move_out_receipt_type: {
    _odoo_model: 'ir.actions',
    name: 'Out Receipts',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    search_view_id: 'view_account_invoice_filter',
    domain: [['move_type', '=', 'out_receipt']],
    context: { default_move_type: 'out_receipt' },
    views: {
      // tree: 'view_in_invoice_bill_tree',
      form: 'view_move_form'
    }
  },

  action_move_in_receipt_type: {
    _odoo_model: 'ir.actions',
    name: 'In Receipts',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    search_view_id: 'view_account_invoice_filter',
    domain: [['move_type', '=', 'in_receipt']],
    context: { default_move_type: 'in_receipt' },
    views: {
      // tree: 'view_invoice_tree',
      form: 'view_move_form'
    }
  }
}
