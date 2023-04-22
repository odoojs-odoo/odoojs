export default {
  crm_recurring_plan_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.recurring.plan',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        number_of_months: {}
      }
    }
  },

  crm_recurring_plan_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.recurring.plan',
    type: 'search',
    arch: {
      name: {},
      _filter_active: {
        _attr: {
          name: 'active',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  crm_recurring_plan_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Recurring Plans',
    res_model: 'crm.recurring.plan',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
