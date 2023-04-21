export default {
  hr_departure_reason_view_list: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.departure.reason',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {}
      }
    }
  },

  hr_departure_reason_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.departure.reason',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            sequence: {},
            name: {}
          }
        }
      }
    }
  },

  hr_departure_reason_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Departure Reasons',
    res_model: 'hr.departure.reason',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
