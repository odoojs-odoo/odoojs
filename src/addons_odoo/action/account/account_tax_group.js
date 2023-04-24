export default {
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

  view_tax_group_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax.group',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {},
        name: {},
        country_id: {},
        property_tax_payable_account_id: {},
        property_tax_receivable_account_id: {},
        property_advance_tax_payment_account_id: {},
        preceding_subtotal: {}
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
          _group_214: {
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
    type: 'ir.actions.act_window',
    res_model: 'account.tax.group',
    domain: [],
    context: {},
    search_view_id: 'account_tax_group_view_search',
    views: {
      tree: 'view_tax_group_tree',
      form: 'view_tax_group_form'
    }
  }
}
