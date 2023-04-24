export default {
  view_model_fields_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.fields',
    type: 'form',
    arch: {
      sheet: {
        state: { invisible: '1' },
        _group: {
          _group: {
            name: {},
            field_description: {},
            model_id: { readonly: [['state', '!=', 'manual']] }
          },
          _group_190: {
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
              _group_712: {
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
                group_expand: {
                  groups: 'base.group_no_one',
                  readonly: [['ttype', 'not in', ['many2one', 'selection']]],
                  invisible: [['ttype', 'not in', ['many2one', 'selection']]]
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
            _group_860: {
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
            _group_917: {
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
                _attr: { text: ['Computed fields are defined with the fields', 'and', '.'] },
                _strong: 'Dependencies',
                _strong_277: 'Compute'
              },
              _p_777: {
                _attr: { text: ['The field', 'lists the fields that\n                                    the current field depends on. It is a comma-separated list of\n                                    field names, like', '. You can also refer to\n                                    fields accessible through other relational fields, for instance', '.'] },
                _strong: 'Dependencies',
                _code: 'name, size',
                _code_534: 'partner_id.company_id.name'
              },
              _p_244: {
                _attr: { text: ['The field', 'is the Python code to\n                                    compute the value of the field on a set of records. The value of\n                                    the field must be assigned to each record with a dictionary-like\n                                    assignment.'] },
                _strong: 'Compute'
              },
              _pre: "for record in self:\n        record['size'] = len(record.name)",
              _p_750: 'The only predefined variables are',
              _ul: {
                _li: {
                  _attr: { text: '(the set of records to compute)' },
                  _code: 'self'
                },
                _li_481: {
                  _attr: { text: '(Python module)' },
                  _code: 'datetime'
                },
                _li_642: {
                  _attr: { text: '(Python module)' },
                  _code: 'dateutil'
                },
                _li_939: {
                  _attr: { text: '(Python module)' },
                  _code: 'time'
                }
              },
              _p_146: {
                _attr: { text: ['Other features are accessible through', ', like', ', etc.'] },
                _code: 'self',
                _code_281: 'self.env'
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
  },

  view_model_fields_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.fields',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        field_description: {},
        model_id: {},
        ttype: {},
        state: {},
        index: {},
        store: {},
        readonly: {},
        relation: {}
      }
    }
  },

  view_model_fields_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.fields',
    type: 'search',
    arch: {
      name: {
        string: 'Field',
        filter_domain: { todo_ctx: "['|', ('name','ilike',self), ('field_description','ilike',self)]" }
      },
      _filter_required: {
        _attr: {
          name: 'required',
          string: 'Required',
          domain: [['required', '=', true]]
        }
      },
      _separator: {},
      _filter_readonly: {
        _attr: {
          name: 'readonly',
          string: 'Readonly',
          domain: [['readonly', '=', true]]
        }
      },
      _separator_554: {},
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
      },
      _separator_944: {},
      _filter_translate: {
        _attr: {
          name: 'translate',
          string: 'Translate',
          domain: [['translate', '=', true]]
        }
      },
      model_id: {},
      ttype: {},
      required: {},
      readonly: {},
      relation: {},
      _group: {
        _attr: { string: 'Group By' },
        _filter_group_by_object: {
          _attr: {
            name: 'group_by_object',
            string: 'Model',
            domain: [],
            context: { group_by: 'model_id' }
          }
        },
        _filter_group_by_ttype: {
          _attr: {
            name: 'group_by_ttype',
            string: 'Field Type',
            domain: [],
            context: { group_by: 'ttype' }
          }
        }
      }
    }
  },

  action_model_fields: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Fields',
    res_model: 'ir.model.fields',
    search_view_id: 'tooooooodoooooo',
    context: {},
    views: {
      tree: 'view_model_fields_tree',
      form: '=======todo=========='
    }
  }
}
