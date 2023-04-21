export default {
  menu_hr: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'HR',
    sequence: 48,
    children: {
      menu_hr_setting: {
        name: 'Config',
        sequence: 1,
        children: {
          menu_open_view_categ_form: {
            name: 'Employee Tags',
            action: 'hr.open_view_categ_form'
          },
          menu_hr_contract_type_action: {
            name: 'Employment Types',
            action: 'hr.hr_contract_type_action'
          },
          menu_action_hr_job: {
            name: 'Job Positions',
            action: 'hr.action_hr_job'
          },
          menu_hr_work_location_action: {
            name: 'Work Locations',
            action: 'hr.hr_work_location_action'
          }
        }
      },

      menu_hr_department_tree_action: {
        name: 'Departments',
        action: 'hr.hr_department_tree_action'
      },

      menu_open_view_employee_list: {
        name: 'Employees',
        action: 'hr.open_view_employee_list'
      },

      menu_action_hr_contract: {
        name: 'Contracts',
        action: 'hr_contract.action_hr_contract'
      }
    }
  }
}
