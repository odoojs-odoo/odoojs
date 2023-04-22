export default {
  mrp_routing_workcenter_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.routing.workcenter',
    type: 'tree',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        name: {},
        bom_id: {},
        workcenter_id: {},
        time_mode: { optional: 'show' },
        time_computed_on: { optional: 'hide' },
        time_cycle: {
          string: 'Duration (minutes)',
          widget: 'float_time'
        },
        _field_company_id_874: {
          company_id: {
            groups: 'base.group_multi_company',
            optional: 'hide'
          }
        },
        possible_bom_product_template_attribute_value_ids: { invisible: '1' },
        bom_product_template_attribute_value_ids: {
          widget: 'many2many_tags',
          groups: 'product.group_product_variant',
          optional: 'hide',
          no_create: true
        },
        blocked_by_operation_ids: {
          widget: 'many2many_tags',
          groups: 'mrp.group_mrp_workorder_dependencies',
          optional: 'hide'
        }
      }
    }
  },

  mrp_routing_workcenter_bom_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.routing.workcenter',
    inherit_id: 'mrp_routing_workcenter_tree_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//tree',
            position: 'attributes'
          },
          _attribute_delete: {
            _attr: {
              name: 'delete',
              text: '0',
              delete: '0'
            }
          }
        },
        _xpath_731: {
          _attr: {
            expr: '//tree',
            position: 'inside'
          },
          _control: {
            _create: {
              _attr: { string: 'Add a line' }
            },
            _button_copy_existing_operations: {
              _attr: {
                name: 'copy_existing_operations',
                type: 'object',
                string: 'Copy Existing Operations',
                context: { todo_ctx: "{'bom_id': parent.id}" },
                class: 'btn-link'
              }
            }
          }
        },
        _xpath_826: {
          _attr: {
            expr: "//field[@name='name']",
            position: 'before'
          },
          sequence: { widget: 'handle' }
        },
        _xpath_711: {
          _attr: {
            expr: "//field[@name='bom_id']",
            position: 'replace'
          }
        },
        _xpath_739: {
          _attr: {
            expr: "//field[@name='time_cycle']",
            position: 'attributes'
          },
          _attribute_sum: {
            _attr: {
              name: 'sum',
              text: 'Total Duration',
              sum: 'Total Duration'
            }
          }
        },
        _xpath_356: {
          _attr: {
            expr: "//field[@name='bom_product_template_attribute_value_ids']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'column_invisible': [('parent.product_id', '!=', False)]}",
              attrs: "{'column_invisible': [('parent.product_id', '!=', False)]}"
            }
          }
        },
        _xpath_601: {
          _attr: {
            expr: "//field[@name='bom_product_template_attribute_value_ids']",
            position: 'after'
          },
          _button_action_archive: {
            _attr: {
              name: 'action_archive',
              type: 'object',
              string: 'Archive Operation',
              class: 'oe_right'
            }
          }
        },
        _xpath_771: {
          _attr: {
            expr: "//field[@name='blocked_by_operation_ids']",
            position: 'replace'
          }
        },
        _xpath_218: {
          _attr: {
            expr: "//field[@name='name']",
            position: 'after'
          },
          bom_id: { invisible: '1' },
          blocked_by_operation_ids: {
            widget: 'many2many_tags',
            column_invisible: [['parent.allow_operation_dependencies', '=', false]],
            optional: 'hide'
          }
        }
      }
    }
  },

  mrp_routing_workcenter_copy_to_bom_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.routing.workcenter',
    inherit_id: 'mrp_routing_workcenter_tree_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//tree',
            position: 'attributes'
          },
          _attribute_create: {
            _attr: {
              name: 'create',
              text: '0',
              create: '0'
            }
          },
          _attribute_delete: {
            _attr: {
              name: 'delete',
              text: '0',
              delete: '0'
            }
          },
          _attribute_export_xlsx: {
            _attr: {
              name: 'export_xlsx',
              text: '0',
              export_xlsx: '0'
            }
          },
          _attribute_multi_edit: {
            _attr: {
              name: 'multi_edit',
              text: '0',
              multi_edit: '0'
            }
          }
        },
        _xpath_499: {
          _attr: {
            expr: "//field[@name='name']",
            position: 'before'
          },
          _header: {
            _button_copy_to_bom: {
              _attr: {
                name: 'copy_to_bom',
                type: 'object',
                string: 'Copy selected operations'
              }
            }
          }
        }
      }
    }
  },

  mrp_routing_workcenter_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.routing.workcenter',
    type: 'form',
    arch: {
      sheet: {
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _group: {
          _group_description: {
            _attr: { name: 'description' },
            active: { invisible: '1' },
            company_id: { invisible: '1' },
            name: {},
            bom_id: {
              invisible: "context.get['bom_id_invisible', False]",
              domain: [],
              readonly: "context.get['default_bom_id', False]"
            },
            workcenter_id: {
              context: { todo_ctx: "{'default_company_id': company_id}" }
            },
            possible_bom_product_template_attribute_value_ids: { invisible: '1' },
            bom_product_template_attribute_value_ids: {
              widget: 'many2many_tags',
              groups: 'product.group_product_variant',
              no_create: true
            },
            allow_operation_dependencies: { invisible: '1' },
            blocked_by_operation_ids: {
              widget: 'many2many_tags',
              invisible: [['allow_operation_dependencies', '=', false]],
              context: { todo_ctx: "{'default_bom_id':bom_id}" }
            }
          },
          _group_workorder: {
            _attr: { name: 'workorder' },
            workorder_count: { invisible: '1' },
            time_mode: { widget: 'radio' },
            _label_time_mode_batch: {
              for: 'time_mode_batch',
              invisible: [['time_mode', '=', 'manual']]
            },
            _div: {
              _attr: {
                invisible: [['time_mode', '=', 'manual']],
                text: ['last', 'work orders']
              },
              time_mode_batch: { class: 'oe_inline' }
            },
            _label_time_cycle_manual: {
              for: 'time_cycle_manual',
              string: 'Default Duration',
              invisible: [['time_mode', '=', 'auto'], ['workorder_count', '!=', 0]]
            },
            _div_688: {
              _attr: {
                invisible: [['time_mode', '=', 'auto'], ['workorder_count', '!=', 0]],
                text: 'minutes'
              },
              time_cycle_manual: {
                widget: 'float_time',
                class: 'oe_inline'
              }
            },
            time_cycle: { invisible: '1' },
            company_id: { groups: 'base.group_multi_company' }
          }
        },
        _notebook: {
          _page_worksheet: {
            _attr: {
              name: 'worksheet',
              string: 'Work Sheet'
            },
            _group: {
              worksheet_type: { widget: 'radio' },
              worksheet: {
                widget: 'pdf_viewer',
                invisible: [['worksheet_type', '!=', 'pdf']],
                required: [['worksheet_type', '=', 'pdf']],
                help: 'Upload your PDF file.'
              },
              worksheet_google_slide: {
                widget: 'embed_viewer',
                invisible: [['worksheet_type', '!=', 'google_slide']],
                required: [['worksheet_type', '=', 'google_slide']],
                placeholder: 'Google Slide Link'
              },
              note: { invisible: [['worksheet_type', '!=', 'text']] }
            }
          }
        }
      }
    }
  },

  mrp_routing_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Operations',
    type: 'ir.actions.act_window',
    res_model: 'mrp.routing.workcenter',
    search_view_id: 'tooooooodoooooo',
    domain: "['|', ['bom_id', '=', False], ['bom_id.active', '=', True]]",
    views: {
      tree: 'mrp_routing_workcenter_tree_view',
      form: '=======todo=========='
    }
  },

  mrp_routing_workcenter_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.routing.workcenter',
    type: 'search',
    arch: {
      name: {},
      bom_id: {},
      workcenter_id: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _filter_bom: {
          _attr: {
            name: 'bom',
            string: 'Bill of Material',
            context: { group_by: 'bom_id' }
          }
        },
        _filter_workcenter: {
          _attr: {
            name: 'workcenter',
            string: 'Workcenter',
            context: { group_by: 'workcenter_id' }
          }
        }
      }
    }
  }
}
