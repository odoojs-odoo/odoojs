export default {
  mail_gateway_allowed_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.gateway.allowed',
    type: 'tree',
    arch: {
      sheet: {
        email: {}
      }
    }
  },

  mail_gateway_allowed_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.gateway.allowed',
    type: 'search',
    arch: {
      email: {}
    }
  },

  mail_gateway_allowed_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Mail Gateway Allowed',
    res_model: 'mail.gateway.allowed',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
