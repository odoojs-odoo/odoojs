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

  view_move_tree: {
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

  view_move_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'form',
    toolbar: {
      action: {
        // 在数据库中 找到 所有绑定到该模型的 action
        // select * from ir_actions where binding_model_id = ?
        // model_account_move
        //
        //
        // action_invoice_order_generate_link
      },
      print: {
        // odoo 原生是 report kanban
        // 需要 前端自定义
      }
    },

    arch: {
      header: {
        buttons: [
          // Post
          {
            name: 'action_post',
            string: '过账',
            type: 'object',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state, auto_post, move_type } = record
              return state !== 'draft' || auto_post || move_type !== 'entry'
            }
          },
          {
            name: 'action_post',
            string: '确认',
            type: 'object',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const {
                state,
                auto_post,
                move_type,
                display_inactive_currency_warning
              } = record
              return (
                state !== 'draft' ||
                auto_post ||
                move_type === 'entry' ||
                display_inactive_currency_warning
              )
            }
          },

          // Send (only invoices)
          {
            name: 'action_invoice_sent',
            string: '发送和打印',
            type: 'object',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state, is_move_sent, move_type } = record
              return (
                state !== 'posted' ||
                is_move_sent ||
                !['out_invoice', 'out_refund'].includes(move_type)
              )
            }
          },

          {
            name: 'action_invoice_sent',
            string: '发送和打印',
            type: 'object',
            invisible: ({ record }) => {
              const { state, is_move_sent, move_type } = record
              return (
                state !== 'posted' ||
                !is_move_sent ||
                ![
                  'out_invoice',
                  'out_refund',
                  'in_invoice',
                  'in_refund'
                ].includes(move_type)
              )
            }
          },

          // Register Payment (only invoices / receipts)
          {
            name: 'action_register_payment',
            string: '登记付款',
            type: 'object',
            btn_type: 'primary',
            context: { dont_redirect_to_payments: true },
            invisible: ({ record }) => {
              const { state, payment_state, move_type } = record
              return (
                state !== 'posted' ||
                !['not_paid', 'partial'].includes(payment_state) ||
                ![
                  'out_invoice',
                  'out_refund',
                  'in_invoice',
                  'in_refund',
                  'out_receipt',
                  'in_receipt'
                ].includes(move_type)
              )
            }
          },
          // Preview (only customer invoices)
          {
            name: 'preview_invoice',
            string: '预览',
            type: 'object',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { move_type } = record
              return !['out_invoice', 'out_refund'].includes(move_type)
            }
          },

          // Reverse

          {
            name: 'action_view_account_move_reversal',
            string: '冲红',
            type: 'action',
            invisible: ({ record }) => {
              const { move_type, state, payment_state } = record
              return (
                move_type !== 'entry' ||
                state !== 'posted' ||
                payment_state === 'reversed'
              )
            }
          },

          {
            name: 'action_reverse',
            string: '反转',
            type: 'object',
            invisible: ({ record }) => {
              const { move_type, state } = record
              return (
                !['out_invoice', 'in_invoice'].includes(move_type) ||
                state !== 'posted'
              )
            }
          },

          // Cancel
          {
            name: 'button_cancel',
            string: '取消分录',
            type: 'object',
            invisible: ({ record }) => {
              const { id: res_id, state, move_type } = record
              return !res_id || state !== 'draft' || move_type !== 'entry'
            }
          },
          {
            name: 'button_cancel',
            string: '取消',
            type: 'object',
            invisible: ({ record }) => {
              const { id: res_id, state, move_type } = record
              return !res_id || state !== 'draft' || move_type === 'entry'
            }
          },
          {
            name: 'button_draft',
            string: '重置为草稿',
            type: 'object',
            invisible: ({ record }) => {
              const { show_reset_to_draft_button } = record
              return !show_reset_to_draft_button
            }
          },

          //   Set as Checked
          {
            name: 'button_set_checked',
            string: '置为已检查',
            type: 'object',
            invisible: ({ record }) => {
              const { to_check } = record
              return !to_check
            }
          }
        ],
        fields: {
          state: { widget: 'statusbar', statusbar_visible: 'draft,posted' }
        }
      }
    },
    fields: {
      show_name_warning: { invisible: 1 },
      posted_before: { invisible: 1 },

      payment_state: {
        //  invisible: 1
      },
      invoice_filter_type_domain: { invisible: 1 },
      suitable_journal_ids: { invisible: 1 },
      company_currency_id: { invisible: 1 },
      commercial_partner_id: { invisible: 1 },
      bank_partner_id: { invisible: 1 },
      display_qr_code: { invisible: 1 },
      show_reset_to_draft_button: { invisible: 1 },

      invoice_has_outstanding: { invisible: 1 },
      is_move_sent: { invisible: 1 },
      invoice_has_matching_suspense_amount: { invisible: 1 },
      has_reconciled_entries: { invisible: 1 },
      restrict_mode_hash_table: { invisible: 1 },
      country_code: { invisible: 1 },
      display_inactive_currency_warning: { invisible: 1 },
      statement_id: { invisible: 1 },
      payment_id: { invisible: 1 },
      tax_country_id: { invisible: 1 },
      tax_cash_basis_created_move_ids: { invisible: 1 },

      move_type: {},

      state: { invisible: 1 },
      // auto_post: { invisible: 1 },

      name: {
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        }
      },

      partner_id: {},
      ref: {},
      tax_cash_basis_origin_move_id: {},
      payment_reference: {},
      partner_bank_id: {
        context: ({ record }) => {
          const { bank_partner_id } = record
          return { default_partner_id: bank_partner_id }
        },

        domain: ({ record }) => {
          const { bank_partner_id } = record
          return [['partner_id', '=', bank_partner_id]]
        },
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'fraft'
        }
      },

      invoice_vendor_bill_id: {
        domain: ({ record }) => {
          const { company_id, partner_id } = record
          return [
            ['company_id', '=', company_id],
            ['partner_id', 'child_of', [partner_id]],
            ['move_type', '=', 'in_invoice']
          ]
        }
      },

      invoice_date: {},

      date: {
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        }
      },

      invoice_date_due: {},
      invoice_payment_term_id: {},

      journal_id: {
        readonly: ({ record }) => {
          const { posted_before } = record
          return posted_before
        }
        // domain: ({ record }) => {
        //   const { suitable_journal_ids } = record
        //   return [['id', 'in', suitable_journal_ids]]
        // }
      },
      currency_id: {
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        }
      },

      company_id: {},

      invoice_line_ids: {
        widget: 'x2many_tree',
        invisible: ({ record }) => {
          const { move_type } = record
          return move_type === 'entry'
        },

        context: ({ record }) => {
          const {
            context,
            journal_id,
            commercial_partner_id,
            currency_id,
            company_currency_id
          } = record

          return {
            default_move_type: context.default_move_type,
            journal_id,
            default_partner_id: commercial_partner_id,
            default_currency_id: currency_id || company_currency_id
          }
        },

        views: {
          tree: {
            fields: {
              sequence: {},
              product_id: {},
              name: {},
              account_id: {},
              analytic_account_id: {},
              analytic_tag_ids: {},
              quantity: {},
              product_uom_id: {},
              price_unit: {},
              discount: {},
              tax_ids: { widget: 'many2many_tags' },
              price_subtotal: {},
              price_total: {}
            }
          },
          form: {
            fields: {
              product_uom_category_id: { invisible: 1 },
              display_type: { invisible: 1 },
              parent_state: { invisible: 1 },

              partner_id: { invisible: 1 },
              company_id: { invisible: 1 },
              debit: { invisible: 1 },
              credit: { invisible: 1 },

              product_id: {},
              quantity: {},

              product_uom_id: {},
              price_unit: {},
              discount: {},
              currency_id: { invisible: 1 },
              analytic_tag_ids: { widget: 'many2many_tags' },
              account_id: {
                readonly2: '1',
                domain: ({ record }) => {
                  const { company_id } = record
                  return [['company_id', '=', company_id]]
                }
              },

              tax_ids: { widget: 'many2many_tags' },
              analytic_account_id: {},
              name: {},

              price_subtotal: {},
              price_total: {},

              sequence: {}
            }
          }
        }
      },

      narration: {},
      tax_totals_json: {},
      invoice_payments_widget: {},
      amount_residual: {},
      invoice_outstanding_credits_debits_widget: {},

      line_ids: {
        invisible: ({ record }) => {
          console.log(record)
          const { payment_state, move_type } = record
          return payment_state === 'invoicing_legacy' && move_type !== 'entry'
        },

        context: ({ record }) => {
          const {
            context,
            line_ids,
            journal_id,
            commercial_partner_id,
            currency_id,
            company_currency_id
          } = record

          // context="{'default_move_type': context.get('default_move_type'),
          // 'line_ids': line_ids, 'journal_id': journal_id,
          // 'default_partner_id': commercial_partner_id,
          // 'default_currency_id': currency_id or company_currency_id
          // }"
          return {
            default_move_type: context.default_move_type,
            line_ids,
            journal_id,
            default_partner_id: commercial_partner_id,
            default_currency_id: currency_id || company_currency_id
          }
        },

        widget: 'x2many_tree',
        views: {
          tree: {
            fields: {
              sequence: {},
              account_id: {},
              partner_id: {},
              name: {},
              analytic_account_id: {},
              analytic_tag_ids: {},
              date_maturity: {},
              amount_currency: {},
              currency_id: {},
              tax_ids: { widget: 'many2many_tags' },
              debit: {},
              credit: {},
              tax_tag_ids: { widget: 'many2many_tags' },
              tax_tag_invert: {}
            }
          },
          form: {
            fields: {
              group_tax_id: { invisible: 1 },
              tax_line_id: { invisible: 1 },
              account_id: {
                domain: ({ record }) => {
                  const { parent } = record
                  return [
                    ['company_id', '=', parent.company_id],
                    ['deprecated', '=', false]
                  ]
                }
              },
              partner_id: {
                domain: () => {
                  return [
                    '|',
                    ['parent_id', '=', false],
                    ['is_company', '=', true]
                  ]
                }
              },
              name: {},

              analytic_account_id: {},
              analytic_tag_ids: { widget: 'many2many_tags' },
              amount_currency: {},
              company_currency_id: { invisible: 1 },
              company_id: { invisible: 1 },
              currency_id: {},

              debit: {},
              credit: {},
              tax_ids: { widget: 'many2many_tags' },

              date_maturity: {},

              recompute_tax_line: { invisible: 1 },

              sequence: {}
            }
          }
        }
      },

      // 'invisible': [('move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund'))]

      user_id: {},
      invoice_user_id: {
        domain: [['share', '=', false]]
      },
      invoice_origin: {},
      qr_code_method: {},

      //
      // 'invisible': [('move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund'))]}">
      invoice_incoterm_id: {},
      fiscal_position_id: {},
      invoice_cash_rounding_id: {},
      invoice_source_email: {},
      auto_post: {
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        }
      },
      to_check: {},

      reversed_entry_id: {}

      //
    }
  },

  view_account_move_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: '分录',
          filter_domain: self => {
            return [
              '|',
              '|',
              ['name', 'ilike', self],
              ['ref', 'ilike', self],
              ['partner_id', 'ilike', self]
            ]
          }
        },
        partner_id: {},
        journal_id: {}
      },
      filters: {
        group1: {
          __title: '过账状态',
          unposted: { string: '未过账', domain: [['state', '=', 'draft']] },
          posted: { string: '已过账', domain: [['state', '=', 'posted']] }
        },
        group2: {
          __title: '支付状态',
          reversed: {
            string: '保留',
            domain: [['payment_state', '=', 'reversed']]
          }
        },
        group3: {
          __title: '检查',
          to_check: { string: '检查', domain: [['to_check', '=', true]] }
        },
        group4: {
          __title: '日记账类型',
          sales: {
            string: '销售',
            domain: [['journal_id.type', '=', 'sale']],
            context: { default_journal_type: 'sale' }
          },
          purchases: {
            string: '采购',
            domain: [['journal_id.type', '=', 'purchase']],
            context: { default_journal_type: 'purchase' }
          },
          bankoperations: {
            string: '银行',
            domain: [['journal_id.type', '=', 'bank']],
            context: { default_journal_type: 'bank' }
          },
          cashoperations: {
            string: '现金',
            domain: [['journal_id.type', '=', 'cash']],
            context: { default_journal_type: 'cash' }
          },
          misc_filter: {
            string: '其他',
            domain: [['journal_id.type', '=', 'general']],
            context: { default_journal_type: 'general' }
          }
        },
        group5: {
          date: { string: '日期', date: 'date' }
        }
      }
    }
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
        group1: {
          myinvoices: {
            string: '我的发票',
            domain: ({ env }) => {
              const uid = env.uid
              return [['invoice_user_id', '=', uid]]
            }
          }
        },

        group2: {
          __title: '状态',
          draft: { string: '草稿', domain: [['state', '=', 'draft']] },
          posted: { string: '已过账', domain: [['state', '=', 'posted']] },
          cancel: { string: '已取消', domain: [['state', '=', 'cancel']] }
        },
        group3: {
          __title: '检查',
          to_check: { string: '检查', domain: [['to_check', '=', true]] }
        },
        group4: {
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
        group5: {
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

  action_account_moves_all: {
    _odoo_model: 'ir.actions',
    name: '日记账项目',
    type: 'ir.actions.act_window',
    res_model: 'account.move.line',
    domain: [
      ['display_type', 'not in', ['line_section', 'line_note']],
      ['parent_state', '!=', 'cancel']
    ],

    context: { journal_type: 'general', search_default_posted: 1 },

    views: {
      tree: 'view_move_line_tree'
    }
  },

  action_move_journal_line: {
    _odoo_model: 'ir.actions',
    name: '日记账分录',
    type: 'ir.actions.act_window',
    res_model: 'account.move',

    search_view_id: 'view_account_move_filter',
    domain: [],
    context: {
      default_move_type: 'entry',
      search_default_misc_filter: 1,
      view_no_maturity: true
    },

    views: {
      tree: 'view_move_tree',
      form: 'view_move_form'
    }
  },

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
