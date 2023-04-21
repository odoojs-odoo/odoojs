export default {
  view_category_property_form: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    inherit_id: 'product.product_category_form_view',
    arch: {
      sheet: {
        _group_first: {
          _attr: {
            name: 'first',
            position: 'after'
          },
          _group_account_property: {
            _attr: { name: 'account_property' },
            _group: {
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
}
