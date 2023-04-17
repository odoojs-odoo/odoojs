export default {
  view_module_category_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.module.category',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          parent_id: {},
          sequence: {}
        },
        description: {}
      }
    }
  },

  view_module_category_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.module.category',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        module_nr: {}
      }
    }
  }
}
