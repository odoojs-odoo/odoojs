// todo

export default {
  view_tax_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      sheet: {
        sequence: {},
        name: {},
        type_tax_use: {},
        tax_scope: {},
        description: {},
        company_id: {},
        // country_id: {},
        active: {}
      }
    }
  },

  view_tax_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },
    fields: {
      sequence: {},
      name: {},
      amount_type: {},
      active: {},

      type_tax_use: {},
      tax_scope: {},
      amount: {},

      description: {},
      tax_group_id: {},
      analytic: {},

      company_id: {},
      country_id: {},

      price_include: {},

      include_base_amount: {},

      children_tax_ids: {}
    }
  },

  account_tax_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax',
    type: 'search',
    arch: {
      fields: {
        name: {
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

  action_tax_form: {
    _odoo_model: 'ir.actions',
    name: '税',
    type: 'ir.actions.act_window',
    res_model: 'account.tax',
    domain: [],
    context: {
      search_default_sale: true,
      search_default_purchase: true,
      active_test: false
    }
  },

  view_tax_group_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax.group',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      sheet: {
        sequence: {},
        name: {},
        country_id: {},
        property_tax_payable_account_id: {
          domain: ({ record }) => {
            const { context = {} } = record
            if (context.force_account_company) {
              return [['company_id', '=', context.force_account_company]]
            } else {
              return []
            }
          }
        },
        property_tax_receivable_account_id: {
          domain: ({ record }) => {
            const { context = {} } = record
            if (context.force_account_company) {
              return [['company_id', '=', context.force_account_company]]
            } else {
              return []
            }
          }
        },
        property_advance_tax_payment_account_id: {
          domain: ({ record }) => {
            const { context = {} } = record
            if (context.force_account_company) {
              return [['company_id', '=', context.force_account_company]]
            } else {
              return []
            }
          }
        },
        preceding_subtotal: {}
      }
    }
  },

  view_tax_group_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax.group',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },
    fields: {
      sequence: {},
      name: {},
      country_id: {},
      property_tax_payable_account_id: {
        domain: ({ record }) => {
          const { context = {} } = record
          if (context.force_account_company) {
            return [['company_id', '=', context.force_account_company]]
          } else {
            return []
          }
        }
      },
      property_tax_receivable_account_id: {
        domain: ({ record }) => {
          const { context = {} } = record
          if (context.force_account_company) {
            return [['company_id', '=', context.force_account_company]]
          } else {
            return []
          }
        }
      },
      property_advance_tax_payment_account_id: {
        domain: ({ record }) => {
          const { context = {} } = record
          if (context.force_account_company) {
            return [['company_id', '=', context.force_account_company]]
          } else {
            return []
          }
        }
      },
      preceding_subtotal: {}
    }
  },

  account_tax_group_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax.group',
    type: 'search',
    arch: {
      fields: {
        name: {},
        country_id: {}
      },

      filters: {}
    }
  },

  action_tax_group: {
    _odoo_model: 'ir.actions',
    name: '税组',
    type: 'ir.actions.act_window',
    res_model: 'account.tax.group',
    domain: [],
    context: {}
  }
}
