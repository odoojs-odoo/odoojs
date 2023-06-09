export default {
  sequence_view: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.sequence',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            name: {},
            implementation: {}
          },
          _group_556: {
            code: {},
            active: { widget: 'boolean_toggle' },
            company_id: { groups: 'base.group_multi_company' }
          }
        },
        _notebook: {
          _page_sequence: {
            _attr: {
              name: 'sequence',
              string: 'Sequence'
            },
            _group: {
              _group: {
                prefix: {},
                suffix: {},
                use_date_range: {}
              },
              _group_380: {
                padding: {},
                number_increment: {},
                number_next_actual: {
                  string: 'Next Number',
                  invisible: [['use_date_range', '=', true]]
                }
              }
            },
            date_range_ids: {
              invisible: [['use_date_range', '=', false]],
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Sequences' },
                      date_from: {},
                      date_to: {},
                      number_next_actual: { string: 'Next Number' }
                    }
                  }
                }
              }
            },
            _group_210: {
              _attr: { string: 'Legend (for prefix, suffix)' },
              _group: {
                _span: 'Current Year with Century: %%(year)s',
                _span_473: 'Current Year without Century: %%(y)s',
                _span_508: 'Month: %%(month)s',
                _span_866: 'Day: %%(day)s'
              },
              _group_677: {
                _span: 'Day of the Year: %%(doy)s',
                _span_917: 'Week of the Year: %%(woy)s',
                _span_520: 'Day of the Week (0:Monday): %%(weekday)s'
              },
              _group_282: {
                _span: 'Hour 00->24: %%(h24)s',
                _span_303: 'Hour 00->12: %%(h12)s',
                _span_444: 'Minute: %%(min)s',
                _span_725: 'Second: %%(sec)s'
              }
            },
            _group_760: {
              _attr: { invisible: [['use_date_range', '=', false]] },
              _div: "When subsequences per date range are used, you can prefix variables with 'range_'\n                                to use the beginning of the range instead of the current date, e.g. %%(range_year)s instead of %%(year)s."
            }
          }
        }
      }
    }
  },

  sequence_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.sequence',
    type: 'tree',
    arch: {
      sheet: {
        code: {},
        name: {},
        prefix: {},
        padding: {},
        company_id: { groups: 'base.group_multi_company' },
        number_next_actual: { string: 'Next Number' },
        number_increment: {},
        implementation: {}
      }
    }
  },

  view_sequence_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.sequence',
    type: 'search',
    arch: {
      name: { string: 'Sequence' },
      code: {},
      company_id: { groups: 'base.group_multi_company' },
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  ir_sequence_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sequences',
    type: 'ir.actions.act_window',
    res_model: 'ir.sequence',
    search_view_id: 'tooooooodoooooo',
    context: { active_test: false },
    views: {
      tree: 'sequence_view_tree',
      form: '=======todo=========='
    }
  }
}
