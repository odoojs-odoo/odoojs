export default {
  view_pickingtype_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking.type',
    type: 'search',
    arch: {
      fields: {
        name: {},
        warehouse_id: {}
      },

      filters: {
        group1: {
          inactive: {
            string: '已归档',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  view_picking_type_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking.type',
    type: 'tree',
    fields: {
      sequence: {},
      name: {},
      active: {},
      warehouse_id: {},
      sequence_id: {},
      company_id: {}
    }
  },

  view_picking_type_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking.type',
    type: 'form',
    fields: {
      sequence: {},
      active: {},
      name: {},
      sequence_id: {},
      sequence_code: {},
      warehouse_id: {},
      print_label: {},

      reservation_method: {},
      reservation_days_before: {},
      reservation_days_before_priority: {},

      code: {},

      company_id: {},
      return_picking_type_id: {},
      show_operations: {},
      show_reserved: {},

      use_create_lots: {},
      show_entire_packs: {},
      default_location_src_id: {},
      default_location_dest_id: {}
    }
  },

  action_picking_type_list: {
    _odoo_model: 'ir.actions',
    name: '作业类型',
    type: 'ir.actions.act_window',
    res_model: 'stock.picking.type',
    domain: [],
    context: {}
  },

  menu_pickingtype: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_warehouse_config',
    name: '作业类型',
    action: 'action_picking_type_list',
    sequence: 5
  },

  stock_picking_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    type: 'kanban',
    // todo
    fields: {
      priority: {},
      name: {},
      location_id: {},
      location_dest_id: {},
      partner_id: {},
      //   is_signed: {},
      user_id: {},
      scheduled_date: {},
      //   products_availability_state: {},
      products_availability: {},
      //   date_deadline: {},
      date_done: {},
      origin: {},
      //   backorder_id: {},
      //   picking_type_id: {},
      company_id: {},
      state: {}
    }
  },

  vpicktree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    type: 'tree',
    fields: {
      priority: {},
      name: {},
      location_id: {},
      location_dest_id: {},
      partner_id: {},
      //   is_signed: {},
      user_id: {},
      scheduled_date: {},
      //   products_availability_state: {},
      products_availability: {},
      //   date_deadline: {},
      date_done: {},
      origin: {},
      //   backorder_id: {},
      //   picking_type_id: {},
      company_id: {},
      state: {}
    }
  },

  view_picking_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    type: 'form',
    fields: {
      priority: {},
      name: {},
      location_id: {},
      location_dest_id: {},
      partner_id: {},
      is_signed: {},
      user_id: {},
      scheduled_date: {},
      products_availability_state: {},
      products_availability: {},
      date_deadline: {},
      date_done: {},
      origin: {},
      backorder_id: {},
      picking_type_id: {},
      company_id: {},
      state: {},
      move_lines: {}
    }
  },

  view_picking_internal_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    type: 'search',
    arch: {
      fields: {
        name: {
          filter_domain: self => {
            return ['|', ['name', 'ilike', self], ['origin', '=like', self]]
          }
        },
        partner_id: {
          filter_domain: self => {
            return [['partner_id', 'child_of', self]]
          }
        },
        origin: {},
        product_id: {},
        picking_type_id: {}
      },

      filters: {
        group1: {
          my_transfers: {
            string: '我的调拨',
            domain: ({ env }) => {
              return [['user_id', '=', env.uid]]
            }
          },
          starred: {
            string: '已收藏',
            domain: [['priority', '=', '1']]
          }
        },
        group2: {
          draft: {
            string: '草稿',
            domain: [['state', '=', 'draft']]
          },
          waiting: {
            string: '等待',
            domain: [['state', 'in', ['confirmed', 'waiting']]]
          },
          available: {
            string: '可用',
            domain: [['state', '=', 'assigned']]
          },
          done: {
            string: '已完成',
            domain: [['state', '=', 'done']]
          },
          cancel: {
            string: '已取消',
            domain: [['state', '=', 'cancel']]
          }
        }
        // todo

        // group3: {
        //   inactive: {
        //     string: '已归档',
        //     domain: [['active', '=', false]]
        //   }
        // }
      }
    }
  },

  action_picking_tree_all: {
    _odoo_model: 'ir.actions',
    name: '调拨',
    type: 'ir.actions.act_window',
    res_model: 'stock.picking',
    search_view_id: 'view_picking_internal_search',
    domain: [],
    context: ({ record }) => {
      const { allowed_company_ids } = record
      return {
        contact_display: 'partner_address',
        default_company_id: allowed_company_ids[0]
      }
    }
  },

  all_picking: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_stock_warehouse_mgmt',
    name: '调拨',
    action: 'action_picking_tree_all',
    sequence: 5
  }
}
