export default {
  view_groups_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.groups',
    type: 'search',
    arch: {
      name: {
        string: 'Group',
        filter_domain: { todo_ctx: "['|', ('name','ilike',self), ('category_id','ilike',self)]" }
      },
      _separator: {},
      share: {},
      _filter_filter_no_share: {
        _attr: {
          name: 'filter_no_share',
          string: 'Internal Groups',
          domain: [['share', '=', false]]
        }
      }
    }
  },

  view_groups_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.groups',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          category_id: {},
          name: {},
          share: {}
        },
        _notebook: {
          _page_users: {
            _attr: {
              name: 'users',
              string: 'Users'
            },
            users: {
              context: { search_default_filter_no_share: 1 }
            }
          },
          _page_inherit_groups: {
            _attr: {
              name: 'inherit_groups',
              string: 'Inherited'
            },
            _label_implied_ids: {
              for: 'implied_ids',
              string: 'Users added to this group are automatically added in the following groups.'
            },
            implied_ids: {}
          },
          _page_menus: {
            _attr: {
              name: 'menus',
              string: 'Menus'
            },
            menu_access: {}
          },
          _page_views: {
            _attr: {
              name: 'views',
              string: 'Views'
            },
            view_access: { groups: 'base.group_system' }
          },
          _page_access_rights: {
            _attr: {
              name: 'access_rights',
              string: 'Access Rights'
            },
            model_access: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Access Rights' },
                      name: {},
                      model_id: {},
                      perm_read: {},
                      perm_write: {},
                      perm_create: {},
                      perm_unlink: {}
                    }
                  }
                }
              }
            }
          },
          _page_record_rules: {
            _attr: {
              name: 'record_rules',
              string: 'Record Rules'
            },
            rule_groups: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Record Rules' },
                      name: {},
                      model_id: {},
                      domain_force: {},
                      perm_read: {},
                      perm_write: {},
                      perm_create: {},
                      perm_unlink: {}
                    }
                  }
                }
              }
            }
          },
          _page_notes: {
            _attr: {
              name: 'notes',
              string: 'Notes'
            },
            comment: {}
          }
        }
      }
    }
  },

  action_res_groups: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Groups',
    type: 'ir.actions.act_window',
    res_model: 'res.groups',
    search_view_id: 'tooooooodoooooo',
    context: { search_default_filter_no_share: 1 },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
