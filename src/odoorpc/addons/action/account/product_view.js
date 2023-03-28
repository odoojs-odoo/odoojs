export default {
  product_template_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'tree',
    buttons: { create: false, edit: true, delete: false },

    fields: {
      default_code: {},
      name: {},
      list_price: { widget: 'monetary' },
      taxes_id: { widget: 'many2many_tags' },
      supplier_taxes_id: { widget: 'many2many_tags' }
    }
  },

  product_template_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'form',
    buttons: { create: false, edit: true, delete: false },

    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
        },

        _group_invoicing: {
          property_account_income_id: {},
          property_account_expense_id: {},
          taxes_id: { widget: 'many2many_tags' },
          supplier_taxes_id: { widget: 'many2many_tags' }
        }
      }
    }
  },

  product_product_action_sellable: {
    _odoo_model: 'ir.actions',
    name: 'Products(Sold)',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    domain: [],
    context: { search_default_filter_to_sell: 1 },
    views: {
      tree: 'product_template_view_tree',
      form: 'product_template_form_view'
    }
  },

  product_product_action_purchasable: {
    _odoo_model: 'ir.actions',
    name: 'Products(Purchased)',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    domain: [],
    context: { search_default_filter_to_purchase: 1 },
    views: {
      tree: 'product_template_view_tree',
      form: 'product_template_form_view'
    }
  }
}
