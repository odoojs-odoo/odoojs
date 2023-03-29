export default {
  sales_team_crm_tag_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.tag',
    type: 'tree',
    fields: {
      name: {}
      // color: {}
    }
  },
  sales_team_crm_tag_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.tag',
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
          color: {}
        }
      }
    }
  },

  sales_team_crm_tag_action: {
    _odoo_model: 'ir.actions',
    name: 'Tags',
    type: 'ir.actions.act_window',
    res_model: 'crm.tag',
    domain: [],
    context: {},
    views: {
      tree: 'sales_team_crm_tag_view_tree',
      form: 'sales_team_crm_tag_view_form'
    }
  }
}
