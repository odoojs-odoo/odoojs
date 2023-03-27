export default {
  view_company_taxmachine_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.company.taxmachine',
    type: 'tree',
    priority: 2,
    fields: {
      company_id: {},
      name: {},
      code: {}
    }
  },

  view_company_taxmachine_form: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.company.taxmachine',
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
          company_id: {},
          name: {},
          code: {}
        }
      }
    },
    fields: {}
  },

  action_company_taxmachine: {
    _odoo_model: 'ir.actions',
    name: '税控设备',
    type: 'ir.actions.act_window',
    res_model: 'fp.company.taxmachine',
    // search_view_id: '',
    domain: [],
    context: {},
    views: {
      tree: 'view_company_taxmachine_tree',
      form: 'view_company_taxmachine_form'
    }
  }
}
