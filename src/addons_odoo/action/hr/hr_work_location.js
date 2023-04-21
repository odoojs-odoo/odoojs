export default {
  hr_work_location_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.work.location',
    type: 'tree',
    arch: {
      sheet: {
        active: { invisible: '1' },
        name: {},
        address_id: {},
        company_id: { groups: 'base.group_multi_company' }
      }
    }
  },

  hr_work_location_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.work.location',
    type: 'form',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        _group: {
          _group: {
            active: { invisible: '1' },
            name: {},
            address_id: {},
            location_number: {}
          },
          _group_375: {
            company_id: { groups: 'base.group_multi_company' }
          }
        }
      }
    }
  },

  hr_work_location_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Work Locations',
    res_model: 'hr.work.location',
    views: {
      tree: 'hr_work_location_tree_view',
      form: 'hr_work_location_form_view'
    }
  }
}
