const move_ids_without_package_tree_sheet = {
  company_id: { invisible: '1' },
  name: { invisible: '1' },
  state: { invisible: '1' },
  picking_type_id: { invisible: '1' },
  location_id: { invisible: '1' },
  location_dest_id: { invisible: '1' },
  partner_id: { invisible: '1' },
  scrapped: { invisible: '1' },
  picking_code: { invisible: '1' },
  product_type: { invisible: '1' },
  show_details_visible: { invisible: '1' },
  show_reserved_availability: { invisible: '1' },
  show_operations: { invisible: '1' },
  additional: { invisible: '1' },
  move_lines_count: { invisible: '1' },
  product_uom_category_id: { invisible: '1' },
  has_tracking: { invisible: '1' },
  display_assign_serial: { invisible: '1' },
  product_id: {},
  description_picking: { optional: 'hide' },
  date: { optional: 'hide' },
  date_deadline: { optional: 'hide' },
  is_initial_demand_editable: { invisible: '1' },
  is_quantity_done_editable: { invisible: '1' },
  product_packaging_id: {
    // groups: 'product.group_stock_packaging'
  },
  product_uom_qty: {
    string: 'Demand',
    invisible({ record }) {
      // 'column_invisible':
      // [('parent.immediate_transfer', '=', True)],
      const { parent: prt } = record
      return prt.immediate_transfer
    }
  },

  // _button_action_product_forecast_report: {
  //   _attr: {
  //     type: 'object',
  //     name: 'action_product_forecast_report',
  //     title: 'Forecast Report',
  //     icon: 'fa-area-chart',
  //     invisible({ record }) {
  //       // 'invisible': ['|',
  //       // ('forecast_availability', '&lt;', 0), '|',
  //       // ('parent.immediate_transfer', '=', True), '&amp;',
  //       // ('parent.picking_type_code', '=', 'outgoing'),
  //       // ('state', '!=', 'draft')]

  //       const { forecast_availability, parent: prt, state } = record

  //       return (
  //         forecast_availability < 0 ||
  //         prt.immediate_transfer ||
  //         (prt.picking_type_code === 'outgoing' && state !== 'draft')
  //       )
  //     }
  //   }
  // },

  // _button_action_product_forecast_report2: {
  //   _attr: {
  //     type: 'object',
  //     name: 'action_product_forecast_report',
  //     title: 'Forecast Report',
  //     icon: 'fa-area-chart text-danger',
  //     invisible({ record }) {
  //       // 'invisible': ['|',
  //       // ('forecast_availability', '&lt;', 0), '|',
  //       // ('parent.immediate_transfer', '=', True), '&amp;',
  //       // ('parent.picking_type_code', '=', 'outgoing'),
  //       // ('state', '!=', 'draft')]

  //       //  'invisible': ['|', ('forecast_availability', '&gt;=', 0), '|',
  //       // ('parent.immediate_transfer', '=', True), '&amp;',
  //       // ('parent.picking_type_code', '=', 'outgoing'),
  //       // ('state', '!=', 'draft')]}"/>

  //       const { forecast_availability, parent: prt, state } = record

  //       return (
  //         forecast_availability >= 0 ||
  //         prt.immediate_transfer ||
  //         (prt.picking_type_code === 'outgoing' && state !== 'draft')
  //       )
  //     }
  //   }
  // },

  forecast_expected_date: { invisible: '1' },

  forecast_availability: {
    string: 'Reserved',
    widget: 'forecast_widget',
    invisible({ record }) {
      //'column_invisible': ['|', '|',
      // ('parent.state', 'in', ['draft', 'done']),
      // ('parent.picking_type_code', '!=', 'outgoing'),
      // ('parent.immediate_transfer', '=', True)]}"

      const { parent: prt } = record

      return (
        ['draft', 'done'].includes(prt.state) ||
        prt.picking_type_code !== 'outgoing' ||
        prt.immediate_transfer
      )
    }
  },
  reserved_availability: {
    string: 'Reserved',
    invisible({ record }) {
      // 'column_invisible': ['|', '|',
      // ('parent.state', 'in', ['draft', 'done']),
      // ('parent.picking_type_code', 'in', ),
      // ('parent.immediate_transfer', '=', True)]

      const { parent: prt } = record

      return (
        ['draft', 'done'].includes(prt.state) ||
        ['incoming', 'outgoing'].includes(prt.picking_type_code) ||
        prt.immediate_transfer
      )
    }
  },
  product_qty: { invisible: '1' },
  quantity_done: {
    string: 'Done',
    invisible({ record }) {
      // 'column_invisible':[('parent.state', '=', 'draft'),
      //  ('parent.immediate_transfer', '=', False)]
      const { parent: prt } = record
      return prt.state === 'draft' && !prt.immediate_transfer
    }
  },
  product_uom: {},
  lot_ids: {
    widget: 'many2many_tags',
    optional: 'hide',

    invisible({ record }) {
      //'invisible': ['|', ('', '=', False),
      // ('has_tracking', '!=', 'serial')]}"
      const { show_details_visible, has_tracking } = record
      return !show_details_visible || has_tracking !== 'serial'
    }
  },

  _button_action_show_details: {
    _attr: {
      type: 'object',
      name: 'action_show_details',
      title: 'Details',
      icon: 'fa-list',
      invisible({ record }) {
        // 'invisible': [('show_details_visible', '=', False)]}"
        // options='{"warn": true}'/>

        const { show_details_visible } = record

        return !show_details_visible
      }
    }
  },
  _button_action_assign_serial: {
    _attr: {
      type: 'object',
      name: 'action_assign_serial',
      title: 'Assign Serial Numbers',
      icon: 'fa-plus-square',
      role: 'img',
      invisible({ record }) {
        // 'invisible': ['|', ('', '=', False),
        // ('show_operations', '=', False)]}"/>
        const { display_assign_serial, show_operations } = record
        return !display_assign_serial || !show_operations
      }
    }
  }
}

