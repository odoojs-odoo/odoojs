export default {
  mail_guest_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.guest',
    type: 'tree',
    arch: {
      sheet: {
        id: {},
        name: {},
        country_id: {},
        lang: {},
        timezone: {}
      }
    }
  },

  mail_guest_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Guests',
    res_model: 'mail.guest',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
