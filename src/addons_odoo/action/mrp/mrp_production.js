export default {
  mrp_production_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.production',
    type: 'tree',
    arch: {
      sheet: {
        // _header: {
        //   _button_button_plan: {
        //     _attr: {
        //       name: 'button_plan',
        //       type: 'object',
        //       string: 'Plan'
        //     }
        //   },
        //   _button_do_unreserve: {
        //     _attr: {
        //       name: 'do_unreserve',
        //       type: 'object',
        //       string: 'Unreserve'
        //     }
        //   },
        //   _button_action_cancel: {
        //     _attr: {
        //       name: 'action_cancel',
        //       type: 'object',
        //       string: 'Cancel'
        //     }
        //   }
        // },
        // company_id: { invisible: '1' },
        product_uom_category_id: { invisible: '1' },
        priority: { widget: 'priority', optional: 'show' },
        message_needaction: { invisible: '1' },
        name: {},
        date_planned_start: { widget: 'remaining_days', optional: 'show' },
        date_deadline: {
          widget: 'remaining_days',
          optional: 'hide',
          invisible({ record }) {
            // invisible: [['state', 'in', ['done', 'cancel']]]
            const { state } = record
            return ['done', 'cancel'].includes(state)
          }
        },
        product_id: { readonly: '1', optional: 'show' },
        lot_producing_id: { optional: 'hide' },
        bom_id: { readonly: '1', optional: 'hide' },
        activity_ids: { widget: 'list_activity', optional: 'show' },
        origin: { optional: 'show' },
        user_id: { widget: 'many2one_avatar_user', optional: 'hide' },
        components_availability_state: {
          invisible: '1',
          options: '{"lazy": true}'
        },
        components_availability: {
          invisible({ record }) {
            // invisible: [['state', 'not in', ['confirmed', 'progress']]],
            const { state } = record
            return !['confirmed', 'progress'].includes(state)
          },
          optional: 'show',
          options: '{"lazy": true}'
        },
        reservation_state: { optional: 'hide' },
        product_qty: { readonly: '1', optional: 'show' },
        product_uom_id: {
          readonly: '1',
          optional: 'show',
          no_open: true,
          no_create: true
        },
        production_duration_expected: {
          widget: 'float_time',
          optional: 'show',
          invisible({ record }) {
            // invisible: [['production_duration_expected', '=', 0]],
            const { production_duration_expected } = record
            return !production_duration_expected
          }
        },
        production_real_duration: {
          widget: 'float_time',
          optional: 'show',
          invisible({ record }) {
            // invisible: [['production_real_duration', '=', 0]],
            const { production_real_duration } = record
            return !production_real_duration
          }
        },
        company_id: { readonly: '1', optional: 'show' },
        state: { widget: 'badge', class: 'text-dark', optional: 'show' },
        activity_exception_decoration: { widget: 'activity_exception' },
        delay_alert_date: { invisible: '1' },
        json_popover: {
          widget: 'stock_rescheduling_popover',
          invisible({ record }) {
            // invisible: [['json_popover', '=', false]]
            const { json_popover } = record
            return !json_popover
          }
        }
      }
    }
  },

  mrp_production_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.production',
    type: 'form',
    arch: {
      header: {
        buttons: {
          _button_button_mark_done: {
            name: 'button_mark_done',
            type: 'object',
            string: 'Validate',
            invisible: [
              '|',
              '|',
              ['state', 'in', ('draft', 'cancel', 'done', 'to_close')],
              ['qty_producing', '=', 0],
              ['move_raw_ids', '!=', []]
            ],
            class: 'oe_highlight'
          },
          _button_button_mark_done_373: {
            name: 'button_mark_done',
            type: 'object',
            string: 'Validate',
            invisible: [
              '|',
              '|',
              ['state', 'in', ('draft', 'cancel', 'done', 'to_close')],
              ['qty_producing', '=', 0],
              ['move_raw_ids', '=', []]
            ],
            class: 'oe_highlight'
          },
          _button_button_mark_done_206: {
            name: 'button_mark_done',
            type: 'object',
            string: 'Mark as Done',
            invisible: [
              '|',
              ['move_raw_ids', '=', []],
              '&',
              '|',
              ['state', 'not in', ('confirmed', 'progress')],
              ['qty_producing', '!=', 0],
              ['state', '!=', 'to_close']
            ],
            class: 'oe_highlight'
          },
          _button_button_mark_done_865: {
            name: 'button_mark_done',
            type: 'object',
            string: 'Mark as Done',
            invisible: [
              '|',
              ['move_raw_ids', '!=', []],
              '&',
              '|',
              ['state', 'not in', ('confirmed', 'progress')],
              ['qty_producing', '!=', 0],
              ['state', '!=', 'to_close']
            ],
            class: 'oe_highlight'
          },
          _button_action_confirm: {
            name: 'action_confirm',
            type: 'object',
            string: 'Confirm',
            invisible: [['state', '!=', 'draft']],
            class: 'oe_highlight'
          },
          _button_button_plan: {
            name: 'button_plan',
            type: 'object',
            string: 'Plan',
            invisible: [
              '|',
              '|',
              ['state', 'not in', ('confirmed', 'progress', 'to_close')],
              ['workorder_ids', '=', []],
              ['is_planned', '=', true]
            ],
            class: 'oe_highlight'
          },
          _button_button_unplan: {
            name: 'button_unplan',
            type: 'object',
            string: 'Unplan',
            invisible: [
              '|',
              ['is_planned', '=', false],
              ['state', '=', 'cancel']
            ]
          },
          _button_action_assign: {
            name: 'action_assign',
            type: 'object',
            string: 'Check availability',
            invisible: [
              '|',
              ['state', 'in', ('draft', 'done', 'cancel')],
              ['reserve_visible', '=', false]
            ]
          },
          _button_do_unreserve: {
            name: 'do_unreserve',
            type: 'object',
            string: 'Unreserve',
            invisible: [['unreserve_visible', '=', false]]
          },
          _button_button_scrap: {
            name: 'button_scrap',
            type: 'object',
            string: 'Scrap',
            invisible: [['state', 'in', ('cancel', 'draft')]]
          },

          _button_action_toggle_is_locked: {
            name: 'action_toggle_is_locked',
            type: 'object',
            string: 'Unlock',
            help: 'Unlock the manufacturing order to adjust what has been consumed or produced.',
            groups: 'mrp.group_mrp_manager',
            invisible: [
              '|',
              ['show_lock', '=', false],
              ['is_locked', '=', false]
            ]
          },
          _button_action_toggle_is_locked_999: {
            name: 'action_toggle_is_locked',
            type: 'object',
            string: 'Lock',
            help: 'Lock the manufacturing order to prevent changes to what has been consumed or produced.',
            groups: 'mrp.group_mrp_manager',
            invisible: [
              '|',
              ['show_lock', '=', false],
              ['is_locked', '=', true]
            ]
          },
          _button_action_serial_mass_produce_wizard: {
            name: 'action_serial_mass_produce_wizard',
            type: 'object',
            string: 'Mass Produce',
            invisible: [['show_serial_mass_produce', '=', false]]
          },
          _button_action_cancel: {
            name: 'action_cancel',
            type: 'object',
            string: 'Cancel',
            invisible: [
              '|',
              '|',
              ['id', '=', false],
              ['state', 'in', ('done', 'cancel')],
              ['confirm_cancel', '=', true]
            ]
          },
          _button_action_cancel_621: {
            name: 'action_cancel',
            type: 'object',
            string: 'Cancel',
            invisible: [
              '|',
              '|',
              ['id', '=', false],
              ['state', 'in', ('done', 'cancel')],
              ['confirm_cancel', '=', false]
            ]
          },
          _button_button_unbuild: {
            name: 'button_unbuild',
            type: 'object',
            string: 'Unbuild',
            invisible: [['state', '!=', 'done']]
          }
        },

        fields: {
          confirm_cancel: { invisible: '1' },
          show_lock: { invisible: '1' },
          show_serial_mass_produce: { invisible: '1' },

          state: {
            widget: 'statusbar',
            statusbar_visible: 'draft,confirmed,progress,done'
          }
        }
      },
      sheet: {
        reservation_state: { invisible: '1' },
        date_planned_finished: { invisible: '1' },
        is_locked: { invisible: '1' },
        qty_produced: { invisible: '1' },
        unreserve_visible: { invisible: '1' },
        reserve_visible: { invisible: '1' },
        consumption: { invisible: '1' },
        is_planned: { invisible: '1' },
        show_allocation: { invisible: '1' },
        workorder_ids: { invisible: '1' },
        _div_button_box: {
          _attr: { name: 'button_box', class: 'oe_button_box' },
          _button_action_view_reception_report: {
            _attr: {
              name: 'action_view_reception_report',
              type: 'object',
              string: 'Allocation',
              icon: 'fa-list',
              groups: 'mrp.group_mrp_reception_report',
              invisible: [['show_allocation', '=', false]],
              class: 'oe_stat_button'
            }
          },
          _button_action_view_mrp_production_childs: {
            _attr: {
              name: 'action_view_mrp_production_childs',
              type: 'object',
              icon: 'fa-wrench',
              invisible: [['mrp_production_child_count', '=', 0]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                mrp_production_child_count: {}
              },
              _span_484: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Child MO'
                }
              }
            }
          },
          _button_action_view_mrp_production_sources: {
            _attr: {
              name: 'action_view_mrp_production_sources',
              type: 'object',
              icon: 'fa-wrench',
              invisible: [['mrp_production_source_count', '=', 0]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                mrp_production_source_count: {}
              },
              _span_331: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Source MO'
                }
              }
            }
          },
          _button_action_view_mrp_production_backorders: {
            _attr: {
              name: 'action_view_mrp_production_backorders',
              type: 'object',
              icon: 'fa-wrench',
              invisible: [['mrp_production_backorder_count', '<', 2]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                mrp_production_backorder_count: {}
              },
              _span_701: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Backorders'
                }
              }
            }
          },
          _button_action_view_mrp_production_unbuilds: {
            _attr: {
              name: 'action_view_mrp_production_unbuilds',
              type: 'object',
              icon: 'fa-undo',
              invisible: [['unbuild_count', '=', 0]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                unbuild_count: {}
              },
              _span_883: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Unbuilds'
                }
              }
            }
          },
          _button_action_see_move_scrap: {
            _attr: {
              name: 'action_see_move_scrap',
              type: 'object',
              icon: 'fa-arrows-v',
              invisible: [['scrap_count', '=', 0]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                scrap_count: {}
              },
              _span_853: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Scraps'
                }
              }
            }
          },
          _button_action_view_mo_delivery: {
            _attr: {
              name: 'action_view_mo_delivery',
              type: 'object',
              icon: 'fa-truck',
              groups: 'base.group_user',
              invisible: [['delivery_count', '=', 0]],
              class: 'oe_stat_button'
            },
            delivery_count: {
              string: 'Transfers',
              widget: 'statinfo'
            }
          },
          _button_stock__action_stock_report: {
            _attr: {
              name: 'stock.action_stock_report',
              type: 'action',
              string: 'Traceability',
              icon: 'fa-arrow-up',
              groups: 'stock.group_production_lot',
              states: 'done',
              class: 'oe_stat_button'
            }
          },
          _button_action_mrp_production_moves: {
            _attr: {
              name: 'action_mrp_production_moves',
              type: 'action',
              string: 'Product Moves',
              icon: 'fa-exchange',
              invisible: [['state', 'not in', ('progress', 'done')]],
              class: 'oe_stat_button'
            }
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _h1: {
            _attr: { class: 'd-flex' },
            priority: { widget: 'priority', class: 'me-3' },
            name: {}
          }
        },
        _group: {
          _group: {
            id: { invisible: '1' },
            use_create_components_lots: { invisible: '1' },
            show_lot_ids: { invisible: '1' },
            product_tracking: { invisible: '1' },
            product_id: {},
            product_tmpl_id: { invisible: '1' },
            forecasted_issue: { invisible: '1' },
            company_id: { invisible: '1' },
            product_description_variants: {
              invisible({ record }) {
                // invisible: [['product_description_variants', 'in', (false, '')]]
                const { product_description_variants } = record
                return !product_description_variants
              }
            },
            _label_bom_id: { for: 'bom_id' },
            _div_bom_div: {
              _attr: { name: 'bom_div', class: 'o_row' },
              bom_id: {}
            },
            _label_product_qty: { for: 'product_qty', string: 'Quantity' },
            _div: {
              _attr: { class: 'o_row g-0 d-flex' },
              _div: {
                _attr: {
                  invisible: [['state', '=', 'draft']],
                  class: 'o_row flex-grow-0',
                  text: '/'
                },
                qty_producing: { class: 'text-start' }
              },
              product_qty: {
                invisible: [['state', 'not in', ('draft', 'done')]],
                class: 'oe_inline text-start'
              },
              _button_mrp__action_change_production_qty: {
                _attr: {
                  name: 'mrp.action_change_production_qty',
                  type: 'action',
                  invisible: [
                    '|',
                    ['state', 'in', ('draft', 'done', 'cancel')],
                    ['id', '=', false]
                  ],
                  context: { default_mo_id: 'todo===id' },
                  class: 'oe_link oe_inline'
                },
                product_qty: { class: 'oe_inline' }
              },
              _label_product_uom_id: {
                for: 'product_uom_id',
                class: 'oe_inline'
              },
              product_uom_category_id: { invisible: '1' },

              product_uom_id: {
                no_open: true,
                no_create: true
              },
              _span: {
                _attr: { class: 'fw-bold', text: 'To Produce' }
              },
              _button_action_product_forecast_report: {
                _attr: {
                  name: 'action_product_forecast_report',
                  type: 'object',
                  title: 'Forecast Report',
                  icon: 'fa-area-chart',
                  invisible: [['forecasted_issue', '=', true]]
                }
              },
              _button_action_product_forecast_report_392: {
                _attr: {
                  name: 'action_product_forecast_report',
                  type: 'object',
                  title: 'Forecast Report',
                  icon: 'fa-area-chart',
                  invisible: [['forecasted_issue', '=', false]],
                  class: 'text-danger'
                }
              }
            },
            _label_lot_producing_id: {
              for: 'lot_producing_id',
              invisible: [
                '|',
                ['state', '=', 'draft'],
                ['product_tracking', 'in', ('none', false)]
              ]
            },
            _div_470: {
              _attr: {
                invisible: [
                  '|',
                  ['state', '=', 'draft'],
                  ['product_tracking', 'in', ('none', false)]
                ],
                class: 'o_row'
              },
              lot_producing_id: {
                invisible: [['product_tracking', 'in', ('none', false)]]
              },
              _button_action_generate_serial: {
                _attr: {
                  name: 'action_generate_serial',
                  type: 'object',
                  title: 'Creates a new serial/lot number',
                  invisible: [
                    '|',
                    ['product_tracking', 'in', ('none', false)],
                    ['lot_producing_id', '!=', false]
                  ],
                  class: 'btn btn-primary fa fa-plus-square-o'
                }
              }
            }
          },
          _group_group_extra_info: {
            _attr: { name: 'group_extra_info' },
            _label_date_planned_start: { for: 'date_planned_start' },
            _div: {
              _attr: { class: 'o_row' },
              date_planned_start: {},
              delay_alert_date: { invisible: '1' },
              json_popover: {
                widget: 'stock_rescheduling_popover',
                invisible: [['json_popover', '=', false]]
              }
            },
            components_availability_state: { invisible: '1' },
            components_availability: {
              invisible: [['state', 'not in', ['confirmed', 'progress']]]
            },
            user_id: {},
            company_id: { force_save: '1', no_create: true },
            show_final_lots: { invisible: '1' },
            production_location_id: { invisible: '1' },
            move_finished_ids: {
              invisible: '1',

              views: {
                tree: {
                  arch: {
                    sheet: {
                      product_id: {},
                      product_uom_qty: {},
                      product_uom: {},
                      operation_id: {},
                      byproduct_id: {},
                      name: {},
                      date_deadline: {},
                      picking_type_id: {},
                      location_id: {},
                      location_dest_id: {},
                      company_id: {},
                      warehouse_id: {},
                      origin: {},
                      group_id: {},
                      propagate_cancel: {},
                      move_dest_ids: {},
                      state: {},
                      product_uom_category_id: {},
                      allowed_operation_ids: {},
                      quantity_done: {},
                      cost_share: {}
                    }
                  }
                }
              }
            }
          }
        },
        _notebook: {
          _page_components: {
            _attr: { name: 'components', string: 'Components' },
            move_raw_ids: {
              // delete: [['state', '=', 'draft']],
              views: {
                tree: {
                  arch: {
                    sheet: {
                      product_id: {
                        readonly: [
                          '|',
                          '|',
                          ['move_lines_count', '>', 0],
                          ['state', '=', 'cancel'],
                          '&',
                          ['state', '!=', 'draft'],
                          ['additional', '=', false]
                        ],
                        context: { default_detailed_type: 'product' },
                        required: '1',
                        force_save: '1'
                      },
                      location_id: {
                        string: 'From',
                        groups: 'stock.group_stock_multi_locations',
                        readonly: '1',
                        optional: 'show',
                        force_save: '1'
                      },
                      product_uom: { invisible: '1' },
                      propagate_cancel: { invisible: '1' },
                      price_unit: { invisible: '1' },
                      company_id: { invisible: '1' },
                      product_uom_category_id: { invisible: '1' },
                      name: { invisible: '1' },
                      allowed_operation_ids: { invisible: '1' },
                      unit_factor: { invisible: '1' },
                      date_deadline: {
                        invisible: '1',
                        force_save: '1'
                      },
                      date: { invisible: '1' },
                      additional: { invisible: '1' },
                      picking_type_id: { invisible: '1' },
                      has_tracking: { invisible: '1' },
                      operation_id: { invisible: '1' },
                      is_done: { invisible: '1' },
                      bom_line_id: { invisible: '1' },
                      sequence: { invisible: '1' },
                      warehouse_id: { invisible: '1' },
                      is_locked: { invisible: '1' },
                      move_lines_count: { invisible: '1' },
                      location_dest_id: {
                        invisible: '1',
                        domain: {
                          todo_ctx:
                            "[('id', 'child_of', parent.location_dest_id)]"
                        }
                      },
                      state: {
                        invisible: '1',
                        force_save: '1'
                      },
                      should_consume_qty: { invisible: '1' },
                      product_uom_qty: {
                        string: 'To Consume',
                        widget: 'mrp_should_consume',
                        readonly: [
                          '&',
                          ['parent.state', '!=', 'draft'],
                          '|',
                          '&',
                          [
                            'parent.state',
                            'not in',
                            ('confirmed', 'progress', 'to_close')
                          ],
                          ['parent.is_planned', '!=', true],
                          ['parent.is_locked', '=', true]
                        ],
                        force_save: '1'
                      },
                      _field_product_uom_129: {
                        product_uom: {
                          groups: 'uom.group_uom',
                          readonly: [
                            ['state', '!=', 'draft'],
                            ['id', '!=', false]
                          ],
                          no_open: true,
                          no_create: true
                        }
                      },
                      product_type: { invisible: '1' },
                      product_qty: {
                        invisible: '1',
                        readonly: '1'
                      },
                      reserved_availability: { invisible: '1' },
                      forecast_expected_date: { invisible: '1' },
                      _button_action_product_forecast_report: {
                        _attr: {
                          name: 'action_product_forecast_report',
                          type: 'object',
                          title: 'Forecast Report',
                          icon: 'fa-area-chart',
                          column_invisible: [['parent.state', '!=', 'draft']],
                          invisible: [['forecast_availability', '<', 0]]
                        }
                      },
                      _button_action_product_forecast_report_112: {
                        _attr: {
                          name: 'action_product_forecast_report',
                          type: 'object',
                          title: 'Forecast Report',
                          icon: 'fa-area-chart text-danger',
                          column_invisible: [['parent.state', '!=', 'draft']],
                          invisible: [['forecast_availability', '>=', 0]]
                        }
                      },
                      forecast_availability: {
                        string: 'Reserved',
                        widget: 'forecast_widget',
                        column_invisible: [
                          ['parent.state', 'in', ('draft', 'done')]
                        ]
                      },
                      quantity_done: {
                        string: 'Consumed',
                        column_invisible: [['parent.state', '=', 'draft']],
                        readonly: [['has_tracking', '!=', 'none']],
                        class: 'o_manual_consumption',
                        force_save: '1'
                      },
                      manual_consumption: {
                        invisible: '1',
                        force_save: '1'
                      },
                      show_details_visible: { invisible: '1' },
                      lot_ids: {
                        string: 'Lot/Serial Numbers',
                        widget: 'many2many_tags',
                        groups: 'stock.group_production_lot',
                        domain: { todo_ctx: "[('product_id','=',product_id)]" },
                        invisible: [
                          '|',
                          ['show_details_visible', '=', false],
                          ['parent.state', '=', 'draft']
                        ],
                        column_invisible: [['parent.show_lot_ids', '=', false]],
                        context: {
                          todo_ctx:
                            "{'default_company_id': company_id, 'default_product_id': product_id}"
                        },
                        readonly: '1',
                        optional: 'hide',
                        create: [
                          ['parent.use_create_components_lots', '!=', false]
                        ],
                        help: 'Displays the consumed Lot/Serial Numbers.'
                      },
                      group_id: { invisible: '1' },
                      _button_action_show_details: {
                        _attr: {
                          name: 'action_show_details',
                          type: 'object',
                          title: 'Show Details',
                          icon: 'fa-list',
                          invisible: [
                            '|',
                            ['show_details_visible', '=', false],
                            ['has_tracking', '=', 'none']
                          ],
                          context: { default_product_uom_qty: 0 }
                        }
                      },
                      _button_action_show_details_244: {
                        _attr: {
                          name: 'action_show_details',
                          type: 'object',
                          title: 'Show Details',
                          icon: 'fa-list',
                          invisible: [
                            '|',
                            ['has_tracking', '!=', 'none'],
                            ['show_details_visible', '=', false]
                          ],
                          context: { default_product_uom_qty: 0 },
                          class: 'o_optional_button btn btn-light'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          _page_operations: {
            _attr: {
              name: 'operations',
              string: 'Work Orders',
              groups: 'mrp.group_mrp_routings'
            },
            workorder_ids: {}
          },
          _page_finished_products: {
            _attr: {
              name: 'finished_products',
              string: 'By-Products',
              groups: 'mrp.group_mrp_byproducts'
            },
            move_byproduct_ids: {
              // delete: [['state', '=', 'draft']],
              views: {
                tree: {
                  arch: {
                    sheet: {
                      product_id: {
                        domain: {
                          todo_ctx: "[('id', '!=', parent.product_id)]"
                        },
                        context: { default_detailed_type: 'product' },
                        required: '1'
                      },
                      location_dest_id: {
                        string: 'To',
                        groups: 'stock.group_stock_multi_locations',
                        readonly: '1',
                        force_save: '1'
                      },
                      company_id: { invisible: '1' },
                      product_uom_category_id: { invisible: '1' },
                      name: { invisible: '1' },
                      allowed_operation_ids: { invisible: '1' },
                      unit_factor: { invisible: '1' },
                      date: { invisible: '1' },
                      date_deadline: {
                        invisible: '1',
                        force_save: '1'
                      },
                      additional: { invisible: '1' },
                      picking_type_id: { invisible: '1' },
                      has_tracking: { invisible: '1' },
                      operation_id: { invisible: '1' },
                      is_done: { invisible: '1' },
                      bom_line_id: { invisible: '1' },
                      sequence: { invisible: '1' },
                      location_id: { invisible: '1' },
                      warehouse_id: { invisible: '1' },
                      is_locked: { invisible: '1' },
                      move_lines_count: { invisible: '1' },
                      state: {
                        invisible: '1',
                        force_save: '1'
                      },
                      product_uom_qty: {
                        string: 'To Produce',
                        readonly: [
                          '&',
                          ['parent.state', '!=', 'draft'],
                          '|',
                          '&',
                          [
                            'parent.state',
                            'not in',
                            ('confirmed', 'progress', 'to_close')
                          ],
                          ['parent.is_planned', '!=', true],
                          ['parent.is_locked', '=', true]
                        ],
                        force_save: '1'
                      },
                      quantity_done: {
                        string: 'Produced',
                        column_invisible: [['parent.state', '=', 'draft']],
                        readonly: [['has_tracking', '=', true]]
                      },
                      product_uom: { groups: 'uom.group_uom' },
                      cost_share: { optional: 'hide' },
                      show_details_visible: { invisible: '1' },
                      lot_ids: {
                        widget: 'many2many_tags',
                        groups: 'stock.group_production_lot',
                        domain: { todo_ctx: "[('product_id','=',product_id)]" },
                        invisible: [
                          '|',
                          '|',
                          ['show_details_visible', '=', false],
                          ['has_tracking', '!=', 'serial'],
                          ['parent.state', '=', 'draft']
                        ],
                        context: {
                          todo_ctx:
                            "{'default_company_id': company_id, 'default_product_id': product_id}"
                        },
                        create: [
                          ['parent.use_create_components_lots', '!=', false]
                        ]
                      },
                      _button_action_show_details: {
                        _attr: {
                          name: 'action_show_details',
                          type: 'object',
                          title: 'Show Details',
                          icon: 'fa-list',
                          invisible: [
                            '|',
                            ['has_tracking', '=', 'none'],
                            ['show_details_visible', '=', false]
                          ]
                        }
                      },
                      _button_action_show_details_537: {
                        _attr: {
                          name: 'action_show_details',
                          type: 'object',
                          title: 'Show Details',
                          icon: 'fa-list',
                          invisible: [
                            '|',
                            ['has_tracking', '!=', 'none'],
                            ['show_details_visible', '=', false]
                          ],
                          class: 'o_optional_button btn btn-light'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          _page_miscellaneous: {
            _attr: { name: 'miscellaneous', string: 'Miscellaneous' },
            _group: {
              _group: {
                picking_type_id: {},
                location_src_id: { no_create: true },

                warehouse_id: { invisible: '1' },
                location_dest_id: {
                  groups: 'stock.group_stock_multi_locations',
                  readonly: [['state', '!=', 'draft']],
                  no_create: true
                }
              },
              _group_571: {
                origin: {},
                date_deadline: {
                  invisible: [
                    '|',
                    ['state', 'in', ('done', 'cancel')],
                    ['date_deadline', '=', false]
                  ]
                }
              }
            }
          }
        }
      }
    }
  },

  view_mrp_production_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.production',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Manufacturing Order',
          filter_domain(self) {
            return ['|', ['name', 'ilike', self], ['origin', 'ilike', self]]
          }
        },
        product_id: {},
        product_variant_attributes: {},
        move_raw_ids: {
          string: 'Component',
          filter_domain(self) {
            return [['move_raw_ids.product_id', 'ilike', self]]
          }
        },
        bom_id: {
          string: 'Work Center',
          filter_domain(self) {
            return [['bom_id.operation_ids.workcenter_id', 'ilike', self]]
          }
        },
        origin: {}
      },

      filters: {
        group_state1: {
          todo: {
            name: 'todo',
            string: 'To Do',
            help: 'Manufacturing Orders which are in confirmed state.',
            domain: [
              ['state', 'in', ['draft', 'confirmed', 'progress', 'to_close']]
            ]
          },
          starred: {
            name: 'starred',
            string: 'Starred',
            domain: [['priority', '=', '1']]
          },
          filter_unbuilt: {
            name: 'filter_unbuilt',
            string: 'Unbuilt',
            domain: [['unbuild_ids.state', '=', 'done']]
          }
        },
        group_state: {
          filter_draft: {
            name: 'filter_draft',
            string: 'Draft',
            domain: [['state', '=', 'draft']]
          },
          filter_confirmed: {
            name: 'filter_confirmed',
            string: 'Confirmed',
            domain: [['state', '=', 'confirmed']]
          },
          filter_planned: {
            name: 'filter_planned',
            string: 'Planned',
            groups: 'mrp.group_mrp_routings',
            domain: [['is_planned', '=', true]]
          },
          filter_in_progress: {
            name: 'filter_in_progress',
            string: 'In Progress',
            domain: [['state', '=', 'progress']]
          },
          filter_to_close: {
            name: 'filter_to_close',
            string: 'To Close',
            domain: [['state', '=', 'to_close']]
          },
          filter_done: {
            name: 'filter_done',
            string: 'Done',
            domain: [['state', '=', 'done']]
          },
          filter_cancel: {
            name: 'filter_cancel',
            string: 'Cancelled',
            domain: [['state', '=', 'cancel']]
          }
        },
        group_reservation_state: {
          waiting: {
            name: 'waiting',
            string: 'Waiting',
            domain: [['reservation_state', 'in', ['waiting', 'confirmed']]]
          },
          filter_ready: {
            name: 'filter_ready',
            string: 'Ready',
            domain: [['reservation_state', '=', 'assigned']]
          }
        },
        group_planning_issues: {
          planning_issues: {
            name: 'planning_issues',
            string: 'Planning Issues',
            help: 'Late MO or Late delivery of components',
            domain(env) {
              const current_date = env.date_tools.today
              return [
                '|',
                ['delay_alert_date', '!=', false],
                '&',
                ['date_deadline', '<', current_date],
                ['state', '=', 'confirmed']
              ]
            }
          }
        }
      }

      // _separator_752: {},
      // _filter_activities_overdue: {
      //   _attr: {
      //     name: 'activities_overdue',
      //     string: 'Late Activities',
      //     help: 'Show all records which has next action date is before today',
      //     invisible: '1',
      //     domain: {
      //       todo_ctx:
      //         "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]"
      //     }
      //   }
      // },
      // _filter_activities_today: {
      //   _attr: {
      //     name: 'activities_today',
      //     string: 'Today Activities',
      //     invisible: '1',
      //     domain: {
      //       todo_ctx:
      //         "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]"
      //     }
      //   }
      // },
      // _filter_activities_upcoming_all: {
      //   _attr: {
      //     name: 'activities_upcoming_all',
      //     string: 'Future Activities',
      //     invisible: '1',
      //     domain: {
      //       todo_ctx:
      //         "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]"
      //     }
      //   }
      // },
      // _filter_filter_date_planned_start: {
      //   _attr: {
      //     name: 'filter_date_planned_start',
      //     string: 'Scheduled Date',
      //     date: 'date_planned_start'
      //   }
      // },
      // _filter_filter_plan_date: {
      //   _attr: {
      //     name: 'filter_plan_date',
      //     string: 'Scheduled Date: Last 365 Days',
      //     invisible: '1',
      //     domain: {
      //       todo_ctx:
      //         "[('date_planned_start', '>', (datetime.datetime.now() + relativedelta(days=-365)).to_utc().strftime('%Y-%m-%d %H:%M:%S'))]"
      //     }
      //   }
      // },
      // _separator_901: {},
      // _filter_activities_exception: {
      //   _attr: {
      //     name: 'activities_exception',
      //     string: 'Warnings',
      //     domain: [['activity_exception_decoration', '!=', false]]
      //   }
      // }
    }
  },

  mrp_production_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Manufacturing Orders',
    type: 'ir.actions.act_window',
    res_model: 'mrp.production',
    search_view_id: 'view_mrp_production_filter',
    domain: [['picking_type_id.active', '=', true]],

    context({ env }) {
      return {
        search_default_todo: true,
        default_company_id: env.context.allowed_company_ids[0]
      }
    },

    views: {
      tree: 'mrp_production_tree_view',
      form: 'mrp_production_form_view'
    }
  }
}
