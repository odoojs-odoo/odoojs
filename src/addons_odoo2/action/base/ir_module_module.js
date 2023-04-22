export default {
  view_module_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.module.module',
    type: 'search',
    arch: {
      name: {
        string: 'Module',
        filter_domain: { todo_ctx: "['|', '|', ('summary', 'ilike', self), ('shortdesc', 'ilike', self), ('name',                         'ilike', self)]" }
      },
      _filter_app: {
        _attr: {
          name: 'app',
          string: 'Apps',
          domain: [['application', '=', true]]
        }
      },
      _filter_extra: {
        _attr: {
          name: 'extra',
          string: 'Extra',
          domain: [['application', '=', false]]
        }
      },
      _separator: {},
      _filter_installed: {
        _attr: {
          name: 'installed',
          string: 'Installed',
          domain: [['state', 'in', ['installed', 'to upgrade', 'to remove']]]
        }
      },
      _filter_not_installed: {
        _attr: {
          name: 'not_installed',
          string: 'Not Installed',
          domain: [['state', 'in', ['uninstalled', 'uninstallable', 'to install']]]
        }
      },
      category_id: {},
      _group: {
        _attr: { string: 'Group By' },
        _filter_author: {
          _attr: {
            name: 'author',
            string: 'Author',
            domain: [],
            context: { group_by: 'author' }
          }
        },
        _filter_category: {
          _attr: {
            name: 'category',
            string: 'Category',
            domain: [],
            context: { group_by: 'category_id' }
          }
        },
        _filter_state: {
          _attr: {
            name: 'state',
            string: 'State',
            domain: [],
            context: { group_by: 'state' }
          }
        }
      },
      _searchpanel: {
        category_id: { string: 'Categories' }
      }
    }
  },

  module_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.module.module',
    type: 'form',
    arch: {
      sheet: {
        _link: {},
        icon_image: {
          widget: 'image',
          class: 'oe_avatar'
        },
        _div_title: {
          _attr: { class: 'oe_title mb32' },
          _h1: {
            shortdesc: { placeholder: 'Module Name' }
          },
          _h3: {
            _attr: {
              class: 'oe_fade',
              text: 'By'
            },
            author: {
              class: 'oe_inline',
              placeholder: 'Author Name'
            }
          },
          _div: {
            state: { invisible: '1' },
            to_buy: { invisible: '1' },
            has_iap: { invisible: '1' },
            _button_button_immediate_install: {
              _attr: {
                name: 'button_immediate_install',
                type: 'object',
                string: 'Activate',
                groups: 'base.group_system',
                invisible: ['|', ['to_buy', '=', true], ['state', '!=', 'uninstalled']],
                class: 'btn btn-primary me-1'
              }
            },
            _a: {
              _attr: {
                invisible: ['|', ['to_buy', '=', false], ['state', 'not in', ('uninstalled', 'uninstallable')]],
                class: 'btn btn-primary me-1',
                text: 'Upgrade'
              }
            },
            _button_button_immediate_upgrade: {
              _attr: {
                name: 'button_immediate_upgrade',
                type: 'object',
                string: 'Upgrade',
                groups: 'base.group_system',
                states: 'installed',
                class: 'btn btn-primary me-1'
              }
            },
            _button_button_uninstall_wizard: {
              _attr: {
                name: 'button_uninstall_wizard',
                type: 'object',
                string: 'Uninstall',
                groups: 'base.group_system',
                states: 'installed',
                class: 'btn btn-secondary me-1'
              }
            },
            _button_button_uninstall_cancel: {
              _attr: {
                name: 'button_uninstall_cancel',
                type: 'object',
                string: 'Cancel Uninstall',
                groups: 'base.group_system',
                states: 'to remove',
                class: 'btn btn-secondary me-1'
              }
            },
            _button_button_upgrade_cancel: {
              _attr: {
                name: 'button_upgrade_cancel',
                type: 'object',
                string: 'Cancel Upgrade',
                groups: 'base.group_system',
                states: 'to upgrade',
                class: 'btn btn-secondary me-1'
              }
            },
            _button_button_install_cancel: {
              _attr: {
                name: 'button_install_cancel',
                type: 'object',
                string: 'Cancel Install',
                groups: 'base.group_system',
                states: 'to install',
                class: 'btn btn-secondary me-1'
              }
            }
          },
          _h6: {
            _attr: {
              invisible: [['has_iap', '=', false]],
              class: 'text-muted mt-2',
              text: 'Contains In-App Purchases'
            }
          }
        },
        _div: {
          _attr: { class: 'clearfix' }
        },
        _notebook: {
          _attr: { groups: 'base.group_no_one' },
          _page_information: {
            _attr: {
              name: 'information',
              string: 'Information'
            },
            _group: {
              _group: {
                website: {
                  widget: 'url',
                  invisible: [['website', '=', false]]
                },
                category_id: {
                  no_open: true,
                  no_create: true
                },
                summary: {}
              },
              _group_354: {
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
              demo: {},
              application: {},
              state: {}
            },
            _group_731: {
              _attr: {
                string: 'Created Views',
                invisible: [['state', '!=', 'installed']]
              }
            },
            _p: {
              _attr: {
                invisible: ['|', ['views_by_module', 'not in', [None, false]], ['state', '!=', 'installed']],
                class: 'oe_grey',
                text: '-This module does not create views.'
              }
            },
            views_by_module: {},
            _group_808: {
              _attr: { string: 'Dependencies' }
            },
            _p_452: {
              _attr: {
                invisible: [['dependencies_id', 'not in', [None, false]]],
                class: 'oe_grey',
                text: '-This module does not depends on any other module.'
              }
            },
            dependencies_id: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Dependencies' },
                      name: {},
                      state: {}
                    }
                  }
                }
              }
            },
            _group_109: {
              _attr: { string: 'Exclusions' }
            },
            _p_214: {
              _attr: {
                invisible: [['exclusion_ids', 'not in', [None, false]]],
                class: 'oe_grey',
                text: '-This module does not exclude any other module.'
              }
            },
            exclusion_ids: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Exclusions' },
                      name: {},
                      state: {}
                    }
                  }
                }
              }
            }
          },
          _page_installed_features: {
            _attr: {
              name: 'installed_features',
              string: 'Installed Features',
              invisible: [['state', '!=', 'installed']]
            },
            _group: {
              _attr: { string: 'Created Menus' }
            },
            _p: {
              _attr: {
                invisible: [['menus_by_module', 'not in', [None, false]]],
                class: 'oe_grey',
                text: '-This module does not create menu.'
              }
            },
            menus_by_module: {},
            _group_832: {
              _attr: { string: 'Defined Reports' }
            },
            _p_980: {
              _attr: {
                invisible: [['reports_by_module', 'not in', [None, false]]],
                class: 'oe_grey',
                text: '-This module does not create report.'
              }
            },
            reports_by_module: {}
          }
        },
        description_html: { class: 'oe_styling_v8' }
      }
    }
  },

  module_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.module.module',
    type: 'tree',
    arch: {
      sheet: {
        _header: {
          _button_button_immediate_install: {
            _attr: {
              name: 'button_immediate_install',
              type: 'object',
              string: 'Install',
              groups: 'base.group_system'
            }
          }
        },
        shortdesc: {},
        name: { groups: 'base.group_no_one' },
        author: {},
        website: {},
        installed_version: {},
        state: { widget: 'badge' },
        category_id: { invisible: '1' }
      }
    }
  },

  module_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.module.module',
    type: 'otherview',
    arch: {}
  },

  open_module_tree: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Apps',
    res_model: 'ir.module.module',
    search_view_id: 'view_module_filter',
    context: { search_default_app: 1 },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
