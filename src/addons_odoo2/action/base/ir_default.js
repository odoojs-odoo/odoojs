export default {
  ir_default_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.default',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group_field_value: {
            _attr: {
              name: 'field_value'
            },
            field_id: {},
            json_value: {}
          },
          _group_user_company_details: {
            _attr: {
              name: 'user_company_details'
            },
            user_id: {},
            company_id: {
              groups: 'base.group_multi_company'
            }
          }
        }
      }
    }
  },

  ir_default_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.default',
    type: 'tree',
    arch: {
      sheet: {
        field_id: {},
        json_value: {},
        user_id: {},
        company_id: {
          groups: 'base.group_multi_company'
        }
      }
    }
  },

  ir_default_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.default',
    type: 'search',
    arch: {
      field_id: {},
      user_id: {},
      company_id: {
        groups: 'base.group_multi_company'
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_groupby_user: {
          _attr: {
            name: 'groupby_user',
            string: 'User',
            domain: [],
            context: {
              group_by: 'user_id'
            }
          }
        },
        _filter_groupby_company: {
          _attr: {
            name: 'groupby_company',
            string: 'Company',
            domain: [],
            context: {
              group_by: 'company_id'
            }
          }
        }
      }
    }
  },

  ir_default_menu_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'User-defined Defaults',
    type: 'ir.actions.act_window',
    res_model: 'ir.default',
    search_view_id: 'ir_default_search_view',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
