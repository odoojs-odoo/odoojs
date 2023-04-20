export default {
  view_base_module_uninstall: {
    _odoo_model: 'ir.ui.view',
    model: 'base.module.uninstall',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            class: 'alert alert-warning oe_button_box'
          },
          _p: {
            _attr: {
              class: 'mt-3',
              text: 'Uninstalling modules can be risky, we recommend you to try it on a duplicate or test database first.'
            }
          }
        },
        module_id: {
          invisible: '1'
        },
        _div_200: {
          _attr: {
            class: 'd-flex bd-highlight'
          },
          _div: {
            _attr: {
              class: 'me-auto p-2 bd-highlight'
            },
            _h3: 'Apps to Uninstall'
          },
          _div_933: {
            _attr: {
              class: 'p-2 bd-highlight'
            },
            show_all: {}
          }
        },
        module_ids: {
          class: 'o_modules_field',
          views: {
            kanban: {
              arch: {
                sheet: {
                  _attr: {
                    class: 'o_modules_kanban'
                  },
                  icon: {},
                  state: {},
                  summary: {},
                  _templates: {
                    _t: {
                      _div: {
                        _attr: {
                          class: 'oe_module_vignette'
                        },
                        _t: {},
                        _img: {
                          _attr: {
                            class: 'oe_module_icon'
                          }
                        },
                        _div: {
                          _attr: {
                            class: 'oe_module_desc'
                          },
                          _h4: {
                            _attr: {
                              class: 'o_kanban_record_title'
                            },
                            shortdesc: {}
                          },
                          _p: {
                            _attr: {
                              class: 'oe_module_name'
                            },
                            summary: {
                              groups: '!base.group_no_one'
                            },
                            _code: {
                              _attr: {
                                groups: 'base.group_no_one'
                              },
                              name: {}
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
        _h3: 'Documents to Delete',
        model_ids: {
          string: 'Models',
          views: {
            tree: {
              arch: {
                sheet: {
                  _attr: {
                    string: 'Models'
                  },
                  name: {
                    string: 'Document'
                  },
                  count: {}
                }
              }
            }
          }
        },
        _footer: {
          _button_action_uninstall: {
            _attr: {
              name: 'action_uninstall',
              type: 'object',
              string: 'Uninstall',
              class: 'btn-secondary'
            }
          },
          _button: {
            _attr: {
              string: 'Discard',
              class: 'btn-primary'
            }
          }
        }
      }
    }
  }
}
