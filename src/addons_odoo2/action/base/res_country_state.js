export default {
  view_country_state_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.country.state',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        code: {},
        country_id: {
          no_create: true,
          no_open: true
        }
      }
    }
  },

  view_country_state_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.country.state',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          code: {},
          country_id: {
            no_open: true,
            no_create: true
          }
        }
      }
    }
  },

  view_country_state_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.country.state',
    type: 'search',
    arch: {
      name: {},
      country_id: {},
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_groupby_country: {
          _attr: {
            name: 'groupby_country',
            string: 'Country',
            context: {
              group_by: 'country_id'
            }
          }
        }
      }
    }
  },

  action_country_state: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Fed. States',
    type: 'ir.actions.act_window',
    res_model: 'res.country.state',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'view_country_state_tree',
      form: '=======todo=========='
    }
  }
}
