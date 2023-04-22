export default {
  view_calendar_alarm_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'calendar.alarm',
    type: 'tree',
    arch: {
      sheet: {
        name: { invisible: '1' },
        alarm_type: {},
        duration: {},
        interval: {}
      }
    }
  },

  calendar_alarm_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'calendar.alarm',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group_left_details: {
            _attr: { name: 'left_details' },
            name: { invisible: '1' },
            alarm_type: {},
            mail_template_id: {
              invisible: [['alarm_type', '!=', 'email']],
              required: [['alarm_type', '=', 'email']],
              context: { default_model: 'calendar.event' }
            },
            body: { invisible: [['alarm_type', '!=', 'notification']] }
          },
          _group_right_details: {
            _attr: { name: 'right_details' },
            _label_duration: { for: 'duration' },
            _div: {
              _attr: { class: 'o_row' },
              duration: {},
              interval: {}
            }
          }
        }
      }
    }
  },

  action_calendar_alarm: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Calendar Alarm',
    res_model: 'calendar.alarm',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'view_calendar_alarm_tree',
      form: '=======todo=========='
    }
  }
}
