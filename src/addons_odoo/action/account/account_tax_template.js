export default {
  view_account_tax_template_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax.template',
    type: 'form',

    arch: {
      sheet: {
        // active: { invisible: '1', widget: 'web_ribbon' },
        _group_main_group: {
          _group: {
            name: {}
          },
          _group_2: {
            type_tax_use: {}
          }
        },

        _notebook: {
          _page_tax_definitions: {
            _attr: { name: 'definition', string: 'Definition' },
            _group_tax_definitions: {
              _group: {
                amount_type: {},
                amount: {
                  readonly: '1',
                  // 'invisible':[('amount_type','=', 'group')]
                  invisible: [['amount_type', '=', 'group']]
                },
                _span: {
                  _attr: {
                    invisible({ record }) {
                      // 'invisible':[('amount_type','=','fixed')]
                      const { amount_type } = record
                      return amount_type === 'fixed'
                    },
                    text: '%'
                  }
                }
              }
            },
            children_tax_ids: {
              invisible({ record }) {
                // 'invisible':
                // ['|', ('amount_type','!=','group'),
                // ('type_tax_use','=','none')]}"
                const { amount_type, type_tax_use } = record
                return amount_type !== 'group' || type_tax_use === 'none'
              },
              domain({ record }) {
                // domain="[('type_tax_use','in',('none',type_tax_use)),
                // ('amount_type','!=','group')]">
                const { type_tax_use } = record
                return [
                  ['type_tax_use', 'in', ['none', type_tax_use]],
                  ['amount_type', '!=', 'group']
                ]
              },

              views: {
                tree: {
                  arch: {
                    sheet: {
                      sequence: { widget: 'handle' },
                      name: {},
                      amount_type: {},
                      amount: {}
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
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
            _attr: { name: 'advanced_options', string: 'Advanced Options' },
            _group_advanced_definitions: {
              _group: {
                description: {
                  invisible({ record }) {
                    // 'invisible':[('amount_type','=', 'group')]
                    const { amount_type } = record
                    return amount_type === 'group'
                  }
                },
                analytic: {
                  groups: 'analytic.group_analytic_accounting',
                  invisible({ record }) {
                    // 'invisible':[('amount_type','=', 'group')]
                    const { amount_type } = record
                    return amount_type === 'group'
                  }
                }
              },
              _group_price_definitions: {
                price_include: {
                  invisible({ record }) {
                    // 'invisible':[('amount_type','=', 'group')]
                    const { amount_type } = record
                    return amount_type === 'group'
                  }
                },
                include_base_amount: {
                  invisible({ record }) {
                    // 'invisible':[('amount_type','=', 'group')]
                    const { amount_type } = record
                    return amount_type === 'group'
                  }
                },
                is_base_affected: {
                  invisible({ record }) {
                    // 'invisible': ['|', ('amount_type','=', 'group'),
                    // ('price_include', '=', True)]
                    const { amount_type, price_include } = record
                    return amount_type === 'group' || price_include
                  }
                }
              },
              _group_tax_configuration: {
                active: { groups: 'base.group_no_one' },
                tax_exigibility: {
                  widget: 'radio',
                  invisible({ record }) {
                    // 'invisible':[('amount_type','=', 'group')]
                    const { amount_type } = record
                    return amount_type === 'group'
                  }
                },
                cash_basis_transition_account_id: {
                  invisible({ record }) {
                    // 'invisible': [('tax_exigibility', '=', 'on_invoice')]
                    const { tax_exigibility } = record
                    return tax_exigibility === 'on_invoice'
                  }
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

  account_tag_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax.template',
    type: 'search',
    arch: {
      fields: {
        name: {
          filter_domain(self) {
            return [
              '|',
              ['name', 'ilike', self],
              ['description', 'ilike', self]
            ]
          }
        },
        chart_template_id: {}
      },

      filters: {
        group_sale_purchase: {
          sale: {
            string: 'Sale',
            domain: [['type_tax_use', '=', 'sale']]
          },
          purchase: {
            string: 'Purchase',
            domain: [['type_tax_use', '=', 'purchase']]
          }
        },

        group_active: {
          inactive: {
            string: '已归档',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  action_account_tax_template_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Tax Templates',
    type: 'ir.actions.act_window',
    res_model: 'account.tax.template',
    search_view_id: 'view_account_tax_template_search',
    domain: [],
    context: {},
    views: {
      tree: 'view_account_tax_template_tree',
      form: 'view_account_tax_template_form'
    }
  }
}
