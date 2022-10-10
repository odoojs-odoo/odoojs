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
  menu_purchase_root: {
    _odoo_model: 'ir.ui.menu',
    name: '采购',
    sequence: 135
  },

  menu_procurement_management: {
    _odoo_model: 'ir.ui.menu',
    name: '订单',
    parent: 'menu_purchase_root',
    sequence: 1
  },

  menu_procurement_management_supplier_name: {
    _odoo_model: 'ir.ui.menu',
    name: '供应商',
    action: 'account.res_partner_action_supplier',
    parent: 'menu_procurement_management',
    sequence: 15
  },

  menu_purchase_config: {
    _odoo_model: 'ir.ui.menu',
    name: '配置',
    parent: 'menu_purchase_root',
    sequence: 100
  },

  menu_product_pricelist_action2_purchase: {
    _odoo_model: 'ir.ui.menu',
    name: '供应商价格表',
    action: 'product.product_supplierinfo_type_action',
    parent: 'menu_purchase_config',
    sequence: 1
  },

  menu_product_in_config_purchase: {
    _odoo_model: 'ir.ui.menu',
    name: '产品',
    parent: 'menu_purchase_config',
    sequence: 30
  },

  menu_product_attribute_action: {
    _odoo_model: 'ir.ui.menu',
    name: '产品属性',
    action: 'product.attribute_action',
    parent: 'menu_product_in_config_purchase',
    sequence: 1
  },

  menu_product_category_config_purchase: {
    _odoo_model: 'ir.ui.menu',
    name: '产品类别',
    action: 'product.product_category_action_form',
    parent: 'menu_product_in_config_purchase',
    sequence: 3
  },

  menu_unit_of_measure_in_config_purchase: {
    _odoo_model: 'ir.ui.menu',
    name: '度量单位',
    parent: 'menu_purchase_config',
    sequence: 40
  },

  menu_purchase_uom_form_action: {
    _odoo_model: 'ir.ui.menu',
    name: '度量单位',
    action: 'uom.product_uom_form_action',
    parent: 'menu_unit_of_measure_in_config_purchase',
    sequence: 5
  },

  menu_purchase_uom_categ_form_action: {
    _odoo_model: 'ir.ui.menu',
    name: '度量单位类别',
    action: 'uom.product_uom_categ_form_action',
    parent: 'menu_unit_of_measure_in_config_purchase',
    sequence: 10
  },

  menu_purchase_products: {
    _odoo_model: 'ir.ui.menu',
    name: '产品',
    parent: 'menu_purchase_root',
    sequence: 5
  },
  //

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

  menu_procurement_partner_contact_form: {
    _odoo_model: 'ir.ui.menu',
    name: '产品',
    action: 'product_normal_action_puchased',
    parent: 'menu_purchase_products',
    sequence: 20
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
        buttons: [
          {
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

          {
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

          {
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

          {
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

          {
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

          {
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

          {
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

          {
            name: 'button_confirm',
            string: '确认2',
            type: 'object',
            // states: 'draft',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft'
            }
          },

          {
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

          {
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

          {
            name: 'action_create_invoice',
            string: '生成账单2',
            type: 'object',
            context: { create_bill: true },
            invisible: ({ record }) => {
              const { state, invoice_status, order_line } = record
              return (
                !['purchase', 'done'].includes(state) ||
                !['no', 'invoiced'].includes(invoice_status) ||
                !order_line.length
              )
            }
          },

          {
            name: 'button_draft',
            string: '重置为草稿',
            type: 'object',
            // states: 'cancel',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'cancel'
            }
          },

          {
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

          {
            name: 'button_done',
            string: '锁定',
            type: 'object',
            // states: 'purchase',
            invisible: ({ record }) => {
              const { state } = record
              return !['purchase'].includes(state)
            }
          },

          {
            name: 'button_unlock',
            string: '解锁',
            type: 'object',
            // states: 'done',
            invisible: ({ record }) => {
              const { state } = record
              return !['done'].includes(state)
            }
          }
        ],

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
      priority: {},
      name: {},
      date_approve: {},
      partner_id: {},
      company_id: {},
      date_planned: {},
      user_id: {},
      date_order: {},
      origin: {},
      amount_untaxed: {},
      amount_total: {},
      currency_id: {},
      state: {},
      invoice_status: {}
    }
  },

  purchase_order_kpis_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'tree',
    priority: 10,
    fields: {
      priority: {},
      name: {},
      date_approve: {},
      partner_id: {},
      company_id: {},
      date_planned: {},
      user_id: {},
      date_order: {},
      origin: {},
      amount_untaxed: {},
      amount_total: {},
      currency_id: {},
      state: {},
      invoice_status: {}
    }
  },

  view_purchase_order_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: '订单',
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
        group1: {
          my_purchases: {
            string: '我的订单',
            domain: ({ env }) => {
              const uid = env.uid
              return [['user_id', '=', uid]]
            }
          },
          starred: { string: '我的收藏', domain: [['priority', '=', '1']] }
        },
        group2: {
          draft: {
            string: '询价单',
            domain: [['state', 'in', ['draft', 'sent', 'to approve']]]
          }
        },
        group3: {
          approved: {
            string: '采购订单',
            domain: [['state', 'in', ['purchase', 'done']]]
          },
          to_approve: {
            string: '待确认',
            domain: [['state', 'in', ['to approve']]]
          }
        },
        group4: {
          order_date: { string: '订单日期', date: 'date_order' },
          draft_rfqs: {
            string: '草稿询价单',
            domain: [['state', '=', 'draft']]
          },

          waiting_rfqs: {
            string: '已发送等待回复的询价单',
            domain: () => {
              const today = date_tools.today
              return [
                ['state', '=', 'sent'],
                ['date_order', '>=', today]
              ]
            }
          },
          late_rfqs: {
            string: '超期待确认的询价单',
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
          string: '订单',
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
        group1: {
          my_purchases: {
            string: '我的订单',
            domain: ({ env }) => {
              const uid = env.uid
              return [['user_id', '=', uid]]
            }
          },
          starred: { string: '我的收藏', domain: [['priority', '=', '1']] }
        },
        group2: {
          unconfirmed: {
            string: '等待应答',
            domain: [
              ['mail_reception_confirmed', '=', false],
              ['state', '=', 'purchase']
            ]
          },
          not_invoiced: {
            string: '待收账单',
            domain: [['invoice_status', '=', 'to invoice']]
          },
          invoiced: {
            string: '待收账单',
            domain: [['invoice_status', '=', 'invoiced']]
          }
        },
        group3: {
          order_date: { string: '订单日期', date: 'date_order' }
        }
      }
    }
  },

  purchase_rfq: {
    _odoo_model: 'ir.actions',
    name: '询价单',
    type: 'ir.actions.act_window',
    res_model: 'purchase.order',
    search_view_id: 'view_purchase_order_filter',
    domain: [],
    context: {
      quotation_only: true
      // search_default_waiting_rfqs: 1,
      // search_default_order_date: ['2021-01-01', '2022-12-12']
    },
    views: {
      tree: 'purchase_order_kpis_tree',
      form: 'purchase_order_form'
    }
  },

  purchase_form_action: {
    _odoo_model: 'ir.actions',
    name: '采购订单',
    type: 'ir.actions.act_window',
    res_model: 'purchase.order',
    search_view_id: 'purchase_order_view_search',
    domain: [['state', 'in', ['purchase', 'done']]],
    context: {},
    views: {
      tree: 'purchase_order_view_tree',
      form: 'purchase_order_form'
    }
  },

  menu_purchase_form_action: {
    _odoo_model: 'ir.ui.menu',
    name: '采购订单',
    action: 'purchase_form_action',
    parent: 'menu_procurement_management',
    sequence: 6
  },

  menu_purchase_rfq: {
    _odoo_model: 'ir.ui.menu',
    name: '询价单',
    action: 'purchase_rfq',
    parent: 'menu_procurement_management',
    sequence: 0
  }
}
