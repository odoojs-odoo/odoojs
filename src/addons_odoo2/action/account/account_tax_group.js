export default {
  account_tax_group_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax.group',
    type: 'search',
    arch: {
      name: {},
      country_id: {},
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_group_by_country: {
          _attr: {
            name: 'group_by_country',
            string: 'Country',
            domain: [],
            context: {
              group_by: 'country_id'
            }
          }
        }
      }
    }
  },

  view_tax_group_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax.group',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        name: {},
        country_id: {},
        country_code: {
          invisible: 'True'
        },
        property_tax_payable_account_id: {
          domain: {
            todo_ctx: "[('company_id', '=', context['force_account_company'])] if context.get('force_account_company') else []"
          }
        },
        property_tax_receivable_account_id: {
          domain: {
            todo_ctx: "[('company_id', '=', context['force_account_company'])] if context.get('force_account_company') else []"
          }
        },
        property_advance_tax_payment_account_id: {
          domain: {
            todo_ctx: "[('company_id', '=', context['force_account_company'])] if context.get('force_account_company') else []"
          }
        },
        preceding_subtotal: {
          optional: 'hide'
        }
      }
    }
  },

  view_tax_group_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax.group',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            name: {},
            country_id: {},
            sequence: {}
          },
          _group_680: {
            property_tax_payable_account_id: {},
            property_tax_receivable_account_id: {},
            property_advance_tax_payment_account_id: {},
            preceding_subtotal: {}
          }
        }
      }
    }
  },

  action_tax_group: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Tax Groups',
    res_model: 'account.tax.group',
    views: {
      tree: 'view_tax_group_tree',
      form: '=======todo=========='
    }
  }
}
