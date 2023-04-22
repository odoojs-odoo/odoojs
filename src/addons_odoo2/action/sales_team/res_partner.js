export default {
  res_partner_view_team: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//page[@name='sales_purchases']//field[@name='user_id']",
            position: 'after'
          },
          team_id: { invisible: '1' },
          _field_team_id_393: {
            team_id: { groups: 'base.group_no_one' }
          }
        },
        parent_id: {
          position: 'attributes',
          context: { todo_ctx: "{'default_is_company': True, 'show_vat': True, 'default_user_id': user_id, 'default_team_id': team_id}" }
        }
      }
    }
  }
}
