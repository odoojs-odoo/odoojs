export default {
  view_followers_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.followers',
    type: 'tree',
    arch: {
      sheet: {
        res_model: {},
        res_id: {},
        partner_id: {}
      }
    }
  },

  view_mail_subscription_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.followers',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            res_model: {},
            partner_id: {}
          },
          _group_116: {
            res_id: {},
            subtype_ids: { widget: 'many2many_tags' }
          }
        }
      }
    }
  },

  action_view_followers: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Followers',
    res_model: 'mail.followers',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
