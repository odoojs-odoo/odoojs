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
  view_move_line_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },
    fields: {
      date: {},
      company_id: {},
      journal_id: {},
      move_id: {},
      account_id: {},
      ref: {},
      name: {},
      analytic_account_id: {},
      analytic_tag_ids: {},
      tax_ids: {},
      debit: {},
      credit: {},
      // amount_currency: {},
      // currency_id: {},
      // tax_tag_ids: {},
      // matching_number: {},
      date_maturity: {}
      // parent_state: {}
    }
  },

  view_move_line_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },

    fields: {
      company_id: { invisible: 1 },
      parent_state: { invisible: 1 },
      name: {},
      partner_id: {},
      account_id: {},
      debit: {},
      credit: {},
      quantity: {},
      move_id: {},
      statement_id: {},
      date: {},
      date_maturity: {},
      tax_line_id: {},
      tax_ids: {},
      tax_tag_invert: {},
      tax_audit: {},

      full_reconcile_id: {},
      amount_currency: {},
      product_id: {},
      blocked: {},
      analytic_account_id: {},
      analytic_tag_ids: {},
      analytic_line_ids: {}
    }
  },

  action_account_moves_all: {
    _odoo_model: 'ir.actions',
    name: '日记账项目',
    type: 'ir.actions.act_window',
    res_model: 'account.move.line',
    domain: [
      ['display_type', 'not in', ['line_section', 'line_note']],
      ['parent_state', '!=', 'cancel']
    ],

    context: { journal_type: 'general', search_default_posted: 1 }

    // views: {
    //   tree: 'view_move_tree',
    //   from: 'view_move_form'
    // }
  },

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
        invoice_user_id: { string: '销售员', domain: [['share', '=', false]] }
      },
      filters: {
        group_me: {
          myinvoices: {
            string: '我的发票',
            domain: ({ env }) => {
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
  //

  view_out_invoice_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'tree',
    fields: {
      date: {},
      name: {},
      partner_id: {},
      ref: {},
      journal_id: {},
      company_id: {},
      amount_total_signed: {},
      state: {}
    }
  },

  // 1400

  action_move_out_invoice_type: {
    _odoo_model: 'ir.actions',
    name: '销售凭单',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    search_view_id: 'view_account_invoice_filter',
    domain: [['move_type', '=', 'out_invoice']],
    context: { default_move_type: 'out_invoice' },
    views: {
      tree: 'view_out_invoice_tree'
    }
  },

  action_move_out_refund_type: {
    _odoo_model: 'ir.actions',
    name: '销售红单',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    domain: [['move_type', '=', 'out_refund']],
    context: { default_move_type: 'out_refund' },
    views: {
      tree: 'view_out_invoice_tree',
      form: 'view_out_invoice_form'
    }
  },

  action_move_in_invoice_type: {
    _odoo_model: 'ir.actions',
    name: '采购账单',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    domain: [['move_type', '=', 'in_invoice']],
    context: { default_move_type: 'in_invoice' },
    views: {
      tree: 'view_out_invoice_tree',
      form: 'view_out_invoice_form'
    }
  },

  action_move_in_refund_type: {
    _odoo_model: 'ir.actions',
    name: '采购红单',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    domain: [['move_type', '=', 'in_refund']],
    context: { default_move_type: 'in_refund' },
    views: {
      tree: 'view_out_invoice_tree',
      form: 'view_out_invoice_form'
    }
  }
}
