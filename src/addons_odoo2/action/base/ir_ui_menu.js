export default {
  edit_menu_access: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.ui.menu',
    type: 'form',
    arch: {
      sheet: {
        active: {
          invisible: '1'
        },
        _group: {
          _group: {
            name: {},
            parent_id: {
              groups: 'base.group_no_one'
            },
            sequence: {
              groups: 'base.group_no_one'
            }
          },
          _group_497: {
            _attr: {
              groups: 'base.group_no_one'
            },
            complete_name: {},
            action: {},
            web_icon: {},
            web_icon_data: {}
          }
        },
        _notebook: {
          _page_access_rights: {
            _attr: {
              name: 'access_rights',
              string: 'Access Rights'
            },
            groups_id: {}
          },
          _page_submenus: {
            _attr: {
              name: 'submenus',
              string: 'Submenus',
              groups: 'base.group_no_one'
            },
            child_id: {
              context: {
                todo_ctx: "{'default_parent_id': active_id}"
              },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Menu'
                      },
                      sequence: {},
                      name: {
                        string: 'Menu'
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

  edit_menu: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.ui.menu',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        complete_name: {
          string: 'Menu'
        }
      }
    }
  },

  edit_menu_access_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.ui.menu',
    type: 'search',
    arch: {
      name: {
        string: 'Menu'
      },
      parent_id: {},
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  grant_menu_access: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Menu Items',
    res_model: 'ir.ui.menu',
    search_view_id: 'edit_menu_access_search',
    context: {
      ir.ui.menu.full_list: true
    },
    views: {
      tree: 'edit_menu',
      form: '=======todo=========='
    }
  }
}
