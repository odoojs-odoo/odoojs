export default {
  view_stock_rule_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.rule',
    type: 'search',
    arch: {
      name: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: {
          string: 'Group by...'
        },
        _filter_groupby_route: {
          _attr: {
            name: 'groupby_route',
            string: 'Route',
            context: {
              group_by: 'route_id'
            }
          }
        },
        _filter_groupby_warehouse: {
          _attr: {
            name: 'groupby_warehouse',
            string: 'Warehouse',
            groups: 'stock.group_stock_multi_warehouses',
            context: {
              group_by: 'warehouse_id'
            }
          }
        }
      }
    }
  },

  view_stock_rule_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.rule',
    type: 'tree',
    arch: {
      sheet: {
        action: {},
        location_src_id: {
          no_create: true
        },
        location_dest_id: {
          no_create: true
        },
        route_id: {},
        company_id: {
          groups: 'base.group_multi_company'
        }
      }
    }
  },

  view_stock_rule_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.rule',
    type: 'form',
    arch: {
      sheet: {
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            invisible: [['active', '=', true]],
            title: 'Archived'
          }
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _label_name: {
            for: 'name'
          },
          _h1: {
            name: {}
          }
        },
        _group: {
          _group: {
            active: {
              invisible: '1'
            },
            company_id: {
              invisible: '1'
            },
            picking_type_code_domain: {
              invisible: '1'
            },
            action: {},
            picking_type_id: {},
            location_src_id: {
              required: [['action', 'in', ['pull', 'push', 'pull_push']]],
              no_create: true
            },
            location_dest_id: {
              no_create: true
            },
            auto: {
              invisible: [['action', 'not in', ['push', 'pull_push']]]
            },
            procure_method: {
              invisible: [['action', 'not in', ['pull', 'pull_push']]]
            }
          },
          _group_343: {
            _div: {
              _label_rule_message: {
                for: 'rule_message',
                invisible: '1'
              },
              _div: {
                rule_message: {}
              }
            }
          }
        },
        _group_551: {
          _group_apply_on: {
            _attr: {
              name: 'apply_on',
              string: 'Applicability'
            },
            route_id: {},
            warehouse_id: {
              groups: 'base.group_no_one',
              invisible: [['action', '=', 'push']]
            },
            route_company_id: {
              invisible: '1'
            },
            company_id: {
              groups: 'base.group_multi_company',
              required: [['action', '=', 'push']],
              no_create: true
            },
            sequence: {
              string: 'Sequence',
              groups: 'base.group_no_one'
            }
          },
          _group_propagation_group: {
            _attr: {
              name: 'propagation_group',
              string: 'Propagation',
              groups: 'base.group_no_one',
              invisible: [['action', '=', 'push']]
            },
            group_propagation_option: {},
            group_id: {
              invisible: [['group_propagation_option', '!=', 'fixed']],
              required: [['group_propagation_option', '=', 'fixed']]
            },
            propagate_cancel: {},
            propagate_warehouse_id: {}
          },
          _group: {
            _attr: {
              string: 'Options',
              invisible: [['action', 'not in', ['pull', 'push', 'pull_push']]]
            },
            partner_address_id: {
              invisible: [['action', '=', 'push']]
            },
            _label_delay: {
              for: 'delay'
            },
            _div: {
              delay: {
                class: 'oe_inline'
              }
            }
          }
        }
      }
    }
  },

  view_route_rule_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.rule',
    inherit_id: 'stock.view_stock_rule_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='route_id']",
            position: 'replace'
          }
        },
        _xpath_819: {
          _attr: {
            expr: "//group[@name='apply_on']",
            position: 'attributes'
          },
          _attribute_groups: {
            _attr: {
              name: 'groups',
              text: 'base.group_multi_company,base.group_no_one'
            }
          }
        },
        _xpath_451: {
          _attr: {
            expr: '//form',
            position: 'inside'
          },
          route_company_id: {
            invisible: '1'
          }
        }
      }
    }
  },

  action_rules_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Rules',
    type: 'ir.actions.act_window',
    res_model: 'stock.rule',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
