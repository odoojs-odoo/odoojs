export default {
  res_users_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'base.view_users_form',
    arch: {
      sheet: {
        _notebook: {
          _attr: { position: 'inside' },
          _page_calendar: {
            _attr: {
              name: 'calendar',
              string: 'Calendar',
              groups: 'base.group_system',
              invisible: [['share', '=', true]]
            },
            _group_calendar_accounts: {
              _attr: { name: 'calendar_accounts' }
            }
          }
        }
      }
    }
  }
}
