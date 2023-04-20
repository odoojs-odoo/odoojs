export default {
  view_company_taxmachine_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.company.taxmachine',
    type: 'tree',
    arch: {
      sheet: {
        company_id: {},
        name: {},
        code: {}
      }
    }
  },

  view_company_taxmachine_form: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.company.taxmachine',
    type: 'form',

    arch: {
      sheet: {
        _group_name: {
          company_id: {},
          name: {},
          code: {}
        }
      }
    }
  },

  action_company_taxmachine: {
    _odoo_model: 'ir.actions.act_window',
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
