export default {
  view_product_hr_expense_form: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_form_view',
    arch: {
      sheet: {
        _div_options: {
          _attr: {
            name: 'options',
            position: 'inside'
          },
          _span: {
            _attr: { class: 'd-inline-block' },
            can_be_expensed: {},
            _label_can_be_expensed: { for: 'can_be_expensed' }
          }
        }
      }
    }
  },

  product_template_search_view_inherit_hr_expense: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_search_view',
    arch: {
      sheet: {
        _filter_filter_to_purchase: {
          _attr: {
            name: 'filter_to_purchase',
            position: 'after'
          },
          _filter_filter_to_expense: {
            _attr: {
              name: 'filter_to_expense',
              string: 'Can be Expensed',
              domain: [['can_be_expensed', '=', true]]
            }
          }
        }
      }
    }
  }
}
