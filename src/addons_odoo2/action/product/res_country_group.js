export default {
  inherits_website_sale_country_group_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.country.group',
    inherit_id: 'base.view_country_group_form',
    arch: {
      sheet: {
        _group_country_group: {
          _attr: {
            name: 'country_group'
          },
          pricelist_ids: {}
        }
      }
    }
  }
}
