export default {
  digest_tip_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'digest.tip',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        name: {},
        group_id: {}
      }
    }
  },

  digest_tip_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'digest.tip',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          tip_description: {},
          group_id: {},
          user_ids: {
            widget: 'many2many_tags'
          }
        }
      }
    }
  },

  digest_tip_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'digest.tip',
    type: 'search',
    arch: {
      name: {},
      tip_description: {},
      group_id: {}
    }
  },

  digest_tip_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Digest Tips',
    search_view_id: 'digest_tip_view_search',
    res_model: 'digest.tip',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
