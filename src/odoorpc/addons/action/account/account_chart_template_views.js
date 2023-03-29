export default {
  view_account_tax_template_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax.template',
    type: 'form',

    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
        },

        _group_name: {
          name: {},
          active: { invisible: '1', widget: 'web_ribbon' }
        },

        _group_name2: {
          type_tax_use: {}
        },

        _group_tax_definitions: {
          amount_type: {},
          amount: {
            readonly: '1',
            // 'invisible':[('amount_type','=', 'group')]
            invisible: [['amount_type', '=', 'group']]
          }
        },

        _group_children_tax_ids: {
          _span: 2,
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
                fields: {
                  // sequence: {},
                  name: {},
                  amount_type: {},
                  amount: {}
                }
              },
              form: {
                fields: {
                  // sequence: {},
                  name: {},
                  amount_type: {},
                  amount: {}
                }
              }
            }
          }
        },

        _group_advanced_definitions: {
          description: {
            invisible({ record }) {
              // 'invisible':[('amount_type','=', 'group')]
              const { amount_type } = record
              return amount_type === 'group'
            }
          },
          analytic: {
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
          active: {},
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
            },
            required({ record }) {
              // 'required': [('tax_exigibility', '=', 'on_payment')]
              const { tax_exigibility } = record
              return tax_exigibility === 'on_payment'
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
    fields: {
      name: {},
      description: {}
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
    _odoo_model: 'ir.actions',
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
