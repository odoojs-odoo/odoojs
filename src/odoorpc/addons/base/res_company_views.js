// ok

export default {
  view_company_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    type: 'form',
    fields: {
      logo: { widget: 'image' },
      name: {},
      partner_id: { readonly2: '1' },

      street: {},
      street2: {},
      city: {},
      state_id: {},
      zip: {},
      country_id: {},

      company_registry: {},

      currency_id: {},

      phone: {},
      mobile: {},
      email: {},
      website: {},
      parent_id: {},
      sequence: {}
      // favicon: { widget: 'image' }
    }
  },
  view_company_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    type: 'tree',
    fields: {
      sequence: {},
      name: {},
      partner_id: {}
    }
  },

  action_res_company_form: {
    _odoo_model: 'ir.actions',
    name: '公司',
    type: 'ir.actions.act_window',
    res_model: 'res.company',
    domain: [],
    context: {}
  },

  menu_action_res_company_form: {
    _odoo_model: 'ir.ui.menu',
    action: 'action_res_company_form',
    parent: 'menu_users',
    name: '公司',
    sequence: 1
  }
}
