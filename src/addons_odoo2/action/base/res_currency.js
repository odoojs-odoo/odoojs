export default {
  view_currency_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.currency',
    type: 'search',
    arch: {
      name: {
        string: 'Currency'
      },
      _filter_active: {
        _attr: {
          name: 'active',
          string: 'Active',
          domain: "[('active', '=', True)]"
        }
      },
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Inactive',
          domain: "[('active', '=', False)]"
        }
      }
    }
  },

  view_currency_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.currency',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        symbol: {},
        full_name: {
          string: 'Name'
        },
        date: {
          string: 'Last Update'
        },
        rate: {
          digits: '[12,6]'
        },
        inverse_rate: {
          digits: '[12,6]'
        },
        active: {
          widget: 'boolean_toggle'
        }
      }
    }
  },

  view_currency_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'res.currency',
    type: 'otherview',
    arch: {}
  },

  view_currency_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.currency',
    type: 'form',
    arch: {
      sheet: {
        is_current_company_currency: {
          invisible: '1'
        },
        _div: {
          _attr: {
            groups: 'base.group_no_one',
            class: 'oe_edit_only alert alert-info text-center',
            text: 'You cannot reduce the number of decimal places of a currency already used on an accounting entry.'
          }
        },
        _div_760: {
          _attr: {
            attrs: {
              invisible: "[('is_current_company_currency', '=', False)]"
            },
            class: 'alert alert-info text-center',
            text: "This is your company's currency."
          }
        },
        _group: {
          _group: {
            name: {},
            full_name: {
              string: 'Name'
            },
            active: {
              widget: 'boolean_toggle'
            }
          },
          _group_270: {
            currency_unit_label: {},
            currency_subunit_label: {}
          }
        },
        _group_530: {
          _attr: {
            groups: 'base.group_no_one'
          },
          _group: {
            _attr: {
              string: 'Price Accuracy'
            },
            rounding: {},
            decimal_places: {}
          },
          _group_259: {
            _attr: {
              string: 'Display'
            },
            symbol: {},
            position: {}
          }
        },
        _notebook: {
          _attr: {
            attrs: {
              invisible: "[('is_current_company_currency', '=', True)]"
            },
            class: 'o_currency_rate_list'
          },
          _page_rates: {
            _attr: {
              name: 'rates',
              string: 'Rates'
            },
            rate_ids: {
              widget: 'one2many',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Rates'
                      },
                      name: {},
                      company_id: {
                        groups: 'base.group_multi_company'
                      },
                      company_rate: {
                        digits: '[12,12]'
                      },
                      inverse_company_rate: {
                        digits: '[12,12]'
                      },
                      rate: {
                        digits: '[12,12]'
                      },
                      write_date: {}
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

  action_currency_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Currencies',
    search_view_id: 'view_currency_search',
    res_model: 'res.currency',
    context: {
      active_test: false
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
