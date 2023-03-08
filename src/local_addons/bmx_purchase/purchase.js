export default {
  tree_purchase_order: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'tree',
    priority: 2,
    fields: {
      name: {},
      date_order: {},
      date_approve: {},
      partner_id: {},
      origin: {},
      amount_total: {},
      state: {}
      // invoice_status: {}
    }
  },

  form_purchase_order: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'form',
    toolbar: {
      action: {},
      print: {}
    },

    arch: {
      header: {
        // buttons: [
        //   {
        //     name: 'action_confirm',
        //     string: '确认',
        //     type: 'object',
        //     btn_type: 'primary',
        //     invisible: ({ record }) => {
        //       const { state } = record
        //       return state !== 'draft'
        //     }
        //   },

        //   {
        //     name: 'action_cancel',
        //     string: '取消',
        //     type: 'object',
        //     invisible: ({ record }) => {
        //       const { id: res_id, state } = record
        //       return !['draft', 'sent', 'purchase'].includes(state) || !res_id
        //     }
        //   },

        //   {
        //     name: 'action_draft',
        //     string: '重置为草稿',
        //     type: 'object',
        //     // states: 'cancel',
        //     invisible: ({ record }) => {
        //       const { state } = record
        //       return state !== 'cancel'
        //     }
        //   }
        // ],

        fields: {
          state: {
            widget: 'statusbar',
            statusbar_visible: 'draft,sent,purchase'
          }
        }
      }
    },

    fields: {
      state: { invisible: 1 },

      name: {},

      // partner_id: {},

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

      partner_ref: {},

      date_order: { string: '日期' },
      date_approve: {},
      date_planned: {},

      // tax_totals_json: {},
      invoice_status: {},
      origin: {},

      order_line: {
        widget: 'x2many_tree',
        views: {
          tree: {
            fields: {
              // sequence: {},

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
              // name: {},

              product_qty: {},
              qty_received: { readonly2: 1 },

              qty_invoiced: { readonly2: 1 },
              product_uom: { readonly2: 1 },
              price_unit: {},
              price_subtotal: {}
            }
          },

          form: {
            fields: {
              state: { invisible: 1 },
              display_type: { invisible: 1 },

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
              // name: {},

              product_qty: {},
              qty_received: { readonly2: 1 },

              qty_invoiced: { readonly2: 1 },
              product_uom: { readonly2: 1 },
              price_unit: {},
              price_subtotal: { readonly2: 1 },
              date_planned: {
                required: ({ record }) => {
                  const { display_type } = record
                  return !display_type
                }
              }
            }
          }
        }
      }
    }
  },

  search_purchase_order: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
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
              ['partner_ref', 'ilike', self],
              ['partner_id', 'child_of', self]
            ]
          }
        },

        partner_id: { operator: 'child_of' },
        product_id: {},
        origin: {}
      },

      filters: {
        group1: {
          draft: {
            string: '询价单',
            domain: [['state', 'in', ['draft', 'sent', 'to approve']]]
          }
        },
        group2: {
          approved: {
            string: '采购订单',
            domain: [['state', 'in', ['purchase', 'done']]]
          },

          to_approve: {
            string: '待确认',
            domain: [['state', 'in', ['to approve']]]
          }
        },
        group3: {
          order_date: { string: 'Order Date', date: 'date_order' }
        }
      }
    }
  },

  action_purchase_order: {
    _odoo_model: 'ir.actions',
    name: '采购合同',
    type: 'ir.actions.act_window',
    res_model: 'purchase.order',
    search_view_id: 'search_purchase_order',
    domain: [],
    context: {},
    views: {
      tree: 'tree_purchase_order',
      form: 'form_purchase_order'
    }
  }
}
