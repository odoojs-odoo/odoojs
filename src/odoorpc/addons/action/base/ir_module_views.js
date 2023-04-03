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
        _title: { display_name: {} },

        _group_website: {
          website: { widget: 'url' },
          author: {},
          category_id: {},
          summary: {},
          shortdesc: {}
        },

        _group_name: {
          icon_image: { widget: 'image' },
          name: {},
          license: {},
          installed_version: {}
        },

        _group_state: {
          demo: {},
          application: {},
          state: {}
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
    name: '模块',
    type: 'ir.actions.act_window',
    res_model: 'ir.module.module',
    search_view_id: 'view_module_filter',

    domain: [],
    context: { search_default_app: 1 }
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
