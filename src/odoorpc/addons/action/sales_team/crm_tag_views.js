// ok
export default {
  sales_team_crm_tag_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.tag',
    type: 'tree',
    fields: {
      name: {},
      color: {}
    }
  },
  sales_team_crm_tag_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.tag',
    type: 'form',
    fields: {
      name: {},
      color: {}
    }
  },

  sales_team_crm_tag_action: {
    _odoo_model: 'ir.actions',
    name: '销售标签',
    type: 'ir.actions.act_window',
    res_model: 'crm.tag',
    domain: [],
    context: {}
  }
}
