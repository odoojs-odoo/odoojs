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
          active: { widget: 'boolean_toggle' }
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
        active: { invisible: 1 }
      }
    }
  },

  res_partner_industry_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.industry',
    type: 'search',
    arch: {
      fields: {
        name: {},
        full_name: {}
      },

      filters: {
        group_active: {
          inactive: {
            name: 'inactive',
            string: 'Archived',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  res_partner_industry_action: {
    _odoo_model: 'ir.actions',
    name: 'Industries',
    type: 'ir.actions.act_window',
    res_model: 'res.partner.industry',
    search_view_id: 'res_partner_industry_view_search',
    domain: [],
    context: {},
    views: {
      tree: 'res_partner_industry_view_tree',
      form: 'res_partner_industry_view_form'
    }
  }
}
