export default {
  view_module_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.module.module',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Module',
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
          app: {
            name: 'app',
            string: 'Apps',
            domain: [['application', '=', true]]
          },
          extra: {
            name: 'extra',
            string: 'Extra',
            domain: [['application', '=', false]]
          }
        },
        group_state: {
          installed: {
            name: 'installed',
            string: 'Installed',
            domain: [['state', 'in', ['installed', 'to upgrade', 'to remove']]]
          },
          not_installed: {
            name: 'not_installed',
            string: 'Not Installed',
            domain: [
              ['state', 'in', ['uninstalled', 'uninstallable', 'to install']]
            ]
          }
        }
      }
    }
  },

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
        icon_image: { widget: 'image' },

        _div_title: {
          _h1: {
            shortdesc: {
              placeholder: 'Module Name'
            }
          },
          _h3: {
            _attr: { text: 'By' },
            author: { placeholder: 'Author Name' }
          },

          _div: {
            state: { invisible: '1' },
            to_buy: { invisible: '1' },
            has_iap: { invisible: '1' },
            _button: {
              _attr: {
                name: 'button_immediate_install',
                type: 'object',
                string: 'Activate',
                groups: 'base.group_system'

                // {'invisible': ['|', ('to_buy','=',True), ('state','!=', 'uninstalled')]}"
              }
            }
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
            _attr: {
              name: 'information',
              string: 'Information'
            },
            _group: {
              _group: {
                website: {
                  widget: 'url'
                  // invisible: [['website', '=', false]]
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
            _attr: {
              name: 'technical_data',
              string: 'Technical Data'
            },
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
            _group_164: {
              _attr: {
                string: 'Dependencies'
              }
            },

            _p_935: {
              _attr: {
                // invisible: [['dependencies_id', 'not in', [None, false]]],
                class: 'oe_grey',
                text: '-This module does not depends on any other module.'
              }
            },

            dependencies_id: {
              widget: 'x2many_tree',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      name: {},
                      state: {}
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
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
    }
  },

  module_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.module.module',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      sheet: {
        shortdesc: {},
        name: {},
        author: {},
        website: {},
        installed_version: {},
        state: {
          widget: 'badge'
        },
        category_id: {
          invisible: '1'
        }
      }
    }
  },

  open_module_tree: {
    _odoo_model: 'ir.actions.act_window',
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
  }
}
