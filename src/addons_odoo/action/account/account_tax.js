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
        company_id: {},
        country_id: { optional: 'hide' },
        active: { widget: 'boolean_toggle' }
      }
    }
  },
  account_tax_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Tax',
          filter_domain: self => {
            return [
              '|',
              ['name', 'ilike', self],
              ['description', '=like', self]
            ]
          }
        },
        company_id: {}
      },

      filters: {}
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
          _group_378: {
            type_tax_use: {},
            tax_scope: {},
            _field_amount: {
              _attr: {
                invisible: ({ record }) => {
                  // invisible: [
                  //   ['amount_type', 'not in',
                  // ('fixed', 'percent', 'division')]
                  // ],
                  const { amount_type } = record
                  return ['fixed', 'percent', 'division'].includes(amount_type)
                }
              },
              _label_amount: { for: 'amount' },
              _div: {
                amount: { class: 'oe_inline' },
                _span: {
                  _attr: {
                    class: 'o_form_label oe_inline',
                    text: '%',
                    invisible: ({ record }) => {
                      // invisible: [['amount_type', '=', 'fixed']],
                      const { amount_type } = record
                      return amount_type == 'fixed'
                    }
                  }
                }
              }
            }
          }
        },
        _notebook: {
          _page_definition: {
            _attr: { name: 'definition', string: 'Definition' },
            _group: {
              _attr: {
                invisible: ({ record }) => {
                  //  invisible: [['amount_type', '=', 'group']]
                  const { amount_type } = record
                  return amount_type == 'group'
                }
              },
              country_code: { invisible: '1' },
              _group: {
                _attr: { string: 'Distribution for Invoices' },
                invoice_repartition_line_ids: {
                  // todo
                }
              },
              _group_982: {
                _attr: { string: 'Distribution for Refunds' },
                refund_repartition_line_ids: {
                  // todo
                }
              }
            },
            children_tax_ids: {
              invisible: ({ record }) => {
                // invisible: [
                //   '|',
                //   ['amount_type', '!=', 'group'],
                //   ['type_tax_use', '=', 'none']
                // ],
                const { amount_type, type_tax_use } = record
                return amount_type != 'group' || type_tax_use == 'none'
              },
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
                },

                form: {
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
            _attr: { name: 'advanced_options', string: 'Advanced Options' },
            _group: {
              _group: {
                description: {
                  invisible: ({ record }) => {
                    //  invisible: [['amount_type', '=', 'group']],
                    const { amount_type } = record
                    return amount_type == 'group'
                  }
                },
                tax_group_id: {
                  invisible: ({ record }) => {
                    //  invisible: [['amount_type', '=', 'group']],
                    const { amount_type } = record
                    return amount_type == 'group'
                  }
                },
                analytic: {
                  invisible: ({ record }) => {
                    //  invisible: [['amount_type', '=', 'group']],
                    const { amount_type } = record
                    return amount_type == 'group'
                  }
                },
                company_id: { no_create: true },
                country_id: {}
              },
              _group_advanced_booleans: {
                _attr: { name: 'advanced_booleans' },
                price_include: {
                  invisible: ({ record }) => {
                    //  invisible: [['amount_type', '=', 'group']],
                    const { amount_type } = record
                    return amount_type == 'group'
                  }
                },
                include_base_amount: {
                  invisible: ({ record }) => {
                    //  invisible: [['amount_type', '=', 'group']],
                    const { amount_type } = record
                    return amount_type == 'group'
                  }
                },
                is_base_affected: {
                  invisible: ({ record }) => {
                    // invisible: [
                    //   '|',
                    //   ['amount_type', '=', 'group'],
                    //   ['price_include', '=', true]
                    // ],
                    const { amount_type, price_include } = record
                    return amount_type == 'group' || price_include
                  }
                },
                hide_tax_exigibility: { invisible: '1' },
                tax_exigibility: {
                  widget: 'radio',
                  invisible: ({ record }) => {
                    // invisible: [
                    //   '|',
                    //   ['amount_type', '=', 'group'],
                    //   ['hide_tax_exigibility', '=', false]
                    // ],
                    const { amount_type, hide_tax_exigibility } = record
                    return amount_type == 'group' || !hide_tax_exigibility
                  }
                },
                cash_basis_transition_account_id: {
                  invisible: ({ record }) => {
                    //invisible: [['tax_exigibility', '=', 'on_invoice']],
                    const { tax_exigibility } = record
                    return tax_exigibility == 'on_invoice'
                  },
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
    type: 'ir.actions.act_window',
    res_model: 'account.tax',
    domain: [],
    context: {
      search_default_sale: true,
      search_default_purchase: true,
      active_test: false
    },
    views: {
      tree: 'view_tax_tree',
      form: 'view_tax_form'
    }
  }
}
