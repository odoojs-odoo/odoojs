export default {
  view_partner_title_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.title',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        shortcut: {}
      }
    }
  },

  view_partner_title_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.title',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          shortcut: {}
        }
      }
    }
  },

  action_partner_title_contact: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Contact Titles',
    type: 'ir.actions.act_window',
    res_model: 'res.partner.title',
    search_view_id: 'tooooooodoooooo',
    domain: '[]',
    context: {},
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
