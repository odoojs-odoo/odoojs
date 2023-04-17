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
              string: 'Unreserve',
              type: 'object'
            }
          },
          _button_action_assign: {
            _attr: {
              name: 'action_assign',
              string: 'Check Availability',
              type: 'object'
            }
          }
        },
        company_id: {
          invisible: '1'
        },
        priority: {
          widget: 'priority'
        },
        name: {},
        location_id: {
          string: 'From',
          groups: 'stock.group_stock_multi_locations',
          no_create: true
        },
        location_dest_id: {
          string: 'To',
          groups: 'stock.group_stock_multi_locations',
          no_create: true
        },
        partner_id: {},
        is_signed: {
          string: 'Signed',
          groups: 'stock.group_stock_sign_delivery'
        },
        user_id: {
          widget: 'many2one_avatar_user'
        },
        scheduled_date: {
          widget: 'remaining_days',
          attrs: {
            invisible: "[('state', 'in', ('done', 'cancel'))]"
          }
        },
        picking_type_code: {
          invisible: '1'
        },
        products_availability_state: {
          invisible: '1',
          options: '{"lazy": true}'
        },
        products_availability: {
          attrs: {
            invisible: "['|', ('picking_type_code', '!=', 'outgoing'), ('state', 'not in', ['confirmed', 'waiting', 'assigned'])]"
          },
          options: '{"lazy": true}'
        },
        date_deadline: {
          widget: 'remaining_days',
          attrs: {
            invisible: "[('state', 'in', ('done', 'cancel'))]"
          }
        },
        date_done: {
          string: 'Effective Date'
        },
        origin: {},
        backorder_id: {},
        picking_type_id: {},
        _field_company_id_318: {
          company_id: {
            groups: 'base.group_multi_company'
          }
        },
        state: {
          widget: 'badge'
        },
        activity_exception_decoration: {
          widget: 'activity_exception'
        },
        json_popover: {
          widget: 'stock_rescheduling_popover',
          attrs: {
            invisible: "[('json_popover', '=', False)]"
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
      sheet: {
        is_locked: {
          invisible: '1'
        },
        show_mark_as_todo: {
          invisible: '1'
        },
        show_check_availability: {
          invisible: '1'
        },
        show_validate: {
          invisible: '1'
        },
        show_lots_text: {
          invisible: '1'
        },
        immediate_transfer: {
          invisible: '1'
        },
        picking_type_code: {
          invisible: '1'
        },
        hide_picking_type: {
          invisible: '1'
        },
        show_operations: {
          invisible: '1'
        },
        show_allocation: {
          invisible: '1'
        },
        show_reserved: {
          invisible: '1'
        },
        move_line_exist: {
          invisible: '1'
        },
        has_packages: {
          invisible: '1'
        },
        picking_type_entire_packs: {
          invisible: '1'
        },
        use_create_lots: {
          invisible: '1'
        },
        show_set_qty_button: {
          invisible: '1'
        },
        show_clear_qty_button: {
          invisible: '1'
        },
        company_id: {
          invisible: '1'
        },
        _header: {
          _button_action_confirm: {
            _attr: {
              name: 'action_confirm',
              string: 'Mark as Todo',
              groups: 'base.group_user',
              attrs: {
                invisible: "[('show_mark_as_todo', '=', False)]"
              },
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_action_assign: {
            _attr: {
              name: 'action_assign',
              string: 'Check Availability',
              groups: 'base.group_user',
              attrs: {
                invisible: "[('show_check_availability', '=', False)]"
              },
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_button_validate: {
            _attr: {
              name: 'button_validate',
              string: 'Validate',
              groups: 'stock.group_stock_user',
              attrs: {
                invisible: "['|', ('state', 'in', ('waiting', 'confirmed')), ('show_validate', '=', False)]"
              },
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_button_validate_966: {
            _attr: {
              name: 'button_validate',
              string: 'Validate',
              groups: 'stock.group_stock_user',
              attrs: {
                invisible: "['|', ('state', 'not in', ('waiting', 'confirmed')), ('show_validate', '=', False)]"
              },
              class: 'o_btn_validate',
              type: 'object'
            }
          },
          _button_action_set_quantities_to_reservation: {
            _attr: {
              name: 'action_set_quantities_to_reservation',
              string: 'Set quantities',
              groups: 'stock.group_stock_user',
              attrs: {
                invisible: "[('show_set_qty_button', '=', False)]"
              },
              class: 'o_btn_validate',
              type: 'object'
            }
          },
          _button_action_clear_quantities_to_zero: {
            _attr: {
              name: 'action_clear_quantities_to_zero',
              string: 'Clear quantities',
              groups: 'stock.group_stock_user',
              attrs: {
                invisible: "[('show_clear_qty_button', '=', False)]"
              },
              class: 'o_btn_validate',
              type: 'object'
            }
          },
          _widget_signature: {
            _attr: {
              name: 'signature',
              string: 'Sign',
              groups: 'stock.group_stock_sign_delivery',
              attrs: {
                invisible: "['|', '|', ('id', '=', False), ('picking_type_code', '!=', 'outgoing'), ('state', '!=', 'done')]"
              }
            }
          },
          _widget_signature_970: {
            _attr: {
              name: 'signature',
              string: 'Sign',
              groups: 'stock.group_stock_sign_delivery',
              attrs: {
                invisible: "['|', '|', ('id', '=', False), ('picking_type_code', '!=', 'outgoing'), ('state', '=', 'done')]"
              }
            }
          },
          _button_do_print_picking: {
            _attr: {
              name: 'do_print_picking',
              string: 'Print',
              groups: 'stock.group_stock_user',
              attrs: {
                invisible: "[('state', '!=', 'assigned')]"
              },
              type: 'object'
            }
          },
          _button_action_open_label_type: {
            _attr: {
              name: 'action_open_label_type',
              string: 'Print Labels',
              type: 'object'
            }
          },
          _button_action_report_delivery: {
            _attr: {
              name: 'action_report_delivery',
              string: 'Print',
              groups: 'base.group_user',
              attrs: {
                invisible: "[('state', '!=', 'done')]"
              },
              type: 'action'
            }
          },
          _button_act_stock_return_picking: {
            _attr: {
              name: 'act_stock_return_picking',
              string: 'Return',
              groups: 'base.group_user',
              attrs: {
                invisible: "[('state', '!=', 'done')]"
              },
              type: 'action'
            }
          },
          _button_do_unreserve: {
            _attr: {
              name: 'do_unreserve',
              string: 'Unreserve',
              groups: 'base.group_user',
              attrs: {
                invisible: "['|', '|', '|', ('picking_type_code', '=', 'incoming'), ('immediate_transfer', '=', True), '&', ('state', '!=', 'assigned'), ('move_type', '!=', 'one'), '&', ('state', 'not in', ('assigned', 'confirmed')), ('move_type', '=', 'one')]"
              },
              type: 'object'
            }
          },
          _button_button_scrap: {
            _attr: {
              name: 'button_scrap',
              string: 'Scrap',
              attrs: {
                invisible: "['|', '&', ('picking_type_code', '=', 'incoming'), ('state', '!=', 'done'), '&', ('picking_type_code', '=', 'outgoing'), ('state', '=', 'done')]"
              },
              type: 'object'
            }
          },
          _button_action_toggle_is_locked: {
            _attr: {
              name: 'action_toggle_is_locked',
              string: 'Unlock',
              groups: 'stock.group_stock_manager',
              attrs: {
                invisible: "['|', ('state', 'in', ('draft', 'cancel')), ('is_locked', '=', False)]"
              },
              type: 'object'
            }
          },
          _button_action_toggle_is_locked_219: {
            _attr: {
              name: 'action_toggle_is_locked',
              string: 'Lock',
              groups: 'stock.group_stock_manager',
              attrs: {
                invisible: "[('is_locked', '=', True)]"
              },
              type: 'object'
            }
          },
          state: {
            widget: 'statusbar'
          },
          _button_action_cancel: {
            _attr: {
              name: 'action_cancel',
              string: 'Cancel',
              groups: 'base.group_user',
              attrs: {
                invisible: "[('state', 'not in', ('assigned', 'confirmed', 'draft', 'waiting'))]"
              },
              type: 'object'
            }
          }
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          has_scrap_move: {
            invisible: 'True'
          },
          has_tracking: {
            invisible: 'True'
          },
          _button_action_see_move_scrap: {
            _attr: {
              name: 'action_see_move_scrap',
              string: 'Scraps',
              attrs: {
                invisible: "[('has_scrap_move', '=', False)]"
              },
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-arrows-v'
            }
          },
          _button_action_see_packages: {
            _attr: {
              name: 'action_see_packages',
              string: 'Packages',
              attrs: {
                invisible: "[('has_packages', '=', False)]"
              },
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-cubes'
            }
          },
          _button_action_stock_report: {
            _attr: {
              name: 'action_stock_report',
              string: 'Traceability',
              groups: 'stock.group_production_lot',
              attrs: {
                invisible: "['|', ('state', '!=', 'done'), ('has_tracking', '=', False)]"
              },
              class: 'oe_stat_button',
              type: 'action',
              icon: 'fa-arrow-up'
            }
          },
          _button_action_view_reception_report: {
            _attr: {
              name: 'action_view_reception_report',
              string: 'Allocation',
              groups: 'stock.group_reception_report',
              attrs: {
                invisible: "[('show_allocation', '=', False)]"
              },
              context: {
                default_picking_ids: "[<built-in function id>]"
              },
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-list'
            }
          },
          _button_action_picking_move_tree: {
            _attr: {
              name: 'action_picking_move_tree',
              groups: 'base.group_no_one',
              attrs: {
                invisible: "['|', '&', ('show_operations', '=', True), '|', ('is_locked', '=', True), ('state', '=', 'done'), '&', ('state', '=', 'done'), ('is_locked', '=', True)]"
              },
              context: {
                todo_ctx: "{'picking_type_code': picking_type_code, 'default_picking_id': id, 'form_view_ref':'stock.view_move_form', 'address_in_id': partner_id, 'default_picking_type_id': picking_type_id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id}"
              },
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-arrows-v'
            },
            _div: {
              _attr: {
                class: 'o_form_field o_stat_info'
              },
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
          _attr: {
            class: 'oe_title'
          },
          _h1: {
            _attr: {
              class: 'd-flex'
            },
            priority: {
              widget: 'priority',
              attrs: {
                invisible: "[('name', '=', '/')]"
              },
              class: 'me-3'
            },
            name: {
              attrs: {
                invisible: "[('name', '=', '/')]"
              }
            }
          }
        },
        _group: {
          _group: {
            _div: {
              _attr: {
                class: 'o_td_label'
              },
              _label_partner_id: {
                for: 'partner_id',
                string: 'Delivery Address',
                attrs: {
                  invisible: "[('picking_type_code', '!=', 'outgoing')]"
                }
              },
              _label_partner_id_355: {
                for: 'partner_id',
                string: 'Receive From',
                attrs: {
                  invisible: "[('picking_type_code', '!=', 'incoming')]"
                }
              },
              _label_partner_id_592: {
                for: 'partner_id',
                string: 'Contact',
                attrs: {
                  invisible: "[('picking_type_code', 'in', ['incoming', 'outgoing'])]"
                }
              }
            },
            partner_id: {},
            picking_type_id: {
              attrs: {
                invisible: "[('hide_picking_type', '=', True)]",
                readonly: "[('state', '!=', 'draft')]"
              }
            },
            location_id: {
              groups: '!stock.group_stock_multi_locations',
              invisible: '1'
            },
            location_dest_id: {
              groups: '!stock.group_stock_multi_locations',
              invisible: '1'
            },
            _field_location_id_475: {
              location_id: {
                groups: 'stock.group_stock_multi_locations',
                attrs: {
                  invisible: "[('picking_type_code', '=', 'incoming')]"
                },
                no_create: true
              }
            },
            _field_location_dest_id_288: {
              location_dest_id: {
                groups: 'stock.group_stock_multi_locations',
                attrs: {
                  invisible: "[('picking_type_code', '=', 'outgoing')]"
                },
                no_create: true
              }
            },
            backorder_id: {
              attrs: {
                invisible: "[('backorder_id', '=', False)]"
              }
            }
          },
          _group_280: {
            _label_scheduled_date: {
              for: 'scheduled_date'
            },
            _div: {
              _attr: {
                class: 'o_row'
              },
              scheduled_date: {
                attrs: {
                  required: "[('id', '!=', False)]"
                }
              },
              json_popover: {
                widget: 'stock_rescheduling_popover',
                attrs: {
                  invisible: "[('json_popover', '=', False)]"
                }
              }
            },
            date_deadline: {
              attrs: {
                invisible: "['|', ('state', 'in', ('done', 'cancel')), ('date_deadline', '=', False)]"
              }
            },
            products_availability_state: {
              invisible: '1'
            },
            products_availability: {
              attrs: {
                invisible: "['|', ('picking_type_code', '!=', 'outgoing'), ('state', 'not in', ['confirmed', 'waiting', 'assigned'])]"
              }
            },
            date_done: {
              string: 'Effective Date',
              attrs: {
                invisible: "[('state', '!=', 'done')]"
              }
            },
            origin: {
              placeholder: 'e.g. PO0032'
            },
            owner_id: {
              groups: 'stock.group_tracking_owner',
              attrs: {
                invisible: "[('picking_type_code', '!=', 'incoming')]"
              }
            }
          }
        },
        _notebook: {
          _page_detailed_operations: {
            _attr: {
              name: 'detailed_operations',
              string: 'Detailed Operations',
              attrs: {
                invisible: "[('show_operations', '=', False)]"
              }
            },
            move_line_nosuggest_ids: {
              attrs: {
                readonly: "['|', '|', ('show_operations', '=', False), ('state', '=', 'cancel'), '&', ('state', '=', 'done'), ('is_locked', '=', True)]",
                invisible: "[('show_reserved', '=', True)]"
              },
              context: {
                todo_ctx: "{'tree_view_ref': 'stock.view_stock_move_line_detailed_operation_tree', 'default_picking_id': id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}"
              }
            },
            move_line_ids_without_package: {
              attrs: {
                readonly: "['|', '|', ('show_operations', '=', False), ('state', '=', 'cancel'), '&', ('state', '=', 'done'), ('is_locked', '=', True)]",
                invisible: "[('show_reserved', '=', False)]"
              },
              context: {
                todo_ctx: "{'tree_view_ref': 'stock.view_stock_move_line_detailed_operation_tree', 'default_picking_id': id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}"
              }
            },
            package_level_ids_details: {
              attrs: {
                readonly: "[('state', '=', 'done')]",
                invisible: "['|', ('picking_type_entire_packs', '=', False), ('show_operations', '=', False)]"
              },
              context: {
                todo_ctx: "{'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}"
              }
            },
            _button_action_put_in_pack: {
              _attr: {
                name: 'action_put_in_pack',
                string: 'Put in Pack',
                groups: 'stock.group_tracking_lot',
                attrs: {
                  invisible: "[('state', 'in', ('draft', 'done', 'cancel'))]"
                },
                class: 'oe_highlight',
                type: 'object'
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
              attrs: {
                readonly: "['&', ('state', '=', 'done'), ('is_locked', '=', True)]"
              },
              context: {
                todo_ctx: "{'default_company_id': company_id, 'default_date': scheduled_date, 'default_date_deadline': date_deadline, 'picking_type_code': picking_type_code, 'default_picking_id': id, 'form_view_ref':'stock.view_move_form', 'address_in_id': partner_id, 'default_picking_type_id': picking_type_id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_partner_id': partner_id}"
              },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Stock Moves'
                      },
                      company_id: {
                        invisible: '1'
                      },
                      name: {
                        invisible: '1'
                      },
                      state: {
                        invisible: '1'
                      },
                      picking_type_id: {
                        invisible: '1'
                      },
                      location_id: {
                        invisible: '1'
                      },
                      location_dest_id: {
                        invisible: '1'
                      },
                      partner_id: {
                        invisible: '1'
                      },
                      scrapped: {
                        invisible: '1'
                      },
                      picking_code: {
                        invisible: '1'
                      },
                      product_type: {
                        invisible: '1'
                      },
                      show_details_visible: {
                        invisible: '1'
                      },
                      show_reserved_availability: {
                        invisible: '1'
                      },
                      show_operations: {
                        invisible: '1'
                      },
                      additional: {
                        invisible: '1'
                      },
                      move_lines_count: {
                        invisible: '1'
                      },
                      is_locked: {
                        invisible: '1'
                      },
                      product_uom_category_id: {
                        invisible: '1'
                      },
                      has_tracking: {
                        invisible: '1'
                      },
                      display_assign_serial: {
                        invisible: '1'
                      },
                      product_id: {
                        attrs: {
                          readonly: "['|', '&', ('state', '!=', 'draft'), ('additional', '=', False), ('move_lines_count', '>', 0)]"
                        },
                        context: {
                          default_detailed_type: 'product'
                        }
                      },
                      description_picking: {
                        string: 'Description'
                      },
                      date: {},
                      date_deadline: {},
                      is_initial_demand_editable: {
                        invisible: '1'
                      },
                      is_quantity_done_editable: {
                        invisible: '1'
                      },
                      product_packaging_id: {
                        groups: 'product.group_stock_packaging'
                      },
                      product_uom_qty: {
                        string: 'Demand',
                        attrs: {
                          column_invisible: "[('parent.immediate_transfer', '=', True)]",
                          readonly: "['|', ('is_initial_demand_editable', '=', False), '&', '&', ('show_operations', '=', True), ('is_locked', '=', True), ('is_initial_demand_editable', '=', False)]"
                        }
                      },
                      _button_action_product_forecast_report: {
                        _attr: {
                          name: 'action_product_forecast_report',
                          attrs: {
                            invisible: "['|', ('forecast_availability', '<', 0), '|', ('parent.immediate_transfer', '=', True), '&', ('parent.picking_type_code', '=', 'outgoing'), ('state', '!=', 'draft')]"
                          },
                          title: 'Forecast Report',
                          type: 'object',
                          icon: 'fa-area-chart'
                        }
                      },
                      _button_action_product_forecast_report_754: {
                        _attr: {
                          name: 'action_product_forecast_report',
                          attrs: {
                            invisible: "['|', ('forecast_availability', '>=', 0), '|', ('parent.immediate_transfer', '=', True), '&', ('parent.picking_type_code', '=', 'outgoing'), ('state', '!=', 'draft')]"
                          },
                          title: 'Forecast Report',
                          type: 'object',
                          icon: 'fa-area-chart text-danger'
                        }
                      },
                      forecast_expected_date: {
                        invisible: '1'
                      },
                      forecast_availability: {
                        string: 'Reserved',
                        widget: 'forecast_widget',
                        attrs: {
                          column_invisible: "['|', '|', ('parent.state', 'in', ['draft', 'done']), ('parent.picking_type_code', '!=', 'outgoing'), ('parent.immediate_transfer', '=', True)]"
                        }
                      },
                      reserved_availability: {
                        string: 'Reserved',
                        attrs: {
                          column_invisible: "['|', '|', ('parent.state', 'in', ['draft', 'done']), ('parent.picking_type_code', 'in', ['incoming', 'outgoing']), ('parent.immediate_transfer', '=', True)]"
                        }
                      },
                      product_qty: {
                        invisible: '1'
                      },
                      quantity_done: {
                        string: 'Done',
                        attrs: {
                          readonly: "[('product_id', '=', False)]",
                          column_invisible: "[('parent.state', '=', 'draft'), ('parent.immediate_transfer', '=', False)]"
                        }
                      },
                      product_uom: {
                        string: 'Unit of Measure',
                        groups: 'uom.group_uom',
                        attrs: {
                          readonly: "[('state', '!=', 'draft'), ('additional', '=', False)]"
                        },
                        no_open: true,
                        no_create: true
                      },
                      lot_ids: {
                        widget: 'many2many_tags',
                        groups: 'stock.group_production_lot',
                        domain: {
                          todo_ctx: "[('product_id','=',product_id)]"
                        },
                        attrs: {
                          invisible: "['|', ('show_details_visible', '=', False), ('has_tracking', '!=', 'serial')]"
                        },
                        context: {
                          todo_ctx: "{'default_company_id': company_id, 'default_product_id': product_id, 'active_picking_id': parent.id}"
                        },
                        create: "[('parent.use_create_lots', '=', True)]"
                      },
                      _button_action_show_details: {
                        _attr: {
                          name: 'action_show_details',
                          attrs: {
                            invisible: "[('show_details_visible', '=', False)]"
                          },
                          title: 'Details',
                          type: 'object',
                          icon: 'fa-list'
                        }
                      },
                      _button_action_assign_serial: {
                        _attr: {
                          name: 'action_assign_serial',
                          attrs: {
                            invisible: "['|', ('display_assign_serial', '=', False), ('show_operations', '=', False)]"
                          },
                          title: 'Assign Serial Numbers',
                          type: 'object',
                          icon: 'fa-plus-square'
                        }
                      }
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Stock Moves'
                      },
                      _header: {
                        state: {
                          widget: 'statusbar'
                        }
                      },
                      _group: {
                        product_uom_category_id: {
                          invisible: '1'
                        },
                        additional: {
                          invisible: '1'
                        },
                        move_lines_count: {
                          invisible: '1'
                        },
                        company_id: {
                          invisible: '1'
                        },
                        product_id: {
                          attrs: {
                            readonly: "['|', '&', ('state', '!=', 'draft'), ('additional', '=', False), ('move_lines_count', '>', 0)]"
                          }
                        },
                        is_initial_demand_editable: {
                          invisible: '1'
                        },
                        is_quantity_done_editable: {
                          invisible: '1'
                        },
                        product_uom_qty: {
                          attrs: {
                            invisible: "[('parent.immediate_transfer', '=', True)]",
                            readonly: "[('is_initial_demand_editable', '=', False)]"
                          }
                        },
                        reserved_availability: {
                          string: 'Reserved',
                          attrs: {
                            invisible: "['|', '|', ('parent.state', '=', 'done'), ('parent.picking_type_code', 'in', ['outgoing', 'incoming']), ('parent.immediate_transfer', '=', True)]"
                          }
                        },
                        product_qty: {
                          invisible: '1'
                        },
                        forecast_expected_date: {
                          invisible: '1'
                        },
                        forecast_availability: {
                          string: 'Reserved',
                          widget: 'forecast_widget',
                          attrs: {
                            invisible: "['|', ('parent.picking_type_code', '!=', 'outgoing'), ('parent.state', '=', 'done')]"
                          }
                        },
                        quantity_done: {
                          string: 'Done',
                          attrs: {
                            readonly: "[('is_quantity_done_editable', '=', False)]"
                          }
                        },
                        product_uom: {
                          string: 'Unit of Measure',
                          groups: 'uom.group_uom',
                          attrs: {
                            readonly: "[('state', '!=', 'draft'), ('id', '!=', False)]"
                          },
                          no_open: true,
                          no_create: true
                        },
                        description_picking: {
                          string: 'Description'
                        }
                      }
                    }
                  }
                }
              }
            },
            id: {
              invisible: '1'
            },
            package_level_ids: {
              attrs: {
                readonly: "[('state', '=', 'done')]",
                invisible: "['|', ('picking_type_entire_packs', '=', False), ('show_operations', '=', True)]"
              },
              context: {
                todo_ctx: "{'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}"
              }
            },
            _button_action_put_in_pack: {
              _attr: {
                name: 'action_put_in_pack',
                string: 'Put in Pack',
                groups: 'stock.group_tracking_lot',
                attrs: {
                  invisible: "[('state', 'in', ('draft', 'done', 'cancel'))]"
                },
                class: 'oe_highlight',
                type: 'object'
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
                picking_type_code: {
                  invisible: '1'
                },
                move_type: {
                  attrs: {
                    invisible: "[('picking_type_code', '=', 'incoming')]"
                  }
                },
                user_id: {
                  domain: "[('share', '=', False)]"
                },
                group_id: {
                  groups: 'base.group_no_one'
                },
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
        string: 'Transfer'
      },
      partner_id: {},
      origin: {},
      product_id: {},
      picking_type_id: {},
      move_line_ids: {
        string: 'Package',
        groups: 'stock.group_tracking_lot'
      },
      _filter_to_do_transfers: {
        _attr: {
          name: 'to_do_transfers',
          string: 'To Do',
          domain: {
            todo_ctx: "[('user_id', 'in', [uid, False])]"
          }
        }
      },
      _filter_my_transfers: {
        _attr: {
          name: 'my_transfers',
          string: 'My Transfers',
          domain: {
            todo_ctx: "[('user_id', '=', uid)]"
          }
        }
      },
      _filter_starred: {
        _attr: {
          name: 'starred',
          string: 'Starred',
          domain: "[('priority', '=', '1')]"
        }
      },
      _separator: {},
      _filter_draft: {
        _attr: {
          name: 'draft',
          string: 'Draft',
          domain: "[('state', '=', 'draft')]"
        }
      },
      _filter_waiting: {
        _attr: {
          name: 'waiting',
          string: 'Waiting',
          domain: "[('state', 'in', ('confirmed', 'waiting'))]"
        }
      },
      _filter_available: {
        _attr: {
          name: 'available',
          string: 'Ready',
          domain: "[('state', '=', 'assigned')]"
        }
      },
      _filter_done: {
        _attr: {
          name: 'done',
          string: 'Done',
          domain: "[('state', '=', 'done')]"
        }
      },
      _filter_cancel: {
        _attr: {
          name: 'cancel',
          string: 'Cancelled',
          domain: "[('state', '=', 'cancel')]"
        }
      },
      _separator_341: {},
      _filter_late: {
        _attr: {
          name: 'late',
          string: 'Late',
          domain: {
            todo_ctx: "[('state', 'in', ('assigned', 'waiting', 'confirmed')), '|', '|', ('has_deadline_issue', '=', True), ('date_deadline', '<', current_date), ('scheduled_date', '<', current_date)]"
          }
        }
      },
      _filter_planning_issues: {
        _attr: {
          name: 'planning_issues',
          string: 'Planning Issues',
          domain: {
            todo_ctx: "['|', ('delay_alert_date', '!=', False), '&', ('scheduled_date','<', time.strftime('%Y-%m-%d %H:%M:%S')), ('state', 'in', ('assigned', 'waiting', 'confirmed'))]"
          }
        }
      },
      _separator_374: {},
      _filter_backorder: {
        _attr: {
          name: 'backorder',
          string: 'Backorders',
          domain: "[('backorder_id', '!=', False), ('state', 'in', ('assigned', 'waiting', 'confirmed'))]"
        }
      },
      _separator_559: {},
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _filter_activities_today: {
        _attr: {
          name: 'activities_today',
          string: 'Today Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _filter_activities_upcoming_all: {
        _attr: {
          name: 'activities_upcoming_all',
          string: 'Future Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _separator_262: {},
      _filter_activities_exception: {
        _attr: {
          name: 'activities_exception',
          string: 'Warnings',
          domain: "[('activity_exception_decoration', '!=', False)]"
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_status: {
          _attr: {
            name: 'status',
            string: 'Status',
            domain: [],
            context: {
              group_by: 'state'
            }
          }
        },
        _filter_expected_date: {
          _attr: {
            name: 'expected_date',
            string: 'Scheduled Date',
            domain: [],
            context: {
              group_by: 'scheduled_date'
            }
          }
        },
        _filter_origin: {
          _attr: {
            name: 'origin',
            string: 'Source Document',
            domain: [],
            context: {
              group_by: 'origin'
            }
          }
        },
        _filter_picking_type: {
          _attr: {
            name: 'picking_type',
            string: 'Operation Type',
            domain: [],
            context: {
              group_by: 'picking_type_id'
            }
          }
        }
      }
    }
  },

  action_picking_tree_all: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Transfers',
    type: 'ir.actions.act_window',
    search_view_id: 'view_picking_internal_search',
    res_model: 'stock.picking',
    domain: [],
    context: {
      todo_ctx: "{'contact_display': 'partner_address', 'default_company_id': allowed_company_ids[0]}"
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  stock_picking_action_picking_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'All Transfers',
    type: 'ir.actions.act_window',
    search_view_id: 'view_picking_internal_search',
    res_model: 'stock.picking',
    domain: [],
    context: {
      contact_display: 'partner_address'
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_picking_tree_ready: {
    _odoo_model: 'ir.actions.act_window',
    name: 'To Do',
    type: 'ir.actions.act_window',
    search_view_id: 'view_picking_internal_search',
    res_model: 'stock.picking',
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
    search_view_id: 'view_picking_internal_search',
    res_model: 'stock.picking',
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
    search_view_id: 'view_picking_internal_search',
    res_model: 'stock.picking',
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
    search_view_id: 'view_picking_internal_search',
    res_model: 'stock.picking',
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
    search_view_id: 'view_picking_internal_search',
    res_model: 'stock.picking',
    domain: [],
    context: {
      todo_ctx: "{\n                    'search_default_picking_type_id': [active_id],\n                    'default_picking_type_id': active_id,\n                    'contact_display': 'partner_address',\n            }\n            "
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  do_view_pickings: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Transfers for Groups',
    res_model: 'stock.picking',
    domain: "[('group_id','=',active_id)]",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}