// ok

export default {
  action_contacts: {
    _odoo_model: 'ir.actions.act_window',
    name: '联系人',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    search_view_id: 'base.view_res_partner_filter',
    domain: [],
    context: { default_is_company: true },

    views: {
      tree: 'base.view_partner_tree',
      form: 'base.view_partner_form'
    }
  }
}
