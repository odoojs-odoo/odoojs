export default {
  view_currency_rate_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.currency.rate',
    type: 'search',
    arch: {
      name: {
        string: 'Date'
      }
    }
  },

  view_currency_rate_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.currency.rate',
    type: 'tree',
    arch: {
      sheet: {
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
          optional: 'hide',
          digits: '[12,12]'
        },
        write_date: {
          optional: 'hide'
        }
      }
    }
  },

  view_currency_rate_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.currency.rate',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            name: {},
            rate: {
              groups: 'base.group_no_one',
              digits: '[12,12]'
            },
            company_rate: {
              digits: '[12,12]'
            },
            inverse_company_rate: {
              digits: '[12,12]'
            }
          },
          _group_165: {
            currency_id: {},
            company_id: {
              groups: 'base.group_multi_company'
            }
          }
        }
      }
    }
  },

  act_view_currency_rates: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Show Currency Rates',
    res_model: 'res.currency.rate',
    domain: "[['currency_id','=', active_id]]",
    context: {
      todo_ctx: "{'default_currency_id': active_id}"
    },
    views: {
      tree: 'view_currency_rate_tree',
      form: '=======todo=========='
    }
  }
}
