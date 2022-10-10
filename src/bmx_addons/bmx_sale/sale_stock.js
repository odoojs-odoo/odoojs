export default {
  tree_stock_picking: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },
    priority: 2,
    fields: {
      name: {},
      partner_id: {},
      scheduled_date: {},
      origin: {},
      state: {}
    }
  },

  form_stock_picking: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },

    arch: {
      header: {
        buttons: [
          {
            name: 'button_validate',
            string: '验证',
            type: 'object',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state, show_validate } = record
              return ['waiting', 'confirmed'].includes(state) || !show_validate
            }
          },

          {
            name: 'button_validate',
            string: '验证',
            type: 'object',
            // btn_type: 'primary',
            invisible: ({ record }) => {
              const { state, show_validate } = record
              return !['waiting', 'confirmed'].includes(state) || !show_validate
            }
          }
        ],

        fields: {
          state: {
            widget: 'statusbar',
            statusbar_visible: 'draft,confirmed,assigned,done'
          }
        }
      }
    },

    fields: {
      company_id: { invisible: 1 },
      date_deadline: { invisible: 1 },
      picking_type_id: { invisible: 1 },
      location_id: { invisible: 1 },
      location_dest_id: { invisible: 1 },
      picking_type_code: { invisible: 1 },
      show_validate: { invisible: 1 },

      name: {},
      partner_id: {},
      scheduled_date: {},
      origin: {},
      state: {},
      move_ids_without_package: {
        widget: 'x2many_tree',
        string: '库存',
        views: {
          tree: {
            fields: {
              product_id: {},
              product_uom_qty: {},
              reserved_availability: {},
              quantity_done: {},
              product_uom: {}
            }
          },
          form: {
            fields: {
              product_id: {},
              product_uom_qty: {},
              reserved_availability: {},
              quantity_done: {},
              product_uom: {},
              move_line_ids: {
                widget: 'x2many_tree',
                string: '库存',
                views: {
                  tree: {
                    fields: {
                      lot_name: {},
                      qty_done: {},
                      product_uom_id: {}
                    }
                  },
                  form: {
                    fields: {}
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  search_stock_picking: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: '单号',
          filter_domain: self => {
            return ['|', ['name', 'ilike', self], ['origin', 'ilike', self]]
          }
        },

        // partner_id: { operator: 'child_of' },
        partner_id: {
          string: '客户',
          filter_domain: self => {
            return [['partner_id', 'child_of', self]]
          }
        },

        origin: {},
        product_id: {},
        picking_type_id: {}
      },

      filters: {
        group2: {
          draft: {
            string: 'Draft',
            domain: [['state', 'in', ['draft']]]
          },
          waiting: {
            string: 'Waiting',
            domain: [['state', 'in', ['confirmed', 'waiting']]]
          },
          available: {
            string: 'Ready',
            domain: [['state', 'in', ['assigned']]]
          },
          done: {
            string: 'Done',
            domain: [['state', 'in', ['done']]]
          },
          cancel: {
            string: 'Cancelled',
            domain: [['state', 'in', ['cancel']]]
          }
        }

        // group3: {
        //   late: {
        //     string: 'Late',
        //     domain: () => {
        //       const current_date = '2030-11-11 22:12:11'
        //       return [
        //         ['state', 'in', ('assigned', 'waiting', 'confirmed')],
        //         '|',
        //         '|',
        //         ['has_deadline_issue', '=', true],
        //         ['date_deadline', '<', current_date],
        //         ['scheduled_date', '<', current_date]
        //       ]
        //     }
        //   }
        // }
      }
    }
  },

  action_sale_picking: {
    _odoo_model: 'ir.actions',
    name: '销售出库',
    type: 'ir.actions.act_window',
    res_model: 'stock.picking',
    search_view_id: 'search_stock_picking',
    domain: [['picking_type_id.code', '=', 'outgoing']],

    context: { contact_display: 'partner_address' },
    views: {
      tree: 'tree_stock_picking',
      form: 'form_stock_picking'
    }
  }
}

// code = fields.Selection([
// ('incoming', 'Receipt'),
// ('outgoing', 'Delivery'),
// ('internal', 'Internal Transfer')],
// 'Type of Operation', required=True)
