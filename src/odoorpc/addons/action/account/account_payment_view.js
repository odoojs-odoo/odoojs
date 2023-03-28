export default {
  view_account_payment_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment',
    type: 'tree',

    fields: {
      is_internal_transfer: { invisible: '1' },
      company_currency_id: { invisible: '1' },
      date: {},
      name: {},
      journal_id: {},
      payment_method_line_id: {},
      partner_id: {
        string({ context }) {
          const maps = {
            inbound: { en_US: 'Customer' },
            outbound: { en_US: 'Vendor' }
          }
          const { default_payment_type } = context
          return maps[default_payment_type] || { en_US: 'Vendor' }
        }
      },
      amount_signed: { string: 'Amount in Currency' },
      currency_id: { string: 'Payment Currency' },
      amount_company_currency_signed: { widget: 'monetary', string: 'Amount' },

      state: {
        widget: 'badge'
        // decoration-info="state == 'draft'" decoration-success="state == 'posted'"
      }
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
              // 'invisible': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            }
          },

          {
            name: 'action_draft',
            string: '重置为草稿',
            type: 'object',
            invisible: ({ record }) => {
              // 'invisible': [('state', 'not in', ('posted', 'cancel'))]
              const { state } = record
              return !['posted', 'cancel'].includes(state)
            }
          },

          {
            name: 'action_cancel',
            string: '取消',
            type: 'object',
            invisible: ({ record }) => {
              // 'invisible': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            }
          },
          {
            name: 'mark_as_sent',
            string: '标记为已发送',
            type: 'object',
            invisible: ({ record }) => {
              // 'invisible': ['|', '|',
              // ('state', '!=', 'posted'),
              // ('is_move_sent', '=', True),
              // ('payment_method_code', '!=', 'manual')]
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
              // 'invisible': ['|', '|',
              // ('state', '!=', 'posted'),
              // ('is_move_sent', '=', False),
              // ('payment_method_code', '!=', 'manual')]
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
      },
      sheet: {
        _title: {
          display_name: {},
          state: { invisible: 1 },

          is_move_sent: { invisible: 1 },
          is_reconciled: { invisible: 1 },
          is_matched: { invisible: 1 },
          payment_method_code: { invisible: 1 },
          show_partner_bank_account: { invisible: 1 },
          require_partner_bank_account: { invisible: 1 },
          available_payment_method_line_ids: { invisible: 1 },
          available_partner_bank_ids: { invisible: 1 },
          suitable_journal_ids: { invisible: 1 },
          country_code: { invisible: 1 },
          // partner_type: { invisible: 1 },
          posted_before: { invisible: 1 },
          reconciled_invoices_type: { invisible: 1 },
          company_id: { invisible: 1 },
          paired_internal_transfer_payment_id: { invisible: 1 },
          available_journal_ids: { invisible: 1 }
        },

        // _group_button_box: {
        //   _span: 2,
        //   _invisible: 1,
        //   // _invisible({ editable }) {
        //   //   return editable
        //   // },
        //   reconciled_invoices_count: {},
        //   reconciled_bills_count: {},
        //   reconciled_statement_lines_count: {}
        // },

        _group_name: {
          _span: 2,
          name: { readonly: '1' },
          // state: { widget: 'web_ribbon' }
          partner_type: { readonly: '1' }
        },
        _group_1: {
          is_internal_transfer: {
            readonly2: 1,
            readonly: ({ record }) => {
              // 'readonly': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            }
          },

          payment_type: {
            widget: 'radio',
            readonly: ({ record }) => {
              // 'readonly': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            }
          },

          partner_id: {
            readonly: ({ record }) => {
              // 'readonly':[('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            },
            invisible({ record }) {
              // 'invisible':['|',
              // ('partner_type','!=','customer'),
              // ('is_internal_transfer', '=', True)]
              // 'invisible':['|',
              // ('partner_type','!=','supplier'),
              // ('is_internal_transfer', '=', True)]
              const { is_internal_transfer } = record
              return is_internal_transfer
            },

            string({ record }) {
              // Customer 'invisible':['|',
              // ('partner_type','!=','customer'),
              // ('is_internal_transfer', '=', True)]
              // Vendor 'invisible':['|',
              // ('partner_type','!=','supplier'),
              // ('is_internal_transfer', '=', True)]

              const maps = {
                customer: { en_US: 'Customer' },
                supplier: { en_US: 'Vendor' }
              }
              const { partner_type } = record
              return maps[partner_type] || 'Customer'
            }
          },

          amount: {
            readonly: ({ record }) => {
              // 'readonly': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            }
          },
          currency_id: {
            readonly: ({ record }) => {
              // 'readonly': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            }
          },
          date: {
            readonly: ({ record }) => {
              // 'readonly': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            }
          },
          ref: {}
        },
        _group_2: {
          journal_id: {
            readonly({ record }) {
              // 'readonly': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            },

            domain({ record }) {
              // domain="[('id', 'in', available_journal_ids)]"
              const { available_journal_ids } = record
              return [['id', 'in', available_journal_ids]]
            }
          },
          payment_method_line_id: {
            required: '1',
            readonly: ({ record }) => {
              // 'readonly': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            }
          },

          partner_bank_id: {
            readonly({ record }) {
              console.log(record)
              // checked: account_payment_view.xml, line 294
              // Company Bank Account  'invisible': ['|', '|',
              // ('show_partner_bank_account', '=', False),
              // ('is_internal_transfer', '=', True),
              // ('payment_type', '=', 'outbound')],
              const { payment_type } = record
              return payment_type !== 'outbound'
            },

            required({ record }) {
              // 'required': [('require_partner_bank_account', '=', True),
              // ('is_internal_transfer', '=', False)],
              // 'required': [('require_partner_bank_account', '=', True),
              // ('is_internal_transfer', '=', False)],

              // 'required': [('require_partner_bank_account', '=', True),
              // ('is_internal_transfer', '=', False)],

              const { require_partner_bank_account, is_internal_transfer } =
                record
              return require_partner_bank_account && !is_internal_transfer
            },

            invisible({ record }) {
              // Customer Bank Account
              // 'invisible': ['|', '|', '|',
              // ('show_partner_bank_account', '=', False),
              // ('partner_type','!=','customer'),
              // ('is_internal_transfer', '=', True),
              // ('payment_type', '=', 'inbound')],
              // Vendor Bank Account
              // 'invisible': ['|', '|', '|',
              // ('show_partner_bank_account', '=', False),
              // ('partner_type','!=','supplier'),
              // ('is_internal_transfer', '=', True),
              // ('payment_type', '=', 'inbound')],
              // Company Bank Account  'invisible': ['|', '|',
              // ('show_partner_bank_account', '=', False),
              // ('is_internal_transfer', '=', True),
              // ('payment_type', '=', 'outbound')],
              const {
                show_partner_bank_account,
                is_internal_transfer,
                payment_type
              } = record
              return (
                !show_partner_bank_account ||
                is_internal_transfer ||
                payment_type === 'inbound' ||
                payment_type === 'outbound'
              )
            },

            string({ record }) {
              // Customer Bank Account
              // 'invisible': ['|', '|', '|',
              // ('show_partner_bank_account', '=', False),
              // ('partner_type','!=','customer'),
              // ('is_internal_transfer', '=', True),
              // ('payment_type', '=', 'inbound')],
              // Vendor Bank Account
              // 'invisible': ['|', '|', '|',
              // ('show_partner_bank_account', '=', False),
              // ('partner_type','!=','supplier'),
              // ('is_internal_transfer', '=', True),
              // ('payment_type', '=', 'inbound')],

              // Company Bank Account  'invisible': ['|', '|',
              // ('show_partner_bank_account', '=', False),
              // ('is_internal_transfer', '=', True),
              // ('payment_type', '=', 'outbound')],

              const maps = {
                customer: { en_US: 'Customer' },
                supplier: { en_US: 'Vendor' }
              }
              const { partner_type, payment_type } = record

              if (payment_type === 'outbound')
                return { en_US: 'Company Bank Account' }
              else {
                return maps[partner_type] || 'Customer'
              }
            }
          },

          destination_journal_id: {
            readonly({ record }) {
              // 'readonly': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            },
            invisible({ record }) {
              // 'invisible': [('is_internal_transfer', '=', False)],
              const { is_internal_transfer } = record
              return !is_internal_transfer
            },
            required({ record }) {
              // 'required': [('is_internal_transfer', '=', True),('state', '=', 'draft')]
              const { is_internal_transfer, state } = record
              return is_internal_transfer && state === 'draft'
            }
          },

          qr_code: {
            widget: 'html',
            invisible({ record }) {
              // 'invisible': [('qr_code', '=', False)]
              const { qr_code } = record
              return !qr_code
            }
          }
        }
      }
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
            // filter_domain="
            // ['|', '|', '|', '|',
            // ('name', 'ilike', self),
            // ('partner_id', 'ilike', self),
            // ('ref', 'ilike', self),
            // ('amount_company_currency_signed' , 'ilike', self),
            // ('amount', 'ilike', self)]"/>

            return [
              '|',
              '|',
              '|',
              '|',
              ['name', 'ilike', self],
              ['partner_id', 'ilike', self],
              ['ref', 'ilike', self],
              ['partner_id', 'ilike', self],
              ['amount_company_currency_signed', 'ilike', self],
              ['amount', 'ilike', self]
            ]
          }
        },
        partner_id: { string: 'Customer/Vendor' },
        journal_id: {}
        // is_internal_transfer: {}
      },
      filters: {
        group_type: {
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

        group_state: {
          __title: '状态',
          state_draft: { string: '草稿', domain: [['state', '=', 'draft']] },
          state_posted: { string: '已过账', domain: [['state', '=', 'posted']] }
        },
        group_status: {
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

        group_date: {
          date: { string: '付款日期', date: 'date' }
        }
      }
    }
  },

  action_account_payments: {
    _odoo_model: 'ir.actions',
    name: 'Payments Recieve',
    type: 'ir.actions.act_window',
    res_model: 'account.payment',
    search_view_id: 'view_account_payment_search',
    domain: [],
    context: {
      default_payment_type: 'inbound',
      default_partner_type: 'customer',
      search_default_inbound_filter: 1,
      default_move_journal_types: ['bank', 'cash']
    },
    views: {
      tree: 'view_account_payment_tree',
      form: 'view_account_payment_form'
    }
  },

  action_account_payments_payable: {
    _odoo_model: 'ir.actions',
    name: 'Payments Out',
    type: 'ir.actions.act_window',
    res_model: 'account.payment',
    search_view_id: 'view_account_payment_search',
    domain: [],
    context: {
      default_payment_type: 'outbound',
      default_partner_type: 'supplier',
      search_default_outbound_filter: 1,
      default_move_journal_types: ['bank', 'cash']
    },
    views: {
      tree: 'view_account_payment_tree',
      form: 'view_account_payment_form'
    }
  },

  action_account_payments_transfer: {
    _odoo_model: 'ir.actions',
    name: 'Internal Transfers',
    type: 'ir.actions.act_window',
    res_model: 'account.payment',
    search_view_id: 'view_account_payment_search',
    domain: [],
    context: {
      default_is_internal_transfer: true,
      default_payment_type: 'outbound',
      search_default_transfers_filter: 1
    },
    views: {
      tree: 'view_account_payment_tree',
      form: 'view_account_payment_form'
    }
  }
}
