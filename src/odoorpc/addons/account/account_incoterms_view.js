export default {
  view_incoterms_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.incoterms',
    type: 'tree',
    fields: {
      code: {},
      name: {},
      active: {}
    }
  },

  account_incoterms_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.incoterms',
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
          code: {},
          name: {},
          active: {}
        }
      }
    }
  },

  account_incoterms_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.incoterms',
    type: 'search',
    arch: {
      fields: {
        name: {}
      },

      filters: {
        group_active: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    }
  },

  action_incoterms_tree: {
    _odoo_model: 'ir.actions',
    name: 'Incoterms',
    type: 'ir.actions.act_window',
    res_model: 'account.incoterms',
    search_view_id: 'account_incoterms_view_search',
    domain: [],
    context: {},
    views: {
      tree: 'view_incoterms_tree',
      form: 'account_incoterms_form'
    }
  }
}
