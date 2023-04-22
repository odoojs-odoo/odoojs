export default {
  stock_production_type_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking.type',
    inherit_id: 'stock.stock_picking_type_kanban',
    arch: {
      sheet: {
        code: {
          position: 'after',
          __todo__after: {
            count_mo_todo: {},
            count_mo_waiting: {},
            count_mo_late: {}
          }
        },
        _xpath: {
          _attr: {
            expr: '//div[@name="stock_picking"]',
            position: 'after'
          },
          _div: {
            _div: {
              _div: {
                _div: {
                  _attr: { class: 'o_kanban_card_header_title' },
                  _div: {
                    _attr: { class: 'o_primary' },
                    _a_get_mrp_stock_picking_action_picking_type: {
                      _attr: {
                        name: 'get_mrp_stock_picking_action_picking_type',
                        type: 'object'
                      },
                      name: {}
                    }
                  },
                  _span: {
                    _attr: { class: 'o_primary' },
                    name: {}
                  },
                  _div_839: {
                    _attr: { class: 'o_secondary' },
                    warehouse_id: {
                      groups: 'stock.group_stock_multi_warehouses',
                      class: 'o_secondary',
                      readonly: '1'
                    }
                  }
                },
                _div_683: {
                  _attr: { class: 'o_kanban_manage_button_section' },
                  _a: {
                    _attr: { class: 'o_kanban_manage_toggle_button' },
                    _i: {
                      _attr: {
                        title: 'Manage',
                        class: 'fa fa-ellipsis-v'
                      }
                    }
                  }
                }
              },
              _div_594: {
                _attr: { class: 'container o_kanban_card_content' },
                _div: {
                  _attr: { class: 'row' },
                  _div: {
                    _attr: { class: 'col-6 o_kanban_primary_left' },
                    _button_mrp_production_action_picking_deshboard: {
                      _attr: {
                        name: 'mrp_production_action_picking_deshboard',
                        type: 'action',
                        context: { todo_ctx: "{'search_default_todo': 1, 'default_picking_type_id': active_id}" },
                        class: 'btn btn-primary'
                      },
                      _span: {
                        _attr: { text: 'To Process' },
                        _t: {}
                      }
                    }
                  },
                  _div_812: {
                    _attr: { class: 'col-6 o_kanban_primary_right' },
                    _div: {
                      _attr: { class: 'row' },
                      _div: {
                        _attr: { class: 'col-9' },
                        _a_mrp_production_action_picking_deshboard: {
                          _attr: {
                            name: '%(mrp_production_action_picking_deshboard)d',
                            type: 'action',
                            context: { search_default_waiting: 1 },
                            text: 'Waiting'
                          }
                        }
                      },
                      _div_888: {
                        _attr: { class: 'col-3' },
                        count_mo_waiting: {}
                      }
                    },
                    _div_746: {
                      _attr: { class: 'row' },
                      _div: {
                        _attr: { class: 'col-9' },
                        _a_mrp_production_action_picking_deshboard: {
                          _attr: {
                            name: '%(mrp_production_action_picking_deshboard)d',
                            type: 'action',
                            context: { todo_ctx: "{'search_default_planning_issues': 1, 'default_picking_type_id': active_id}" },
                            class: 'oe_kanban_stock_picking_type_list',
                            text: 'Late'
                          }
                        }
                      },
                      _div_799: {
                        _attr: { class: 'col-3' },
                        count_mo_late: {}
                      }
                    }
                  }
                }
              },
              _div_500: {
                _attr: { class: 'container o_kanban_card_manage_pane dropdown-menu' },
                _div: {
                  _attr: { class: 'row' },
                  _div_picking_left_manage_pane: {
                    _attr: {
                      name: 'picking_left_manage_pane',
                      class: 'col-6 o_kanban_card_manage_section o_kanban_manage_view'
                    },
                    _div: {
                      _attr: { class: 'o_kanban_card_manage_title' },
                      _span: 'Orders'
                    },
                    _div_248: {
                      _a_mrp_production_action_picking_deshboard: {
                        _attr: {
                          name: '%(mrp_production_action_picking_deshboard)d',
                          type: 'action',
                          text: 'All'
                        }
                      }
                    },
                    _div_381: {
                      _a_mrp_production_action_picking_deshboard: {
                        _attr: {
                          name: '%(mrp_production_action_picking_deshboard)d',
                          type: 'action',
                          context: { search_default_inprogress: 1 },
                          text: 'In Progress'
                        }
                      }
                    },
                    _div_658: {
                      _a_mrp_production_action_picking_deshboard: {
                        _attr: {
                          name: '%(mrp_production_action_picking_deshboard)d',
                          type: 'action',
                          context: { search_default_planned: 1 },
                          text: 'Planned'
                        }
                      }
                    }
                  },
                  _div: {
                    _attr: { class: 'col-6 o_kanban_card_manage_section o_kanban_manage_new' },
                    _div: {
                      _attr: { class: 'o_kanban_card_manage_title' },
                      _span: 'New'
                    },
                    _div_699: {
                      _a_action_mrp_production_form: {
                        _attr: {
                          name: '%(action_mrp_production_form)d',
                          type: 'action',
                          context: { todo_ctx: "{'default_picking_type_id': active_id}" },
                          text: 'Manufacturing Order'
                        }
                      }
                    }
                  }
                },
                _div_533: {
                  _attr: { class: 'o_kanban_card_manage_settings row' },
                  _div: {
                    _attr: { class: 'col-8' },
                    _ul: {
                      _attr: { class: 'oe_kanban_colorpicker' }
                    }
                  },
                  _div_292: {
                    _attr: { class: 'col-4' },
                    _a: {
                      _attr: {
                        type: 'edit',
                        class: 'dropdown-item',
                        text: 'Configuration'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  view_picking_type_form_inherit_mrp: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking.type',
    inherit_id: 'stock.view_picking_type_form',
    arch: {
      sheet: {
        show_operations: {
          position: 'attributes',
          invisible: [['code', '=', 'mrp_operation']]
        },
        _xpath: {
          _attr: {
            expr: "//group[@name='stock_picking_type_lot']",
            position: 'after'
          },
          _group: {
            _attr: {
              string: 'Traceability',
              groups: 'stock.group_production_lot',
              invisible: [['code', '!=', 'mrp_operation']]
            },
            use_create_components_lots: {},
            use_auto_consume_components_lots: {}
          }
        },
        auto_show_reception_report: {
          position: 'after',
          __todo__after: {
            auto_show_reception_report: {
              groups: 'mrp.group_mrp_reception_report',
              invisible: [['code', '!=', 'mrp_operation']]
            }
          }
        }
      }
    }
  }
}
