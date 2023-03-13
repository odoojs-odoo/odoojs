export default {
  view_currency_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.currency',
    type: 'tree',
    fields: {
      name: {},
      symbol: {},
      full_name: {},
      date: {},
      rate: {},
      inverse_rate: {},
      active: {}
    }
  },

  view_currency_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.currency',
    type: 'form',

    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
        },

        _group_name: {
          name: {},
          full_name: {},
          active: {}
        },

        _group_currency_unit: {
          currency_unit_label: {},
          currency_subunit_label: {}
        },

        _group_price_accuracy: {
          rounding: {},
          decimal_places: {}
        },

        _group_display: {
          symbol: {},
          position: {}
        },

        _group_date: {
          date: {},
          rate: {}
        },

        _group_rates: {
          _span: 2,

          rate_ids: {
            widget: 'x2many_tree',
            views: {
              tree: {
                fields: {
                  name: {},
                  company_id: {},
                  company_rate: {},
                  inverse_company_rate: {},
                  rate: {},
                  write_date: {}
                }
              },
              form: {
                fields: {
                  name: {},
                  company_id: {},
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
    },

    fields: {}
  },

  view_currency_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.currency',
    type: 'search',
    arch: {
      fields: {
        name: {}
      },

      filters: {
        group_active: {
          active: { string: '启用', domain: [['active', '=', true]] },
          inactive: { string: '停用', domain: [['active', '=', false]] }
        }
      }
    }
  },

  action_currency_form: {
    _odoo_model: 'ir.actions',
    name: '币种',
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
