export default {
  view_model_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            id: { invisible: '1' },
            name: {},
            model: { readonly: [['id', '!=', false]] },
            order: {},
            transient: {
              groups: 'base.group_no_one',
              readonly: [['id', '!=', false]]
            }
          },
          _group_184: {
            state: {
              groups: 'base.group_no_one',
              readonly: '1'
            },
            modules: { groups: 'base.group_no_one' }
          }
        },
        _notebook: {
          _page_fields: {
            _attr: {
              name: 'fields',
              string: 'Fields'
            },
            field_id: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Fields Description' },
                      name: {},
                      field_description: {},
                      ttype: {},
                      required: {},
                      readonly: {},
                      index: { groups: 'base.group_no_one' },
                      state: { groups: 'base.group_no_one' }
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Fields Description' },
                      _group: {
                        _group: {
                          name: {},
                          field_description: {}
                        },
                        _group_855: {
                          ttype: {},
                          help: {}
                        }
                      },
                      _notebook: {
                        _page_base: {
                          _attr: {
                            name: 'base',
                            string: 'Properties'
                          },
                          _group: {
                            _attr: { string: 'Base Properties' },
                            _group: {
                              required: {},
                              readonly: {},
                              store: { groups: 'base.group_no_one' },
                              index: { groups: 'base.group_no_one' },
                              copied: { groups: 'base.group_no_one' }
                            },
                            _group_453: {
                              translate: {
                                readonly: [['ttype', 'not in', ['char', 'text', 'html']]],
                                invisible: [['ttype', 'not in', ['char', 'text', 'html']]]
                              },
                              size: {
                                groups: 'base.group_no_one',
                                readonly: [['ttype', 'not in', ['char', 'reference']]],
                                invisible: [['ttype', 'not in', ['char', 'reference']]]
                              },
                              relation: {
                                required: [['ttype', 'in', ['many2one', 'one2many', 'many2many']]],
                                readonly: [['ttype', 'not in', ['many2one', 'one2many', 'many2many']]],
                                invisible: [['ttype', 'not in', ['many2one', 'one2many', 'many2many']]]
                              },
                              on_delete: {
                                groups: 'base.group_no_one',
                                readonly: [['ttype', '!=', 'many2one']],
                                invisible: [['ttype', '!=', 'many2one']]
                              },
                              relation_field: {
                                required: [['ttype', '=', 'one2many']],
                                readonly: [['ttype', '!=', 'one2many']],
                                invisible: [['ttype', '!=', 'one2many']]
                              },
                              relation_table: {
                                groups: 'base.group_no_one',
                                readonly: ['|', ['ttype', '!=', 'many2many'], ['state', '!=', 'manual']],
                                invisible: ['|', ['ttype', '!=', 'many2many'], ['state', '!=', 'manual']]
                              },
                              column1: {
                                groups: 'base.group_no_one',
                                readonly: ['|', ['ttype', '!=', 'many2many'], ['state', '!=', 'manual']],
                                invisible: ['|', ['ttype', '!=', 'many2many'], ['state', '!=', 'manual']]
                              },
                              column2: {
                                groups: 'base.group_no_one',
                                readonly: ['|', ['ttype', '!=', 'many2many'], ['state', '!=', 'manual']],
                                invisible: ['|', ['ttype', '!=', 'many2many'], ['state', '!=', 'manual']]
                              },
                              domain: {
                                groups: 'base.group_no_one',
                                readonly: [['ttype', 'not in', ['many2one', 'one2many', 'many2many']]],
                                invisible: [['ttype', 'not in', ['many2one', 'one2many', 'many2many']]]
                              }
                            }
                          },
                          _group_824: {
                            _attr: {
                              readonly: [['ttype', 'not in', ['selection', 'reference']]],
                              invisible: [['ttype', 'not in', ['selection', 'reference']]]
                            },
                            selection_ids: {
                              views: {
                                tree: {
                                  arch: {
                                    sheet: {
                                      sequence: { widget: 'handle' },
                                      value: {},
                                      name: {}
                                    }
                                  }
                                }
                              }
                            }
                          },
                          _group_738: {
                            _attr: {
                              string: 'Advanced Properties',
                              groups: 'base.group_no_one'
                            },
                            related: {},
                            depends: { required: [['compute', 'not in', [false, '']]] },
                            compute: {
                              widget: 'ace',
                              mode: 'python'
                            }
                          },
                          _div: {
                            _attr: { groups: 'base.group_no_one' },
                            _h3: 'How to define a computed field',
                            _p: {
                              _attr: { text: 'Computed fields are defined with the fields' },
                              _strong: 'Dependencies',
                              _strong_981: 'Compute'
                            },
                            _p_564: {
                              _attr: { text: 'The field' },
                              _strong: 'Dependencies',
                              _code: 'name, size',
                              _code_258: 'partner_id.company_id.name'
                            },
                            _p_987: {
                              _attr: { text: 'The field' },
                              _strong: 'Compute'
                            },
                            _pre: "for record in self:\n        record['size'] = len(record.name)",
                            _p_223: 'The only predefined variables are',
                            _ul: {
                              _li: { _code: 'self' },
                              _li_402: { _code: 'datetime' },
                              _li_749: { _code: 'dateutil' },
                              _li_310: { _code: 'time' }
                            },
                            _p_196: {
                              _attr: { text: 'Other features are accessible through' },
                              _code: 'self',
                              _code_966: 'self.env'
                            }
                          }
                        },
                        _page_groups: {
                          _attr: {
                            name: 'groups',
                            string: 'Access Rights'
                          },
                          groups: {}
                        },
                        _page_misc: {
                          _attr: {
                            name: 'misc',
                            string: 'Miscellaneous',
                            groups: 'base.group_no_one'
                          },
                          _group: {
                            state: {},
                            modules: {}
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            _button_act_menu_create: {
              _attr: {
                name: 'act_menu_create',
                type: 'action',
                string: 'Create a Menu',
                icon: 'fa-align-justify',
                groups: 'base.group_no_one'
              }
            }
          },
          _page_access_rights: {
            _attr: {
              name: 'access_rights',
              string: 'Access Rights'
            },
            access_ids: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Access Rights' },
                      name: {},
                      group_id: {},
                      perm_read: {},
                      perm_write: {},
                      perm_create: {},
                      perm_unlink: {}
                    }
                  }
                }
              }
            }
          },
          _page_record_rules: {
            _attr: {
              name: 'record_rules',
              string: 'Record Rules'
            },
            rule_ids: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Record Rules' },
                      name: {},
                      groups: {
                        widget: 'many2many_tags',
                        no_create: true
                      },
                      domain_force: {},
                      perm_read: {},
                      perm_write: {},
                      perm_create: {},
                      perm_unlink: {}
                    }
                  }
                }
              }
            }
          },
          _page_notes: {
            _attr: {
              name: 'notes',
              string: 'Notes',
              groups: 'base.group_no_one'
            },
            info: {}
          },
          _page_views: {
            _attr: {
              name: 'views',
              string: 'Views',
              groups: 'base.group_no_one'
            },
            view_ids: {}
          }
        }
      }
    }
  },

  view_model_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model',
    type: 'tree',
    arch: {
      sheet: {
        model: {},
        name: {},
        state: {},
        transient: {}
      }
    }
  },

  view_model_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model',
    type: 'search',
    arch: {
      name: {
        string: 'Model',
        filter_domain: { todo_ctx: "['|', ('name','ilike',self), ('model','ilike',self)]" }
      },
      model: {
        string: 'Technical Name',
        filter_domain: { todo_ctx: "[('model','ilike',self)]" }
      },
      _filter_transient: {
        _attr: {
          name: 'transient',
          string: 'Transient',
          domain: [['transient', '=', true]]
        }
      },
      _separator: {},
      _filter_custom: {
        _attr: {
          name: 'custom',
          string: 'Custom',
          domain: [['state', '=', 'manual']]
        }
      },
      _filter_base: {
        _attr: {
          name: 'base',
          string: 'Base',
          domain: [['state', '=', 'base']]
        }
      }
    }
  },

  action_model_model: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Models',
    res_model: 'ir.model',
    search_view_id: 'tooooooodoooooo',
    context: {},
    views: {
      tree: 'view_model_tree',
      form: '=======todo=========='
    }
  }
}
