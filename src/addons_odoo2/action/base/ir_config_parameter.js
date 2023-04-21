export default {
  view_ir_config_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.config_parameter',
    type: 'search',
    arch: {
      key: { string: 'Key' },
      value: {}
    }
  },

  view_ir_config_list: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.config_parameter',
    type: 'tree',
    arch: {
      sheet: {
        key: {},
        value: {}
      }
    }
  },

  view_ir_config_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.config_parameter',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          key: {},
          value: {}
        }
      }
    }
  },

  ir_config_list_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'System Parameters',
    res_model: 'ir.config_parameter',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
