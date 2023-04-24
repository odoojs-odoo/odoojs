export default {
  product_category_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    type: 'form',
    inherit_id: 'product.product_category_form_view',
    arch: {
      sheet: {
        _group_first: {},
        _group_account_property: {
          _attr: { name: 'account_property' },
          _group_account_property: {
            _attr: {
              string: 'Account Properties',
              groups: 'account.group_account_readonly'
            },
            property_account_income_categ_id: {},
            property_account_expense_categ_id: {}
          }
        }
      }
    }
  }
}