const move_ids_without_package_form_sheet = {
  product_uom_category_id: { invisible: '1' },
  additional: { invisible: '1' },
  move_lines_count: { invisible: '1' },
  company_id: { invisible: '1' },
  product_id: {},
  is_initial_demand_editable: { invisible: '1' },
  is_quantity_done_editable: { invisible: '1' },
  product_uom_qty: {
    string: 'Demand',
    invisible({ record }) {
      // 'column_invisible':
      // [('parent.immediate_transfer', '=', True)],
      const { parent: prt } = record
      return prt.immediate_transfer
    }
  },
  reserved_availability: {
    // 'invisible': (['|','|',
    // ('parent.state','=', 'done'),
    // ('parent.picking_type_code', 'in', ['outgoing', 'incoming']),
    // ('parent.immediate_transfer', '=', True)])

    string: 'Reserved',
    invisible({ record }) {
      // 'column_invisible': ['|', '|',
      // ('parent.state', 'in', ['draft', 'done']),
      // ('parent.picking_type_code', 'in', ['incoming', 'outgoing'] ),
      // ('parent.immediate_transfer', '=', True)]

      const { parent: prt } = record

      return (
        ['draft', 'done'].includes(prt.state) ||
        ['incoming', 'outgoing'].includes(prt.picking_type_code) ||
        prt.immediate_transfer
      )
    }
  },
  product_qty: { invisible: '1' },

  forecast_expected_date: { invisible: '1' },

  forecast_availability: {
    // string="Reserved" attrs="{

    string: 'Reserved',
    widget: 'forecast_widget',
    invisible({ record }) {
      //'column_invisible': ['|', '|',
      // ('parent.state', 'in', ['draft', 'done']),
      // ('parent.picking_type_code', '!=', 'outgoing'),
      // ('parent.immediate_transfer', '=', True)]}"

      // 'invisible': ['|',
      // ('parent.picking_type_code', '!=', 'outgoing'),
      // ('parent.state','=', 'done')]}"

      const { parent: prt } = record

      return (
        ['draft', 'done'].includes(prt.state) ||
        prt.picking_type_code !== 'outgoing' ||
        prt.immediate_transfer
      )
    }
  },

  quantity_done: {
    string: 'Done',
    invisible({ record }) {
      // 'column_invisible':[('parent.state', '=', 'draft'),
      //  ('parent.immediate_transfer', '=', False)]
      const { parent: prt } = record
      return prt.state === 'draft' && !prt.immediate_transfer
    }
  },
  product_uom: {},
  description_picking: { string: 'Description' }
}

