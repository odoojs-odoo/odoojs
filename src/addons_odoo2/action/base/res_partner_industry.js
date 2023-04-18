export default {
  res_partner_industry_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.industry',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          full_name: {},
          active: {
            widget: 'boolean_toggle'
          }
        }
      }
    }
  },

  res_partner_industry_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.industry',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        full_name: {},
        active: {
          invisible: '1'
        }
      }
    }
  },

  res_partner_industry_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.industry',
    type: 'search',
    arch: {
      name: {},
      full_name: {},
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

  res_partner_industry_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Industries',
    type: 'ir.actions.act_window',
    search_view_id: 'res_partner_industry_view_search',
    res_model: 'res.partner.industry',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
