export default {
  ir_cron_trigger_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.cron.trigger',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          cron_id: {},
          call_at: {}
        }
      }
    }
  },

  ir_cron_trigger_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.cron.trigger',
    type: 'tree',
    arch: {
      sheet: {
        cron_id: {},
        call_at: {}
      }
    }
  },

  ir_cron_trigger_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.cron.trigger',
    type: 'search',
    arch: {
      cron_id: {},
      call_at: {}
    }
  },

  ir_cron_trigger_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Scheduled Actions Triggers',
    res_model: 'ir.cron.trigger',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
