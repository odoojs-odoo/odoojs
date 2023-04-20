export default {
  mail_shortcode_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Chat Shortcode',
    res_model: 'mail.shortcode',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  mail_shortcode_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.shortcode',
    type: 'tree',
    arch: {
      sheet: {
        source: {},
        substitution: {},
        description: {}
      }
    }
  },

  mail_shortcode_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.shortcode',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          source: {},
          substitution: {},
          description: {}
        }
      }
    }
  }
}
