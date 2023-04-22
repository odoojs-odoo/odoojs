export default {
  view_currency_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.currency',
    type: 'search',
    arch: {
      name: {
        string: 'Currency',
        filter_domain: { todo_ctx: "('|','|','|','|',                                                                         ('name', 'ilike', self),                                                                         ('full_name', 'ilike', self),                                                                         ('symbol', 'ilike', self),                                                                         ('currency_unit_label', 'ilike', self),                                                                         ('currency_subunit_label', 'ilike', self),                                                                         )" }
      },
      _filter_active: {
        _attr: {
          name: 'active',
          string: 'Active',
          help: 'Show active currencies',
          domain: [['active', '=', true]]
        }
      },
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Inactive',
          help: 'Show inactive currencies',
          domain: [['active', '=', false]]
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
          string: 'Name',
          optional: 'show'
        },
        date: { string: 'Last Update' },
        rate: { digits: '[12,6]' },
        inverse_rate: {
          optional: 'hide',
          digits: '[12,6]'
        },
        active: { widget: 'boolean_toggle' }
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
        is_current_company_currency: { invisible: '1' },
        _div: {
          _attr: {
            groups: 'base.group_no_one',
            class: 'oe_edit_only alert alert-info text-center',
            text: 'You cannot reduce the number of decimal places of a currency already used on an accounting entry.'
          }
        },
        _div_563: {
          _attr: {
            invisible: [['is_current_company_currency', '=', false]],
            class: 'alert alert-info text-center',
            text: "This is your company's currency."
          }
        },
        _group: {
          _group: {
            name: {},
            full_name: { string: 'Name' },
            active: { widget: 'boolean_toggle' }
          },
          _group_858: {
            currency_unit_label: {},
            currency_subunit_label: {}
          }
        },
        _group_777: {
          _attr: { groups: 'base.group_no_one' },
          _group: {
            _attr: { string: 'Price Accuracy' },
            rounding: {},
            decimal_places: {}
          },
          _group_919: {
            _attr: { string: 'Display' },
            symbol: {},
            position: {}
          }
        },
        _notebook: {
          _attr: {
            invisible: [['is_current_company_currency', '=', true]],
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
                      _attr: { string: 'Rates' },
                      name: {},
                      company_id: { groups: 'base.group_multi_company' },
                      company_rate: { digits: '[12,12]' },
                      inverse_company_rate: { digits: '[12,12]' },
                      rate: {
                        optional: 'hide',
                        digits: '[12,12]'
                      },
                      write_date: { optional: 'hide' }
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
    res_model: 'res.currency',
    search_view_id: 'view_currency_search',
    context: { active_test: false },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
