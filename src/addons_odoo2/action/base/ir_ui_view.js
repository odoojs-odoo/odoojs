export default {
  view_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.ui.view',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            name: {},
            type: {},
            model: {},
            priority: {},
            active: {
              widget: 'boolean_toggle'
            }
          },
          _group_990: {
            _attr: {
              groups: 'base.group_no_one'
            },
            field_parent: {},
            inherit_id: {},
            mode: {},
            model_data_id: {},
            xml_id: {
              class: 'text-break'
            }
          }
        },
        _div: {
          _attr: {
            class: 'oe_edit_only alert alert-info',
            text: 'Be aware that editing the architecture of a standard view is not advised, since the changes will be overwritten during future module updates.'
          },
          _br: {}
        },
        _notebook: {
          _page_architecture: {
            _attr: {
              name: 'architecture',
              string: 'Architecture'
            },
            arch_db: {
              class: 'oe_no_translation_content'
            },
            arch_base: {
              string: 'View Architecture',
              widget: 'ace',
              required: '1',
              mode: 'xml'
            }
          },
          _page_access_rights: {
            _attr: {
              name: 'access_rights',
              string: 'Access Rights'
            },
            groups_id: {}
          },
          _page_inherit_children: {
            _attr: {
              name: 'inherit_children',
              string: 'Inherited Views'
            },
            inherit_children_ids: {
              context: {
                todo_ctx: "{'default_model':model,'default_type':type,'default_inherit_id':active_id,'default_mode':'extension', 'active_test': False}"
              },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      active: {
                        invisible: '1'
                      },
                      id: {},
                      priority: {},
                      name: {},
                      xml_id: {}
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

  view_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.ui.view',
    type: 'tree',
    arch: {
      sheet: {
        priority: {
          string: 'Sequence',
          widget: 'handle'
        },
        name: {},
        type: {},
        model: {},
        xml_id: {
          groups: 'base.group_no_one'
        },
        inherit_id: {}
      }
    }
  },

  view_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.ui.view',
    type: 'search',
    arch: {
      name: {
        string: 'View',
        filter_domain: {
          todo_ctx: "['|', '|', ('name','ilike',self), ('model','ilike',self), ('model_data_id','ilike',self)]"
        }
      },
      key: {},
      model: {},
      inherit_id: {},
      type: {},
      arch_db: {
        string: 'View Architecture'
      },
      _filter_form: {
        _attr: {
          name: 'form',
          string: 'Form',
          domain: [['type', '=', 'form']]
        }
      },
      _filter_tree: {
        _attr: {
          name: 'tree',
          string: 'Tree',
          domain: [['type', '=', 'tree']]
        }
      },
      _filter_kanban: {
        _attr: {
          name: 'kanban',
          string: 'Kanban',
          domain: [['type', '=', 'kanban']]
        }
      },
      _filter_search: {
        _attr: {
          name: 'search',
          string: 'Search',
          domain: [['type', '=', 'search']]
        }
      },
      _filter_qweb: {
        _attr: {
          name: 'qweb',
          string: 'QWeb',
          domain: [['type', '=', 'qweb']]
        }
      },
      _separator: {},
      _filter_arch_updated: {
        _attr: {
          name: 'arch_updated',
          string: 'Modified Architecture',
          domain: [['arch_updated', '=', true]]
        }
      },
      _separator_738: {},
      _filter_active: {
        _attr: {
          name: 'active',
          string: 'Active',
          domain: [['active', '=', true]]
        }
      },
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Inactive',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_object: {
          _attr: {
            name: 'object',
            string: 'Model',
            domain: [],
            context: {
              group_by: 'model'
            }
          }
        },
        _filter_type: {
          _attr: {
            name: 'type',
            string: 'Type',
            domain: [],
            context: {
              group_by: 'type'
            }
          }
        },
        _filter_inherit: {
          _attr: {
            name: 'inherit',
            string: 'Inherit',
            domain: [],
            context: {
              group_by: 'inherit_id'
            }
          }
        }
      }
    }
  },

  action_ui_view: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Views',
    type: 'ir.actions.act_window',
    res_model: 'ir.ui.view',
    search_view_id: 'tooooooodoooooo',
    context: {
      search_default_active: 1
    },
    views: {
      tree: 'view_view_tree',
      form: '=======todo=========='
    }
  }
}