const view_picking_form_sheet = {
  state: { invisible: '1' },

  is_locked: { invisible: '1' },
  show_mark_as_todo: { invisible: '1' },
  show_check_availability: { invisible: '1' },
  show_validate: { invisible: '1' },
  show_lots_text: { invisible: '1' },
  immediate_transfer: { invisible: '1' },
  picking_type_code: { invisible: '1' },
  hide_picking_type: { invisible: '1' },
  show_operations: { invisible: '1' },
  show_allocation: { invisible: '1' },
  show_reserved: { invisible: '1' },
  move_line_exist: { invisible: '1' },
  has_packages: { invisible: '1' },
  picking_type_entire_packs: { invisible: '1' },
  use_create_lots: { invisible: '1' },
  show_set_qty_button: { invisible: '1' },
  show_clear_qty_button: { invisible: '1' },
  company_id: { invisible: '1' },

  _div_button_box: {
    has_scrap_move: { invisible: '1' },
    has_tracking: { invisible: '1' },

    _button_action_see_move_scrap: {
      _attr: {
        name: 'action_see_move_scrap',
        string: 'Scraps',
        type: 'object',
        icon: 'fa-arrows-v',
        invisible({ record }) {
          //'invisible': [('has_scrap_move', '=', False)]
          const { has_scrap_move } = record
          return !has_scrap_move
        }
      }
    },

    _button_action_see_packages: {
      _attr: {
        name: 'action_see_packages',
        string: 'Packages',
        type: 'object',
        icon: 'fa-cubes',
        invisible({ record }) {
          //'invisible': [('has_packages', '=', False)]
          const { has_packages } = record
          return !has_packages
        }
      }
    },

    _button_action_stock_report: {
      _attr: {
        name: 'action_stock_report',
        string: 'Traceability',
        groups: 'stock.group_production_lot',
        type: 'action',
        icon: 'fa-arrow-up',
        invisible({ record }) {
          //'invisible': ['|', ('state', '!=', 'done'),
          // ('has_tracking', '=', False)]
          const { state, has_tracking } = record
          return state !== 'done' || !has_tracking
        }
      }
    },

    _button_action_view_reception_report: {
      _attr: {
        name: 'action_view_reception_report',
        string: 'Allocation',
        groups: 'stock.group_reception_report',
        type: 'object',
        icon: 'fa-list',
        context({ record }) {
          // context="{'default_picking_ids': [id]}"
          const { id: res_id } = record
          return { default_picking_ids: [res_id] }
        },
        invisible({ record }) {
          //'invisible': [('show_allocation', '=', False)]
          const { show_allocation } = record
          return !show_allocation
        }
      }
    },

    _button_action_picking_move_tree: {
      _attr: {
        help2: 'Use the following button to avoid onchange on one2many',
        help: 'List view of operations',
        name: 'action_picking_move_tree',
        string: 'Allocation',
        groups: 'base.group_no_one',
        type: 'object',
        icon: 'fa-arrows-v',
        context({ record }) {
          // context="{'picking_type_code': picking_type_code,
          // 'default_picking_id': id,
          // 'form_view_ref':'stock.view_move_form',
          // 'address_in_id': partner_id,
          // 'default_picking_type_id': picking_type_id,
          // 'default_location_id': location_id,
          // 'default_location_dest_id': location_dest_id}
          const {
            picking_type_code,
            id: res_id,
            partner_id,
            picking_type_id,
            location_id,
            location_dest_id
          } = record
          return {
            picking_type_code: picking_type_code,
            default_picking_id: res_id,
            form_view_ref: 'stock.view_move_form',
            address_in_id: partner_id,
            default_picking_type_id: picking_type_id,
            default_location_id: location_id,
            default_location_dest_id: location_dest_id
          }
        }
      },
      _span: 'Operations'
    }
  },

  _div_title: {
    _h1: {
      _attr: {
        invisible({ record }) {
          // 'invisible': [('name','=','/')]
          const { name } = record
          return name !== '/'
        }
      },
      priority: { widget: 'priority' },
      name: {}
    }
  },

  _group: {
    _group: {
      _field_partner_id: {
        _label_outgoing: {
          for: 'partner_id',
          string: 'Delivery Address',
          invisible({ record }) {
            //'invisible':
            // [('picking_type_code', '!=', 'outgoing')]
            const { picking_type_code } = record
            return picking_type_code !== 'outgoing'
          }
        },
        _label_incoming: {
          for: 'partner_id',
          string: 'Receive From',
          invisible({ record }) {
            //'invisible':
            // [('picking_type_code', '!=', 'incoming')]
            const { picking_type_code } = record
            return picking_type_code !== 'incoming'
          }
        },
        _label_Contact: {
          for: 'partner_id',
          string: 'Contact',
          invisible({ record }) {
            //'invisible':
            // [('picking_type_code', 'in', ['incoming', 'outgoing'])]
            const { picking_type_code } = record
            return ['incoming', 'outgoing'].includes(picking_type_code)
          }
        },
        partner_id: {}
      },
      picking_type_id: {
        invisible({ record }) {
          // 'invisible': [('hide_picking_type', '=', True)]
          const { hide_picking_type } = record
          return hide_picking_type
        }
      },
      // location_id: { invisible: 1 },
      // location_dest_id: { invisible: 1 },
      location_id: {
        invisible({ record }) {
          // 'invisible': [('picking_type_code', '=', 'incoming')]
          const { picking_type_code } = record
          return picking_type_code === 'incoming'
        }
      },
      location_dest_id: {
        invisible({ record }) {
          // 'invisible': [('picking_type_code', '=', 'outgoing')]
          const { picking_type_code } = record
          return picking_type_code === 'outgoing'
        }
      },
      backorder_id: {
        invisible({ record }) {
          // 'invisible': [('backorder_id','=',False)]
          const { backorder_id } = record
          return !backorder_id
        }
      }
    },

    _group_2: {
      scheduled_date: {},
      json_popover: {
        widget: 'stock_rescheduling_popover',
        invisible({ record }) {
          // invisible: [['json_popover', '=', false]]
          const { json_popover } = record
          return !json_popover
        }
      },
      date_deadline: {
        //    invisible: ['|', ['state', 'in', ('done', 'cancel')], ['date_deadline', '=', false]]
      },
      products_availability_state: { invisible: '1' },
      products_availability: {
        // invisible: ['|', ['picking_type_code', '!=', 'outgoing'], ['state', 'not in', ['confirmed', 'waiting', 'assigned']]]
      },
      date_done: {
        string: 'Effective Date'
        //   invisible: [['state', '!=', 'done']]
      },
      origin: { placeholder: 'e.g. PO0032' },
      owner_id: {
        groups: 'stock.group_tracking_owner'
        // invisible: [['picking_type_code', '!=', 'incoming']]
      }
    }
  },
  _notebook: {
    _page_detailed_operations: {
      _attr: {
        string: 'Detailed Operations',
        name: 'detailed_operations',
        invisible({ record }) {
          //'invisible': [('show_operations', '=', False)]]
          const { show_operations } = record
          return !show_operations
        }
      },
      move_line_nosuggest_ids: {
        invisible({ record }) {
          // 'invisible': [('show_reserved', '=', True)]
          const { show_reserved } = record
          return show_reserved
        }
      },
      move_line_ids_without_package: {
        invisible({ record }) {
          // 'invisible': [('show_reserved', '=', False)]
          const { show_reserved } = record
          return !show_reserved
        }
      },
      package_level_ids_details: {
        invisible({ record }) {
          // 'invisible': ['|',
          // ('picking_type_entire_packs', '=', False),
          // ('show_operations', '=', False)]
          const { picking_type_entire_packs, show_operations } = record
          return !picking_type_entire_packs || !show_operations
        }
      },

      _button_action_put_in_pack: {
        _attr: {
          btn_type: 'primary',
          name: 'action_put_in_pack',
          type: 'object',
          string: 'Put in Pack',
          groups: 'stock.group_tracking_lot',
          invisible({ record }) {
            // 'invisible': [('state', 'in', ('draft', 'done', 'cancel'))]
            const { state } = record
            return ['draft', 'done', 'cancel'].includes(state)
          }
        }
      }
    },

    _page_operations: {
      _attr: { string: 'Operations', name: 'operations' },
      move_ids_without_package: {
        // add-label="Add a Product">
        // widget: 'stock_move_one2many',
        nolabel: 1,
        widget: 'x2many_tree',

        views: {
          tree: {
            arch: {
              sheet: { ...move_ids_without_package_tree_sheet }
            }
          },
          form: {
            arch: {
              sheet: { ...move_ids_without_package_form_sheet }
            }
          }
        }
      },
      package_level_ids: {
        invisible({ record }) {
          // 'invisible': ['|',
          // ('picking_type_entire_packs', '=', False),
          // ('show_operations', '=', True)]
          const { picking_type_entire_packs, show_operations } = record
          return !picking_type_entire_packs || show_operations
        }
      },

      _button_action_put_in_pack: {
        _attr: {
          btn_type: 'primary',
          name: 'action_put_in_pack',
          type: 'object',
          string: 'Put in Pack',
          groups: 'stock.group_tracking_lot',
          invisible({ record }) {
            // 'invisible': [('state', 'in', ('draft', 'done', 'cancel'))]
            const { state } = record
            return ['draft', 'done', 'cancel'].includes(state)
          }
        }
      }
    },

    _page_extra: {
      _attr: { string: 'Other Information', name: 'extra' },

      _group: {
        _group_other_infos: {
          _attr: { string: 'Other Information', name: 'other_infos' },
          picking_type_code: { invisible: '1' },
          move_type: {
            invisible({ record }) {
              // 'invisible': [('picking_type_code', '=', 'incoming')]
              const { picking_type_code } = record
              return picking_type_code === 'incoming'
            }
          },
          user_id: {},
          group_id: {},
          company_id: {}
        }
      }
    },

    _page_note: {
      _attr: { string: 'Note', name: 'note' },
      note: {}
    }
  }
}

