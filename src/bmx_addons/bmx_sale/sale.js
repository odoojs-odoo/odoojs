export default {
  tree_sale_order: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'tree',
    priority: 2,
    fields: {
      name: {},
      date_order: {},
      partner_id: {},
      amount_total: {},
      // company_id: {},
      state: {}
      // invoice_status: {}
    }
  },

  form_sale_order: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'form',
    toolbar: {
      action: {},
      print: {}
    },

    arch: {
      header: {
        buttons: [
          {
            name: 'action_confirm',
            string: '确认',
            type: 'object',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft'
            }
          },

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
          state: { widget: 'statusbar', statusbar_visible: 'draft,sale' }
        }
      }
    },

    fields: {
      invoice_count: { invisible: 1 },
      invoice_status: { invisible: 1 },
      state: { invisible: 1 },
      pricelist_id: { invisible: 1 },

      name: {},
      partner_id: {
        domain: record => {
          const { company_id } = record
          return [
            '|',
            ['company_id', '=', false],
            ['company_id', '=', company_id]
          ]
        }
      },

      date_order: { string: '日期' },

      // payment_term_id: {
      //   domain: []
      // },
      amount_total: {},

      order_line: {
        widget: 'x2many_tree',
        views: {
          tree: {
            fields: {
              // sequence: {},
              product_id: {},
              // name: {},
              product_uom_qty: {},
              qty_delivered: {
                readonly2: 1
              },
              qty_invoiced: {
                readonly2: 1
              },
              product_uom: {
                readonly2: 1
              },
              price_unit: {},
              price_subtotal: {}
            }
          },

          form: {
            fields: {
              // sequence: {},
              product_id: {
                domain: record => {
                  const { company_id } = record
                  return [
                    ['sale_ok', '=', true],
                    '|',
                    ['company_id', '=', false],
                    ['company_id', '=', company_id]
                  ]
                }
              },
              name: {},
              product_uom_qty: {},
              qty_delivered: { readonly2: 1 },
              qty_invoiced: { readonly2: 1 },
              product_uom: { readonly2: 1 },
              price_unit: {},
              price_subtotal: { readonly2: 1 }
            }
          }
        }
      }
    }
  },

  search_sale_order: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: '名称',
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
        // user_id: {},
        // team_id: {},
        order_line: {
          string: '产品',
          filter_domain: self => {
            return [['order_line.product_id', 'ilike', self]]
          }
        }
        // analytic_account_id: {}
      },

      filters: {
        // group1: {
        //   my_sale_orders_filter: {
        //     string: '我的订单',
        //     domain: ({ env }) => {
        //       const uid = env.uid
        //       return [['user_id', '=', uid]]
        //     }
        //   }
        // },
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

  action_sale_order: {
    _odoo_model: 'ir.actions',
    name: '销售合同',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'search_sale_order',
    domain: [],
    context: {},
    views: {
      tree: 'tree_sale_order',
      form: 'form_sale_order'
    }
  }
}
