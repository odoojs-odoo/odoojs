export default {
  view_resource_calendar_leaves_search: {
    _odoo_model: 'ir.ui.view',
    model: 'resource.calendar.leaves',
    type: 'search',
    arch: {
      name: {},
      resource_id: {},
      company_id: { groups: 'base.group_multi_company' },
      calendar_id: {},
      _filter_filter_date: {
        _attr: {
          name: 'filter_date',
          string: 'Period',
          date: 'date_from'
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_resource: {
          _attr: {
            name: 'resource',
            string: 'Resource',
            domain: [],
            context: { group_by: 'resource_id' }
          }
        },
        _filter_company: {
          _attr: {
            name: 'company',
            string: 'Company',
            groups: 'base.group_multi_company',
            domain: [],
            context: { group_by: 'company_id' }
          }
        },
        _filter_leave_month: {
          _attr: {
            name: 'leave_month',
            string: 'Leave Date',
            help: 'Starting Date of Leave',
            domain: [],
            context: { group_by: 'date_from' }
          }
        }
      }
    }
  },

  view_resource_calendar: {
    _odoo_model: 'ir.ui.view',
    model: 'resource.calendar.leaves',
    type: 'otherview',
    arch: {}
  },

  resource_calendar_leave_form: {
    _odoo_model: 'ir.ui.view',
    model: 'resource.calendar.leaves',
    type: 'form',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        _group: {
          _group_leave_details: {
            _attr: { name: 'leave_details' },
            name: { string: 'Reason' },
            calendar_id: {},
            company_id: {
              groups: 'base.group_multi_company',
              invisible: [['calendar_id', '=', false]],
              no_create: true
            },
            resource_id: {}
          },
          _group_leave_dates: {
            _attr: { name: 'leave_dates' },
            date_from: {},
            date_to: {}
          }
        }
      }
    }
  },

  resource_calendar_leave_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'resource.calendar.leaves',
    type: 'tree',
    arch: {
      sheet: {
        name: { string: 'Reason' },
        resource_id: {},
        company_id: { groups: 'base.group_multi_company' },
        calendar_id: {},
        date_from: {},
        date_to: {}
      }
    }
  },

  action_resource_calendar_leave_tree: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Resource Time Off',
    res_model: 'resource.calendar.leaves',
    search_view_id: 'view_resource_calendar_leaves_search',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  resource_calendar_leaves_action_from_calendar: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Resource Time Off',
    res_model: 'resource.calendar.leaves',
    search_view_id: 'view_resource_calendar_leaves_search',
    context: { todo_ctx: "{\n            'default_calendar_id': active_id,\n            'search_default_calendar_id': active_id}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  resource_calendar_closing_days: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Closing Days',
    res_model: 'resource.calendar.leaves',
    search_view_id: 'tooooooodoooooo',
    domain: "[['calendar_id','=',active_id], ['resource_id','=',False]]",
    context: { todo_ctx: "{'default_calendar_id': active_id}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  resource_calendar_resources_leaves: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Resources Time Off',
    res_model: 'resource.calendar.leaves',
    search_view_id: 'tooooooodoooooo',
    domain: "[['calendar_id','=',active_id], ['resource_id','!=',False]]",
    context: { todo_ctx: "{'default_calendar_id': active_id}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
