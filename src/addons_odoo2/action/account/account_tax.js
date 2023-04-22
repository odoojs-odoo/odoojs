export default {
  view_tax_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        type_tax_use: {},
        tax_scope: {},
        description: {},
        company_id: {
          groups: 'base.group_multi_company',
          no_create: true
        },
        country_id: { optional: 'hide' },
        active: { widget: 'boolean_toggle' }
      }
    }
  },

  view_onboarding_tax_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax',
    inherit_id: 'account.view_tax_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//tree',
            position: 'attributes'
          },
          _attribute_default_order: {
            _attr: {
              name: 'default_order',
              text: 'active desc, type_tax_use desc, amount desc, sequence',
              default_order: 'active desc, type_tax_use desc, amount desc, sequence'
            }
          }
        }
      }
    }
  },

  account_tax_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax',
    type: 'tree',
    arch: {
      sheet: {
        display_name: { string: 'name' },
        description: {}
      }
    }
  },

  view_tax_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax',
    type: 'otherview',
    arch: {}
  },

  view_account_tax_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax',
    type: 'search',
    arch: {
      name_searchable: { string: 'Name' },
      company_id: { groups: 'base.group_multi_company' },
      _filter_sale: {
        _attr: {
          name: 'sale',
          string: 'Sale',
          domain: [['type_tax_use', '=', 'sale']]
        }
      },
      _filter_purchase: {
        _attr: {
          name: 'purchase',
          string: 'Purchase',
          domain: [['type_tax_use', '=', 'purchase']]
        }
      },
      _separator: {},
      _filter_service: {
        _attr: {
          name: 'service',
          string: 'Services',
          domain: [['tax_scope', '=', 'service']]
        }
      },
      _filter_goods: {
        _attr: {
          name: 'goods',
          string: 'Goods',
          domain: [['tax_scope', '=', 'consu']]
        }
      },
      _separator_491: {},
      _filter_active: {
        _attr: {
          name: 'active',
          string: 'Active',
          help: 'Show active taxes',
          domain: [['active', '=', true]]
        }
      },
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Inactive',
          help: 'Show inactive taxes',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_company: {
          _attr: {
            name: 'company',
            string: 'Company',
            groups: 'base.group_multi_company',
            domain: [],
            context: { group_by: 'company_id' }
          }
        },
        _filter_taxapp: {
          _attr: {
            name: 'taxapp',
            string: 'Tax Type',
            domain: [],
            context: { group_by: 'type_tax_use' }
          }
        },
        _filter_taxapp_686: {
          _attr: {
            name: 'taxapp',
            string: 'Tax Scope',
            domain: [],
            context: { group_by: 'tax_scope' }
          }
        }
      }
    }
  },

  account_tax_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax',
    type: 'search',
    arch: {
      name: {
        string: 'Tax',
        filter_domain: { todo_ctx: "['|', ('name','ilike',self), ('description','ilike',self)]" }
      },
      company_id: { groups: 'base.group_multi_company' }
    }
  },

  view_tax_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax',
    type: 'form',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        _group: {
          _group: {
            name: {},
            amount_type: {},
            active: { widget: 'boolean_toggle' }
          },
          _group_449: {
            type_tax_use: {},
            tax_scope: {},
            _label_amount: {
              for: 'amount',
              invisible: [['amount_type', 'not in', ('fixed', 'percent', 'division')]]
            },
            _div: {
              _attr: { invisible: [['amount_type', 'not in', ('fixed', 'percent', 'division')]] },
              amount: { class: 'oe_inline' },
              _span: {
                _attr: {
                  invisible: [['amount_type', '=', 'fixed']],
                  class: 'o_form_label oe_inline',
                  text: '%'
                }
              }
            }
          }
        },
        _notebook: {
          _page_definition: {
            _attr: {
              name: 'definition',
              string: 'Definition'
            },
            _div: {
              _attr: { invisible: [['amount_type', '=', 'group']] },
              country_code: { invisible: '1' },
              _group: {
                _attr: { string: 'Distribution for Invoices' },
                invoice_repartition_line_ids: {}
              },
              _group_197: {
                _attr: { string: 'Distribution for Refunds' },
                refund_repartition_line_ids: {}
              }
            },
            children_tax_ids: {
              domain: { todo_ctx: "[('type_tax_use','in',('none',type_tax_use)), ('amount_type','!=','group')]" },
              invisible: ['|', ['amount_type', '!=', 'group'], ['type_tax_use', '=', 'none']],
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Children Taxes' },
                      sequence: { widget: 'handle' },
                      name: {},
                      amount_type: {},
                      amount: {}
                    }
                  }
                }
              }
            }
          },
          _page_advanced_options: {
            _attr: {
              name: 'advanced_options',
              string: 'Advanced Options'
            },
            _group: {
              _group: {
                description: { invisible: [['amount_type', '=', 'group']] },
                tax_group_id: {
                  invisible: [['amount_type', '=', 'group']],
                  required: [['amount_type', '!=', 'group']]
                },
                analytic: {
                  groups: 'analytic.group_analytic_accounting',
                  invisible: [['amount_type', '=', 'group']]
                },
                company_id: {
                  groups: 'base.group_multi_company',
                  no_create: true
                },
                country_id: { required: 'True' }
              },
              _group_advanced_booleans: {
                _attr: { name: 'advanced_booleans' },
                price_include: { invisible: [['amount_type', '=', 'group']] },
                include_base_amount: { invisible: [['amount_type', '=', 'group']] },
                is_base_affected: {
                  groups: 'base.group_no_one',
                  invisible: ['|', ['amount_type', '=', 'group'], ['price_include', '=', true]]
                },
                hide_tax_exigibility: { invisible: '1' },
                tax_exigibility: {
                  widget: 'radio',
                  groups: 'account.group_account_readonly',
                  invisible: ['|', ['amount_type', '=', 'group'], ['hide_tax_exigibility', '=', false]]
                },
                cash_basis_transition_account_id: {
                  groups: 'account.group_account_readonly',
                  invisible: [['tax_exigibility', '=', 'on_invoice']],
                  required: [['tax_exigibility', '=', 'on_payment']],
                  no_create: true
                }
              }
            }
          }
        }
      }
    }
  },

  action_tax_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Taxes',
    res_model: 'account.tax',
    search_view_id: 'tooooooodoooooo',
    domain: [],
    context: {
      search_default_sale: true,
      search_default_purchase: true,
      active_test: false
    },
    views: {
      tree: 'view_tax_tree',
      form: '=======todo=========='
    }
  }
}