export default {
  // stock_picking_kanban: {
  //   _odoo_model: 'ir.ui.view',
  //   model: 'stock.picking',
  //   type: 'kanban',
  //   // todo
  //   fields: {
  //     priority: {},
  //     name: {},
  //     location_id: {},
  //     location_dest_id: {},
  //     partner_id: {},
  //     //   is_signed: {},
  //     user_id: {},
  //     scheduled_date: {},
  //     //   products_availability_state: {},
  //     products_availability: {},
  //     //   date_deadline: {},
  //     date_done: {},
  //     origin: {},
  //     //   backorder_id: {},
  //     //   picking_type_id: {},
  //     company_id: {},
  //     state: {}
  //   }
  // },

  vpicktree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    type: 'tree',
    arch: {
      sheet: {
        // company_id: { invisible: '1' },
        priority: { optional: 'show', widget: 'priority' },
        name: {},
        location_id: {
          string: 'From',
          groups: 'stock.group_stock_multi_locations',
          optional: 'show'
        },
        location_dest_id: {
          string: 'To',
          groups: 'stock.group_stock_multi_locations',
          optional: 'show'
        },
        partner_id: { optional: 'show' },
        is_signed: {
          string: 'Signed',
          optional: 'hide',
          groups: 'stock.group_stock_sign_delivery'
        },
        user_id: { optional: 'hide', widget: 'many2one_avatar_user' },
        scheduled_date: {
          optional: 'show',
          widget: 'remaining_days',
          invisible({ record }) {
            // 'invisible':[('state', 'in', ('done', 'cancel'))]
            const { state } = record
            return ['done', 'cancel'].includes(state)
          }
        },
        picking_type_code: { invisible: '1' },
        products_availability_state: { invisible: '1' },
        products_availability: {
          optional: 'hide',
          invisible({ record }) {
            //'invisible':
            // ['|', ('picking_type_code', '!=', 'outgoing'),
            // ('state', 'not in',
            // ['confirmed', 'waiting', 'assigned'])]
            const { picking_type_code, state } = record
            return (
              picking_type_code !== 'outgoing' ||
              !['confirmed', 'waiting', 'assigned'].includes(state)
            )
          }
          // decoration-success="state == 'assigned' or products_availability_state == 'available'"
          // decoration-warning="state != 'assigned' and products_availability_state in ('expected', 'available')"
          // decoration-danger="state != 'assigned' and products_availability_state == 'late'"/>
        },
        date_deadline: {
          optional: 'hide',
          widget: 'remaining_days',
          invisible({ record }) {
            // 'invisible':[('state', 'in', ('done', 'cancel'))]
            const { state } = record
            return ['done', 'cancel'].includes(state)
          }
        },
        date_done: {
          string: 'Effective Date',
          optional: 'hide'
        },
        origin: { optional: 'show' },
        backorder_id: { optional: 'hide' },
        picking_type_id: { optional: 'hide' },
        company_id: { groups: 'base.group_multi_company', optional: 'show' },
        state: {
          optional: 'show',
          widget: 'badge'
          // decoration-danger="state=='cancel'"
          // decoration-info="state== 'assigned'"
          // decoration-muted="state == 'draft'"
          // decoration-success="state == 'done'"
          // decoration-warning="state not in ('draft','cancel','done','assigned')"/>
        },
        // activity_exception_decoration: { widget: 'activity_exception' },
        json_popover: {
          widget: 'stock_rescheduling_popover',
          nolabel: '1',
          invisible({ record }) {
            // 'invisible': [('json_popover', '=', False)]}"
            const { json_popover } = record
            return !json_popover
          }
        }
      }
    }
  },

  view_picking_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    type: 'form',
    arch: {
      header: {
        buttons: {
          action_confirm: {
            name: 'action_confirm',
            string: 'Mark as Todo',
            type: 'object',
            btn_type: 'primary',
            groups: 'base.group_user',
            invisible({ record }) {
              // invisible':
              // [('show_mark_as_todo', '=', False)]}"
              const { show_mark_as_todo } = record
              return !show_mark_as_todo
            }
          },

          action_assign: {
            name: 'action_assign',
            string: 'Check Availability',
            type: 'object',
            btn_type: 'primary',
            groups: 'base.group_user',
            invisible({ record }) {
              // 'invisible':
              // [('show_check_availability', '=', False)]
              const { show_check_availability } = record
              return !show_check_availability
            }
          },
          button_validate: {
            name: 'button_validate',
            string: 'Validate',
            type: 'object',
            btn_type: 'primary',
            groups: 'stock.group_stock_user',
            invisible({ record }) {
              //  'invisible':
              // ['|', ('state', 'in', ('waiting','confirmed')),
              // ('show_validate', '=', False)]}"
              const { state, show_validate } = record
              return ['waiting', 'confirmed'].includes(state) || !show_validate
            }
          },

          button_validate2: {
            name: 'button_validate',
            string: 'Validate',
            type: 'object',
            groups: 'stock.group_stock_user',
            invisible({ record }) {
              //'invisible':
              // ['|', ('state', 'not in', ('waiting', 'confirmed')),
              // ('show_validate', '=', False)]
              const { state, show_validate } = record
              return !['waiting', 'confirmed'].includes(state) || !show_validate
            }
          },

          action_set_quantities_to_reservation: {
            name: 'action_set_quantities_to_reservation',
            string: 'Set quantities',
            type: 'object',
            groups: 'stock.group_stock_user',
            invisible({ record }) {
              // 'invisible': [('show_set_qty_button', '=', False)]
              const { show_set_qty_button } = record
              return !show_set_qty_button
            }
          },
          action_clear_quantities_to_zero: {
            name: 'action_clear_quantities_to_zero',
            string: 'Clear quantities',
            type: 'object',
            groups: 'stock.group_stock_user',
            invisible({ record }) {
              // 'invisible': [('show_clear_qty_button', '=', False)]
              const { show_clear_qty_button } = record
              return !show_clear_qty_button
            }
          },

          // _widget_signature: {
          //   name: 'signature',
          //   string: 'Sign',
          //   btn_type: 'primary',
          //   full_name: 'partner_id',
          //   groups: 'stock.group_stock_sign_delivery',
          //   invisible({ record }) {
          //     // 'invisible': ['|', '|', ('id', '=', False),
          //     // ('picking_type_code', '!=', 'outgoing'),
          //     // ('state', '!=', 'done')]
          //     const { id: res_id, picking_type_code, state } = record
          //     return (
          //       !res_id || picking_type_code !== 'outgoing' || state !== 'done'
          //     )
          //   }
          // },

          // _widget_signature2: {
          //   name: 'signature',
          //   string: 'Sign',
          //   btn_type: 'primary',
          //   full_name: 'partner_id',
          //   groups: 'stock.group_stock_sign_delivery',
          //   invisible({ record }) {
          //     //'invisible': ['|', '|', ('id', '=', False),
          //     // ('picking_type_code', '!=', 'outgoing'),
          //     // ('state', '=', 'done')]
          //     const { id: res_id, picking_type_code, state } = record
          //     return (
          //       !res_id || picking_type_code !== 'outgoing' || state === 'done'
          //     )
          //   }
          //   }
          // },

          do_print_picking: {
            name: 'do_print_picking',
            string: 'Print',
            type: 'object',
            groups: 'stock.group_stock_user',
            invisible({ record }) {
              //'invisible': [('state', '!=', 'assigned')]
              const { state } = record
              return state !== 'assigned'
            }
          },

          action_open_label_type: {
            name: 'action_open_label_type',
            string: 'Print Labels',
            type: 'object'
          },

          action_report_delivery: {
            name: 'action_report_delivery',
            string: 'Print',
            type: 'action',
            groups: 'base.group_user',
            invisible({ record }) {
              //'invisible': [('state', '!=', 'done')]
              const { state } = record
              return state !== 'done'
            }
          },

          act_stock_return_picking: {
            name: 'act_stock_return_picking',
            string: 'Return',
            type: 'action',
            groups: 'base.group_user',
            invisible({ record }) {
              //'invisible': [('state', '!=', 'done')]
              const { state } = record
              return state !== 'done'
            }
          },

          do_unreserve: {
            name: 'do_unreserve',
            string: 'Unreserve',
            type: 'object',
            groups: 'base.group_user',
            invisible({ record }) {
              //  'invisible': ['|', '|', '|',
              // ('picking_type_code', '=', 'incoming'),
              // ('immediate_transfer', '=', True), '&amp;',
              // ('state', '!=', 'assigned'), ('move_type', '!=', 'one'),
              // '&amp;', ('state', 'not in', ('assigned', 'confirmed')),
              // ('move_type', '=', 'one')]
              const {
                picking_type_code,
                immediate_transfer,
                state,
                move_type
              } = record
              return (
                picking_type_code === 'incoming' ||
                immediate_transfer ||
                (state !== 'assigned' && move_type !== 'one') ||
                (['assigned', 'confirmed'].includes(state) &&
                  move_type === 'one')
              )
            }
          },

          button_scrap: {
            name: 'button_scrap',
            string: 'Scrap',
            type: 'object',
            invisible({ record }) {
              // 'invisible': ['|',
              // '&amp;',
              // ('picking_type_code', '=', 'incoming'),
              // ('state', '!=', 'done'),
              // '&amp;',
              // ('picking_type_code', '=', 'outgoing'),
              // ('state', '=', 'done')]
              const { picking_type_code, state } = record
              return (
                (picking_type_code === 'incoming' && state !== 'done') ||
                (picking_type_code === 'outgoing' && state === 'done')
              )
            }
          },

          action_toggle_is_locked: {
            name: 'action_toggle_is_locked',
            string: 'Unlock',
            type: 'object',
            groups: 'stock.group_stock_manager',
            help: 'If the picking is unlocked you can edit initial demand (for a draft picking) or done quantities (for a done picking).',
            invisible({ record }) {
              // 'invisible':
              // ['|', ('state', 'in', ('draft','cancel')),
              // ('is_locked', '=', False)]
              const { state, is_locked } = record
              return ['draft', 'cancel'].includes(state) || !is_locked
            }
          },

          action_toggle_is_locked2: {
            name: 'action_toggle_is_locked',
            string: 'Lock',
            type: 'object',
            groups: 'stock.group_stock_manager',
            help: 'If the picking is unlocked you can edit initial demand (for a draft picking) or done quantities (for a done picking).',
            invisible({ record }) {
              //'invisible': [('is_locked', '=', True)]
              const { is_locked } = record
              return is_locked
            }
          },

          action_cancel: {
            name: 'action_cancel',
            string: 'Cancel',
            type: 'object',
            groups: 'base.group_user',
            help: 'If the picking is unlocked you can edit initial demand (for a draft picking) or done quantities (for a done picking).',
            invisible({ record }) {
              // 'invisible': [('state', 'not in',
              // ('assigned', 'confirmed', 'draft', 'waiting'))]
              const { state } = record
              return !['assigned', 'confirmed', 'draft', 'waiting'].includes(
                state
              )
            }
          }
        },
        fields: {
          state: {
            widget: 'statusbar',
            statusbar_visible: 'draft,confirmed,assigned,done'
          }
        }
      },

      sheet: { ...view_picking_form_sheet }
    }
  },

  view_picking_internal_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Transfer',
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
        picking_type_id: {},
        move_line_ids: {
          string: 'Package',
          groups: 'stock.group_tracking_lot',
          filter_domain: self => {
            return [
              '|',
              ('move_line_ids.package_id.name', 'ilike', self),
              ('move_line_ids.result_package_id.name', 'ilike', self)
            ]
          }
        }
      },

      filters: {
        group_me: {
          to_do_transfers: {
            string: 'To Do',
            domain: ({ env }) => {
              return [['user_id', 'in', [env.uid, false]]]
            }
          },

          my_transfers: {
            string: 'My Transfers',
            domain: ({ env }) => {
              return [['user_id', '=', env.uid]]
            }
          },
          starred: {
            string: 'Starred',
            domain: [['priority', '=', '1']]
          }
        },
        group_state: {
          draft: {
            name: 'draft',
            string: 'Draft',
            domain: [['state', '=', 'draft']],
            help: 'Draft Moves'
          },
          waiting: {
            name: 'waiting',
            string: 'Waiting',
            domain: [['state', 'in', ['confirmed', 'waiting']]],
            help: 'Waiting Moves'
          },
          available: {
            name: 'available',
            string: 'Ready',
            domain: [['state', '=', 'assigned']],
            help: 'Assigned Moves'
          },
          done: {
            name: 'done',
            string: 'Done',
            domain: [['state', '=', 'done']],
            help: 'Pickings already processed'
          },
          cancel: {
            name: 'cancel',
            string: 'Cancelled',
            domain: [['state', '=', 'cancel']],
            help: 'Cancelled Moves'
          }
        },

        group_: {
          late: {
            name: 'late',
            string: 'Late',
            help: 'Deadline exceed or/and by the scheduled',
            domain: ({ env }) => {
              return [
                ('state', 'in', ('assigned', 'waiting', 'confirmed')),
                '|',
                '|',
                ('has_deadline_issue', '=', true),
                ('date_deadline', '<', env.date_tools.today),
                ('scheduled_date', '<', env.date_tools.today)
              ]
            }
          },

          planning_issues: {
            name: 'planning_issues',
            string: 'Planning Issues',
            help: 'Transfers that are late on scheduled time or one of pickings will be late',
            domain: ({ env }) => {
              // ('scheduled_date', '&lt;', time.strftime('%Y-%m-%d %H:%M:%S')),
              return [
                '|',
                ('delay_alert_date', '!=', false),
                '&amp;',
                ('scheduled_date', '&lt;', env.date_tools.today),
                ('state', 'in', ('assigned', 'waiting', 'confirmed'))
              ]
            }
          }
        },

        group_backorder: {
          backorder: {
            name: 'backorder',
            string: 'Backorders',
            domain: [
              ('backorder_id', '!=', false),
              ('state', 'in', ('assigned', 'waiting', 'confirmed'))
            ],
            help: 'Remaining parts of picking partially processed'
          }
        }
      }
    }
  },

  action_picking_tree_all: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Transfers',
    type: 'ir.actions.act_window',
    res_model: 'stock.picking',
    search_view_id: 'view_picking_internal_search',
    domain: [],
    context: ({ env }) => {
      return {
        contact_display: 'partner_address',
        default_company_id: env.context.allowed_company_ids[0]
      }
    },
    views: {
      tree: 'vpicktree',
      form: 'view_picking_form'
    }
  }
}
