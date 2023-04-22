export default {
  view_picking_form_inherit_mrp: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    inherit_id: 'stock.view_picking_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='use_create_lots']",
            position: 'after'
          },
          has_kits: { invisible: '1' }
        },
        _xpath_345: {
          _attr: {
            expr: "//field[@name='description_picking']",
            position: 'after'
          },
          description_bom_line: {
            column_invisible: [['parent.has_kits', '=', false]],
            optional: 'show'
          }
        }
      }
    }
  }
}
