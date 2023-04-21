export default {
  view_employee_category_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee.category',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {}
        }
      }
    }
  },

  view_employee_category_list: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee.category',
    type: 'tree',
    arch: {
      sheet: {
        name: {}
      }
    }
  },

  open_view_categ_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Employee Tags',
    res_model: 'hr.employee.category',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
