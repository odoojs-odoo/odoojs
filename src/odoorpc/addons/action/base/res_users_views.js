export default {
  view_users_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {},
        _widget: {},
        active_partner: { invisible: '1' },
        _div_alert: {},

        avatar_128: { invisible: '1' },
        image_1920: { widget: 'image', preview_image: 'avatar_128' },
        _div_title: {
          _h1: {
            name: { nolabel: 0, required: '1' }
          },
          email: { invisible: '1' },
          _h2: {
            login: { nolabel: 0, placeholder: 'e.g. email@yourcompany.com' }
          },
          _div: {
            partner_id: { nolabel: 0, readonly: '1' },
            share: { invisible: '1' }
          }
        },

        _notebook: {
          _page_access_rights: {
            _attr: { name: 'access_rights', string: 'Access Rights' },
            _group_access_rights: {
              _attr: {
                string: 'Multi Companies',
                invisible({ record }) {
                  //attrs="{'invisible': [('companies_count', '&lt;=', 1)]
                  const { companies_count } = record
                  return companies_count <= 1
                }
              },
              company_ids: {
                widget: 'many2many_tags',
                string: 'Allowed Companies'
              },
              company_id: { string: 'Default Company' },
              companies_count: { invisible: '1' }
            },
            groups_id: {
              widget: 'x2many_tree',
              views: {
                tree: {
                  fields: {
                    name: {}
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      name: {}
                    }
                  }
                }
              }
            }
          },

          _page_preferences: {
            _attr: { name: 'preferences', string: 'Preferences' },
            _group: {
              _group_preferences: {
                _attr: { name: 'preferences', string: 'Localization' },
                active: { invisible: '1' },
                lang: { required: '1' },
                _button: {
                  _attr: {
                    type: 'action',
                    name: 'base.action_view_base_language_install',
                    title: 'Add a language'
                  }
                },
                tz: { widget: 'timezone_mismatch' },
                tz_offset: { invisible: '1' }
              },
              _group_2: {
                _attr: {
                  string: 'Menus Customization',
                  groups: 'base.group_no_one',
                  invisible({ record }) {
                    // 'invisible': [('share', '=', True)]
                    const { share } = record
                    return share
                  }
                },
                action_id: {}
              }
            },
            _group_messaging: {
              signature: {},
              login_date: {}
            }
          }
        }
      }
    }
  },

  view_users_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'tree',
    fields: {
      name: {},
      login: {},
      lang: {},
      login_date: {},
      company_id: {}
    }
  },

  view_users_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'search',
    arch: {
      fields: {
        name: {
          filter_domain: self => {
            return [
              '|',
              '|',
              ['name', 'ilike', self],
              ['login', 'ilike', self],
              ['email', 'ilike', self]
            ]
          }
        },

        company_ids: {}
      },

      filters: {
        group_share: {
          no_share: { string: '内部用户', domain: [['share', '=', false]] }
        },
        group_active: {
          inactive: {
            string: '已归档',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  action_res_users: {
    _odoo_model: 'ir.actions',
    name: '用户',
    type: 'ir.actions.act_window',
    res_model: 'res.users',
    search_view_id: 'view_users_search',
    domain: [],
    context: { search_default_no_share: 1 },
    views: {
      tree: 'view_users_tree',
      form: 'view_users_form'
    }
  },

  menu_action_res_users: {
    _odoo_model: 'ir.ui.menu',
    action: 'action_res_users',
    parent: 'menu_users',
    name: '用户',
    sequence: 0
  }
}
