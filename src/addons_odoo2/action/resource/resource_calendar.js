export default {
  view_resource_calendar_search: {
    _odoo_model: 'ir.ui.view',
    model: 'resource.calendar',
    type: 'search',
    arch: {
      name: { string: 'Working Time' },
      company_id: { groups: 'base.group_multi_company' },
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

  resource_calendar_form: {
    _odoo_model: 'ir.ui.view',
    model: 'resource.calendar',
    type: 'form',
    arch: {
      header: {
        _button_switch_calendar_type: {
          _attr: {
            name: 'switch_calendar_type',
            type: 'object',
            string: 'Switch to 2 weeks calendar',
            invisible: [['two_weeks_calendar', '=', true]]
          }
        },
        _button_switch_calendar_type_173: {
          _attr: {
            name: 'switch_calendar_type',
            type: 'object',
            string: 'Switch to 1 week calendar',
            invisible: [['two_weeks_calendar', '=', false]]
          }
        }
      },
      sheet: {
        two_weeks_calendar: { invisible: '1' },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_resource_calendar_leaves_action_from_calendar: {
            _attr: {
              name: 'resource_calendar_leaves_action_from_calendar',
              type: 'action',
              string: 'Time Off',
              icon: 'fa-plane',
              groups: 'base.group_no_one',
              class: 'oe_stat_button'
            }
          },
          _button_resource_resource_action_from_calendar: {
            _attr: {
              name: 'resource_resource_action_from_calendar',
              type: 'action',
              string: 'Work Resources',
              icon: 'fa-cogs',
              groups: 'base.group_user',
              class: 'oe_stat_button'
            }
          }
        },
        _h1: {
          name: {}
        },
        _group_resource_details: {
          _attr: { name: 'resource_details' },
          _group: {
            active: { invisible: '1' },
            company_id: { groups: 'base.group_multi_company' },
            hours_per_day: { widget: 'float_time' },
            tz: {
              widget: 'timezone_mismatch',
              tz_offset_field: 'tz_offset',
              mismatch_title: 'Timezone Mismatch : This timezone is different from that of your browser.\nPlease, be mindful of this when setting the working hours or the time off.'
            },
            tz_offset: { invisible: '1' }
          }
        },
        _notebook: {
          _page_working_hours: {
            _attr: {
              name: 'working_hours',
              string: 'Working Hours'
            },
            two_weeks_explanation: { invisible: [['two_weeks_calendar', '=', false]] },
            attendance_ids: { widget: 'section_one2many' }
          }
        }
      }
    }
  },

  view_resource_calendar_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'resource.calendar',
    type: 'tree',
    arch: {
      sheet: {
        name: { string: 'Working Time' },
        company_id: { groups: 'base.group_multi_company' }
      }
    }
  },

  action_resource_calendar_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Working Times',
    res_model: 'resource.calendar',
    search_view_id: 'view_resource_calendar_search',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
