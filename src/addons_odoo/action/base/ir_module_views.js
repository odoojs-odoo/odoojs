// ok
export default {
  module_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.module.module',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      header: {
        buttons: {
          // button_immediate_install
        },
        fields: {}
      },
      sheet: {
        // icon_image: { widget: 'image' },

        _div_title: {
          _h1: { shortdesc: { placeholder: 'Module Name' } },
          _h3: {
            _attr: { text: 'By' },
            author: { placeholder: 'Author Name' }
          },

          _div: {
            state: { invisible: '1' },
            to_buy: { invisible: '1' },
            has_iap: { invisible: '1' }
            // _button: {
            //   _attr: {
            //     name: 'button_immediate_install',
            //     string: 'Activate',
            //     type: 'object',
            //     groups: 'base.group_system'
            //     // {'invisible': ['|', ('to_buy','=',True), ('state','!=', 'uninstalled')]}"
            //   }
            // }
          },

          _h6: {
            _attr: {
              invisible({ record }) {
                // 'invisible': [('has_iap', '=', False)]
                const { has_iap } = record
                return !has_iap
              },

              text: 'Contains In-App Purchases'
            }
          }

          // < attrs="{}"></h6>
        },

        _notebook: {
          _attr: {
            groups: 'base.group_no_one'
          },
          _page_information: {
            _attr: { string: 'Information' },
            _group: {
              _group: {
                website: {
                  widget: 'url'
                  // 'invisible':[('website','=',False)]
                },
                category_id: {},
                summary: {}
              },
              _group_2: {
                name: {},
                license: {},
                installed_version: {}
              }
            }
          },
          _page_technical_data: {
            _attr: { string: 'Technical Data' },
            _group: {
              _attr: { col: 24 },
              demo: {},
              application: {},
              state: {}
            },
            _group_2: {
              _attr: {
                string: 'Created Views'
                // {'invisible':[('state','!=','installed')]}"
              }
            },
            _p: {
              _attr: {
                text: '-This module does not create views.',
                invisible({ record }) {
                  // 'invisible':
                  // ['|',('views_by_module','not in',[None,False]),
                  // ('state','!=','installed')]
                  const { views_by_module, state } = record
                  return views_by_module || state !== 'installed'
                }
              }
            },
            views_by_module: {},
            dependencies_id: {
              widget: 'x2many_tree',
              views: {
                tree: {
                  fields: {
                    name: {},
                    state: {}
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  module_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.module.module',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },
    fields: {
      shortdesc: {},
      name: {},
      author: {},
      website: {},
      installed_version: {},
      state: {},
      category_id: {}
    }
  },

  view_module_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.module.module',
    type: 'search',
    arch: {
      fields: {
        name: {
          filter_domain: self => {
            return [
              '|',
              '|',
              ['summary', 'ilike', self],
              ['shortdesc', 'ilike', self],
              ['name', 'ilike', self]
            ]
          }
        },
        category_id: {}
      },

      filters: {
        group_app: {
          app: { string: '应用', domain: [['application', '=', true]] },
          extra: { string: '额外', domain: [['application', '=', false]] }
        },
        group_state: {
          installed: {
            string: '已安装',
            domain: [['state', 'in', ['installed', 'to upgrade', 'to remove']]]
          },
          not_installed: {
            string: '未安装',
            domain: [
              ['state', 'in', ['uninstalled', 'uninstallable', 'to install']]
            ]
          }
        }
      }
    }
  },

  open_module_tree: {
    _odoo_model: 'ir.actions',
    name: 'Apps',
    type: 'ir.actions.act_window',
    res_model: 'ir.module.module',
    search_view_id: 'view_module_filter',

    domain: [],
    context: { search_default_app: 1 },
    views: {
      tree: 'module_tree',
      form: 'module_form'
    }
  },

  menu_apps: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_management',
    name: '模块',
    sequence: 5,
    children: {
      menu_module_tree: {
        action: 'open_module_tree',
        name: '主要模块',
        sequence: 5
      }
    }
  }
}
