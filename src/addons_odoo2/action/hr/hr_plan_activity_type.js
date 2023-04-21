export default {
  hr_plan_activity_type_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.plan.activity.type',
    type: 'tree',
    arch: {
      sheet: {
        activity_type_id: {},
        summary: {},
        responsible: {},
        company_id: { groups: 'base.group_multi_company' }
      }
    }
  },

  hr_plan_activity_type_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.plan.activity.type',
    type: 'form',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        _group: {
          activity_type_id: {},
          summary: {},
          company_id: { groups: 'base.group_multi_company' },
          responsible: {},
          responsible_id: { invisible: [['responsible', '!=', 'other']] },
          note: {}
        }
      }
    }
  },

  hr_plan_activity_type_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Plan Activities',
    res_model: 'hr.plan.activity.type',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
