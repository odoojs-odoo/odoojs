export default {
  view_calendar_event_type_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'calendar.event.type',
    type: 'tree',
    arch: {
      sheet: {
        name: {}
      }
    }
  },

  action_calendar_event_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Meeting Types',
    res_model: 'calendar.event.type',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'view_calendar_event_type_tree',
      form: '=======todo=========='
    }
  }
}
