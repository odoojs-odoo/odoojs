export default {
  sales_team_crm_tag_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.tag',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        color: { widget: 'color_picker' }
      }
    }
  },
  sales_team_crm_tag_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.tag',
    type: 'form',

    arch: {
      sheet: {
        _div_title: {
          _h1: { name: { placeholder: 'e.g. Services' } }
        },

        _group_name: {
          _group_name: {
            color: { required: 'True', widget: 'color_picker' }
          }
        }
      }
    }
  },

  sales_team_crm_tag_action: {
    _odoo_model: 'ir.actions.act_window',
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
