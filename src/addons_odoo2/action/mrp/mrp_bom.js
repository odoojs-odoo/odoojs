export default {
  mrp_bom_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.bom',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_mrp_routing_time: {
            _attr: {
              name: 'action_mrp_routing_time',
              type: 'action',
              icon: 'fa-clock-o',
              groups: 'mrp.group_mrp_routings',
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: {
                  class: 'o_stat_text',
                  text: ['Operations', 'Performance']
                },
                _br: {}
              }
            }
          },
          _button_action_report_mrp_bom: {
            _attr: {
              name: 'action_report_mrp_bom',
              type: 'action',
              string: 'Overview',
              icon: 'fa-bars',
              class: 'oe_stat_button'
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _group: {
          _group: {
            active: { invisible: '1' },
            company_id: { invisible: '1' },
            product_tmpl_id: {
              context: { default_detailed_type: 'product' }
            },
            product_uom_category_id: { invisible: '1' },
            allow_operation_dependencies: { invisible: '1' },
            product_id: {
              groups: 'product.group_product_variant',
              context: { default_detailed_type: 'product' }
            },
            _label_product_qty: {
              for: 'product_qty',
              string: 'Quantity'
            },
            _div: {
              _attr: { class: 'o_row' },
              product_qty: {},
              product_uom_id: {
                groups: 'uom.group_uom',
                no_open: true,
                no_create: true
              }
            }
          },
          _group_701: {
            code: {},
            type: { widget: 'radio' },
            _p: {
              _attr: {
                invisible: [['type', '!=', 'phantom']],
                class: 'oe_grey oe_edit_only'
              },
              _ul: {
                _attr: { text: 'A BoM of type kit is used to split the product into its components.' },
                _li: 'At the creation of a Manufacturing Order.',
                _li_407: 'At the creation of a Stock Transfer.'
              }
            },
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true,
              no_open: true
            }
          }
        },
        _notebook: {
          _page_components: {
            _attr: {
              name: 'components',
              string: 'Components'
            },
            bom_line_ids: {
              widget: 'one2many',
              context: { todo_ctx: "{'default_parent_product_tmpl_id': product_tmpl_id, 'default_product_id': False, 'default_bom_id': id}" },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Components' },
                      company_id: { invisible: '1' },
                      sequence: { widget: 'handle' },
                      product_id: {
                        context: { default_detailed_type: 'product' }
                      },
                      product_tmpl_id: { invisible: '1' },
                      _button_action_see_attachments: {
                        _attr: {
                          name: 'action_see_attachments',
                          type: 'object',
                          title: 'Product Attachments',
                          icon: 'fa-files-o',
                          class: 'float-end'
                        }
                      },
                      attachments_count: {
                        string: ' ',
                        class: 'text-start'
                      },
                      product_qty: {},
                      product_uom_category_id: { invisible: '1' },
                      parent_product_tmpl_id: { invisible: '1' },
                      product_uom_id: {
                        groups: 'uom.group_uom',
                        no_open: true,
                        no_create: true
                      },
                      possible_bom_product_template_attribute_value_ids: { invisible: '1' },
                      bom_product_template_attribute_value_ids: {
                        widget: 'many2many_tags',
                        groups: 'product.group_product_variant',
                        column_invisible: [['parent.product_id', '!=', false]],
                        optional: 'hide',
                        no_create: true
                      },
                      allowed_operation_ids: { invisible: '1' },
                      operation_id: {
                        groups: 'mrp.group_mrp_routings',
                        column_invisible: [['parent.type', 'not in', ('normal', 'phantom')]],
                        optional: 'hidden',
                        no_quick_create: true,
                        no_create_edit: true
                      },
                      tracking: { invisible: '1' },
                      manual_consumption: {
                        groups: 'mrp.group_mrp_routings',
                        readonly: ['|', ['tracking', '!=', 'none'], ['operation_id', '!=', false]],
                        optional: 'hide'
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
              string: 'Operations',
              groups: 'mrp.group_mrp_routings',
              invisible: [['type', 'not in', ('normal', 'phantom')]]
            },
            operation_ids: {
              groups: 'mrp.group_mrp_routings',
              invisible: [['type', 'not in', ('normal', 'phantom')]],
              context: {
                bom_id_invisible: true,
                default_bom_id: 'todo===id',
                tree_view_ref: 'mrp.mrp_routing_workcenter_bom_tree_view'
              }
            }
          },
          _page_by_products: {
            _attr: {
              name: 'by_products',
              string: 'By-products',
              groups: 'mrp.group_mrp_byproducts',
              invisible: [['type', '!=', 'normal']]
            },
            byproduct_ids: {
              context: {
                form_view_ref: 'mrp.mrp_bom_byproduct_form_view',
                default_bom_id: 'todo===id'
              },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'By-products' },
                      company_id: { invisible: '1' },
                      product_uom_category_id: { invisible: '1' },
                      sequence: { widget: 'handle' },
                      product_id: {
                        context: { default_detailed_type: 'product' }
                      },
                      product_qty: {},
                      product_uom_id: { groups: 'uom.group_uom' },
                      cost_share: { optional: 'hide' },
                      allowed_operation_ids: { invisible: '1' },
                      operation_id: {
                        groups: 'mrp.group_mrp_routings',
                        no_quick_create: true,
                        no_create_edit: true
                      },
                      possible_bom_product_template_attribute_value_ids: { invisible: '1' },
                      bom_product_template_attribute_value_ids: {
                        widget: 'many2many_tags',
                        groups: 'product.group_product_variant',
                        column_invisible: [['parent.product_id', '!=', false]],
                        optional: 'hide',
                        no_create: true
                      }
                    }
                  }
                }
              }
            }
          },
          _page_miscellaneous: {
            _attr: {
              name: 'miscellaneous',
              string: 'Miscellaneous'
            },
            _group: {
              _group: {
                ready_to_produce: {
                  string: 'Manufacturing Readiness',
                  widget: 'radio',
                  groups: 'mrp.group_mrp_routings',
                  invisible: [['type', '=', 'phantom']]
                },
                consumption: {
                  widget: 'radio',
                  invisible: [['type', '=', 'phantom']]
                },
                allow_operation_dependencies: { groups: 'mrp.group_mrp_workorder_dependencies' }
              },
              _group_736: {
                picking_type_id: {
                  string: 'Operation',
                  groups: 'stock.group_adv_location',
                  invisible: [['type', '=', 'phantom']]
                }
              }
            }
          }
        }
      }
    }
  },

  mrp_bom_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.bom',
    type: 'tree',
    arch: {
      sheet: {
        active: { invisible: '1' },
        sequence: { widget: 'handle' },
        product_tmpl_id: {},
        code: { optional: 'show' },
        type: {},
        product_id: {
          groups: 'product.group_product_variant',
          optional: 'hide'
        },
        company_id: {
          groups: 'base.group_multi_company',
          optional: 'show'
        },
        product_qty: { optional: 'hide' },
        product_uom_id: {
          string: 'Unit of Measure',
          groups: 'uom.group_uom',
          optional: 'hide'
        }
      }
    }
  },

  mrp_bom_kanban_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.bom',
    type: 'otherview',
    arch: {}
  },

  view_mrp_bom_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.bom',
    type: 'search',
    arch: {
      code: {
        string: 'Bill of Materials',
        filter_domain: { todo_ctx: "['|', ('code', 'ilike', self), ('product_tmpl_id', 'ilike', self)]" }
      },
      product_tmpl_id: { string: 'Product' },
      bom_line_ids: { string: 'Component' },
      _filter_normal: {
        _attr: {
          name: 'normal',
          string: 'Manufacturing',
          domain: [['type', '=', 'normal']]
        }
      },
      _filter_phantom: {
        _attr: {
          name: 'phantom',
          string: 'Kit',
          domain: [['type', '=', 'phantom']]
        }
      },
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: { string: 'Group By...' },
        _filter_product: {
          _attr: {
            name: 'product',
            string: 'Product',
            domain: [],
            context: { group_by: 'product_tmpl_id' }
          }
        },
        _filter_group_by_type: {
          _attr: {
            name: 'group_by_type',
            string: 'BoM Type',
            domain: [],
            context: { group_by: 'type' }
          }
        },
        _filter_default_unit_of_measure: {
          _attr: {
            name: 'default_unit_of_measure',
            string: 'Unit of Measure',
            domain: [],
            context: { group_by: 'product_uom_id' }
          }
        }
      }
    }
  },

  mrp_bom_form_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Bills of Materials',
    type: 'ir.actions.act_window',
    res_model: 'mrp.bom',
    search_view_id: 'view_mrp_bom_filter',
    domain: '[]',
    context: { todo_ctx: "{'default_company_id': allowed_company_ids[0]}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  template_open_bom: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Bill of Materials',
    res_model: 'mrp.bom',
    search_view_id: 'tooooooodoooooo',
    domain: "['|', ['product_tmpl_id', '=', active_id], ['byproduct_ids.product_id.product_tmpl_id', '=', active_id]]",
    context: { todo_ctx: "{'default_product_tmpl_id': active_id}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  product_open_bom: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Bill of Materials',
    res_model: 'mrp.bom',
    search_view_id: 'tooooooodoooooo',
    domain: '[]',
    context: { todo_ctx: "{'default_product_id': active_id}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
