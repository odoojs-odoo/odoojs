export default {
  view_rule_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.rule',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            _attr: { string: 'General' },
            name: {},
            model_id: {},
            active: { widget: 'boolean_toggle' }
          },
          _group_299: {
            _attr: { string: 'Access Rights' },
            _group: {
              perm_read: {},
              perm_create: {}
            },
            _group_877: {
              perm_write: {},
              perm_unlink: {}
            }
          }
        },
        _separator: {
          _attr: { string: 'Rule Definition (Domain Filter)' }
        },
        domain_force: {},
        _group_252: {
          _attr: { string: 'Groups (no group = global)' },
          global: {},
          groups: {}
        },
        _i: {
          _attr: {
            title: 'Info',
            class: 'fa fa-info fa-3x text-info float-start'
          }
        },
        _h3: 'Interaction between rules',
        _div: {
          _p: 'Global rules (non group-specific) are restrictions, and cannot be bypassed.\n                         Group-specific rules grant additional permissions, but are constrained within the bounds of global ones.\n                         The first group rules restrict further the global rules, but can be relaxed by additional group rules.',
          _p_156: {
            _attr: { text: 'Detailed algorithm:' },
            _ol: {
              _li: 'Global rules are combined together with a logical AND operator, and with the result of the following steps',
              _li_301: 'Group-specific rules are combined together with a logical OR operator',
              _li_853: 'If user belongs to several groups, the results from step 2 are combined with logical OR operator'
            }
          },
          _p_679: 'Example: GLOBAL_RULE_1 AND GLOBAL_RULE_2 AND ( (GROUP_A_RULE_1 OR GROUP_A_RULE_2) OR (GROUP_B_RULE_1 OR GROUP_B_RULE_2) )'
        }
      }
    }
  },

  view_rule_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.rule',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        model_id: {},
        groups: {
          widget: 'many2many_tags',
          no_create: true
        },
        domain_force: {},
        perm_read: {},
        perm_write: {},
        perm_create: {},
        perm_unlink: {}
      }
    }
  },

  view_rule_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.rule',
    type: 'search',
    arch: {
      name: { string: 'Record Rule' },
      model_id: {},
      groups: {},
      _filter_global: {
        _attr: {
          name: 'global',
          string: 'Global',
          domain: [['global', '=', true]]
        }
      },
      _separator: {},
      _filter_full_access_right: {
        _attr: {
          name: 'full_access_right',
          string: 'Full Access Right',
          domain: [['perm_read', '=', true], ['perm_write', '=', true], ['perm_create', '=', true], ['perm_unlink', '=', true]]
        }
      },
      _filter_read_access_right: {
        _attr: {
          name: 'read_access_right',
          string: 'Read Access Right',
          domain: [['perm_read', '=', true]]
        }
      },
      _filter_write_access_right: {
        _attr: {
          name: 'write_access_right',
          string: 'Write Access Right',
          domain: [['perm_write', '=', true]]
        }
      },
      _filter_create_access_right: {
        _attr: {
          name: 'create_access_right',
          string: 'Create Access Right',
          domain: [['perm_create', '=', true]]
        }
      },
      _filter_delete_access_right: {
        _attr: {
          name: 'delete_access_right',
          string: 'Delete Access Right',
          domain: [['perm_unlink', '=', true]]
        }
      },
      _separator_747: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_group_by_object: {
          _attr: {
            name: 'group_by_object',
            string: 'Model',
            domain: [],
            context: { group_by: 'model_id' }
          }
        }
      }
    }
  },

  action_rule: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Record Rules',
    res_model: 'ir.rule',
    search_view_id: 'view_rule_search',
    views: {
      tree: 'view_rule_tree',
      form: '=======todo=========='
    }
  }
}
