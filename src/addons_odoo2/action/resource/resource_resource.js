export default {
  view_resource_resource_search: {
    _odoo_model: 'ir.ui.view',
    model: 'resource.resource',
    type: 'search',
    arch: {
      name: {},
      resource_type: {},
      user_id: {},
      calendar_id: {},
      company_id: { groups: 'base.group_multi_company' },
      _filter_human: {
        _attr: {
          name: 'human',
          string: 'Human',
          domain: [['resource_type', '=', 'user']]
        }
      },
      _filter_material: {
        _attr: {
          name: 'material',
          string: 'Material',
          domain: [['resource_type', '=', 'material']]
        }
      },
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_user: {
          _attr: {
            name: 'user',
            string: 'User',
            domain: [],
            context: { group_by: 'user_id' }
          }
        },
        _filter_type: {
          _attr: {
            name: 'type',
            string: 'Type',
            domain: [],
            context: { group_by: 'resource_type' }
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
        _filter_working_period: {
          _attr: {
            name: 'working_period',
            string: 'Working Time',
            domain: [],
            context: { group_by: 'calendar_id' }
          }
        }
      }
    }
  },

  resource_resource_form: {
    _odoo_model: 'ir.ui.view',
    model: 'resource.resource',
    type: 'form',
    arch: {
      sheet: {
        active: { invisible: '1' },
        company_id: { invisible: '1' },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _group: {
          _group_user_details: {
            _attr: { name: 'user_details' },
            name: {},
            user_id: {
              required: [['resource_type', '=', 'user']],
              invisible: [['resource_type', '=', 'material']]
            },
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            },
            resource_type: {}
          },
          _group_resource_details: {
            _attr: { name: 'resource_details' },
            calendar_id: {},
            tz: {},
            time_efficiency: {}
          }
        }
      }
    }
  },

  resource_resource_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'resource.resource',
    type: 'tree',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        name: {},
        user_id: {},
        _field_company_id_158: {
          company_id: {
            groups: 'base.group_multi_company',
            optional: 'show'
          }
        },
        calendar_id: { optional: 'show' },
        tz: { optional: 'hide' },
        resource_type: { optional: 'show' },
        time_efficiency: {}
      }
    }
  },

  action_resource_resource_tree: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Resources',
    res_model: 'resource.resource',
    search_view_id: 'view_resource_resource_search',
    context: {},
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  resource_resource_action_from_calendar: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Resources',
    res_model: 'resource.resource',
    search_view_id: 'view_resource_resource_search',
    context: { todo_ctx: "{\n            'default_calendar_id': active_id,\n            'search_default_calendar_id': active_id}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
