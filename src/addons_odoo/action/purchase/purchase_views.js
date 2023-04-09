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
  product_normal_action_puchased: {
    _odoo_model: 'ir.actions',
    name: '产品',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'product.product_template_search_view',
    domain: [],
    context: {
      search_default_filter_to_purchase: 1,
      purchase_product_template: 1
    }
  },

  //

  purchase_order_form: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
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
          action_rfq_send: {
            name: 'action_rfq_send',
            string: '发送到邮箱',
            type: 'object',
            context: { send_rfq: true },
            // states: 'draft',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft'
            }
          },
          print_quotation: {
            name: 'print_quotation',
            string: '打印报价单',
            type: 'object',
            context: { send_rfq: true },
            // states: 'draft',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft'
            }
          },
          button_confirm: {
            name: 'button_confirm',
            string: '确认',
            type: 'object',
            // states: 'sent',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'sent'
            }
          },
          button_approve: {
            name: 'button_approve',
            string: '批准',
            type: 'object',
            // states: 'to approve',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'to approve'
            }
          },
          action_create_invoice: {
            name: 'action_create_invoice',
            string: '生成账单',
            type: 'object',
            btn_type: 'primary',
            context: { create_bill: true },
            invisible: ({ record }) => {
              const { state, invoice_status } = record
              return (
                !['purchase', 'done'].includes(state) ||
                ['no', 'invoiced'].includes(invoice_status)
              )
            }
          },
          action_rfq_send2: {
            name: 'action_rfq_send',
            string: '再次发送到邮箱',
            type: 'object',
            context: { send_rfq: true },
            // states: 'sent',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'sent'
            }
          },
          print_quotation2: {
            name: 'print_quotation',
            string: '打印报价单2',
            type: 'object',
            context: { send_rfq: true },
            // states: 'sent',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'sent'
            }
          },
          button_confirm2: {
            name: 'button_confirm',
            string: '确认2',
            type: 'object',
            // states: 'draft',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft'
            }
          },
          action_rfq_send22: {
            name: 'action_rfq_send',
            string: '发送订单到邮箱',
            type: 'object',
            context: { send_rfq: false },
            // states: 'purchase',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'purchase'
            }
          },
          confirm_reminder_mail: {
            name: 'confirm_reminder_mail',
            string: '确认接受日期',
            type: 'object',
            invisible: ({ record }) => {
              const { state, mail_reminder_confirmed, date_planned } = record
              return (
                !['purchase', 'done'].includes(state) ||
                mail_reminder_confirmed ||
                !date_planned
              )
            }
          },
          action_create_invoice2: {
            name: 'action_create_invoice',
            string: '生成账单2',
            type: 'object',
            context: { create_bill: true },
            invisible: ({ record }) => {
              const { state, invoice_status, order_line = [] } = record
              return (
                !['purchase', 'done'].includes(state) ||
                !['no', 'invoiced'].includes(invoice_status) ||
                !order_line.length
              )
            }
          },
          button_draft: {
            name: 'button_draft',
            string: '重置为草稿',
            type: 'object',
            // states: 'cancel',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'cancel'
            }
          },
          button_cancel: {
            name: 'button_cancel',
            string: '取消',
            type: 'object',
            // states: 'draft,to approve,sent,purchase',
            invisible: ({ record }) => {
              const { state } = record
              return !['draft', 'to approve', 'sent', 'purchase'].includes(
                state
              )
            }
          },
          button_done: {
            name: 'button_done',
            string: '锁定',
            type: 'object',
            // states: 'purchase',
            invisible: ({ record }) => {
              const { state } = record
              return !['purchase'].includes(state)
            }
          },
          button_unlock: {
            name: 'button_unlock',
            string: '解锁',
            type: 'object',
            // states: 'done',
            invisible: ({ record }) => {
              const { state } = record
              return !['done'].includes(state)
            }
          }
        },

        fields: {
          state: {
            widget: 'statusbar',
            statusbar_visible: 'draft,sent,purchase'
          }
        }
      }
    },

    fields: {
      priority: {},
      name: {},
      partner_id: {},
      partner_ref: {},
      currency_id: {},

      date_order: {},
      date_approve: {},
      date_planned: {},
      mail_reminder_confirmed: {},
      reminder_date_before_receipt: {},

      notes: {},
      tax_totals_json: {},

      user_id: {},
      company_id: {},
      origin: {},
      invoice_status: {},
      payment_term_id: {},
      fiscal_position_id: {},

      // amount_total: {},
      // state: {},
      //

      order_line: {
        widget: 'x2many_tree',
        context: { default_state: 'draft' },
        readonly: ({ record }) => {
          const { state } = record
          return ['done', 'cancel'].includes(state)
        },

        views: {
          tree: {
            fields: {
              state: { invisible: 1 },
              display_type: { invisible: 1 },
              sequence: {},

              product_id: {
                readonly: ({ record }) => {
                  const { state } = record
                  return ['purchase', 'to approve', 'done', 'cancel'].includes(
                    state
                  )
                },
                required: ({ record }) => {
                  const { display_type } = record
                  return !display_type
                },

                context: ({ record }) => {
                  const { parent: parent2, product_qty, product_uom } = record
                  return {
                    partner_id: parent2.partner_id,
                    quantity: product_qty,
                    uom: product_uom,
                    company_id: parent2.company_id
                  }
                },

                domain: ({ record }) => {
                  const { parent: parent2 } = record
                  return [
                    ['purchase_ok', '=', true],
                    '|',
                    ['company_id', '=', false],
                    ['company_id', '=', parent2.company_id]
                  ]
                }
              },

              //
              name: {},
              date_planned: {
                required: ({ record }) => {
                  const { display_type } = record
                  return !display_type
                }
              },

              product_qty: {},
              qty_received: {},
              qty_invoiced: {},
              product_uom: {},
              price_unit: {},
              price_subtotal: {}
            }
          },

          form: {
            fields: {
              state: { invisible: 1 },
              display_type: { invisible: 1 },
              sequence: {},

              product_id: {
                readonly: ({ record }) => {
                  const { state } = record
                  return ['purchase', 'to approve', 'done', 'cancel'].includes(
                    state
                  )
                },
                required: ({ record }) => {
                  const { display_type } = record
                  return !display_type
                },

                context: ({ record }) => {
                  const { parent: parent2, product_qty, product_uom } = record
                  return {
                    partner_id: parent2.partner_id,
                    quantity: product_qty,
                    uom: product_uom,
                    company_id: parent2.company_id
                  }
                },

                domain: ({ record }) => {
                  const { parent: parent2 } = record
                  return [
                    ['purchase_ok', '=', true],
                    '|',
                    ['company_id', '=', false],
                    ['company_id', '=', parent2.company_id]
                  ]
                }
              },

              product_qty: {},
              qty_received: {},
              qty_invoiced: {},
              product_uom: {},

              price_unit: {},
              price_subtotal: {},

              date_planned: {
                required: ({ record }) => {
                  const { display_type } = record
                  return !display_type
                }
              },
              name: {},

              invoice_lines: {}
            }
          }
        }
      }
    }
  },

  purchase_order_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'tree',
    fields: {
      priority: { optional: 'show', widget: 'priority' },
      partner_ref: { optional: 'hide' },
      name: { string: 'Reference' },
      date_approve: {
        widget: 'date',
        optional: 'show',
        invisible({ context }) {
          // invisible="context.get('quotation_only', False)"
          return context.quotation_only
        }
      },
      partner_id: {},
      company_id: { optional: 'show' },

      user_id: { widget: 'many2one_avatar_user', optional: 'show' },
      date_order: {
        optional: 'show',
        invisible({ context }) {
          // invisible="not context.get('quotation_only', False)"
          return !context.quotation_only
        }
      },
      origin: { optional: 'show' },
      amount_untaxed: {
        sum: 'Total Untaxed amount',
        string: 'Untaxed',
        widget: 'monetary',
        optional: 'hide'
      },
      amount_total: {
        sum: 'Total amount',
        widget: 'monetary',
        optional: 'show'
      },
      currency_id: { invisible: '1' },
      state: { invisible: '1' },
      invoice_status: {
        widget: 'badge',
        optional: 'show'
        // decoration-success="invoice_status == 'invoiced'"
        // decoration-info="invoice_status == 'to invoice'" optional="show"
      },
      date_planned: {
        optional: 'show',
        invisible({ context }) {
          // invisible="context.get('quotation_only', False)"
          return context.quotation_only
        }
      }
    }
  },

  purchase_order_kpis_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'tree',
    priority: 10,
    fields: {
      priority: { optional: 'show', widget: 'priority' },
      partner_ref: { optional: 'hide' },
      name: { string: 'Reference' },
      date_approve: {
        widget: 'date',
        optional: 'show',
        invisible({ context }) {
          // invisible="context.get('quotation_only', False)"
          return context.quotation_only
        }
      },
      partner_id: {},
      company_id: { optional: 'show' },
      date_planned: {
        optional: 'show',
        invisible({ context }) {
          // invisible="context.get('quotation_only', False)"
          return context.quotation_only
        }
      },
      user_id: { widget: 'many2one_avatar_user', optional: 'show' },
      date_order: {
        optional: 'show',
        invisible({ context }) {
          // invisible="not context.get('quotation_only', False)"
          return !context.quotation_only
        }
      },
      origin: { optional: 'show' },
      amount_untaxed: {
        sum: 'Total Untaxed amount',
        string: 'Untaxed',
        widget: 'monetary',
        optional: 'hide'
      },
      amount_total: {
        sum: 'Total amount',
        widget: 'monetary',
        optional: 'show'
      },
      currency_id: { invisible: '1' },
      state: { invisible: '1' },
      invoice_status: {
        widget: 'badge',
        optional: 'show'
        // decoration-success="invoice_status == 'invoiced'"
        // decoration-info="invoice_status == 'to invoice'" optional="show"
      }
    }
  },

  view_purchase_order_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Order',
          filter_domain: self => {
            return [
              '|',
              '|',
              ['name', 'ilike', self],
              ['partner_ref', 'ilike', self],
              ['partner_id', 'child_of', self]
            ]
          }
        },
        partner_id: { operator: 'child_of' },
        user_id: {},
        product_id: {},
        origin: {}
      },

      filters: {
        group_me: {
          my_purchases: {
            string: 'My Purchases',
            domain: ({ env }) => {
              const uid = env.uid
              return [['user_id', '=', uid]]
            }
          },
          starred: { string: 'Starred', domain: [['priority', '=', '1']] }
        },
        group_state_rfq: {
          draft: {
            string: 'RFQs',
            domain: [['state', 'in', ['draft', 'sent', 'to approve']]]
          }
        },
        group_state: {
          approved: {
            string: 'Purchase Orders',
            domain: [['state', 'in', ['purchase', 'done']]]
          },
          to_approve: {
            string: 'To Approve',
            domain: [['state', 'in', ['to approve']]]
          }
        },
        group_type: {
          order_date: { string: 'Order Date', date: 'date_order' },
          draft_rfqs: {
            string: 'Draft RFQs',
            domain: [['state', '=', 'draft']]
          },

          waiting_rfqs: {
            string: 'Waiting RFQs',
            domain: () => {
              const today = date_tools.today
              return [
                ['state', '=', 'sent'],
                ['date_order', '>=', today]
              ]
            }
          },
          late_rfqs: {
            string: 'Late RFQs',
            domain: () => {
              const today = date_tools.today
              return [
                ['state', 'in', ['draft', 'sent', 'to approve']],
                ['date_order', '<', today]
              ]
            }
          }
        }
      }
    }
  },

  purchase_order_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Order',
          filter_domain: self => {
            return [
              '|',
              '|',
              ['name', 'ilike', self],
              ['partner_ref', 'ilike', self],
              ['partner_id', 'child_of', self]
            ]
          }
        },
        partner_id: { operator: 'child_of' },
        user_id: {},
        product_id: {}
      },

      filters: {
        group_me: {
          my_purchases: {
            string: 'My Orders',
            domain: ({ env }) => {
              const uid = env.uid
              return [['user_id', '=', uid]]
            }
          },
          starred: { string: 'Starred', domain: [['priority', '=', '1']] }
        },
        group_state: {
          unconfirmed: {
            string: 'Not Acknowledged',
            domain: [
              ['mail_reception_confirmed', '=', false],
              ['state', '=', 'purchase']
            ]
          },
          not_invoiced: {
            string: 'Waiting Bills',
            domain: [['invoice_status', '=', 'to invoice']]
          },
          invoiced: {
            string: 'Bills Received',
            domain: [['invoice_status', '=', 'invoiced']]
          }
        },
        group_date: {
          order_date: { string: 'Order Date', date: 'date_order' }
        }
      }
    }
  },

  purchase_rfq: {
    _odoo_model: 'ir.actions',
    name: 'Requests for Quotation',
    type: 'ir.actions.act_window',
    res_model: 'purchase.order',
    search_view_id: 'view_purchase_order_filter',
    domain: [],
    context: { quotation_only: true },
    views: {
      tree: 'purchase_order_kpis_tree',
      form: 'purchase_order_form'
    }
  },

  purchase_form_action: {
    _odoo_model: 'ir.actions',
    name: 'Purchase Orders',
    type: 'ir.actions.act_window',
    res_model: 'purchase.order',
    search_view_id: 'purchase_order_view_search',
    domain: [['state', 'in', ['purchase', 'done']]],
    context: {},
    views: {
      tree: 'purchase_order_view_tree',
      form: 'purchase_order_form'
    }
  }
}
