export default {
  hr_employee_view_form_inherit_expense: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee',
    inherit_id: 'hr.view_employee_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='managers']",
            position: 'inside'
          },
          expense_manager_id: {
            context: { todo_ctx: "{'default_company_id': company_id}" }
          }
        },
        _xpath_762: {
          _attr: {
            expr: "//group[@name='managers']",
            position: 'attributes'
          },
          _attribute_invisible: {
            _attr: {
              name: 'invisible',
              text: '0',
              invisible: '0'
            }
          }
        }
      }
    }
  },

  view_employee_tree_inherit_expense: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee',
    inherit_id: 'hr.view_employee_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='work_location_id']",
            position: 'after'
          },
          expense_manager_id: {
            string: 'Expense Approver',
            optional: 'hide'
          }
        }
      }
    }
  }
}
