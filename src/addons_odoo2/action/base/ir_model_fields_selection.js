export default {
  view_model_fields_selection_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.fields.selection',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          field_id: {},
          value: {
            groups: 'base.group_no_one'
          },
          name: {},
          sequence: {
            groups: 'base.group_no_one'
          }
        }
      }
    }
  },

  view_model_fields_selection_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.fields.selection',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        field_id: {},
        value: {},
        name: {}
      }
    }
  },

  view_model_fields_selection_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.fields.selection',
    type: 'search',
    arch: {
      field_id: {
        string: 'Field'
      },
      name: {
        string: 'Selection'
      },
      _filter_group_by_field: {
        _attr: {
          name: 'group_by_field',
          string: 'Field',
          context: {
            group_by: 'field_id'
          }
        }
      }
    }
  },

  action_model_fields_selection: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Fields Selection',
    res_model: 'ir.model.fields.selection',
    views: {
      tree: 'view_model_fields_selection_tree',
      form: '=======todo=========='
    }
  }
}
