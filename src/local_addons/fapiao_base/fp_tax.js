export default {
  view_tax_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.tax',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },

    fields: {
      code: {},
      name: {},
      tax_ratio: {},
      active: {}
    }
  },

  view_tax_form: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.tax',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },

    toolbar: {
      action: {},
      print: {}
    },

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
          code: {},
          name: {}
        },
        _group_taxmachine: {
          tax_ratio: {},
          active: {}
        }
      }
    }
  },

  action_tax: {
    _odoo_model: 'ir.actions',
    name: '开票税率',
    type: 'ir.actions.act_window',
    res_model: 'fp.tax',
    domain: [],
    context: {},
    views: {
      tree: 'view_tax_tree',
      form: 'view_tax_form'
    }
  }
}
