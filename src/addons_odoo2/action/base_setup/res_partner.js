export default {
  res_partner_kanban_view: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.res_partner_kanban_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[hasclass('oe_kanban_partner_categories')]",
            position: 'inside'
          },
          _span: {
            _attr: { class: 'oe_kanban_list_many2many' },
            category_id: {
              widget: 'many2many_tags',
              color_field: 'color'
            }
          }
        }
      }
    }
  }
}
