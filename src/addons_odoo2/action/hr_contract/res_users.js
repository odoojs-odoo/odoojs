export default {
  hr_user_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'hr.res_users_view_form_profile',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='employee_bank_account_id']",
            position: 'replace'
          },
          employee_bank_account_id: {
            readonly: [['can_edit', '=', false]],
            context: { display_partner: true }
          }
        }
      }
    }
  }
}
