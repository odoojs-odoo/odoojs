export default {
  stock_picking_calendar: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    type: 'otherview',
    arch: {}
  },

  stock_picking_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    type: 'otherview',
    arch: {}
  },

  vpicktree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    type: 'tree',
    arch: {
      sheet: {
        _header: {
          _button_do_unreserve: {
            _attr: {
              name: 'do_unreserve',
              type: 'object',
              string: 'Unreserve'
            }
          },
          _button_action_assign: {
            _attr: {
              name: 'action_assign',
              type: 'object',
              string: 'Check Availability'
            }
          }
        },
        company_id: { invisible: '1' },
        priority: {
          widget: 'priority',
          optional: 'show'
        },
        name: {},
        location_id: {
          string: 'From',
          groups: 'stock.group_stock_multi_locations',
          optional: 'show',
          no_create: true
        },
        location_dest_id: {
          string: 'To',
          groups: 'stock.group_stock_multi_locations',
          optional: 'show',
          no_create: true
        },
        partner_id: { optional: 'show' },
        is_signed: {
          string: 'Signed',
          groups: 'stock.group_stock_sign_delivery',
          optional: 'hide'
        },
        user_id: {
          widget: 'many2one_avatar_user',
          optional: 'hide'
        },
        scheduled_date: {
          widget: 'remaining_days',
          invisible: [['state', 'in', ('done', 'cancel')]],
          optional: 'show'
        },
        picking_type_code: { invisible: '1' },
        products_availability_state: {
          invisible: '1',
          options: '{"lazy": true}'
        },
        products_availability: {
          invisible: ['|', ['picking_type_code', '!=', 'outgoing'], ['state', 'not in', ['confirmed', 'waiting', 'assigned']]],
          optional: 'hide',
          options: '{"lazy": true}'
        },
        date_deadline: {
          widget: 'remaining_days',
          invisible: [['state', 'in', ('done', 'cancel')]],
          optional: 'hide'
        },
        date_done: {
          string: 'Effective Date',
          optional: 'hide'
        },
        origin: { optional: 'show' },
        backorder_id: { optional: 'hide' },
        picking_type_id: { optional: 'hide' },
        _field_company_id_244: {
          company_id: {
            groups: 'base.group_multi_company',
            optional: 'show'
          }
        },
        state: {
          widget: 'badge',
          optional: 'show'
        },
        activity_exception_decoration: { widget: 'activity_exception' },
        json_popover: {
          widget: 'stock_rescheduling_popover',
          invisible: [['json_popover', '=', false]]
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
        _button_action_confirm: {
          _attr: {
            name: 'action_confirm',
            type: 'object',
            string: 'Mark as Todo',
            groups: 'base.group_user',
            invisible: [['show_mark_as_todo', '=', false]],
            class: 'oe_highlight'
          }
        },
        _button_action_assign: {
          _attr: {
            name: 'action_assign',
            type: 'object',
            string: 'Check Availability',
            groups: 'base.group_user',
            invisible: [['show_check_availability', '=', false]],
            class: 'oe_highlight'
          }
        },
        _button_button_validate: {
          _attr: {
            name: 'button_validate',
            type: 'object',
            string: 'Validate',
            groups: 'stock.group_stock_user',
            invisible: ['|', ['state', 'in', ('waiting', 'confirmed')], ['show_validate', '=', false]],
            class: 'oe_highlight'
          }
        },
        _button_button_validate_743: {
          _attr: {
            name: 'button_validate',
            type: 'object',
            string: 'Validate',
            groups: 'stock.group_stock_user',
            invisible: ['|', ['state', 'not in', ('waiting', 'confirmed')], ['show_validate', '=', false]],
            class: 'o_btn_validate'
          }
        },
        _button_action_set_quantities_to_reservation: {
          _attr: {
            name: 'action_set_quantities_to_reservation',
            type: 'object',
            string: 'Set quantities',
            groups: 'stock.group_stock_user',
            invisible: [['show_set_qty_button', '=', false]],
            class: 'o_btn_validate'
          }
        },
        _button_action_clear_quantities_to_zero: {
          _attr: {
            name: 'action_clear_quantities_to_zero',
            type: 'object',
            string: 'Clear quantities',
            groups: 'stock.group_stock_user',
            invisible: [['show_clear_qty_button', '=', false]],
            class: 'o_btn_validate'
          }
        },
        _widget_signature: {
          _attr: {
            name: 'signature',
            string: 'Sign',
            groups: 'stock.group_stock_sign_delivery',
            invisible: ['|', '|', ['id', '=', false], ['picking_type_code', '!=', 'outgoing'], ['state', '!=', 'done']]
          }
        },
        _widget_signature_101: {
          _attr: {
            name: 'signature',
            string: 'Sign',
            groups: 'stock.group_stock_sign_delivery',
            invisible: ['|', '|', ['id', '=', false], ['picking_type_code', '!=', 'outgoing'], ['state', '=', 'done']]
          }
        },
        _button_do_print_picking: {
          _attr: {
            name: 'do_print_picking',
            type: 'object',
            string: 'Print',
            groups: 'stock.group_stock_user',
            invisible: [['state', '!=', 'assigned']]
          }
        },
        _button_action_open_label_type: {
          _attr: {
            name: 'action_open_label_type',
            type: 'object',
            string: 'Print Labels'
          }
        },
        _button_action_report_delivery: {
          _attr: {
            name: 'action_report_delivery',
            type: 'action',
            string: 'Print',
            groups: 'base.group_user',
            invisible: [['state', '!=', 'done']]
          }
        },
        _button_act_stock_return_picking: {
          _attr: {
            name: 'act_stock_return_picking',
            type: 'action',
            string: 'Return',
            groups: 'base.group_user',
            invisible: [['state', '!=', 'done']]
          }
        },
        _button_do_unreserve: {
          _attr: {
            name: 'do_unreserve',
            type: 'object',
            string: 'Unreserve',
            groups: 'base.group_user',
            invisible: ['|', '|', '|', ['picking_type_code', '=', 'incoming'], ['immediate_transfer', '=', true], '&', ['state', '!=', 'assigned'], ['move_type', '!=', 'one'], '&', ['state', 'not in', ('assigned', 'confirmed')], ['move_type', '=', 'one']]
          }
        },
        _button_button_scrap: {
          _attr: {
            name: 'button_scrap',
            type: 'object',
            string: 'Scrap',
            invisible: ['|', '&', ['picking_type_code', '=', 'incoming'], ['state', '!=', 'done'], '&', ['picking_type_code', '=', 'outgoing'], ['state', '=', 'done']]
          }
        },
        _button_action_toggle_is_locked: {
          _attr: {
            name: 'action_toggle_is_locked',
            type: 'object',
            string: 'Unlock',
            help: 'If the picking is unlocked you can edit initial demand (for a draft picking) or done quantities (for a done picking).',
            groups: 'stock.group_stock_manager',
            invisible: ['|', ['state', 'in', ('draft', 'cancel')], ['is_locked', '=', false]]
          }
        },
        _button_action_toggle_is_locked_232: {
          _attr: {
            name: 'action_toggle_is_locked',
            type: 'object',
            string: 'Lock',
            groups: 'stock.group_stock_manager',
            invisible: [['is_locked', '=', true]]
          }
        },
        state: {
          widget: 'statusbar',
          statusbar_visible: 'draft,confirmed,assigned,done'
        },
        _button_action_cancel: {
          _attr: {
            name: 'action_cancel',
            type: 'object',
            string: 'Cancel',
            groups: 'base.group_user',
            invisible: [['state', 'not in', ('assigned', 'confirmed', 'draft', 'waiting')]]
          }
        }
      },
      sheet: {
        is_locked: { invisible: '1' },
        show_mark_as_todo: { invisible: '1' },
        show_check_availability: { invisible: '1' },
        show_validate: { invisible: '1' },
        show_lots_text: { invisible: '1' },
        immediate_transfer: { invisible: '1' },
        picking_type_code: { invisible: '1' },
        hide_picking_type: { invisible: '1' },
        show_operations: {
          invisible: '1',
          readonly: '1'
        },
        show_allocation: { invisible: '1' },
        show_reserved: {
          invisible: '1',
          readonly: '1'
        },
        move_line_exist: { invisible: '1' },
        has_packages: { invisible: '1' },
        picking_type_entire_packs: { invisible: '1' },
        use_create_lots: { invisible: '1' },
        show_set_qty_button: { invisible: '1' },
        show_clear_qty_button: { invisible: '1' },
        company_id: { invisible: '1' },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          has_scrap_move: { invisible: 'True' },
          has_tracking: { invisible: 'True' },
          _button_action_see_move_scrap: {
            _attr: {
              name: 'action_see_move_scrap',
              type: 'object',
              string: 'Scraps',
              icon: 'fa-arrows-v',
              invisible: [['has_scrap_move', '=', false]],
              class: 'oe_stat_button'
            }
          },
          _button_action_see_packages: {
            _attr: {
              name: 'action_see_packages',
              type: 'object',
              string: 'Packages',
              icon: 'fa-cubes',
              invisible: [['has_packages', '=', false]],
              class: 'oe_stat_button'
            }
          },
          _button_action_stock_report: {
            _attr: {
              name: 'action_stock_report',
              type: 'action',
              string: 'Traceability',
              icon: 'fa-arrow-up',
              groups: 'stock.group_production_lot',
              invisible: ['|', ['state', '!=', 'done'], ['has_tracking', '=', false]],
              class: 'oe_stat_button'
            }
          },
          _button_action_view_reception_report: {
            _attr: {
              name: 'action_view_reception_report',
              type: 'object',
              string: 'Allocation',
              icon: 'fa-list',
              groups: 'stock.group_reception_report',
              invisible: [['show_allocation', '=', false]],
              context: { default_picking_ids: ['todo,------<built-in function id>'] },
              class: 'oe_stat_button'
            }
          },
          _button_action_picking_move_tree: {
            _attr: {
              name: 'action_picking_move_tree',
              type: 'object',
              icon: 'fa-arrows-v',
              help: 'List view of operations',
              groups: 'base.group_no_one',
              invisible: ['|', '&', ['show_operations', '=', true], '|', ['is_locked', '=', true], ['state', '=', 'done'], '&', ['state', '=', 'done'], ['is_locked', '=', true]],
              context: { todo_ctx: "{'picking_type_code': picking_type_code, 'default_picking_id': id, 'form_view_ref':'stock.view_move_form', 'address_in_id': partner_id, 'default_picking_type_id': picking_type_id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id}" },
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_form_field o_stat_info' },
              _span: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Operations'
                }
              }
            }
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _h1: {
            _attr: { class: 'd-flex' },
            priority: {
              widget: 'priority',
              invisible: [['name', '=', '/']],
              class: 'me-3'
            },
            name: { invisible: [['name', '=', '/']] }
          }
        },
        _group: {
          _group: {
            _div: {
              _attr: { class: 'o_td_label' },
              _label_partner_id: {
                for: 'partner_id',
                string: 'Delivery Address',
                invisible: [['picking_type_code', '!=', 'outgoing']]
              },
              _label_partner_id_996: {
                for: 'partner_id',
                string: 'Receive From',
                invisible: [['picking_type_code', '!=', 'incoming']]
              },
              _label_partner_id_750: {
                for: 'partner_id',
                string: 'Contact',
                invisible: [['picking_type_code', 'in', ['incoming', 'outgoing']]]
              }
            },
            partner_id: {},
            picking_type_id: {
              invisible: [['hide_picking_type', '=', true]],
              readonly: [['state', '!=', 'draft']]
            },
            location_id: {
              groups: '!stock.group_stock_multi_locations',
              invisible: '1'
            },
            location_dest_id: {
              groups: '!stock.group_stock_multi_locations',
              invisible: '1'
            },
            _field_location_id_573: {
              location_id: {
                groups: 'stock.group_stock_multi_locations',
                invisible: [['picking_type_code', '=', 'incoming']],
                no_create: true
              }
            },
            _field_location_dest_id_714: {
              location_dest_id: {
                groups: 'stock.group_stock_multi_locations',
                invisible: [['picking_type_code', '=', 'outgoing']],
                no_create: true
              }
            },
            backorder_id: { invisible: [['backorder_id', '=', false]] }
          },
          _group_967: {
            _label_scheduled_date: { for: 'scheduled_date' },
            _div: {
              _attr: { class: 'o_row' },
              scheduled_date: { required: [['id', '!=', false]] },
              json_popover: {
                widget: 'stock_rescheduling_popover',
                invisible: [['json_popover', '=', false]]
              }
            },
            date_deadline: { invisible: ['|', ['state', 'in', ('done', 'cancel')], ['date_deadline', '=', false]] },
            products_availability_state: { invisible: '1' },
            products_availability: { invisible: ['|', ['picking_type_code', '!=', 'outgoing'], ['state', 'not in', ['confirmed', 'waiting', 'assigned']]] },
            date_done: {
              string: 'Effective Date',
              invisible: [['state', '!=', 'done']]
            },
            origin: { placeholder: 'e.g. PO0032' },
            owner_id: {
              groups: 'stock.group_tracking_owner',
              invisible: [['picking_type_code', '!=', 'incoming']]
            }
          }
        },
        _notebook: {
          _page_detailed_operations: {
            _attr: {
              name: 'detailed_operations',
              string: 'Detailed Operations',
              invisible: [['show_operations', '=', false]]
            },
            move_line_nosuggest_ids: {
              readonly: ['|', '|', ['show_operations', '=', false], ['state', '=', 'cancel'], '&', ['state', '=', 'done'], ['is_locked', '=', true]],
              invisible: [['show_reserved', '=', true]],
              context: { todo_ctx: "{'tree_view_ref': 'stock.view_stock_move_line_detailed_operation_tree', 'default_picking_id': id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}" }
            },
            move_line_ids_without_package: {
              readonly: ['|', '|', ['show_operations', '=', false], ['state', '=', 'cancel'], '&', ['state', '=', 'done'], ['is_locked', '=', true]],
              invisible: [['show_reserved', '=', false]],
              context: { todo_ctx: "{'tree_view_ref': 'stock.view_stock_move_line_detailed_operation_tree', 'default_picking_id': id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}" }
            },
            package_level_ids_details: {
              readonly: [['state', '=', 'done']],
              invisible: ['|', ['picking_type_entire_packs', '=', false], ['show_operations', '=', false]],
              context: { todo_ctx: "{'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}" }
            },
            _button_action_put_in_pack: {
              _attr: {
                name: 'action_put_in_pack',
                type: 'object',
                string: 'Put in Pack',
                groups: 'stock.group_tracking_lot',
                invisible: [['state', 'in', ('draft', 'done', 'cancel')]],
                class: 'oe_highlight'
              }
            }
          },
          _page_operations: {
            _attr: {
              name: 'operations',
              string: 'Operations'
            },
            move_ids_without_package: {
              widget: 'stock_move_one2many',
              readonly: ['&', ['state', '=', 'done'], ['is_locked', '=', true]],
              context: { todo_ctx: "{'default_company_id': company_id, 'default_date': scheduled_date, 'default_date_deadline': date_deadline, 'picking_type_code': picking_type_code, 'default_picking_id': id, 'form_view_ref':'stock.view_move_form', 'address_in_id': partner_id, 'default_picking_type_id': picking_type_id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_partner_id': partner_id}" },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Stock Moves' },
                      company_id: { invisible: '1' },
                      name: { invisible: '1' },
                      state: {
                        invisible: '1',
                        readonly: '0'
                      },
                      picking_type_id: { invisible: '1' },
                      location_id: { invisible: '1' },
                      location_dest_id: { invisible: '1' },
                      partner_id: { invisible: '1' },
                      scrapped: { invisible: '1' },
                      picking_code: { invisible: '1' },
                      product_type: { invisible: '1' },
                      show_details_visible: { invisible: '1' },
                      show_reserved_availability: { invisible: '1' },
                      show_operations: {
                        invisible: '1',
                        readonly: '1'
                      },
                      additional: { invisible: '1' },
                      move_lines_count: { invisible: '1' },
                      is_locked: { invisible: '1' },
                      product_uom_category_id: { invisible: '1' },
                      has_tracking: { invisible: '1' },
                      display_assign_serial: { invisible: '1' },
                      product_id: {
                        readonly: ['|', '&', ['state', '!=', 'draft'], ['additional', '=', false], ['move_lines_count', '>', 0]],
                        context: { default_detailed_type: 'product' },
                        required: '1'
                      },
                      description_picking: {
                        string: 'Description',
                        optional: 'hide'
                      },
                      date: { optional: 'hide' },
                      date_deadline: { optional: 'hide' },
                      is_initial_demand_editable: { invisible: '1' },
                      is_quantity_done_editable: { invisible: '1' },
                      product_packaging_id: { groups: 'product.group_stock_packaging' },
                      product_uom_qty: {
                        string: 'Demand',
                        column_invisible: [['parent.immediate_transfer', '=', true]],
                        readonly: ['|', ['is_initial_demand_editable', '=', false], '&', '&', ['show_operations', '=', true], ['is_locked', '=', true], ['is_initial_demand_editable', '=', false]]
                      },
                      _button_action_product_forecast_report: {
                        _attr: {
                          name: 'action_product_forecast_report',
                          type: 'object',
                          title: 'Forecast Report',
                          icon: 'fa-area-chart',
                          invisible: ['|', ['forecast_availability', '<', 0], '|', ['parent.immediate_transfer', '=', true], '&', ['parent.picking_type_code', '=', 'outgoing'], ['state', '!=', 'draft']]
                        }
                      },
                      _button_action_product_forecast_report_794: {
                        _attr: {
                          name: 'action_product_forecast_report',
                          type: 'object',
                          title: 'Forecast Report',
                          icon: 'fa-area-chart text-danger',
                          invisible: ['|', ['forecast_availability', '>=', 0], '|', ['parent.immediate_transfer', '=', true], '&', ['parent.picking_type_code', '=', 'outgoing'], ['state', '!=', 'draft']]
                        }
                      },
                      forecast_expected_date: { invisible: '1' },
                      forecast_availability: {
                        string: 'Reserved',
                        widget: 'forecast_widget',
                        column_invisible: ['|', '|', ['parent.state', 'in', ['draft', 'done']], ['parent.picking_type_code', '!=', 'outgoing'], ['parent.immediate_transfer', '=', true]]
                      },
                      reserved_availability: {
                        string: 'Reserved',
                        column_invisible: ['|', '|', ['parent.state', 'in', ['draft', 'done']], ['parent.picking_type_code', 'in', ['incoming', 'outgoing']], ['parent.immediate_transfer', '=', true]]
                      },
                      product_qty: {
                        invisible: '1',
                        readonly: '1'
                      },
                      quantity_done: {
                        string: 'Done',
                        readonly: [['product_id', '=', false]],
                        column_invisible: [['parent.state', '=', 'draft'], ['parent.immediate_transfer', '=', false]]
                      },
                      product_uom: {
                        string: 'Unit of Measure',
                        groups: 'uom.group_uom',
                        readonly: [['state', '!=', 'draft'], ['additional', '=', false]],
                        no_open: true,
                        no_create: true
                      },
                      lot_ids: {
                        widget: 'many2many_tags',
                        groups: 'stock.group_production_lot',
                        domain: { todo_ctx: "[('product_id','=',product_id)]" },
                        invisible: ['|', ['show_details_visible', '=', false], ['has_tracking', '!=', 'serial']],
                        context: { todo_ctx: "{'default_company_id': company_id, 'default_product_id': product_id, 'active_picking_id': parent.id}" },
                        optional: 'hide',
                        create: [['parent.use_create_lots', '=', true]]
                      },
                      _button_action_show_details: {
                        _attr: {
                          name: 'action_show_details',
                          type: 'object',
                          title: 'Details',
                          icon: 'fa-list',
                          invisible: [['show_details_visible', '=', false]]
                        }
                      },
                      _button_action_assign_serial: {
                        _attr: {
                          name: 'action_assign_serial',
                          type: 'object',
                          title: 'Assign Serial Numbers',
                          icon: 'fa-plus-square',
                          invisible: ['|', ['display_assign_serial', '=', false], ['show_operations', '=', false]]
                        }
                      }
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Stock Moves' },
                      _header: {
                        state: { widget: 'statusbar' }
                      },
                      _group: {
                        product_uom_category_id: { invisible: '1' },
                        additional: { invisible: '1' },
                        move_lines_count: { invisible: '1' },
                        company_id: { invisible: '1' },
                        product_id: {
                          readonly: ['|', '&', ['state', '!=', 'draft'], ['additional', '=', false], ['move_lines_count', '>', 0]],
                          required: '1'
                        },
                        is_initial_demand_editable: { invisible: '1' },
                        is_quantity_done_editable: { invisible: '1' },
                        product_uom_qty: {
                          invisible: [['parent.immediate_transfer', '=', true]],
                          readonly: [['is_initial_demand_editable', '=', false]]
                        },
                        reserved_availability: {
                          string: 'Reserved',
                          invisible: ['|', '|', ['parent.state', '=', 'done'], ['parent.picking_type_code', 'in', ['outgoing', 'incoming']], ['parent.immediate_transfer', '=', true]]
                        },
                        product_qty: {
                          invisible: '1',
                          readonly: '1'
                        },
                        forecast_expected_date: { invisible: '1' },
                        forecast_availability: {
                          string: 'Reserved',
                          widget: 'forecast_widget',
                          invisible: ['|', ['parent.picking_type_code', '!=', 'outgoing'], ['parent.state', '=', 'done']]
                        },
                        quantity_done: {
                          string: 'Done',
                          readonly: [['is_quantity_done_editable', '=', false]]
                        },
                        product_uom: {
                          string: 'Unit of Measure',
                          groups: 'uom.group_uom',
                          readonly: [['state', '!=', 'draft'], ['id', '!=', false]],
                          no_open: true,
                          no_create: true
                        },
                        description_picking: { string: 'Description' }
                      }
                    }
                  }
                }
              }
            },
            id: { invisible: '1' },
            package_level_ids: {
              readonly: [['state', '=', 'done']],
              invisible: ['|', ['picking_type_entire_packs', '=', false], ['show_operations', '=', true]],
              context: { todo_ctx: "{'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}" }
            },
            _button_action_put_in_pack: {
              _attr: {
                name: 'action_put_in_pack',
                type: 'object',
                string: 'Put in Pack',
                groups: 'stock.group_tracking_lot',
                invisible: [['state', 'in', ('draft', 'done', 'cancel')]],
                class: 'oe_highlight'
              }
            }
          },
          _page_extra: {
            _attr: {
              name: 'extra',
              string: 'Additional Info'
            },
            _group: {
              _group_other_infos: {
                _attr: {
                  name: 'other_infos',
                  string: 'Other Information'
                },
                picking_type_code: { invisible: '1' },
                move_type: { invisible: [['picking_type_code', '=', 'incoming']] },
                user_id: { domain: [['share', '=', false]] },
                group_id: { groups: 'base.group_no_one' },
                company_id: {
                  groups: 'base.group_multi_company',
                  force_save: '1',
                  no_create: true
                }
              }
            }
          },
          _page_note: {
            _attr: {
              name: 'note',
              string: 'Note'
            },
            note: {
              string: 'Note',
              placeholder: 'Add an internal note that will be printed on the Picking Operations sheet'
            }
          }
        }
      }
    }
  },

  view_picking_internal_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    type: 'search',
    arch: {
      name: {
        string: 'Transfer',
        filter_domain: { todo_ctx: "['|', ('name', 'ilike', self), ('origin', 'ilike', self)]" }
      },
      partner_id: {
        filter_domain: { todo_ctx: "[('partner_id', 'child_of', self)]" }
      },
      origin: {},
      product_id: {},
      picking_type_id: {},
      move_line_ids: {
        string: 'Package',
        groups: 'stock.group_tracking_lot',
        filter_domain: { todo_ctx: "['|', ('move_line_ids.package_id.name', 'ilike', self), ('move_line_ids.result_package_id.name', 'ilike', self)]" }
      },
      _filter_to_do_transfers: {
        _attr: {
          name: 'to_do_transfers',
          string: 'To Do',
          domain: { todo_ctx: "[('user_id', 'in', [uid, False])]" }
        }
      },
      _filter_my_transfers: {
        _attr: {
          name: 'my_transfers',
          string: 'My Transfers',
          domain: { todo_ctx: "[('user_id', '=', uid)]" }
        }
      },
      _filter_starred: {
        _attr: {
          name: 'starred',
          string: 'Starred',
          domain: [['priority', '=', '1']]
        }
      },
      _separator: {},
      _filter_draft: {
        _attr: {
          name: 'draft',
          string: 'Draft',
          help: 'Draft Moves',
          domain: [['state', '=', 'draft']]
        }
      },
      _filter_waiting: {
        _attr: {
          name: 'waiting',
          string: 'Waiting',
          help: 'Waiting Moves',
          domain: [['state', 'in', ('confirmed', 'waiting')]]
        }
      },
      _filter_available: {
        _attr: {
          name: 'available',
          string: 'Ready',
          help: 'Assigned Moves',
          domain: [['state', '=', 'assigned']]
        }
      },
      _filter_done: {
        _attr: {
          name: 'done',
          string: 'Done',
          help: 'Pickings already processed',
          domain: [['state', '=', 'done']]
        }
      },
      _filter_cancel: {
        _attr: {
          name: 'cancel',
          string: 'Cancelled',
          help: 'Cancelled Moves',
          domain: [['state', '=', 'cancel']]
        }
      },
      _separator_533: {},
      _filter_late: {
        _attr: {
          name: 'late',
          string: 'Late',
          help: 'Deadline exceed or/and by the scheduled',
          domain: { todo_ctx: "[('state', 'in', ('assigned', 'waiting', 'confirmed')), '|', '|', ('has_deadline_issue', '=', True), ('date_deadline', '<', current_date), ('scheduled_date', '<', current_date)]" }
        }
      },
      _filter_planning_issues: {
        _attr: {
          name: 'planning_issues',
          string: 'Planning Issues',
          help: 'Transfers that are late on scheduled time or one of pickings will be late',
          domain: { todo_ctx: "['|', ('delay_alert_date', '!=', False), '&', ('scheduled_date','<', time.strftime('%Y-%m-%d %H:%M:%S')), ('state', 'in', ('assigned', 'waiting', 'confirmed'))]" }
        }
      },
      _separator_647: {},
      _filter_backorder: {
        _attr: {
          name: 'backorder',
          string: 'Backorders',
          help: 'Remaining parts of picking partially processed',
          domain: [['backorder_id', '!=', false], ['state', 'in', ('assigned', 'waiting', 'confirmed')]]
        }
      },
      _separator_953: {},
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          help: 'Show all records which has next action date is before today',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_today: {
        _attr: {
          name: 'activities_today',
          string: 'Today Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_upcoming_all: {
        _attr: {
          name: 'activities_upcoming_all',
          string: 'Future Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _separator_527: {},
      _filter_activities_exception: {
        _attr: {
          name: 'activities_exception',
          string: 'Warnings',
          domain: [['activity_exception_decoration', '!=', false]]
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_status: {
          _attr: {
            name: 'status',
            string: 'Status',
            domain: [],
            context: { group_by: 'state' }
          }
        },
        _filter_expected_date: {
          _attr: {
            name: 'expected_date',
            string: 'Scheduled Date',
            domain: [],
            context: { group_by: 'scheduled_date' }
          }
        },
        _filter_origin: {
          _attr: {
            name: 'origin',
            string: 'Source Document',
            domain: [],
            context: { group_by: 'origin' }
          }
        },
        _filter_picking_type: {
          _attr: {
            name: 'picking_type',
            string: 'Operation Type',
            domain: [],
            context: { group_by: 'picking_type_id' }
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
    context: { todo_ctx: "{'contact_display': 'partner_address', 'default_company_id': allowed_company_ids[0]}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_validate_picking: {
    _odoo_model: 'ir.actions.server',
    model_id: 'stock.model_stock_picking',
    model: 'stock_picking'
  },

  action_unreserve_picking: {
    _odoo_model: 'ir.actions.server',
    model_id: 'stock.model_stock_picking',
    model: 'stock_picking'
  },

  stock_picking_action_picking_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'All Transfers',
    type: 'ir.actions.act_window',
    res_model: 'stock.picking',
    search_view_id: 'view_picking_internal_search',
    domain: [],
    context: { contact_display: 'partner_address' },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_picking_tree_ready: {
    _odoo_model: 'ir.actions.act_window',
    name: 'To Do',
    type: 'ir.actions.act_window',
    res_model: 'stock.picking',
    search_view_id: 'view_picking_internal_search',
    domain: [],
    context: {
      contact_display: 'partner_address',
      search_default_available: 1
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_picking_tree_waiting: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Waiting Transfers',
    type: 'ir.actions.act_window',
    res_model: 'stock.picking',
    search_view_id: 'view_picking_internal_search',
    domain: [],
    context: {
      contact_display: 'partner_address',
      search_default_waiting: 1
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_picking_tree_late: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Late Transfers',
    type: 'ir.actions.act_window',
    res_model: 'stock.picking',
    search_view_id: 'view_picking_internal_search',
    domain: [],
    context: {
      contact_display: 'partner_address',
      search_default_planning_issues: 1
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_picking_tree_backorder: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Backorders',
    type: 'ir.actions.act_window',
    res_model: 'stock.picking',
    search_view_id: 'view_picking_internal_search',
    domain: [],
    context: {
      contact_display: 'partner_address',
      search_default_backorder: 1
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_picking_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'New Transfer',
    type: 'ir.actions.act_window',
    res_model: 'stock.picking',
    search_view_id: 'view_picking_internal_search',
    domain: [],
    context: { todo_ctx: "{\n                    'search_default_picking_type_id': [active_id],\n                    'default_picking_type_id': active_id,\n                    'contact_display': 'partner_address',\n            }\n            " },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  do_view_pickings: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Transfers for Groups',
    res_model: 'stock.picking',
    search_view_id: 'tooooooodoooooo',
    domain: "[['group_id','=',active_id]]",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
