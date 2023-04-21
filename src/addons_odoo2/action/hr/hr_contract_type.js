export default {
  hr_contract_type_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.contract.type',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {}
      }
    }
  },

  hr_contract_type_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.contract.type',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            name: {}
          }
        }
      }
    }
  },

  hr_contract_type_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Employment Types',
    res_model: 'hr.contract.type',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
