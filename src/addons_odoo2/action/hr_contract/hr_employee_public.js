export default {
  hr_employee_public_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee.public',
    inherit_id: 'hr.hr_employee_public_view_form',
    arch: {
      sheet: {
        employee_type: {
          position: 'replace',
          __todo__replace: {}
        },
        user_id: {
          position: 'replace',
          __todo__replace: {}
        },
        _group_location: {
          _attr: {
            name: 'location',
            position: 'after'
          },
          _group_status: {
            _attr: {
              name: 'status',
              string: 'Status'
            },
            employee_type: {},
            first_contract_date: {},
            user_id: { string: 'Related User' }
          }
        }
      }
    }
  }
}
