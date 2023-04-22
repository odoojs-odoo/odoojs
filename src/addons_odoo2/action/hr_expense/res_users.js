export default {
  res_users_view_form_preferences: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'hr.res_users_view_form_profile',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='managers']",
            position: 'inside'
          },
          expense_manager_id: {
            readonly: [['can_edit', '=', false]],
            context: { todo_ctx: "{'default_company_id': company_id}" }
          }
        },
        _xpath_120: {
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
  }
}
