export default {
  view_account_payment_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment',
    type: 'tree',

    fields: {
      date: {},
      name: {},
      journal_id: {},
      payment_method_line_id: {},
      partner_id: {},
      amount_signed: {},
      currency_id: {},
      amount_company_currency_signed: {},
      company_id: {},
      state: {}
    }
  },

  view_account_payment_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment',
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
            string: '确认',
            type: 'object',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft'
            }
          },

          {
            name: 'action_draft',
            string: '重置为草稿',
            type: 'object',
            invisible: ({ record }) => {
              const { state } = record
              return !['posted', 'cancel'].includes(state)
            }
          },

          {
            name: 'action_cancel',
            string: '取消',
            type: 'object',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft'
            }
          },
          {
            name: 'mark_as_sent',
            string: '标记为已发送',
            type: 'object',
            invisible: ({ record }) => {
              const { state, is_move_sent, payment_method_code } = record
              return (
                state !== 'posted' ||
                is_move_sent ||
                payment_method_code !== 'manual'
              )
            }
          },
          {
            name: 'unmark_as_sent',
            string: '取消标记为已发送',
            type: 'object',
            invisible: ({ record }) => {
              const { state, is_move_sent, payment_method_code } = record
              return (
                state !== 'posted' ||
                !is_move_sent ||
                payment_method_code !== 'manual'
              )
            }
          }
        ],
        fields: {
          state: { widget: 'statusbar', statusbar_visible: 'draft,posted' }
        }
      }
    },

    fields: {
      state: { invisible: 1 },

      is_move_sent: { invisible: 1 },
      is_reconciled: { invisible: 1 },
      is_matched: { invisible: 1 },
      payment_method_code: { invisible: 1 },
      show_partner_bank_account: { invisible: 1 },
      require_partner_bank_account: { invisible: 1 },
      hide_payment_method_line: { invisible: 1 },
      available_payment_method_line_ids: { invisible: 1 },
      available_partner_bank_ids: { invisible: 1 },
      suitable_journal_ids: { invisible: 1 },
      country_code: { invisible: 1 },
      partner_type: { invisible: 1 },
      posted_before: { invisible: 1 },
      reconciled_invoices_type: { invisible: 1 },
      company_id: { invisible: 1 },
      paired_internal_transfer_payment_id: { invisible: 1 },

      is_internal_transfer: {
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        }
      },

      payment_type: {
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        }
      },

      partner_id: {
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        }
      },

      amount: {
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        }
      },

      currency_id: {
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        }
      },

      date: {
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        }
      },
      ref: {},

      // name: { readonly2: 1 },

      journal_id: {
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        },

        domain: [['type', 'in', ['bank', 'cash']]]
      },
      payment_method_line_id: {
        required: '1',
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        }
      },

      partner_bank_id: {},
      destination_journal_id: {},

      qr_code: {}
    }
  },

  view_account_payment_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: '付款单',
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
        journal_id: {},
        company_id: {}
        // is_internal_transfer: {}
      },
      filters: {
        group1: {
          inbound_filter: {
            string: '客户付款',
            domain: [
              ['partner_type', '=', 'customer'],
              ['is_internal_transfer', '=', false]
            ]
          },
          outbound_filter: {
            string: '供应商付款',
            domain: [
              ['partner_type', '=', 'supplier'],
              ['is_internal_transfer', '=', false]
            ]
          },
          transfers_filter: {
            string: '内部账户互转',
            domain: [['is_internal_transfer', '=', true]]
          }
        },

        group2: {
          __title: '状态',
          state_draft: { string: '草稿', domain: [['state', '=', 'draft']] },
          state_posted: { string: '已过账', domain: [['state', '=', 'posted']] }
        },
        group3: {
          state_sent: {
            string: '已发送',
            domain: [['is_move_sent', '=', true]]
          },
          matched: {
            string: '银行匹配',
            domain: [['is_matched', '=', true]]
          },
          reconciled: {
            string: '已对账',
            domain: [['is_reconciled', '=', true]]
          }
        },

        group4: {
          date: { string: '付款日期', date: 'date' }
        }
      }
    }
  },

  action_account_payments: {
    _odoo_model: 'ir.actions',
    name: '收款',
    type: 'ir.actions.act_window',
    res_model: 'account.payment',
    domain: [],
    context: {
      default_payment_type: 'inbound',
      default_partner_type: 'customer',
      search_default_inbound_filter: 1,
      default_move_journal_types: ['bank', 'cash']
    }
  },

  action_account_payments_payable: {
    _odoo_model: 'ir.actions',
    name: '付款',
    type: 'ir.actions.act_window',
    res_model: 'account.payment',
    domain: [],
    context: {
      default_payment_type: 'outbound',
      default_partner_type: 'supplier',
      search_default_outbound_filter: 1,
      default_move_journal_types: ['bank', 'cash']
    }
  }
}
