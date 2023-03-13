export default {
  view_partner_title_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.title',
    type: 'tree',
    fields: {
      name: {},
      shortcut: {}
    }
  },
  view_partner_title_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.title',
    type: 'form',
    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
        },

        _group_name: {
          _span: 2,
          name: {},
          shortcut: {}
        }
      }
    }
  },

  action_partner_title_contact: {
    _odoo_model: 'ir.actions',
    name: '联系人头衔',
    type: 'ir.actions.act_window',
    res_model: 'res.partner.title',
    domain: [],
    context: {},
    views: {
      tree: 'view_partner_title_tree',
      form: 'view_partner_title_form'
    }
  }
}
