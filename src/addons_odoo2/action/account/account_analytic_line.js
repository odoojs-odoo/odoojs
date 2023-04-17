export default {
  view_account_analytic_line_form_inherit_account: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    inherit_id: 'analytic.view_account_analytic_line_form',
    arch: {
      sheet: {
        _data: {
          _xpath: {
            _attr: {
              expr: "//field[@name='amount']",
              position: 'after'
            },
            ref: {},
            partner_id: {}
          },
          _xpath_185: {
            _attr: {
              expr: "//field[@name='product_uom_id']",
              position: 'before'
            },
            product_id: {}
          },
          _group_amount: {
            _attr: {
              name: 'amount'
            },
            _group: {},
            _group_accounting: {
              _attr: {
                name: 'accounting',
                string: 'Accounting'
              },
              move_line_id: {
                widget: 'line_open_move_widget',
                no_create: true
              },
              general_account_id: {
                attrs: {
                  readonly: "[('move_line_id', '!=', False)]"
                }
              }
            }
          }
        }
      }
    }
  },

  view_account_analytic_line_tree_inherit_account: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    inherit_id: 'analytic.view_account_analytic_line_tree',
    arch: {
      sheet: {
        _data: {
          _xpath: {
            _attr: {
              expr: "//field[@name='account_id']",
              position: 'after'
            },
            ref: {
              invisible: "context.get('to_invoice', False)"
            },
            general_account_id: {},
            move_line_id: {
              widget: 'line_open_move_widget'
            },
            product_id: {}
          }
        }
      }
    }
  },

  view_account_analytic_line_filter_inherit_account: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    inherit_id: 'analytic.view_account_analytic_line_filter',
    arch: {
      sheet: {
        _data: {
          _xpath: {
            _attr: {
              expr: "//field[@name='date']",
              position: 'after'
            },
            product_id: {},
            partner_id: {}
          },
          _xpath_304: {
            _attr: {
              expr: "//group[@name='groupby']",
              position: 'after'
            },
            _filter_financialaccount: {
              _attr: {
                name: 'financialaccount',
                string: 'Financial Account',
                context: {
                  group_by: 'general_account_id'
                }
              }
            },
            _filter_product: {
              _attr: {
                name: 'product',
                string: 'Product',
                context: {
                  group_by: 'product_id'
                }
              }
            },
            _filter_partner: {
              _attr: {
                name: 'partner',
                string: 'Partner',
                context: {
                  group_by: 'partner_id'
                }
              }
            }
          }
        }
      }
    }
  },

  view_account_analytic_line_pivot: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    inherit_id: 'analytic.view_account_analytic_line_pivot',
    arch: {
      sheet: {
        account_id: {
          __todo__after: {
            partner_id: {}
          }
        }
      }
    }
  },

  view_account_analytic_line_filter_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    inherit_id: 'analytic.view_account_analytic_line_filter',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//filter[@name='group_date']",
            position: 'after'
          },
          _filter_category: {
            _attr: {
              name: 'category',
              string: 'Category',
              context: {
                group_by: 'category'
              }
            }
          }
        }
      }
    }
  }
}
