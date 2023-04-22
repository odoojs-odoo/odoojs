export default {
  view_crm_meeting_search: {
    _odoo_model: 'ir.ui.view',
    model: 'calendar.event',
    inherit_id: 'calendar.view_calendar_event_search',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='description']",
            position: 'after'
          },
          opportunity_id: {}
        }
      }
    }
  },

  act_crm_opportunity_calendar_event_new: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Meetings',
    res_model: 'calendar.event',
    search_view_id: 'tooooooodoooooo',
    context: { todo_ctx: "{'default_duration': 4.0, 'default_opportunity_id': active_id}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
