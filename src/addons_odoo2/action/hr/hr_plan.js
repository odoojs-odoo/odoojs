export default {
  hr_plan_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.plan',
    type: 'search',
    arch: {
      name: {},
      department_id: {},
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  hr_plan_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.plan',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        steps_count: {},
        department_id: { optional: 'show' },
        company_id: {
          groups: 'base.group_multi_company',
          optional: 'hide'
        }
      }
    }
  },

  hr_plan_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.plan',
    type: 'form',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: {
            for: 'name',
            string: 'Plan Name'
          },
          _h1: {
            name: { placeholder: 'e.g. Onboarding' }
          }
        },
        _group: {
          department_id: {},
          company_id: { groups: 'base.group_multi_company' },
          active: { invisible: '1' }
        },
        _notebook: {
          _page: {
            _attr: { string: 'Activities To Generate' },
            plan_activity_type_ids: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      company_id: { invisible: '1' },
                      activity_type_id: {},
                      summary: {},
                      responsible: {},
                      responsible_id: {
                        readonly: [['responsible', '!=', 'other']],
                        optional: 'hide'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  hr_plan_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Plans',
    res_model: 'hr.plan',
    search_view_id: 'hr_plan_view_search',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
