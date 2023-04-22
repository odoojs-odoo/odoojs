export default {
  view_resource_calendar_attendance_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'resource.calendar.attendance',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        display_type: { invisible: '1' },
        display_name: {
          string: ' ',
          invisible: [['display_type', '!=', 'line_section']]
        },
        name: { invisible: [['display_type', '=', 'line_section']] },
        dayofweek: {},
        day_period: {},
        hour_from: { widget: 'float_time' },
        hour_to: { widget: 'float_time' },
        date_from: { optional: 'hide' },
        date_to: { optional: 'hide' },
        week_type: {
          groups: 'base.group_no_one',
          readonly: '1',
          force_save: '1'
        }
      }
    }
  },

  view_resource_calendar_attendance_form: {
    _odoo_model: 'ir.ui.view',
    model: 'resource.calendar.attendance',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          date_from: {},
          date_to: {},
          dayofweek: {},
          _label_hour_from: {
            for: 'hour_from',
            string: 'Hours'
          },
          _div: {
            _attr: {
              class: 'o_row',
              text: '-'
            },
            hour_from: { widget: 'float_time' },
            hour_to: { widget: 'float_time' }
          },
          day_period: {}
        }
      }
    }
  }
}
