export default {
  sale_menu_root: {
    _odoo_model: 'ir.ui.menu',
    name: '销售',
    icon: 'shopping',
    theme: 'twoTone',
    sequence: 30
  },

  sale_order_menu: {
    _odoo_model: 'ir.ui.menu',
    name: '订单',
    parent: 'sale_menu_root',
    sequence: 2
  },

  res_partner_menu: {
    _odoo_model: 'ir.ui.menu',
    action: 'account.res_partner_action_customer',
    parent: 'sale_order_menu',
    name: '客户',
    sequence: 4
  },

  menu_sale_config: {
    _odoo_model: 'ir.ui.menu',
    name: '配置',
    parent: 'sale_menu_root',
    sequence: 35,
    children: {
      sales_team_config: {
        _odoo_model: 'ir.ui.menu',
        action: 'sales_team.crm_team_action_config',
        name: '销售团队',
        parent: 'menu_sale_config',
        sequence: 2
      },

      menu_sales_config: {
        _odoo_model: 'ir.ui.menu',
        name: '销售订单',
        parent: 'menu_sale_config',
        sequence: 4,
        children: {
          menu_tag_config: {
            _odoo_model: 'ir.ui.menu',
            action: 'sales_team.sales_team_crm_tag_action',
            name: '标签',
            parent: 'menu_sales_config',
            sequence: 2
          }
        }
      }
    }
  },

  //

  product_template_action: {
    _odoo_model: 'ir.actions',
    name: '产品',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'product.product_template_search_view',
    domain: [],
    context: {
      search_default_filter_to_sell: 1,
      sale_multi_pricelist_product_template: 1
    }
  },

  product_menu_catalog: {
    _odoo_model: 'ir.ui.menu',
    name: '产品',
    parent: 'sale_menu_root',
    sequence: 4,
    children: {
      menu_product_template_action: {
        _odoo_model: 'ir.ui.menu',
        action: 'product_template_action',
        parent: 'product_menu_catalog',
        name: '产品',
        sequence: 1
      }
    }
  },

  //

  view_order_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'tree',
    priority: 2,
    fields: {
      name: {},
      date_order: {},
      partner_id: {},
      amount_total: {},
      company_id: {},
      state: {},
      invoice_status: {}
    }
  },

  view_quotation_tree_with_onboarding: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'tree',
    priority: 4,
    fields: {
      name: {},
      create_date: {},
      // date_order: { string: '订单日期' },
      commitment_date: { invisible: 1 },
      expected_date: { invisible: 1 },
      partner_id: {},
      user_id: {},
      team_id: { invisible: 1 },
      tag_ids: {},
      company_id: {},
      amount_total: {},
      state: {},
      invoice_status: {}
    }
  },

  view_order_form: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
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
            name: 'action_view_sale_advance_payment_inv',
            string: '生成结算单',
            type: 'action',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { invoice_status } = record
              return invoice_status !== 'to invoice'
            }
          },
          {
            name: 'action_view_sale_advance_payment_inv',
            string: '生成结算单2',
            type: 'action',
            context: { default_advance_payment_method: 'percentage' },
            invisible: ({ record }) => {
              const { invoice_status, state } = record
              return invoice_status !== 'no' || state !== 'sale'
            }
          },

          // {
          //   name: 'action_quotation_send',
          //   string: '发送到邮箱',
          //   type: 'object',
          //   // states: 'draft',
          //   btn_type: 'primary',
          //   invisible: ({ record }) => {
          //     const { state } = record
          //     return state !== 'draft'
          //   }
          // },
          // {
          //   name: 'action_quotation_send',
          //   string: '发送形式发票',
          //   type: 'object',
          //   btn_type: 'primary',
          //   invisible: ({ record }) => {
          //     const { state, invoice_count } = record
          //     // console.log(
          //     //   record,
          //     //   state,
          //     //   invoice_count,
          //     //   state !== 'draft' || invoice_count >= 1
          //     // )
          //     return state !== 'draft' || invoice_count >= 1
          //   },
          //   context: { proforma: true }
          // },

          {
            name: 'action_confirm',
            string: '确认',
            type: 'object',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'sent'
            }
          },

          {
            name: 'action_confirm',
            string: '确认',
            type: 'object',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft'
            }
          },

          // {
          //   name: 'action_quotation_send',
          //   string: '发送形式发票2',
          //   type: 'object',
          //   invisible: ({ record }) => {
          //     const { state, invoice_count } = record
          //     return state === 'draft' || invoice_count >= 1
          //   },
          //   context: { proforma: true }
          // },

          // {
          //   name: 'action_quotation_send',
          //   string: '发送到邮箱2',
          //   type: 'object',
          //   // states: 'sent,sale',
          //   invisible: ({ record }) => {
          //     const { state } = record
          //     return !['sent', 'sale'].includes(state)
          //   }
          // },

          {
            name: 'action_cancel',
            string: '取消',
            type: 'object',
            invisible: ({ record }) => {
              const { id: res_id, state } = record
              return !['draft', 'sent', 'sale'].includes(state) || !res_id
            }
          },

          {
            name: 'action_draft',
            string: '重置为草稿',
            type: 'object',
            // states: 'cancel',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'cancel'
            }
          }
        ],

        fields: {
          state: { widget: 'statusbar', statusbar_visible: 'draft,sent,sale' }
        }
      }
    },

    fields: {
      invoice_count: { invisible: 1 },
      invoice_status: { invisible: 1 },
      state: { invisible: 1 },

      name: {},
      partner_id: {
        context: {
          res_partner_search_mode: 'customer',
          show_address: 1,
          show_vat: true
        },
        domain: record => {
          const { company_id } = record
          return [
            '|',
            ['company_id', '=', false],
            ['company_id', '=', company_id]
          ]
        }
      },
      partner_invoice_id: {
        context: { default_type: 'invoice' },
        domain: []
      },
      partner_shipping_id: {
        context: { default_type: 'delivery' },
        domain: []
      },

      date_order: { string: '订单日期' },

      pricelist_id: {
        domain: []
      },
      payment_term_id: {
        domain: []
      },
      amount_total: {},

      order_line: {
        widget: 'x2many_tree',
        views: {
          tree: {
            fields: {
              sequence: {},
              product_id: {},
              name: {},
              product_uom_qty: {},
              qty_delivered: {},
              qty_invoiced: {},
              product_uom: {},
              price_unit: {},
              price_subtotal: {}
            }
          },

          form: {
            fields: {
              sequence: {},
              product_id: {
                domain: []
                // domain="[('sale_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]"
                // context="{'partner_id':parent.partner_id, 'quantity':product_uom_qty, 'pricelist':parent.pricelist_id, 'uom':product_uom, 'company_id': parent.company_id}"
                // attrs="{
                //     'readonly': [('product_updatable', '=', False)],
                //     'required': [('display_type', '=', False)],
                // }"
              },
              name: {},
              product_uom_qty: {},
              qty_delivered: {},
              qty_invoiced: {},
              product_uom: {
                domain: []
              },
              price_unit: {},
              price_subtotal: {}
            }
          }
        }
      }
    }
  },

  action_orders: {
    _odoo_model: 'ir.actions',
    name: '订单',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'sale_order_view_search_inherit_sale',
    domain: [],
    context: {}

    // views: {
    //   tree: 'view_order_tree',
    //   form: 'view_order_form'
    // }
  },

  view_sales_order_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
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
              ['client_order_ref', 'ilike', self],
              ['partner_id', 'child_of', self]
            ]
          }
        },
        partner_id: { operator: 'child_of' },
        user_id: {},
        team_id: {},
        order_line: {
          string: '产品',
          filter_domain: self => {
            return [['order_line.product_id', 'ilike', self]]
          }
        },
        analytic_account_id: {}
      },

      filters: {
        group1: {
          my_sale_orders_filter: {
            string: '我的订单',
            domain: ({ env }) => {
              const uid = env.uid
              return [['user_id', '=', uid]]
            }
          }
        }
      }
    }
  },

  sale_order_view_search_inherit_quotation: {
    _odoo_model: 'ir.ui.view',
    model: 'account.incoterms',
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
              ['client_order_ref', 'ilike', self],
              ['partner_id', 'child_of', self]
            ]
          }
        },
        partner_id: { operator: 'child_of' },
        user_id: {},
        team_id: {},
        order_line: {
          string: '产品',
          filter_domain: self => {
            return [['order_line.product_id', 'ilike', self]]
          }
        },
        analytic_account_id: {},
        campaign_id: {}
      },

      filters: {
        group1: {
          my_quotation: {
            string: '我的报价单',
            domain: ({ env }) => {
              const uid = env.uid
              return [['user_id', '=', uid]]
            }
          }
        },
        group2: {
          draft: {
            string: '报价单',
            domain: [['state', 'in', ['draft', 'sent']]]
          },
          sales: {
            string: '销售订单',
            domain: [['state', 'in', ['sale', 'done']]]
          }
        },
        group3: {
          filter_create_date: { string: '创建日期', date: 'create_date' }
        }
      }
    }
  },

  menu_sale_order: {
    _odoo_model: 'ir.ui.menu',
    action: 'action_orders',
    parent: 'sale_order_menu',
    name: '订单',
    sequence: 2
  },

  action_quotations_with_onboarding: {
    _odoo_model: 'ir.actions',
    name: '报价单',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'sale_order_view_search_inherit_quotation',
    domain: [],
    context: { search_default_my_quotation: 1 },
    views: {
      tree: 'view_quotation_tree_with_onboarding',
      form: 'view_order_form'
    }
  },

  menu_sale_quotations: {
    _odoo_model: 'ir.ui.menu',
    action: 'action_quotations_with_onboarding',
    parent: 'sale_order_menu',
    name: '报价单',
    sequence: 1
  }
}
