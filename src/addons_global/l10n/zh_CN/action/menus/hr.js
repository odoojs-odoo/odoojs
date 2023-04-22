export default {
  menu_hr: {
    name: '人力资源',
    children: {
      menu_hr_setting: {
        name: '配置',
        sequence: 1,
        children: {
          menu_open_view_categ_form: { name: '员工标签' },
          menu_hr_contract_type_action: { name: '员工类型' },
          menu_action_hr_job: { name: '职位' },
          menu_hr_work_location_action: { name: '工作地点' },
          menu_hr_department_tree_action: { name: '部门' },
          menu_open_view_employee_list: { name: '员工' },
          menu_action_hr_contract: { name: '合同' }
        }
      },

      menu_action_hr_expense_sheet_all_all: { name: '费用报销单' },
      menu_hr_expense_actions_all: { name: '费用清单' }
    }
  }
}
