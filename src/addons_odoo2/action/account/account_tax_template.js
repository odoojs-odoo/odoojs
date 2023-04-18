export default {
  view_account_tax_template_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax.template',
    type: 'form',
    arch: {
      sheet: {
        _group_main_group: {
          _attr: {
            name: 'main_group'
          },
          _group: {
            name: {}
          },
          _group_183: {
            type_tax_use: {}
          }
        },
        _notebook: {
          _page_definition: {
            _attr: {
              name: 'definition',
              string: 'Definition'
            },
            _group_tax_definitions: {
              _attr: {
                name: 'tax_definitions'
              },
              _group: {
                amount_type: {},
                _label_amount: {
                  for: 'amount',
                  invisible: [['amount_type', '=', 'group']]
                },
                _div: {
                  _attr: {
                    invisible: [['amount_type', '=', 'group']]
                  },
                  amount: {
                    class: 'oe_inline'
                  },
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
            children_tax_ids: {
              domain: {
                todo_ctx: "[('type_tax_use','in',('none',type_tax_use)), ('amount_type','!=','group')]"
              },
              invisible: ['|', ['amount_type', '!=', 'group'], ['type_tax_use', '=', 'none']],
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Children Taxes'
                      },
                      sequence: {
                        widget: 'handle'
                      },
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
            _group_advanced_definitions: {
              _attr: {
                name: 'advanced_definitions'
              },
              _group: {
                description: {
                  invisible: [['amount_type', '=', 'group']]
                },
                analytic: {
                  groups: 'analytic.group_analytic_accounting',
                  invisible: [['amount_type', '=', 'group']]
                }
              },
              _group_price_definitions: {
                _attr: {
                  name: 'price_definitions'
                },
                price_include: {
                  invisible: [['amount_type', '=', 'group']]
                },
                include_base_amount: {
                  invisible: [['amount_type', '=', 'group']]
                },
                is_base_affected: {
                  invisible: ['|', ['amount_type', '=', 'group'], ['price_include', '=', true]]
                }
              },
              _group_tax_configuration: {
                _attr: {
                  name: 'tax_configuration'
                },
                active: {
                  groups: 'base.group_no_one'
                },
                tax_exigibility: {
                  widget: 'radio',
                  invisible: [['amount_type', '=', 'group']]
                },
                cash_basis_transition_account_id: {
                  invisible: [['tax_exigibility', '=', 'on_invoice']],
                  required: [['tax_exigibility', '=', 'on_payment']]
                }
              }
            }
          }
        }
      }
    }
  },

  view_account_tax_template_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax.template',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        description: {}
      }
    }
  },

  view_account_tax_template_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax.template',
    type: 'search',
    arch: {
      name: {
        string: 'Tax Template',
        filter_domain: {
          todo_ctx: "['|', ('name', 'ilike', self), ('description', 'ilike', self)]"
        }
      },
      chart_template_id: {},
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
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  action_account_tax_template_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Tax Templates',
    search_view_id: 'view_account_tax_template_search',
    res_model: 'account.tax.template',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
