export default {
  view_server_action_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.server',
    type: 'form',
    arch: {
      sheet: {
        _header: {
          binding_model_id: {
            invisible: '1'
          },
          _button_create_action: {
            _attr: {
              name: 'create_action',
              string: 'Create Contextual Action',
              attrs: {
                invisible: "[('binding_model_id', '!=', False)]"
              },
              class: 'btn-primary',
              type: 'object'
            }
          },
          _button_unlink_action: {
            _attr: {
              name: 'unlink_action',
              string: 'Remove Contextual Action',
              attrs: {
                invisible: "[('binding_model_id', '=', False)]"
              },
              type: 'object'
            }
          },
          _button_run: {
            _attr: {
              name: 'run',
              string: 'Run',
              attrs: {
                todo: "{'invisible':['|', ('model_id', '!=', %(base.model_ir_actions_server)s), ('state', '!=', 'code')]}"
              },
              class: 'btn-primary',
              type: 'object'
            }
          }
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _label_name: {
            for: 'name'
          },
          _h1: {
            name: {
              placeholder: 'e.g. Update order quantity'
            }
          }
        },
        _group_action_wrapper: {
          _attr: {
            name: 'action_wrapper'
          },
          _group_action_content: {
            _attr: {
              name: 'action_content'
            },
            model_id: {
              no_create: true
            },
            model_name: {
              invisible: '1'
            }
          },
          _group: {
            state: {},
            type: {
              invisible: '1'
            },
            crud_model_id: {
              attrs: {
                invisible: "[('state', '!=', 'object_create')]",
                required: "[('state', '=', 'object_create')]"
              },
              no_create: true
            },
            crud_model_name: {
              invisible: '1'
            },
            link_field_id: {
              domain: {
                todo: "[('model_id', '=', model_id), ('relation', '=', crud_model_name),                                     ('ttype', 'in', ['many2one', 'one2many', 'many2many'])]"
              },
              attrs: {
                invisible: "[('state', '!=', 'object_create')]"
              },
              context: {
                todo: "{'default_model_id': model_id, 'default_relation': crud_model_name}"
              },
              no_create: true
            }
          }
        },
        _notebook: {
          _page_code: {
            _attr: {
              name: 'code',
              string: 'Python Code',
              attrs: {
                invisible: "[('state', '!=', 'code')]"
              }
            },
            code: {
              widget: 'ace',
              placeholder: 'Enter Python code here. Help about Python expression is available in the help tab of this document.',
              mode: 'python'
            }
          },
          _page_page_object: {
            _attr: {
              name: 'page_object',
              string: 'Data to Write',
              attrs: {
                invisible: "[('state', 'not in', ['object_create', 'object_write'])]"
              }
            },
            _p: {
              _attr: {
                attrs: {
                  invisible: "[('model_id', '!=', False)]"
                },
                text: 'Please set the Model to Create before choosing values'
              }
            },
            fields_lines: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Field Mappings'
                      },
                      col1: {
                        domain: {
                          todo: "['|', ('model_id', '=', parent.crud_model_id), ('model_id', '=', parent.model_id)]"
                        },
                        no_create: true
                      },
                      evaluation_type: {},
                      resource_ref: {
                        attrs: {
                          readonly: "[('evaluation_type', '!=', 'reference')]"
                        },
                        hide_model: true,
                        no_create: true
                      },
                      value: {
                        attrs: {
                          readonly: "[('evaluation_type', '=', 'reference')]"
                        },
                        force_save: '1',
                        no_create: true
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
          },
          _page_actions: {
            _attr: {
              name: 'actions',
              string: 'Actions',
              attrs: {
                invisible: "[('state', '!=', 'multi')]"
              }
            },
            _p: {
              _attr: {
                class: 'oe_grey',
                text: 'If several child actions return an action, only the last one will be executed.\n                                    This may happen when having server actions executing code that returns an action, or server actions returning a client action.'
              }
            },
            child_ids: {
              domain: {
                todo: "[('model_id', '=', model_id)]"
              }
            }
          },
          _page_help_info: {
            _attr: {
              name: 'help_info',
              string: 'Help',
              attrs: {
                invisible: "[('state', '!=', 'code')]"
              }
            },
            _div: {
              _h3: 'Help with Python expressions',
              _p: 'Various fields may use Python code or Python expressions. The following variables can be used:',
              _ul: {
                _li: {
                  _code: 'env'
                },
                _li_496: {
                  _code: 'model'
                },
                _li_796: {
                  _code: 'record'
                },
                _li_412: {
                  _code: 'records'
                },
                _li_388: {
                  _code: 'time',
                  _code_487: 'datetime',
                  _code_751: 'dateutil',
                  _code_721: 'timezone'
                },
                _li_865: {
                  _code: "log(message, level='info')",
                  _code_593: 'ir.logging'
                },
                _li_216: {
                  _code: 'UserError',
                  _code_708: 'raise'
                },
                _li_439: {
                  _code: 'Command'
                },
                _li_420: {
                  _attr: {
                    text: 'To return an action, assign:'
                  },
                  _code: 'action = {...}'
                }
              },
              _div: {
                _attr: {
                  attrs: {
                    invisible: "[('state', '!=', 'code')]"
                  }
                },
                _p: 'Example of Python code',
                _code: "partner_name = record.name + '_code' \n\nenv['res.partner'].create({'name': partner_name})"
              }
            }
          }
        }
      }
    }
  },

  view_server_action_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.server',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        name: {},
        state: {},
        model_id: {},
        usage: {}
      }
    }
  },

  view_server_action_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.server',
    type: 'search',
    arch: {
      name: {
        string: 'Server Action'
      },
      model_id: {},
      state: {},
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_action_type: {
          _attr: {
            name: 'action_type',
            string: 'Action Type',
            domain: "[]",
            context: {
              group_by: 'state'
            }
          }
        },
        _filter_model: {
          _attr: {
            name: 'model',
            string: 'Model',
            domain: "[]",
            context: {
              group_by: 'model_id'
            }
          }
        },
        _filter_usage: {
          _attr: {
            name: 'usage',
            string: 'Usage',
            domain: "[]",
            context: {
              group_by: 'usage'
            }
          }
        }
      }
    }
  },

  action_server_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Server Actions',
    type: 'ir.actions.act_window',
    search_view_id: 'view_server_action_search',
    res_model: 'ir.actions.server',
    context: {
      key: 'server_action'
    },
    views: {
      tree: 'view_server_action_tree',
      form: '=======todo=========='
    }
  }
}