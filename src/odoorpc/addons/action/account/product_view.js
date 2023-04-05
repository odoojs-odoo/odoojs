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
        _notebook: {
          _page_general_information: {
            _group_general_information: {
              _group_group_standard_price: {
                _div_list_price: {
                  tax_string: {}
                },
                taxes_id: {
                  widget: 'many2many_tags',
                  context({ record }) {
                    // context="{
                    // 'default_type_tax_use':'sale',
                    // 'search_default_sale': 1,
                    // 'search_default_service': type == 'service',
                    // 'search_default_goods': type == 'consu'}"
                    const { type } = record
                    return {
                      default_type_tax_use: 'sale',
                      search_default_sale: 1,
                      search_default_service: type == 'service',
                      search_default_goods: type == 'consu'
                    }
                  }
                }
              }
            }
          },

          _page_purchase: {
            _attr: {
              invisible({ record }) {
                //  覆盖上级的方法, 暂时只能重写
                // invisible: '1'
                //  attrs="{'invisible':[('purchase_ok','=',False)]}",
                const { purchase_ok } = record
                return !purchase_ok
              }
            },
            _group_purchase: {
              _group_bill: {
                supplier_taxes_id: {
                  widget: 'many2many_tags',
                  context({ record }) {
                    // context="{'default_type_tax_use':'purchase',
                    // 'search_default_purchase': 1,
                    // 'search_default_service': type == 'service',
                    // 'search_default_goods': type == 'consu'}"

                    const { type } = record
                    return {
                      default_type_tax_use: 'purchase',
                      search_default_purchase: 1,
                      search_default_service: type == 'service',
                      search_default_goods: type == 'consu'
                    }
                  }
                }
              }
            }
          },

          _page_inventory: {},

          _page_invoicing: {
            _attr: {
              string: 'Accounting',
              name: 'invoicing',
              groups:
                'account.group_account_readonly,account.group_account_invoice'
            },
            _group_properties: {
              _attr: {
                groups: 'account.group_account_readonly'
              },

              _group_receivables: {
                _attr: { string: 'Receivables' },
                property_account_income_id: {}
              },
              _group_payables: {
                _attr: { name: 'payables', string: 'Payables' },
                property_account_expense_id: {}
              }
            }
          }
        }
        // _title: { display_name: {} },
        // _group_general_information__group_standard_price: {
        //   list_price: {},

        // },
        // _group_purchase__purchase__bill: {

        // },
        // _group_inventory__packaging: {},
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
