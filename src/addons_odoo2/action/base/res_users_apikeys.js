export default {
  view_apikeys: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users.apikeys',
    type: 'tree',
    arch: {
      sheet: {
        user_id: {},
        name: {},
        scope: {},
        create_date: {},
        _button_remove: {
          _attr: {
            name: 'remove',
            type: 'object',
            title: 'Delete API key.',
            icon: 'fa-trash'
          }
        }
      }
    }
  },

  action_apikeys_admin: {
    _odoo_model: 'ir.actions.act_window',
    name: 'API Keys Listing',
    res_model: 'res.users.apikeys',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'base.view_apikeys',
      form: '=======todo=========='
    }
  }
}
