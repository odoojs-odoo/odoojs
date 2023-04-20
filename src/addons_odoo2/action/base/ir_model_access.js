export default {
  ir_access_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.access',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        model_id: {},
        group_id: {},
        perm_read: {},
        perm_write: {},
        perm_create: {},
        perm_unlink: {}
      }
    }
  },

  ir_access_view_tree_edition: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.access',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        model_id: {},
        group_id: {},
        perm_read: {},
        perm_write: {},
        perm_create: {},
        perm_unlink: {}
      }
    }
  },

  ir_access_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.access',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            class: 'alert alert-warning text-center',
            text: 'Please note that modifications will be applied for all users of the specified group'
          }
        },
        _group: {
          name: {},
          model_id: {},
          group_id: {},
          active: {
            widget: 'boolean_toggle'
          }
        },
        _group_513: {
          _attr: {
            string: 'Access'
          },
          perm_read: {},
          perm_write: {},
          perm_create: {},
          perm_unlink: {}
        }
      }
    }
  },

  ir_access_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.access',
    type: 'search',
    arch: {
      name: {
        string: 'Access Rights'
      },
      _filter_global: {
        _attr: {
          name: 'global',
          string: 'Global',
          domain: [['group_id', '=', false]]
        }
      },
      _separator: {},
      _filter_full_access: {
        _attr: {
          name: 'full_access',
          string: 'Full Access',
          domain: [['perm_read', '=', true], ['perm_write', '=', true], ['perm_create', '=', true], ['perm_unlink', '=', true]]
        }
      },
      _filter_read_access: {
        _attr: {
          name: 'read_access',
          string: 'Read Access',
          domain: [['perm_read', '=', true]]
        }
      },
      _filter_write_access: {
        _attr: {
          name: 'write_access',
          string: 'Write Access',
          domain: [['perm_write', '=', true]]
        }
      },
      _separator_938: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      model_id: {},
      group_id: {},
      _group: {
        _attr: {
          string: 'Group By',
          groups: 'base.group_no_one'
        },
        _filter_group: {
          _attr: {
            name: 'group',
            string: 'Group',
            domain: [],
            context: {
              group_by: 'group_id'
            }
          }
        },
        _filter_group_by_object: {
          _attr: {
            name: 'group_by_object',
            string: 'Model',
            domain: [],
            context: {
              group_by: 'model_id'
            }
          }
        }
      }
    }
  },

  ir_access_act: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Access Rights',
    res_model: 'ir.model.access',
    search_view_id: 'ir_access_view_search',
    views: {
      tree: 'ir_access_view_tree_edition',
      form: '=======todo=========='
    }
  }
}
