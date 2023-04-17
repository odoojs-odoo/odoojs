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
          _group_398: {
            code: {},
            active: {
              widget: 'boolean_toggle'
            },
            company_id: {
              groups: 'base.group_multi_company'
            }
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
              _group_740: {
                padding: {},
                number_increment: {},
                number_next_actual: {
                  string: 'Next Number',
                  attrs: {
                    invisible: "[('use_date_range', '=', True)]"
                  }
                }
              }
            },
            date_range_ids: {
              attrs: {
                invisible: "[('use_date_range', '=', False)]"
              },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Sequences'
                      },
                      date_from: {},
                      date_to: {},
                      number_next_actual: {
                        string: 'Next Number'
                      }
                    }
                  }
                }
              }
            },
            _group_500: {
              _attr: {
                string: 'Legend (for prefix, suffix)'
              },
              _group: {
                _span: 'Current Year with Century: %%(year)s',
                _span_236: 'Current Year without Century: %%(y)s',
                _span_681: 'Month: %%(month)s',
                _span_685: 'Day: %%(day)s'
              },
              _group_751: {
                _span: 'Day of the Year: %%(doy)s',
                _span_180: 'Week of the Year: %%(woy)s',
                _span_599: 'Day of the Week (0:Monday): %%(weekday)s'
              },
              _group_918: {
                _span: 'Hour 00->24: %%(h24)s',
                _span_882: 'Hour 00->12: %%(h12)s',
                _span_843: 'Minute: %%(min)s',
                _span_459: 'Second: %%(sec)s'
              }
            },
            _group_252: {
              _attr: {
                attrs: {
                  invisible: "[('use_date_range', '=', False)]"
                }
              },
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
        company_id: {
          groups: 'base.group_multi_company'
        },
        number_next_actual: {
          string: 'Next Number'
        },
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
      name: {
        string: 'Sequence'
      },
      code: {},
      company_id: {
        groups: 'base.group_multi_company'
      },
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: "[('active', '=', False)]"
        }
      }
    }
  },

  ir_sequence_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sequences',
    type: 'ir.actions.act_window',
    res_model: 'ir.sequence',
    context: {
      active_test: false
    },
    views: {
      tree: 'sequence_view_tree',
      form: '=======todo=========='
    }
  }
}
