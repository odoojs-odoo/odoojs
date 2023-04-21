export default {
  product_template_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'tree',
    arch: {
      sheet: {
        default_code: {},
        name: {},
        list_price: {},
        taxes_id: { widget: 'many2many_tags' },
        supplier_taxes_id: { widget: 'many2many_tags' },
        activity_exception_decoration: { widget: 'activity_exception' }
      }
    }
  },

  product_product_action_sellable: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Products',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'tooooooodoooooo',
    context: { search_default_filter_to_sell: 1 },
    views: {
      tree: 'product_template_view_tree',
      form: '=======todo=========='
    }
  },

  product_product_action_purchasable: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Products',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'tooooooodoooooo',
    context: { search_default_filter_to_purchase: 1 },
    views: {
      tree: 'product_template_view_tree',
      form: '=======todo=========='
    }
  },

  product_template_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//page[@name='purchase']",
            position: 'attributes'
          },
          _attribute_invisible: {
            _attr: {
              name: 'invisible',
              text: '0',
              invisible: '0'
            }
          }
        },
        _page_inventory: {
          _attr: {
            name: 'inventory',
            position: 'after'
          },
          _page_invoicing: {
            _attr: {
              name: 'invoicing',
              string: 'Accounting',
              groups: 'account.group_account_readonly,account.group_account_invoice'
            },
            _group_properties: {
              _attr: {
                name: 'properties',
                groups: 'account.group_account_readonly'
              },
              _group: {
                _attr: { string: 'Receivables' },
                property_account_income_id: { groups: 'account.group_account_readonly' }
              },
              _group_payables: {
                _attr: {
                  name: 'payables',
                  string: 'Payables'
                },
                property_account_expense_id: { groups: 'account.group_account_readonly' }
              }
            },
            _group_accounting: {
              _attr: {
                name: 'accounting',
                groups: 'account.group_account_readonly,account.group_account_invoice'
              }
            }
          }
        },
        _xpath_592: {
          _attr: {
            expr: "//div[@name='pricing']",
            position: 'after'
          },
          taxes_id: {
            widget: 'many2many_tags',
            context: {
              default_type_tax_use: 'sale',
              search_default_sale: 1,
              search_default_service: false,
              search_default_goods: false
            }
          }
        },
        _xpath_646: {
          _attr: {
            expr: "//div[@name='pricing']",
            position: 'inside'
          },
          _span: {
            _attr: { class: 'ms-2' }
          },
          tax_string: {}
        },
        _group_bill: {
          _attr: {
            name: 'bill',
            position: 'inside'
          },
          supplier_taxes_id: {
            widget: 'many2many_tags',
            context: {
              default_type_tax_use: 'purchase',
              search_default_purchase: 1,
              search_default_service: false,
              search_default_goods: false
            }
          }
        }
      }
    }
  }
}
