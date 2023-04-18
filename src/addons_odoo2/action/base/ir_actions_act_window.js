export default {
  view_window_action_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.act_window',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        res_model: {},
        view_id: {},
        domain: {},
        context: {}
      }
    }
  },

  view_window_action_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.act_window',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group_main_details: {
            _attr: {
              name: 'main_details'
            },
            name: {},
            xml_id: {
              string: 'External ID'
            },
            res_model: {
              string: 'Object'
            }
          },
          _group_action_details: {
            _attr: {
              name: 'action_details'
            },
            usage: {},
            type: {},
            target: {}
          }
        },
        _notebook: {
          _page_general_settings: {
            _attr: {
              name: 'general_settings',
              string: 'General Settings'
            },
            _group: {
              _group_views: {
                _attr: {
                  name: 'views',
                  string: 'Views'
                },
                view_mode: {},
                view_id: {},
                search_view_id: {}
              },
              _group_filters: {
                _attr: {
                  name: 'filters',
                  string: 'Filters'
                },
                domain: {},
                context: {},
                limit: {},
                filter: {}
              }
            },
            _group_help: {
              _attr: {
                name: 'help',
                string: 'Help'
              },
              help: {
                class: 'oe-bordered-editor'
              }
            },
            _group_views_tree: {
              _attr: {
                name: 'views_tree',
                string: 'Views'
              },
              view_ids: {
                views: {
                  form: {
                    arch: {
                      sheet: {
                        _attr: {
                          string: 'Views'
                        },
                        _group: {
                          sequence: {},
                          view_mode: {},
                          view_id: {
                            domain: {
                              todo_ctx: "[('type', '=', view_mode)]"
                            }
                          }
                        }
                      }
                    }
                  },
                  tree: {
                    arch: {
                      sheet: {
                        _attr: {
                          string: 'Views'
                        },
                        sequence: {
                          widget: 'handle'
                        },
                        view_mode: {},
                        view_id: {}
                      }
                    }
                  }
                }
              }
            }
          },
          _page_security: {
            _attr: {
              name: 'security',
              string: 'Security'
            },
            groups_id: {}
          }
        }
      }
    }
  },

  view_window_action_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.act_window',
    type: 'search',
    arch: {
      name: {
        string: 'Action'
      }
    }
  },

  ir_action_window: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Window Actions',
    type: 'ir.actions.act_window',
    search_view_id: 'view_window_action_search',
    res_model: 'ir.actions.act_window',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  ir_action_window_view1: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'view_window_action_tree',
    act_window_id: 'ir_action_window'
  },

  ir_action_window_view2: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'form',
    view_id: 'view_window_action_form',
    act_window_id: 'ir_action_window'
  }
}
