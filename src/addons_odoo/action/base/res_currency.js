export default {
  view_currency_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.currency',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Currency'
          // filter_domain: {
          //   todo_ctx:
          //     "('|','|','|','|', ('name', 'ilike', self), ('full_name', 'ilike', self), )"
          // }
        }
      },

      filters: {
        group_active: {
          active: {
            string: 'Active',
            domain: [['active', '=', true]]
          },
          inactive: {
            string: 'Inactive',
            domain: [['active', '=', false]]
          }
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
        rate: {},
        inverse_rate: {},
        active: { widget: 'boolean_toggle' }
      }
    }
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
            // oe_edit_only
            invisible({ editable }) {
              return !editable
            },
            text: 'You cannot reduce the number of decimal places of a currency already used on an accounting entry.'
          }
        },

        _div_2: {
          _attr: {
            invisible({ record }) {
              // 'invisible': [('is_current_company_currency','=',False)]
              const { is_current_company_currency } = record
              return !is_current_company_currency
            },
            text: "This is your company's currency."
          }
        },

        _group_1: {
          _group_11: {
            name: {},
            full_name: { string: 'Name' },
            active: { widget: 'boolean_toggle' }
          },
          _group_12: {
            currency_unit_label: {},
            currency_subunit_label: {}
          }
        },

        _group_2: {
          _attr: {
            groups: 'base.group_no_one'
          },
          _group_21: {
            rounding: {},
            decimal_places: {}
          },

          _group_22: {
            symbol: {},
            position: {}
          }
        },

        _notebook: {
          _attr: {
            invisible({ record }) {
              // 'invisible': [('is_current_company_currency','=',True)]}"
              const { is_current_company_currency } = record
              return is_current_company_currency
            }
          },

          _page_rates: {
            _attr: { string: 'Rates' },
            rate_ids: {
              widget: 'x2many_tree',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      name: {},
                      company_id: { groups: 'base.group_multi_company' },
                      company_rate: {},
                      inverse_company_rate: {},
                      rate: { optional: 'hide' },
                      write_date: { optional: 'hide' }
                    }
                  }
                },

                form: {
                  arch: {
                    sheet: {
                      name: {},
                      company_id: { groups: 'base.group_multi_company' },
                      company_rate: {},
                      inverse_company_rate: {},
                      rate: {},
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
    type: 'ir.actions.act_window',
    res_model: 'res.currency',
    search_view_id: 'view_currency_search',
    domain: [],
    context: { active_test: false },
    views: {
      tree: 'view_currency_tree',
      form: 'view_currency_form'
    }
  }
}
