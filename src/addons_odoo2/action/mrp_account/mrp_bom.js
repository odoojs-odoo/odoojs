export default {
  mrp_bom_form_view_inherited: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.bom',
    inherit_id: 'mrp.mrp_bom_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='picking_type_id']",
            position: 'after'
          },
          analytic_account_id: { groups: 'analytic.group_analytic_accounting' }
        }
      }
    }
  }
}
