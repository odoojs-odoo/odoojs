export default {
  view_department_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.department',
    type: 'form',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_hr__act_employee_from_department: {
            _attr: {
              name: 'hr.act_employee_from_department',
              type: 'action',
              icon: 'fa-users',
              class: 'oe_stat_button'
            },
            total_employee: {
              string: 'Employees',
              widget: 'statinfo'
            }
          },
          _button_action_plan_from_department: {
            _attr: {
              name: 'action_plan_from_department',
              type: 'object',
              icon: 'fa-list-ul',
              class: 'oe_stat_button'
            },
            plans_count: {
              string: 'Plans',
              widget: 'statinfo'
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        active: { invisible: '1' },
        _group: {
          name: {},
          manager_id: {},
          parent_id: {},
          company_id: {
            groups: 'base.group_multi_company',
            no_create: true
          }
        }
      }
    }
  },

  view_department_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.department',
    type: 'tree',
    arch: {
      sheet: {
        display_name: {},
        company_id: { groups: 'base.group_multi_company' },
        manager_id: {},
        total_employee: { string: 'Employees' },
        parent_id: {}
      }
    }
  },

  view_department_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.department',
    type: 'search',
    arch: {
      name: { string: 'Department' },
      manager_id: {},
      _filter_message_needaction: {
        _attr: {
          name: 'message_needaction',
          string: 'Unread Messages',
          domain: [['message_needaction', '=', true]]
        }
      },
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  hr_department_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.department',
    type: 'otherview',
    arch: {}
  },

  hr_department_kanban_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Departments',
    res_model: 'hr.department',
    search_view_id: 'view_department_filter',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  hr_department_tree_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Departments',
    res_model: 'hr.department',
    search_view_id: 'view_department_filter',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
