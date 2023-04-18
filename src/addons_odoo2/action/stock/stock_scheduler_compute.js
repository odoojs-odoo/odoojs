export default {
  view_procurement_compute_wizard: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.scheduler.compute',
    type: 'form',
    arch: {
      sheet: {
        _p: 'The stock will be reserved for operations waiting for availability and the reordering rules will be triggered.',
        _footer: {
          _button_procure_calculation: {
            _attr: {
              name: 'procure_calculation',
              type: 'object',
              string: 'Run Scheduler',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_procurement_compute: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Run Scheduler',
    res_model: 'stock.scheduler.compute',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
