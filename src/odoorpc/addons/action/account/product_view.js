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
    inherit_id: 'product.product_template_form_view',

    arch: {
      sheet: {
        _title: {
          display_name: {}
        },

        _group_general_information__group_standard_price: {
          list_price: {},
          taxes_id: {
            widget: 'many2many_tags'
            // context="{'default_type_tax_use':'sale', 'search_default_sale': 1, 'search_default_service': type == 'service', 'search_default_goods': type == 'consu'}"
          },

          tax_string: {}
        },

        _group_purchase__purchase__bill: {
          supplier_taxes_id: {
            widget: 'many2many_tags'
            // context="{'default_type_tax_use':'purchase', 'search_default_purchase': 1, 'search_default_service': type == 'service', 'search_default_goods': type == 'consu'}"
          }
        },

        _group_inventory__packaging: {},

        _group_invoicing__properties: {
          _groups:
            'account.group_account_readonly,account.group_account_invoice',

          property_account_income_id: {},
          property_account_expense_id: {}
        },

        _group_invoicing__accounting: {
          _groups:
            'account.group_account_readonly,account.group_account_invoice'
        }
      }
    }
  },

  product_product_action_sellable: {
    _odoo_model: 'ir.actions',
    name: 'Products(Sold)',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'product.product_template_search_view',
    domain: [],
    context: { search_default_filter_to_sell: 1 },
    views: {
      tree: 'product_template_view_tree',
      form: 'product.product_template_form_view'
    }
  },

  product_product_action_purchasable: {
    _odoo_model: 'ir.actions',
    name: 'Products(Purchased)',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'product.product_template_search_view',
    domain: [],
    context: { search_default_filter_to_purchase: 1 },
    views: {
      tree: 'product_template_view_tree',
      form: 'product.product_template_form_view'
    }
  }
}
