export default {
  view_account_payment_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment',
    type: 'tree',

    // arch: {
    //   tree: {

    //     partner_id: {
    //       string({ context }) {
    //         const maps = {
    //           inbound: { en_US: 'Customer' },
    //           outbound: { en_US: 'Vendor' }
    //         }
    //         const { default_payment_type } = context
    //         return maps[default_payment_type] || { en_US: 'Vendor' }
    //       }
    //     }
    //   }
    // },

    fields: {
      // is_internal_transfer: { invisible: '1' },
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
      amount_signed: {
        string: 'Amount in Currency',
        groups: 'base.group_multi_currency',
        optional: 'hide'
      },
      currency_id: {
        string: 'Payment Currency',
        groups: 'base.group_multi_currency',
        optional: 'hide'
      },
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
        buttons: {
          action_post: {
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
          action_draft: {
            name: 'action_draft',
            string: '重置为草稿',
            type: 'object',
            invisible: ({ record }) => {
              // 'invisible': [('state', 'not in', ('posted', 'cancel'))]
              const { state } = record
              return !['posted', 'cancel'].includes(state)
            }
          },
          action_cancel: {
            name: 'action_cancel',
            string: '取消',
            type: 'object',
            invisible: ({ record }) => {
              // 'invisible': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            }
          },
          mark_as_sent: {
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
          unmark_as_sent: {
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
        },

        fields: {
          state: { widget: 'statusbar', statusbar_visible: 'draft,posted' }
        }
      },
      sheet: {
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
        partner_type: { invisible: 1 },
        posted_before: { invisible: 1 },
        reconciled_invoices_type: { invisible: 1 },
        company_id: { invisible: 1 },
        paired_internal_transfer_payment_id: { invisible: 1 },
        available_journal_ids: { invisible: 1 },

        state: { invisible: 1 },

        _div_button_box: {
          // _span: 2,
          // _invisible: 1,
          // // _invisible({ editable }) {
          // //   return editable
          // // },
          // reconciled_invoices_count: {},
          // reconciled_bills_count: {},
          // reconciled_statement_lines_count: {}
        },

        _widget: {
          //
        },

        _div_title: {
          _h1_name1: {
            _attr: {
              invisible: ({ record }) => {
                //'invisible': [('state', '!=', 'draft')]
                const { state } = record
                return state !== 'draft'
              }
            },
            _span: 'Draft'
          },

          _h1_name2: {
            _attr: {
              invisible: ({ record }) => {
                //'invisible': [('state', '=', 'draft')]
                const { state } = record
                return state === 'draft'
              }
            },
            name: { readonly: '1' }
          }
        },

        _group_name: {
          _group_group1: {
            partner_type: {
              readonly: '1',
              invisible: ({ record }) => {
                const { is_internal_transfer } = record
                return is_internal_transfer
              },
              help: '额外增加的字段'
            },

            is_internal_transfer: { force_save: '1', readonly: 1 },
            payment_type: { widget: 'radio' },

            _div_partner_id_customer: {
              _attr: {
                invisible({ record }) {
                  // 'invisible':['|',
                  // ('partner_type','!=','customer'),
                  // ('is_internal_transfer', '=', True)]
                  const { partner_type, is_internal_transfer } = record
                  return partner_type !== 'customer' || is_internal_transfer
                }
              },
              partner_id: { string: 'Customer' }
            },

            _div_partner_id_supplier: {
              _attr: {
                invisible({ record }) {
                  // 'invisible':['|',
                  // ('partner_type','!=','supplier'),
                  // ('is_internal_transfer', '=', True)]
                  const { partner_type, is_internal_transfer } = record
                  return partner_type !== 'supplier' || is_internal_transfer
                }
              },
              partner_id: { string: 'Vendor' }
            },

            amount: {},
            currency_id: {},
            date: {},
            ref: {}
          },
          _group_group2: {
            journal_id: {},
            payment_method_line_id: {},

            _field_partner_bank_id_customer: {
              _attr: {
                invisible({ record }) {
                  // Customer Bank Account
                  // 'invisible': ['|', '|', '|',
                  // ('show_partner_bank_account', '=', False),
                  // ('partner_type','!=','customer'),
                  // ('is_internal_transfer', '=', True),
                  // ('payment_type', '=', 'inbound')],

                  const {
                    show_partner_bank_account,
                    partner_type,
                    is_internal_transfer,
                    payment_type
                  } = record
                  return (
                    !show_partner_bank_account ||
                    partner_type !== 'customer' ||
                    is_internal_transfer ||
                    payment_type === 'inbound'
                  )
                }
              },
              partner_bank_id: { string: 'Customer Bank Account' }
            },

            _field_partner_bank_id_supplier: {
              _attr: {
                invisible({ record }) {
                  // 'invisible': ['|', '|', '|',
                  // ('show_partner_bank_account', '=', False),
                  // ('partner_type','!=','supplier'),
                  // ('is_internal_transfer', '=', True),
                  // ('payment_type', '=', 'inbound')],

                  const {
                    show_partner_bank_account,
                    partner_type,
                    is_internal_transfer,
                    payment_type
                  } = record
                  return (
                    !show_partner_bank_account ||
                    partner_type !== 'supplier' ||
                    is_internal_transfer ||
                    payment_type === 'inbound'
                  )
                }
              },
              partner_bank_id: { string: 'Vendor Bank Account' }
            },

            _field_partner_bank_id_company: {
              _attr: {
                invisible({ record }) {
                  //  'invisible': ['|', '|',
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
                    payment_type === 'outbound'
                  )
                }
              },
              partner_bank_id: { string: 'Company Bank Account' }
            },

            destination_journal_id: {
              invisible({ record }) {
                // 'invisible': [('is_internal_transfer', '=', False)],
                const { is_internal_transfer } = record
                return !is_internal_transfer
              }
            }
          }
        },

        _group_group3: {
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
