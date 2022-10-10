export default {
  view_incoterms_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.incoterms',
    type: 'tree',
    fields: {
      code: {},
      name: {},
      active: {}
    }
  },

  account_incoterms_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.incoterms',
    type: 'form',
    fields: {
      code: {},
      name: {},
      active: {}
    }
  },

  account_incoterms_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.incoterms',
    type: 'search',
    arch: {
      fields: {
        name: {}
      },

      filters: {
        group1: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    }
  },

  action_incoterms_tree: {
    _odoo_model: 'ir.actions',
    name: '国际贸易术语',
    type: 'ir.actions.act_window',
    res_model: 'account.incoterms',
    domain: [],
    context: {}
  }
}
