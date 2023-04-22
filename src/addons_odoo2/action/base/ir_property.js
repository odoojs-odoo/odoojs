export default {
  ir_property_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.property',
    type: 'search',
    arch: {
      name: { string: 'Name' },
      _filter_generic: {
        _attr: {
          name: 'generic',
          string: 'Generic',
          help: 'Parameters that are used by all resources.',
          domain: [['res_id', '=', false]]
        }
      },
      fields_id: {},
      company_id: { groups: 'base.group_multi_company' }
    }
  },

  ir_property_view: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.property',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          company_id: { groups: 'base.group_multi_company' },
          _newline: {},
          fields_id: {},
          type: {},
          res_id: {}
        },
        _group_581: {
          value_integer: {
            string: 'Value',
            invisible: [['type', 'not in', ('integer', 'boolean')]]
          },
          value_float: {
            string: 'Value',
            invisible: [['type', '!=', 'float']]
          },
          value_datetime: {
            string: 'Value',
            invisible: [['type', 'not in', ('date', 'datetime')]]
          },
          value_text: {
            string: 'Value',
            invisible: [['type', 'not in', ('char', 'text', 'selection')]]
          },
          value_reference: {
            string: 'Value',
            invisible: [['type', '!=', 'many2one']]
          },
          value_binary: {
            string: 'Value',
            invisible: [['type', '!=', 'binary']]
          }
        }
      }
    }
  },

  ir_property_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.property',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        company_id: { groups: 'base.group_multi_company' },
        fields_id: {},
        res_id: {},
        type: {}
      }
    }
  },

  ir_property_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Company Properties',
    type: 'ir.actions.act_window',
    res_model: 'ir.property',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'ir_property_view_tree',
      form: '=======todo=========='
    }
  }
}
