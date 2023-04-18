export default {
  action_contacts: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Contacts',
    type: 'ir.actions.act_window',
    search_view_id: 'base.view_res_partner_filter',
    res_model: 'res.partner',
    context: {
      default_is_company: true
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_contacts_view_kanban: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'kanban',
    view_id: 'base.res_partner_kanban_view',
    act_window_id: 'action_contacts'
  },

  action_contacts_view_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'base.view_partner_tree',
    act_window_id: 'action_contacts'
  },

  action_contacts_view_form: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'form',
    view_id: 'base.view_partner_form',
    act_window_id: 'action_contacts'
  }
}
