export default {
  res_partner_industry_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.industry',
    type: 'tree',
    fields: {
      name: {},
      full_name: {},
      active: { invisible: 1 }
    }
  },
  res_partner_industry_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.industry',
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
          _span: 2,
          name: {},
          full_name: {},
          active: { widget: 'boolean_toggle' }
        }
      }
    },

    fields: {}
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
            string: '已归档',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  res_partner_industry_action: {
    _odoo_model: 'ir.actions',
    name: '行业',
    type: 'ir.actions.act_window',
    res_model: 'res.partner.industry',
    search_view_id: 'res_partner_industry_view_search',
    domain: [],
    context: {}
  }
}
