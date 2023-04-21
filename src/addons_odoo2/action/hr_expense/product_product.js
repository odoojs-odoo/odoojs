export default {
  product_product_expense_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    type: 'form',
    arch: {
      sheet: {
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        product_variant_count: { invisible: '1' },
        id: { invisible: 'True' },
        image_1920: {
          widget: 'image',
          class: 'oe_avatar',
          image_preview: 'image_128'
        },
        detailed_type: { invisible: '1' },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: {
            for: 'name',
            string: 'Product Name'
          },
          _h1: {
            name: { placeholder: 'e.g. Lunch' }
          },
          _div_options: {
            _attr: {
              name: 'options',
              groups: 'base.group_user',
              invisible: '1'
            },
            _div: {
              can_be_expensed: {},
              _label_can_be_expensed: { for: 'can_be_expensed' }
            }
          }
        },
        _group_product_details: {
          _attr: { name: 'product_details' },
          _group: {
            _attr: { string: 'General Information' },
            active: { invisible: '1' },
            type: { invisible: '1' },
            detailed_type: { invisible: '1' },
            standard_price: { help: "When the cost of an expense product is different than 0, then the user using this product won't be able to change the amount of the expense, only the quantity. Use a cost different than 0 for expense categories funded by the company at fixed cost like allowances for mileage, per diem, accommodation or meal." },
            uom_id: {
              groups: 'uom.group_uom',
              no_create: true
            },
            uom_po_id: { invisible: '1' },
            _label_default_code: { for: 'default_code' },
            _div: {
              default_code: {},
              _span: {
                _attr: { class: 'd-inline-block' },
                _i: {
                  _attr: {
                    class: 'text-muted',
                    text: 'Use this reference as a subject prefix when submitting by email.'
                  }
                }
              }
            },
            company_id: { groups: 'base.group_multi_company' }
          },
          _group_616: {
            _attr: { string: 'Accounting' },
            property_account_expense_id: { groups: 'account.group_account_readonly' },
            supplier_taxes_id: {
              widget: 'many2many_tags',
              context: {
                default_type_tax_use: 'purchase',
                default_price_include: 1
              },
              no_quick_create: true
            }
          }
        },
        _notebook: {
          _page_internal_note: {
            _attr: {
              name: 'internal_note',
              string: 'Internal Note'
            },
            description: { placeholder: 'This note will be shown to users when they select this expense product.' }
          }
        }
      }
    }
  },

  product_product_expense_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    type: 'tree',
    arch: {
      sheet: {
        default_code: {},
        name: {},
        product_template_attribute_value_ids: {
          widget: 'many2many_tags',
          groups: 'product.group_product_variant'
        },
        standard_price: {},
        uom_id: {
          groups: 'uom.group_uom',
          no_open: true,
          no_create: true
        },
        barcode: {}
      }
    }
  },

  product_product_expense_categories_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    type: 'tree',
    arch: {
      sheet: {
        name: { readonly: '1' },
        default_code: {
          readonly: '1',
          optional: 'show'
        },
        description: {
          string: 'Internal Note',
          widget: 'html',
          readonly: '1',
          optional: 'show'
        },
        lst_price: {
          string: 'Sales Price',
          optional: 'show'
        },
        standard_price: { optional: 'show' },
        supplier_taxes_id: {
          widget: 'many2many_tags',
          optional: 'show'
        }
      }
    }
  },

  hr_expense_product: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Expense Categories',
    res_model: 'product.product',
    search_view_id: 'product.product_search_form_view',
    domain: "[['can_be_expensed', '=', True]]",
    context: {
      default_can_be_expensed: 1,
      default_detailed_type: 'service'
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  hr_expense_product_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'product_product_expense_categories_tree_view',
    act_window_id: 'hr_expense_product'
  },

  hr_expense_product_kanban: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'kanban',
    act_window_id: 'hr_expense_product'
  },

  hr_expense_product_form: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'form',
    view_id: 'product_product_expense_form_view',
    act_window_id: 'hr_expense_product'
  }
}
